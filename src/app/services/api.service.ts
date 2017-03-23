import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable, AjaxResponse } from 'rxjs';

export type HttpMethod =
  'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';

export type HttpQuery = {[key: string]: any};

export type HttpOptions = {
  body?: any,
  query?: HttpQuery,
  customHeaders?: any,
};

export class ApiService {
  private webSocket: WebSocket;
  private messageObservable: Observable<any>;

  readonly ajax;

  constructor(
    dependencies = {
      ajax,
    },
    private readonly options: {
      urlPrefix?: string,
      defaultHeaders?: {[key: string]: string},
    } = {
      urlPrefix: '/api/',
      defaultHeaders: {
        'Content-Type': 'application/JSON',
      },
    },
  ) {
    this.ajax = dependencies.ajax;
  }

  /**
   * Make sure that the WebSocket is connected. Throw exception otherwise.
   */
  private validateWebSocket() {
    if (this.webSocket.readyState !== 1) {
      throw Error('WebSocket is not connected!');
    }
  }

  /**
   * Connect with the webSocket api. This method also checks if the client is already connected and make sure there is
   * only one connection.
   * @return An Observable which resolves then the connection is established.
   */
  connect(): Observable<any> {
    if (this.webSocket == null || this.webSocket.readyState !== 1) {
      try {
        this.webSocket = new WebSocket(`ws://${window.location.host}` + this.options.urlPrefix);
        this.messageObservable = Observable.fromEvent(this.webSocket, 'message');
        return Observable.fromEvent(this.webSocket, 'open');
      } catch (e) {
        return Observable.throw(e);
      }
    }
    return Observable.of();
  }

  /**
   * Send data to the api via the WebSocket.
   */
  send(data: any) {
    this.validateWebSocket();
    this.webSocket.send(data);
  }

  /**
   * Returns an Observable that emits values if the WebSocket receives data.
   */
  getMessageObservable(): Observable<any> {
    this.validateWebSocket();
    return this.messageObservable;
  }

  /**
   * Builds an api url.
   * @param urlSuffix The suffix of the url. The prefix is the api url.
   * @param query An optional url query.
   * @return {string} The url.
   */
  buildUrl(urlSuffix: string, query?: HttpQuery): string {
    // Remove / at the beginning if it's exists
    if (urlSuffix.length > 0 && urlSuffix[0] === '/') {
      urlSuffix = urlSuffix.slice(1);
    }

    if (query && Object.keys(query).length > 0) {
      const l = urlSuffix.length;
      if (l > 0 && urlSuffix[l - 1] === '/') {
        urlSuffix = urlSuffix.slice(0, l - 1);
      }
      urlSuffix += '?' + Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
    }
    const url = this.options.urlPrefix + urlSuffix;
    return encodeURI(url);
  }

  /**
   * Send an ajax request to the api.
   * @param method The request method.
   * @param url The url to send the request to. The url is relative to the api url prefix.
   * @param body The object to send in the body.
   * @param query The url query.
   * @param customHeaders Custom headers.
   * @return {Observable<AjaxResponse>}
   */
  request(
    method: HttpMethod,
    url: string,
    {body, query, customHeaders}: HttpOptions = {},
  ): Observable<AjaxResponse> {
    let bodyString;
    if (body) {
      bodyString = JSON.stringify(body);
    }
    const options = {
      url: this.buildUrl(url, query),
      method,
      body: bodyString,
      headers: {
        ...this.options.defaultHeaders,
        ...customHeaders,
      },
    };
    return this.ajax(options);
  }

  /**
   * Send a GET Request to the API.
   * @param url The url to send the request to.
   * @param options The request options.
   * @return {Observable<AjaxResponse>}
   */
  get(url: string, options: HttpOptions = {}): Observable<AjaxResponse> {
    return this.request('GET', url, options);
  }

  /**
   * Send a POST Request to the API.
   * @param url The url to send the request to.
   * @param body The payload of the request.
   * @param options The request options.
   * @return {Observable<AjaxResponse>}
   */
  post(url: string, body?: any, options: HttpOptions = {}): Observable<AjaxResponse> {
    options.body = body;
    return this.request('POST', url, options);
  }

  /**
   * Send a PUT Request to the API.
   * @param url The url to send the request to.
   * @param body The payload of the request.
   * @param options The request options.
   * @return {Observable<AjaxResponse>}
   */
  put(url: string, body?: any, options: HttpOptions = {}): Observable<AjaxResponse> {
    options.body = body;
    return this.request('PUT', url, options);
  }

  /**
   * Send a PATCH Request to the API.
   * @param url The url to send the request to.
   * @param body The payload of the request.
   * @param options The request options.
   * @return {Observable<AjaxResponse>}
   */
  patch(url: string, body?: any, options: HttpOptions = {}): Observable<AjaxResponse> {
    options.body = body;
    return this.request('PATCH', url, options);
  }

  /**
   * Send a DELETE Request to the API.
   * @param url The url to send the request to.
   * @param body The payload of the request.
   * @param options The request options.
   * @return {Observable<AjaxResponse>}
   */
  delete(url: string, body?: any, options: HttpOptions = {}): Observable<AjaxResponse> {
    options.body = body;
    return this.request('DELETE', url, options);
  }

}

export const apiService = new ApiService();
