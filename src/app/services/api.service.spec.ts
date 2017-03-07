import { ApiService, HttpQuery } from './api.service';
import { Observable } from 'rxjs';

describe('ApiService', () => {
  it('should build an url', () => {
    const prefix = '/prefix/';
    const inputUrls = [
      '/test/',
      'test/',
    ];
    const expectedUrls = [
      '/prefix/test/',
      '/prefix/test/',
    ];

    for (let i = 0; i < inputUrls.length; i++) {
      const inputUrl = inputUrls[i];
      const expectedUrl = expectedUrls[i];

      const service = new ApiService(
        undefined,
        {
          urlPrefix: prefix,
        });

      expect(service.buildUrl(inputUrl)).toBe(expectedUrl);
    }
  });

  it('should build an url with query', () => {
    const prefix = '/prefix/';
    const inputUrl = '/test/';
    const query: HttpQuery = {
      test1: 1,
      test2: 'test',
    };
    const expectedUrl = '/prefix/test?test1=1&test2=test';

    const service = new ApiService(undefined, {
      urlPrefix: prefix,
    });

    expect(service.buildUrl(inputUrl, query)).toBe(expectedUrl);
  });

  it('should send a request', (done) => {
    const expectedResponse = 'test';
    const mockAjax: any = () => {
      return Observable.of(expectedResponse);
    };

    const service = new ApiService({ajax: mockAjax});
    service.request('GET', 'test.com').subscribe((response) => {
      expect(response).toBe(expectedResponse);
      done();
    });
  });

  it('should send a GET request', (done) => {
    const expectedResponse = 'test';
    const mockAjax: any = () => {
      return Observable.of(expectedResponse);
    };

    const service = new ApiService({ajax: mockAjax});
    service.get('test.com').subscribe((response) => {
      expect(response).toBe(expectedResponse);
      done();
    });
  });

  it('should send a POST request', (done) => {
    const expectedResponse = 'test';
    const mockAjax: any = () => {
      return Observable.of(expectedResponse);
    };

    const service = new ApiService({ajax: mockAjax});
    service.post('test.com').subscribe((response) => {
      expect(response).toBe(expectedResponse);
      done();
    });
  });

  it('should send a PUT request', (done) => {
    const expectedResponse = 'test';
    const mockAjax: any = () => {
      return Observable.of(expectedResponse);
    };

    const service = new ApiService({ajax: mockAjax});
    service.put('test.com').subscribe((response) => {
      expect(response).toBe(expectedResponse);
      done();
    });
  });

  it('should send a PATCH request', (done) => {
    const expectedResponse = 'test';
    const mockAjax: any = () => {
      return Observable.of(expectedResponse);
    };

    const service = new ApiService({ajax: mockAjax});
    service.patch('test.com').subscribe((response) => {
      expect(response).toBe(expectedResponse);
      done();
    });
  });

  it('should send a DELETE request', (done) => {
    const expectedResponse = 'test';
    const mockAjax: any = () => {
      return Observable.of(expectedResponse);
    };

    const service = new ApiService({ajax: mockAjax});
    service.delete('test.com').subscribe((response) => {
      expect(response).toBe(expectedResponse);
      done();
    });
  });

});
