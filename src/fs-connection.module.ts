import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsConnectionService } from './services/';

import './styles.scss';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  entryComponents: [
  ],
  declarations: [
  ],
  providers: [
  ],
})
export class FsConnectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsConnectionModule,
      providers: [ FsConnectionService ]
    };
  }
}
