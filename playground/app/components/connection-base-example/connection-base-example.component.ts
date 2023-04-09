import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsConnectionService } from '@firestitch/connection';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'connection-base-example',
  templateUrl: 'connection-base-example.component.html'
})
export class ConnectionBaseExampleComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject();

  constructor(
    private _connection: FsConnectionService
    ) {}

  public ngOnInit() {
    this._connection.up$
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(() => {
      console.log('Connection Up');
    });

    this._connection.down$
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(() => {
      console.log('Connection Down');
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
