import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { TapperGameAppComponent, environment, } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(TapperGameAppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://tapper.firebaseio.com')
]);
