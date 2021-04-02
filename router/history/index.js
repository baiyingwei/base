// import _extends from '@babel/runtime/helpers/esm/extends';

// function getConfirmation(message, callback) {
//   callback(window.confirm(message)); // eslint-disable-line no-alert
// }

// function createTransitionManager() {
//   var prompt = null;

//   function setPrompt(nextPrompt) {

//     prompt = nextPrompt;
//     return function () {
//       if (prompt === nextPrompt) prompt = null;
//     };
//   }

//   function confirmTransitionTo(location, action, getUserConfirmation, callback) {
//     callback(true);
//   }

//   var listeners = [];

//   function appendListener(listener) {
//     listeners.push(listener);
//   }

//   function notifyListeners() {
//     for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
//       args[_key] = arguments[_key];
//     }

//     listeners.forEach(function (listener) {
//       return listener.apply(void 0, args);
//     });
//   }

//   return {
//     setPrompt: setPrompt,
//     confirmTransitionTo: confirmTransitionTo,
//     appendListener: appendListener,
//     notifyListeners: notifyListeners
//   };
// }


// function createPath(location) {
//   var pathname = location.pathname,
//     search = location.search,
//     hash = location.hash;
//   var path = pathname || '/';
//   if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
//   if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
//   return path;
// }


// function createBrowserHistory(props = {}) {
//   var globalHistory = window.history;

//   var _props = props,
//     _props$forceRefresh = _props.forceRefresh,
//     forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
//     _props$getUserConfirm = _props.getUserConfirmation,
//     getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
//     _props$keyLength = _props.keyLength,
//     keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
//   var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

//   function getDOMLocation() {
//     var key = undefined,
//       state = undefined;

//     var _window$location = window.location,
//       pathname = _window$location.pathname,
//       search = _window$location.search,
//       hash = _window$location.hash;
//     var path = pathname + search + hash;
//     console.log('path', path)
//     return createLocation(path, state, key);
//   }

//   function createKey() {
//     return Math.random().toString(36).substr(2, keyLength);
//   }

//   var transitionManager = createTransitionManager();

//   function setState(nextState) {
//     _extends(history, nextState);

//     history.length = globalHistory.length;
//     listeners.forEach(function (listener) {
//       return listener.apply(void 0, v);
//     });
//     // transitionManager.notifyListeners(history.location, history.action);
//   }

//   function handlePopState(event) {
//     console.log('12333')
//     // Ignore extraneous popstate events in WebKit.
//     if (isExtraneousPopstateEvent(event)) return;
//     handlePop(getDOMLocation(event.state));
//   }

//   var forceNextPop = false;

//   function handlePop(location) {
//     console.log('forceNextPop', forceNextPop)
//     if (forceNextPop) {
//       forceNextPop = false;
//       setState();
//     } else {
//       var action = 'POP';
//       transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
//         if (ok) {
//           setState({
//             action: action,
//             location: location
//           });
//         } else {
//           revertPop(location);
//         }
//       });
//     }
//   }

//   function revertPop(fromLocation) {
//     var toLocation = history.location; // TODO: We could probably make this more reliable by
//     // keeping a list of keys we've seen in sessionStorage.
//     // Instead, we just default to 0 for keys we don't know.

//     var toIndex = allKeys.indexOf(toLocation.key);
//     if (toIndex === -1) toIndex = 0;
//     var fromIndex = allKeys.indexOf(fromLocation.key);
//     if (fromIndex === -1) fromIndex = 0;
//     var delta = toIndex - fromIndex;

//     if (delta) {
//       forceNextPop = true;
//       go(delta);
//     }
//   }

//   var initialLocation = getDOMLocation({});
//   var allKeys = [initialLocation.key]; // Public interface

//   function createHref(location) {
//     return basename + createPath(location);
//   }


//   //创建location对象
//   function createLocation(path, state, key, currentLocation) {
//     var pathname = path || '/';
//     var search = '';
//     var hash = '';
//     var hashIndex = pathname.indexOf('#');

//     if (hashIndex !== -1) {
//       hash = pathname.substr(hashIndex);
//       pathname = pathname.substr(0, hashIndex);
//     }

//     var searchIndex = pathname.indexOf('?');

//     if (searchIndex !== -1) {
//       search = pathname.substr(searchIndex);
//       pathname = pathname.substr(0, searchIndex);
//     }

//     return {
//       pathname: pathname,
//       search: search === '?' ? '' : search,
//       hash: hash === '#' ? '' : hash
//     };
//   }

//   function push(path, state) {

//     var action = 'PUSH';
//     var location = createLocation(path, state, createKey(), history.location);
//     transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
//       if (!ok) return;
//       var href = createHref(location);
//       var key = location.key,
//         state = location.state;

//       globalHistory.pushState({
//         key: key,
//         state: state
//       }, null, href);

