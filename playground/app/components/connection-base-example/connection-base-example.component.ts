import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FsConnectionService } from '@firestitch/connection';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatAnchor } from '@angular/material/button';

@Component({
    selector: 'connection-base-example',
    templateUrl: 'connection-base-example.component.html',
    standalone: true,
    imports: [MatAnchor]
})
export class ConnectionBaseExampleComponent implements OnInit, OnDestroy {
  private _connection = inject(FsConnectionService);


  public showBanner = true;

  private _destroy$ = new Subject();

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
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public toggleBanner() {
    this.showBanner = !this.showBanner;
    this._connection.showBanner = this.showBanner;
  }
}
