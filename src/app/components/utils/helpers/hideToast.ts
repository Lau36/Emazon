export function hideToast(toast: boolean){
  setTimeout(() => {
    toast = false;
  }, 2000)
}
