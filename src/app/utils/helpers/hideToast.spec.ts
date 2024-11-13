import { hideToast, hideToast2 } from './hideToast';

describe('hideToast functions', () => {
  let toast: boolean;
  let updateToast: () => void;

  beforeEach(() => {
    toast = true;
    updateToast = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should set toast to false after 2 seconds for hideToast', () => {
    hideToast(toast);
    jest.advanceTimersByTime(2000);
  });

  it('should call updateToastState after 5 seconds for hideToast2', () => {
    hideToast2(updateToast);
    jest.advanceTimersByTime(5000);

    expect(updateToast).toHaveBeenCalledTimes(1);
  });
});
