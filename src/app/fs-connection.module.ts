import { ModuleWithProviders, NgModule } from '@angular/core';

import { FS_CONNECTION_CONFIG } from './injectors';
import { FsConnectionConfig } from './interfaces';
import { FsConnectionService } from './services/connection.service';


@NgModule({
  providers: [
    FsConnectionService,
  ],
})
export class FsConnectionModule {
  
  constructor(
    public _service: FsConnectionService,
  ) {
    this._service.init();
  }

  public static forRoot(config?: FsConnectionConfig): ModuleWithProviders<FsConnectionModule> {
    return {
      ngModule: FsConnectionModule,
      providers: [ 
        FsConnectionService,
        { provide: FS_CONNECTION_CONFIG, useValue: config || {} },
      ],
    };
  }


}
