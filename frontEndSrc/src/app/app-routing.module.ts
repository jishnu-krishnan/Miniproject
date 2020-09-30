import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/user components/dashboard/dashboard.component';
import { HomeComponent } from './components/user components/home/home.component';
import { LoginComponent } from './components/user components/login/login.component';
import { RegisterComponent } from "./components/user components/register/register.component";
import { GuestnavbarComponent } from "./components/user components/guestnavbar/guestnavbar.component";
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'register', component:RegisterComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
