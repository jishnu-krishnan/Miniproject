import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule  } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
import { BookmarkComponent } from './components/user components/Add/bookmark/bookmark.component';
import { ContentComponent } from './components/user components/Add/content/content.component';
import { PlusButtonComponent } from './components/user components/plus-button/plus-button.component';
import { PlusComponent } from './components/admin components/plus/plus.component';
import { AccountComponent } from './components/user components/account/account.component';
//import { CategoryComponent } from './components/admin components/category/category.component';
import { RequestsComponent } from './components/admin components/requests/requests.component';
import { ViewContentComponent } from './components/user components/view-content/view-content.component';
import { AdminViewComponent } from './components/admin components/admin-view/admin-view.component';
import { DiscoverPageComponent } from './components/user components/discover-page/discover-page.component';
import { AdminDashboardComponent } from './components/admin components/admin-dashboard/admin-dashboard.component';
import { AdminBookmarkComponent } from './components/admin components/admin-bookmark/admin-bookmark.component';
import { AdminContentComponent } from './components/admin components/admin-content/admin-content.component';
import { ReasonComponent } from './components/admin components/reason/reason.component';
import { MyDialogComponent } from './components/admin components/my-dialog/my-dialog.component';
import { ViewMoreComponent } from './components/admin components/view-more/view-more.component';
import { UserContentComponent } from './components/user components/user-content/user-content.component';
import { UserViewComponent } from './components/user components/user-view/user-view.component';
import { TermsandconditionsComponent } from './components/user components/termsandconditions/termsandconditions.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    GuestnavbarComponent,
    BookmarkComponent,
    ContentComponent,
    PlusButtonComponent,
    PlusComponent,
    AccountComponent,
    //CategoryComponent,
    RequestsComponent,
    ViewContentComponent,
    AdminViewComponent,
    DiscoverPageComponent,
    AdminDashboardComponent,
    AdminBookmarkComponent,
    AdminContentComponent,
    ReasonComponent,
    MyDialogComponent,
    ViewMoreComponent,
    UserContentComponent,
    UserViewComponent,
    TermsandconditionsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule
  ],
  entryComponents:[
    MyDialogComponent
  ],
  providers: [ValidateService,AuthService,FlashMessagesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }