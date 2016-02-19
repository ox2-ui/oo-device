//
//      ooDevice: Library
//

// Helper functions

const hasDesktopScreen = () => window.innerWidth >= 992;

const hasLargeScreen = () => window.innerWidth >= 768;

const getScreenSize = () => {
  if (hasDesktopScreen()) {
    return 'desktop';
  } else if (hasLargeScreen()) {
    return 'large';
  }
};

const inLandscapeOrientation = () => window.innerHeight < window.innerWidth;

const getDeviceSizeInfo = () => {
  return {
    screenSize: getScreenSize(),
    large: hasLargeScreen(),
    desktop: hasDesktopScreen(),
    landscape: inLandscapeOrientation(),
    height: window.innerHeight,
    width: window.innerWidth,
  };
};

//  Reactive store
ooDevice = new ReactiveDict('ooDevice');

// Initializing defaults
Meteor.startup(() => {
  ooDevice.set('touch', Modernizr.touchevents);
  ooDevice.set( getDeviceSizeInfo() );
});

// Recalculate size info on window resize
const setDeviceSizeInfo = _.debounce(() => {
  ooDevice.set( getDeviceSizeInfo() );
}, 500);

window.onresize = () => setDeviceSizeInfo();

// Set device info via cordova device plugin
const setDeviceInfo = () => {
  if (device) {
    ooDevice.set('cordova', device.cordova);

    if (device.platform === 'iOS') {
      ooDevice.set('ios', device.version);
    } else if (device.platform === 'Android') {
      ooDevice.set('android', device.version);
    }
  }
};

document.addEventListener('deviceready', setDeviceInfo, false);
