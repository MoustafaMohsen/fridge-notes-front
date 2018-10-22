import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>
  <app-topnav></app-topnav>
  <router-outlet></router-outlet>
  </div>
  
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