//       if (forceRefresh) {
//         window.location.href = href;
//       } else {
//         var prevIndex = allKeys.indexOf(history.location.key);
//         var nextKeys = allKeys.slice(0, prevIndex + 1);
//         nextKeys.push(location.key);
//         allKeys = nextKeys;
//         _extends(history, {
//           action: action,
//           location: location
//         });

//         // history.length = globalHistory.length;
//         // listeners.forEach(function (listener) {
//         //   return listener.apply(void 0, v);
//         // });
//         transitionManager.notifyListeners(history.location, history.action);
//         // setState({
//         //   action: action,
//         //   location: location
//         // });
//       }
//     });
//   }

//   function replace(path, state) {

//     var action = 'REPLACE';
//     var location = createLocation(path, state, createKey(), history.location);
//     transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
//       if (!ok) return;
//       var href = createHref(location);
//       var key = location.key,
//         state = location.state;

//       globalHistory.replaceState({
//         key: key,
//         state: state
//       }, null, href);

//       if (forceRefresh) {
//         window.location.replace(href);
//       } else {
//         var prevIndex = allKeys.indexOf(history.location.key);
//         if (prevIndex !== -1) allKeys[prevIndex] = location.key;
//         setState({
//           action: action,
//           location: location
//         });
//       }
//     });
//   }

//   function go(n) {
//     globalHistory.go(n);
//   }

//   function goBack() {
//     go(-1);
//   }

//   function goForward() {
//     go(1);
//   }

//   var listenerCount = 0;

//   function checkDOMListeners(delta) {
//     listenerCount += delta;
// console.log('234')
//     if (listenerCount === 1 && delta === 1) {
//       window.addEventListener(PopStateEvent, handlePopState);
//     } else if (listenerCount === 0) {
//       window.removeEventListener(PopStateEvent, handlePopState);
//     }
//   }

//   var isBlocked = false;

//   function block(prompt) {
//     if (prompt === void 0) {
//       prompt = false;
//     }

//     var unblock = transitionManager.setPrompt(prompt);

//     if (!isBlocked) {
//       checkDOMListeners(1);
//       isBlocked = true;
//     }

//     return function () {
//       if (isBlocked) {
//         isBlocked = false;
//         checkDOMListeners(-1);
//       }

//       return unblock();
//     };
//   }

//   function listen(listener) {
//     var unlisten = transitionManager.appendListener(listener);
//     checkDOMListeners(1);
//     return function () {
//       checkDOMListeners(-1);
//       unlisten();
//     };
//   }

//   var history = {
//     length: globalHistory.length,
//     action: 'POP',
//     location: initialLocation,
//     createHref: createHref,
//     push: push,
//     replace: replace,
//     go: go,
//     goBack: goBack,
//     goForward: goForward,
//     block: block,
//     listen: listen
//   };
//   return history;
// }


// export { createBrowserHistory };

// function createBrowserHistory() {
//   // function push() {

//   // }
//   const windowLocation = window.location;
//   const pathname = windowLocation.pathname;
//   const globalHistory = window.history;
//   const listeners = [];

//   let initialLocation = {
//     pathname
//   }

//   function push(path) {
//     globalHistory.pushState({}, '', path);
//     initialLocation = {
//       pathname: path
//     }
//     listeners.forEach(function (listener) {
//       return listener(initialLocation);
//     });
//   }
//   function listen(listener) {
//     // console.log(windowLocation.pathname)
//     listeners.push(listener);
//   }

//   function go(n) {
//     globalHistory.go(n);
//   }

//   function goBack() {
//     go(-1);
//   }

//   function goForward() {
//     go(1);
//   }

//   window.onpopstate = function () {
//     initialLocation = {
//       pathname: window.location.pathname
//     }
//     listeners.forEach(function (listener) {
//       return listener(initialLocation);
//     });
//   }
//   return {
//     push: push,
//     location: initialLocation,
//     listen: listen,
//     go: go,
//     goBack: goBack,
//     goForward: goForward
//   }
// }

// export {
//   createBrowserHistory
// }

function createBrowserHistory() {
  const windowLocation = window.location;
  const globalHistory = window.history;
  let location = {
    pathname: windowLocation.pathname
  }
  const listeners = [];
  const basename = '';

  function createHref(location) {
    return basename + createPath(location);
  }

  function createPath(location) {
    var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
    var path = pathname || '/';
    if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
    if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
    return path;
  }

  function go(n) {
    globalHistory.go(n);
  }

  function push(url) {
    const newUrl = typeof url === 'string' ? url : url.pathname;
    globalHistory.pushState({}, '', newUrl);
    location = {
      ...location,
      pathname: newUrl
    }
    listeners.forEach(item => item(location));
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1)
  }
  function listen(listener) {
    listeners.push(listener);
  }

  window.onpopstate = function () {
    location = {
      ...location,
      pathname: window.location.pathname
    }
    listeners.forEach(item => item(location));
  }

  return {
    push: push,
    go: go,
    goBack: goBack,
    goForward: goForward,
    listen: listen,
    createHref: createHref,
    location: location
  }
}


export {
  createBrowserHistory,
}