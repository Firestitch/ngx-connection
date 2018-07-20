import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsConnectionService } from '../../../../src/services/fs-connection.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'connection-base-example',
  templateUrl: 'connection-base-example.component.html'
})
export class ConnectionBaseExampleComponent implements OnInit, OnDestroy {

  private _upSubscription: Subscription;
  private _downSubscription: Subscription;

  constructor(private _connection: FsConnectionService) {

  }

  public ngOnInit() {
    this._upSubscription = this._connection.up().subscribe(() => {
      console.log('subscribe in example up');
    });

    this._downSubscription = this._connection.down().subscribe(() => {
      console.log('subscribe in example down');
    });
  }

  public ngOnDestroy() {
    this._upSubscription.unsubscribe();
    this._downSubscription.unsubscribe();
  }
}
