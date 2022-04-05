import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SummaryPipe } from './pipes/summary.pipe';

 
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
 

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

import { AgGridModule } from 'ag-grid-angular';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { marritalStatusFloatingFilter } from './gridcomponents/MarritalStatus';
 

import { ProfileComponent } from './components/MicroFinance/Masters/profile/profile/profile.component';
import { ProfileEditComponent } from './components/MicroFinance/Masters/profile/profile-edit/profile-edit.component';
import { ProfileImportComponent } from './components/MicroFinance/Masters/profile/profile-import/profile-import.component';
import { ProfileViewComponent } from './components/MicroFinance/Masters/profile/profile-view/profile-view.component';
import { UploadComponent } from './components/upload/upload.component';
 

@NgModule({
  declarations: [
    AppComponent,
    SummaryPipe,
 
    LoginComponent,
    NavbarComponent,
    NotFoundComponent, 
    NumbersOnlyDirective,
    marritalStatusFloatingFilter, 
    ProfileViewComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProfileImportComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,  
    AgGridModule.withComponents( [marritalStatusFloatingFilter]),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    AgGridModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TypeaheadModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
