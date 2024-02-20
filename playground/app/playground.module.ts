import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { FsConnectionModule } from '@firestitch/connection';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';

import { AppComponent } from './app.component';
import { ConnectionBaseExampleComponent } from './components';
import { AppMaterialModule } from './material.module';


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
    FsMessageModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ConnectionBaseExampleComponent
  ],
})
export class PlaygroundModule {
}
