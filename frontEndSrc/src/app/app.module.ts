import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/user components/navbar/navbar.component';
import { HomeComponent } from './components/user components/home/home.component';
import { LoginComponent } from './components/user components/login/login.component';
import { DashboardComponent } from './components/user components/dashboard/dashboard.component';
import { RegisterComponent } from './components/user components/register/register.component';
import { GuestnavbarComponent } from './components/user components/guestnavbar/guestnavbar.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule,FlashMessagesService } from 'angular2-flash-messages';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    GuestnavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule
  ],
  providers: [ValidateService,AuthService,FlashMessagesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
