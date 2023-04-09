import { NgModule, ModuleWithProviders } from '@angular/core';

import { FsConnectionService } from './services/connection.service';
import { FsConnectionConfig } from './interfaces';
import { FS_CONNECTION_CONFIG } from './injectors';


@NgModule({
  providers: [
    FsConnectionService,
  ]
})
export class FsConnectionModule {
  static forRoot(config?: FsConnectionConfig): ModuleWithProviders<FsConnectionModule> {
    return {
      ngModule: FsConnectionModule,
      providers: [ 
        FsConnectionService,
        { provide: FS_CONNECTION_CONFIG, useValue: config || {} },
      ]
    };
  }
}
