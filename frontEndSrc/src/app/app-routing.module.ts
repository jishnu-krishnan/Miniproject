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
import { RequestsComponent } from './components/admin components/requests/requests.component';
import { AdminViewComponent } from './components/admin components/admin-view/admin-view.component';
import { DiscoverPageComponent } from './components/user components/discover-page/discover-page.component';
import { AdminDashboardComponent } from './components/admin components/admin-dashboard/admin-dashboard.component';
import { AdminContentComponent } from './components/admin components/admin-content/admin-content.component';
import { AdminBookmarkComponent } from './components/admin components/admin-bookmark/admin-bookmark.component';
import { ViewMoreComponent } from './components/admin components/view-more/view-more.component';
import { UserContentComponent } from './components/user components/user-content/user-content.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  
  {path:'', component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'users/dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'users/account',component:AccountComponent, canActivate:[AuthGuard]},
  {path:'users/discover',component:DiscoverPageComponent, canActivate:[AuthGuard]}, 
  {path:'register', component:RegisterComponent},
  {path:'bookmark/add', component:BookmarkComponent, canActivate:[AuthGuard]},
  {path:'content/add', component:ContentComponent, canActivate:[AuthGuard]},
  {path:'bookmark/add/:id', component:BookmarkComponent, canActivate:[AuthGuard]},
  {path:'content/add/:id', component:ContentComponent, canActivate:[AuthGuard]},
  {path:'bookmark/get', component:BookmarkComponent, canActivate:[AuthGuard]},
  {path:'content/view/:id', component:ViewContentComponent, canActivate:[AuthGuard]},
  {path:'admin/request', component:RequestsComponent, canActivate:[AuthGuard]},
  {path:'admin/view/:id', component:AdminViewComponent, canActivate:[AuthGuard]},
  {path:'admin/dashboard', component:AdminDashboardComponent, canActivate:[AuthGuard]},
  {path:'admin/content', component:AdminContentComponent, canActivate:[AuthGuard]},
  {path:'admin/bookmark', component:AdminBookmarkComponent, canActivate:[AuthGuard]},
  {path:'admin/viewcontent/:id', component:ViewMoreComponent, canActivate:[AuthGuard]},
  {path:'users/bookmark/:id', component:UserContentComponent, canActivate:[AuthGuard]},
  //{path:'users/bookmark', component:UserContentComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
