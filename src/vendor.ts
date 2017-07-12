// Angular
// The vendor.ts consists of vendor dependency import statements that drive the vendor.js bundle.  The application imports these modules too; they'd be duplicated in the app.js bundle if the CommonsChunkPlugin hadn't detected the overlap and removed them from app.js.
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
 
// RxJS
import 'rxjs';
 
// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
//