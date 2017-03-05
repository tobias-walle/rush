import { ApiService, HttpQuery, HttpMethod } from './api.service';

describe('ApiService', () => {
  it('should build an url', () => {
    let prefix = '/prefix/';
    let inputUrls = [
      '/test/',
      'test/'
    ];
    let expectedUrls = [
      '/prefix/test/',
      '/prefix/test/'
    ];

    for (let i = 0; i < inputUrls.length; i++) {
      let inputUrl = inputUrls[i];
      let expectedUrl = expectedUrls[i];

      let service = new ApiService(
        undefined,
        {
          urlPrefix: prefix
        });

      expect(service.buildUrl(inputUrl)).toBe(expectedUrl);
    }
  });

  it('should build an url with query', () => {
    let prefix = '/prefix/';
    let inputUrl = '/test/';
    let query: HttpQuery = {
      test1: 1,
      test2: 'test',
    };
    let expectedUrl = '/prefix/test?test1=1&test2=test';

    let service = new ApiService(undefined, {
      urlPrefix: prefix
    });

    expect(service.buildUrl(inputUrl, query)).toBe(expectedUrl);
  });

  it('should send a request', (done) => {
    let mockAjax: any = (o) => {
      expect(o).toBeDefined();
      done();
    };

    let service = new ApiService({ajax: mockAjax});
    service.request('GET', 'test');
  });

  it('should send a GET request', (done) => {
    let mockAjax: any = (o) => {
      expect(o).toBeDefined();
      done();
    };

    let service = new ApiService({ajax: mockAjax});
    service.get('test');
  });

  it('should send a POST request', (done) => {
    let mockAjax: any = (o) => {
      expect(o).toBeDefined();
      done();
    };

    let service = new ApiService({ajax: mockAjax});
    service.post('test');
  });

  it('should send a PUT request', (done) => {
    let mockAjax: any = (o) => {
      expect(o).toBeDefined();
      done();
    };

    let service = new ApiService({ajax: mockAjax});
    service.put('test');
  });

  it('should send a PATCH request', (done) => {
    let mockAjax: any = (o) => {
      expect(o).toBeDefined();
      done();
    };

    let service = new ApiService({ajax: mockAjax});
    service.patch('test');
  });

  it('should send a DELETE request', (done) => {
    let mockAjax: any = (o) => {
      expect(o).toBeDefined();
      done();
    };

    let service = new ApiService({ajax: mockAjax});
    service.delete('test');
  });


});