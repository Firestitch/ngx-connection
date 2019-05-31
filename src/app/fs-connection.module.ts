import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsConnectionService } from './services/connection.service';


@NgModule({
  imports: [
    CommonModule,
  ]
})
export class FsConnectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsConnectionModule,
      providers: [ FsConnectionService ]
    };
  }
}
