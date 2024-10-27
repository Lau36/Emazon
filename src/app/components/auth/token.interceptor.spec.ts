import { HttpHandler, HttpRequest } from '@angular/common/http';
import { getToken } from '../utils/getToken';
import { TokenInterceptor } from './token.interceptor';

jest.mock('../utils/getToken'); // Mock de la función getToken

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let mockHandler: HttpHandler;

  beforeEach(() => {
    interceptor = new TokenInterceptor();
    mockHandler = {
      handle: jest.fn(),
    };
  });

  it('should not add token for login requests', () => {
    const request = new HttpRequest('GET', '/api/login');
    (mockHandler.handle as jest.Mock).mockReturnValueOnce('test-response');

    const result = interceptor.intercept(request, mockHandler);

    expect(mockHandler.handle).toHaveBeenCalledWith(request);
    expect(result).toBe('test-response');
  });

  it('should add token to the header if token exists and URL does not contain login', () => {
    const request = new HttpRequest('GET', '/api/data');
    const token = 'test-token';
    (getToken as jest.Mock).mockReturnValue(token);

    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    interceptor.intercept(request, mockHandler);

    expect(mockHandler.handle).toHaveBeenCalledWith(clonedRequest);
  });

  it('should not add token if no token exists', () => {
    const request = new HttpRequest('GET', '/api/data');
    (getToken as jest.Mock).mockReturnValue(null);

    interceptor.intercept(request, mockHandler);

    expect(mockHandler.handle).toHaveBeenCalledWith(request); 
  });
});
