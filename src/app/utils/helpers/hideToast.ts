export function hideToast(toast: boolean){
  setTimeout(() => {
    toast = false;
  }, 2000)
}

export function hideToast2(updateToastState: () => void) {
  setTimeout(() => {
    updateToastState();
  }, 5000);
}
