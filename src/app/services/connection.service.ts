import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import 'offline-js';
import { takeUntil } from 'rxjs/operators';
import { FS_CONNECTION_CONFIG } from '../injectors';
import { FsConnectionConfig } from '../interfaces';


@Injectable()
export class FsConnectionService implements OnDestroy {

  private _downSub = new Subject<any>();
  private _upSub = new Subject<any>();
  private _destroy$ = new Subject();

  private _downHandler: () => void;
  private _upHandler: () => void;

  constructor(
    @Optional() @Inject(FS_CONNECTION_CONFIG) private _config: FsConnectionConfig,
  ) {
    this._setOptions();
    this._subscribe();
    this.showBanner = _config.showBanner ?? true;
  }

  public get isDown() {
    return Offline.state === 'down';
  }

  public get isUp() {
    return Offline.state === 'up';
  }

  public get down$(): Observable<any> {
    return this._downSub.asObservable()
      .pipe(
        takeUntil(this._destroy$),
      );
  }

  public get up$() {
    return this._upSub.asObservable()
      .pipe(
        takeUntil(this._destroy$),
      );
  }

  public set showBanner(value: boolean) {
    if(value) {
      document.getElementById('fs-offline')?.remove();
    } else {
      const el = document.createElement('style');
      el.setAttribute('id', 'fs-offline');
      el.appendChild(document
        .createTextNode(`
          .offline-ui.offline-ui-up { display: none !important }
          .offline-ui.offline-ui-down { display: none !important }
        `));
      
      document.getElementsByTagName("head")[0].appendChild(el);
    }
  }
  
  public ngOnDestroy(): void {
    Offline.off('down', this._downHandler);
    Offline.off('up', this._upHandler);

    this._destroy$.next();
    this._destroy$.complete();
  }

  private _subscribe() {
    this._downHandler = () => {
      this._downSub.next();
    };

    this._upHandler = () => {
      this._upSub.next();
    };

    Offline.on('down', this._downHandler);
    Offline.on('up', this._upHandler);
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
