//
//      ooDevice: Library
//

// Helper functions
const hasLargeScreen = () => window.innerWidth >= 768;

const inLandscapeOrientation = () => window.innerHeight < window.innerWidth;

const getDeviceSizeInfo = () => {
  return {
    large: hasLargeScreen(),
    landscape: inLandscapeOrientation(),
    height: window.innerHeight,
    width: window.innerWidth,
  };
};

//  Reactive store
ooDevice = new ReactiveDict();

// Initializing defaults
ooDevice.setDefault('touch', Modernizr.touchevents);
ooDevice.setDefault( getDeviceSizeInfo() );


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
