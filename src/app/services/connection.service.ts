import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';

import { filter, takeUntil } from 'rxjs/operators';
import { FS_CONNECTION_CONFIG } from '../injectors';
import { FsConnectionConfig } from '../interfaces';


@Injectable({
  providedIn: 'root',
})
export class FsConnectionService implements OnDestroy {

  private _connection$ = new Subject<boolean>();
  private _destroy$ = new Subject();

  private _downHandler: () => void;
  private _upHandler: () => void;

  constructor(
    @Optional() @Inject(FS_CONNECTION_CONFIG) private _config: FsConnectionConfig,
  ) {}

  public get isDown() {
    return !navigator.onLine;
  }

  public get isUp() {
    return navigator.onLine;
  }

  public get down$(): Observable<any> {
    return this._connection$.asObservable()
      .pipe(
        filter((value) => !value),
        takeUntil(this._destroy$),
      );
  }

  public get up$() {
    return this._connection$.asObservable()
      .pipe(
        filter((value) => value),
        takeUntil(this._destroy$),
      );
  }

  public set showBanner(value: boolean) {
    let offline = document.getElementById('fs-offline');

    if(value) {
      if(offline) {
        offline.textContent = 'Internet connection restored';
        offline.classList.remove('fs-offline-down');
        offline.classList.add('fs-offline-up');
        setTimeout(() => {
          offline.remove();
        }, 4000);
      }
    } else {
      if(!offline) {
        offline = document.createElement('div');
        offline.setAttribute('id', 'fs-offline');
        offline.classList.add('fs-offline-down');
        offline.textContent = 'No iternet connection';
      
        document.getElementsByTagName('body')[0].append(offline);
      }
    }
  }
  
  public ngOnDestroy(): void {
    window.removeEventListener('online', this._upHandler);
    window.removeEventListener('offline', this._downHandler);

    this._destroy$.next();
    this._destroy$.complete();
  }

  public init() {
    this._connection$
    .pipe(
      filter(() => this._config.showBanner),
      takeUntil(this._destroy$),
    )
    .subscribe((value) => {
      this.showBanner = value;
    });

    this._downHandler = () => {
      this._connection$.next(false);
    };

    this._upHandler = () => {
      this._connection$.next(true);
    };

    window.addEventListener('online', this._upHandler);
    window.addEventListener('offline', this._downHandler);

    timer(0, 10000)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._connection$.next(this.isUp);
      });
  }

}
