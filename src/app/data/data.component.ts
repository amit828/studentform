import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  data:any;

  constructor(private authService:AuthService,private router:Router){}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.authService.getStudent().subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }
  deleteStudentById(id:any)
  {
    this.authService.deleteStudent(id).subscribe(res =>
      {
        console.log(res);
      });
  }
  navigateToForm(id :any): void {
    // Navigate to the 'other' route
    this.router.navigate(['register/'+ id]);
  }
}
