import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsConnectionModule } from '@firestitch/connection';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './material.module';
import { ConnectionBaseExampleComponent } from './components';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsConnectionModule.forRoot({
      showBanner: true,
    }),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    RouterModule,
    FsExampleModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsMessageModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ConnectionBaseExampleComponent
  ],
})
export class PlaygroundModule {
}
