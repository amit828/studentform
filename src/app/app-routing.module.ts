import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  {path:'',component:RegisterComponent},
  {path:'data',component:DataComponent},
  {path:'register/:id',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
