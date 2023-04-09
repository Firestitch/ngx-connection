import { NgModule, ModuleWithProviders } from '@angular/core';

import { FsConnectionService } from './services/connection.service';


@NgModule({
  providers: [
    FsConnectionService,
  ]
})
export class FsConnectionModule {
  static forRoot(): ModuleWithProviders<FsConnectionModule> {
    return {
      ngModule: FsConnectionModule,
      providers: [ FsConnectionService ]
    };
  }
}
