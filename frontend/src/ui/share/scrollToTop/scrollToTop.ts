export const scrollToTop = () => {
  if (window.navigator.userAgent.indexOf('Edge') === -1) {
    document.querySelector('.header')!.scrollTop = 0;
  }
};
