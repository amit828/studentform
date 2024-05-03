import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Studentform';

  constructor(private router:Router){}

  // gotoList() {
  //   this.router.navigateByUrl('/data');
  // }
}
