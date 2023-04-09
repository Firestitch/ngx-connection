import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import 'offline-js';


@Injectable()
export class FsConnectionService {

  private _downSub = new Subject<any>();
  private _upSub = new Subject<any>();

  private _downHandler;
  private _upHandler;

  constructor() {
    this._setOptions();
    this._subscribe();
  }

  get isDown() {
    return Offline.state === 'down';
  }

  get isUp() {
    return Offline.state === 'up';
  }

  public get down$(): Observable<any> {
    return this._downSub.asObservable();
  }

  public get up$() {
    return this._upSub.asObservable();
  }

  private _subscribe() {
    this._downHandler = this._downEvent.bind(this);
    this._upHandler = this._upEvent.bind(this);

    Offline.on('down', this._downHandler);
    Offline.on('up', this._upHandler);
  }

  private _unsubscribe() {
    Offline.off('down', this._downHandler);
    Offline.off('up', this._upHandler);

    this._upSub.unsubscribe();
    this._downSub.unsubscribe();
  }

  private _downEvent() {
    this._downSub.next();
  }

  private _upEvent() {
    this._upSub.next();
  }

  private _setOptions() {
    Offline.options = {
      // Should we check the connection status immediatly on page load.
      checkOnLoad: false,

      // Should we monitor AJAX requests to help decide if we have a connection.
      interceptRequests: true,

      // Should we automatically retest periodically when the connection is down (set to false to disable).
      reconnect: false,

      // Should we store and attempt to remake requests which fail while the connection is down.
      requests: false,

      // Should we show a snake game while the connection is down to keep the user entertained?
      // It's not included in the normal build, you should bring in js/snake.js in addition to
      // offline.min.js.
      game: false,
    } as any; // because OfflineOptions interface has wrong description
  }

}
