import { Component } from '@angular/core'; //importing @angular/core so it adds that to its dependency list for potential inclusion in the bundle. It opens the @angular/core file and follows its network of import statements until it has built the complete dependency graph from main.ts down.

// The AppComponent in app.component.ts imports the application-wide css with a simple import statement.
// The AppComponent itself has its own html template and css file. WebPack loads them with calls to require(). Webpack stashes those component-scoped files in the app.js bundle too. You don't see those calls in the source code; they're added behind the scenes by the angular2-template-loader plug-in.
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }