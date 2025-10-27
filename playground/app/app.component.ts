import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { ConnectionBaseExampleComponent } from './components/connection-base-example/connection-base-example.component';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [FsExampleModule, ConnectionBaseExampleComponent]
})
export class AppComponent {
  public config = environment;
}
