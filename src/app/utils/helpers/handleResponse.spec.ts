import { handleResponse, responseContext } from './handleResponse';

describe('handleResponse', () => {
  let context: responseContext;

  beforeEach(() => {
    context = {
      isLoading: true,
      showToast: false,
      mistakeOcurred: false,
      message: ''
    };
  });

  it('should update context correctly for a successful response', () => {
    const message = 'Operation successful';
    const isSuccess = true;

    handleResponse(context, message, isSuccess);

    expect(context.isLoading).toBe(false);
    expect(context.showToast).toBe(true);
    expect(context.mistakeOcurred).toBe(false);
    expect(context.message).toBe(message);
  });

  it('should update context correctly for a failed response', () => {
    const message = 'Operation failed';
    const isSuccess = false;

    handleResponse(context, message, isSuccess);

    expect(context.isLoading).toBe(false);
    expect(context.showToast).toBe(true);
    expect(context.mistakeOcurred).toBe(true);
    expect(context.message).toBe(message);
  });
});
