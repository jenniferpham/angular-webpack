import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') { //Thanks to the DefinePlugin and the ENV variable defined at top, you can enable Angular production mode like this:
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);