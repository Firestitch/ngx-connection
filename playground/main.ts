import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { provideRouter, RouterModule } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsConnectionModule } from '@firestitch/connection';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsConnectionModule.forRoot(), FormsModule, RouterModule, FsExampleModule.forRoot(), FsMessageModule.forRoot()),
        provideRouter([]),
        provideAnimations(),
    ]
})
  .catch(err => console.error(err));

