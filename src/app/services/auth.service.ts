import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  url="http://localhost:3000/api/users";

  registerStudent(data:any) :Observable<any>
  {
    // debugger;
    return this.http.post(this.url ,data);
  }

  getStudent()
  {
    return this.http.get(this.url+"/findAll");
  }

  deleteStudent(id:any)
  {
    const url = `${this.url+"/delete"}/${id}`;
    return this.http.delete(url);
  }

  getStudentById(id:any)
  {
    // debugger;
    const url = `${this.url+"/find"}/${id}`;
    return this.http.get(url);
  }

  updateStudent(id:any,data:any)
  {
    const url = `${this.url+"/update"}/${id}`;
    return this.http.put<any>(url,data);
  }
}
