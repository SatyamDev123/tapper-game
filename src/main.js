"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./app/');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.TapperGameAppComponent);
// bootstrap(TapperGameAppComponent, [
//   FIREBASE_PROVIDERS,
//   defaultFirebase('https://skrsps.firebaseio.com')
//   // ROUTER_PROVIDERS
// ]);
//# sourceMappingURL=main.js.map