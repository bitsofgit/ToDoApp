import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

//import { bootstrap }    from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';

//import { AppComponent } from './app.component';

//bootstrap(AppComponent);

platformBrowserDynamic().bootstrapModule(AppModule);
