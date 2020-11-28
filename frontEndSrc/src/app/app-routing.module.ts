import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/user components/dashboard/dashboard.component';
import { HomeComponent } from './components/user components/home/home.component';
import { LoginComponent } from './components/user components/login/login.component';
import { RegisterComponent } from "./components/user components/register/register.component";
import { GuestnavbarComponent } from "./components/user components/guestnavbar/guestnavbar.component";
import { BookmarkComponent } from './components/user components/Add/bookmark/bookmark.component';
import { ContentComponent } from './components/user components/Add/content/content.component';
import { AccountComponent } from './components/user components/account/account.component';
import { ViewContentComponent } from './components/user components/view-content/view-content.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  
  {path:'', component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'users/dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'users/account',component:AccountComponent, canActivate:[AuthGuard]},
  {path:'register', component:RegisterComponent},
  {path:'bookmark/add', component:BookmarkComponent, canActivate:[AuthGuard]},
  {path:'content/add', component:ContentComponent, canActivate:[AuthGuard]},
  {path:'bookmark/add/:id', component:BookmarkComponent, canActivate:[AuthGuard]},
  {path:'content/add/:id', component:ContentComponent, canActivate:[AuthGuard]},
  {path:'bookmark/get', component:BookmarkComponent, canActivate:[AuthGuard]},
  {path:'content/view/:id', component:ViewContentComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
