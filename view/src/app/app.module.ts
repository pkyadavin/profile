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

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

import { AgGridModule } from 'ag-grid-angular';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { marritalStatusFloatingFilter } from './gridcomponents/MarritalStatus';
 
 
import { InstallmentsComponent } from './components/MicroFinance/Masters/installments/installments/installments.component';
import { InstallmentsEditComponent } from './components/MicroFinance/Masters/installments/installments-edit/installments-edit.component';
import { InstallmentsImportComponent } from './components/MicroFinance/Masters/installments/installments-import/installments-import.component';

import { DisbursementComponent } from './components/MicroFinance/Masters/Disbursement/Disbursement/Disbursement.component';
import { DisbursementEditComponent } from './components/MicroFinance/Masters/Disbursement/Disbursement-edit/Disbursement-edit.component';
import { DisbursementImportComponent } from './components/MicroFinance/Masters/Disbursement/Disbursement-import/Disbursement-import.component';

import { dueComponent } from './components/MicroFinance/Masters/due/due/due.component';
import { AddressComponent } from './components/MicroFinance/Masters/address/address/address.component';
import { AddressEditComponent } from './components/MicroFinance/Masters/address/address-edit/address-edit.component';
import { AddressImportComponent } from './components/MicroFinance/Masters/address/address-import/address-import.component';
@NgModule({
  declarations: [
    AppComponent,
    SummaryPipe,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NotFoundComponent,
    PhotoAlbumComponent,
    NumbersOnlyDirective,
    marritalStatusFloatingFilter, 
    InstallmentsComponent,
    InstallmentsEditComponent,
    InstallmentsImportComponent, 
    DisbursementComponent,
    DisbursementEditComponent,
    DisbursementImportComponent, 
    dueComponent,
    AddressComponent,
    AddressEditComponent,
    AddressImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,  
    AgGridModule.withComponents([marritalStatusFloatingFilter]),
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
