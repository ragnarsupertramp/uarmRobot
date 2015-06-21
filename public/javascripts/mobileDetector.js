var mobileDetector = (function () {

  function checkForAndroid() {
    return navigator.userAgent.match(/Android/i);
  }

  function checkForBlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  }

  function checkForiOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  }

  function checkForOpera() {
    return navigator.userAgent.match(/Opera Mini/i);
  }

  function checkForWindows() {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  }

  function checkForAnyMobileDevice() {
    return (checkForAndroid() || checkForBlackBerry() || checkForiOS() || checkForOpera() || checkForWindows());
  }

  return {
    android: checkForAndroid,
    blackberry: checkForBlackBerry,
    ios: checkForiOS,
    opera: checkForOpera,
    windows: checkForWindows,
    any: checkForAnyMobileDevice
  };

})();