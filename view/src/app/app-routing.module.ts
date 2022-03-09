import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';
 
import { AuthGuard } from './guards/auth.guard';
 
import { InstallmentsComponent } from './components/MicroFinance/Masters/installments/installments/installments.component';
import { InstallmentsEditComponent } from './components/MicroFinance/Masters/installments/installments-edit/installments-edit.component';
import { InstallmentsImportComponent } from './components/MicroFinance/Masters/installments/installments-import/installments-import.component';
import { DisbursementComponent } from './components/MicroFinance/Masters/Disbursement/Disbursement/Disbursement.component';
import { DisbursementEditComponent } from './components/MicroFinance/Masters/Disbursement/Disbursement-edit/Disbursement-edit.component';
import { DisbursementImportComponent } from './components/MicroFinance/Masters/Disbursement/Disbursement-import/Disbursement-import.component';

import { dueComponent } from './components/MicroFinance/Masters/due/due/due.component';
import { AddressComponent } from './components/MicroFinance/Masters/address/address/address.component';
import { AddressImportComponent } from './components/MicroFinance/Masters/address/address-import/address-import.component';
import { AddressEditComponent } from './components/MicroFinance/Masters/address/address-edit/address-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'photo-album', component: PhotoAlbumComponent, canActivate: [AuthGuard]},
  // MicriFinance
 

  {path: 'Installments', component: InstallmentsComponent, canActivate: [AuthGuard]},
  {path: 'Installments/:id', component: InstallmentsEditComponent, canActivate: [AuthGuard]},
  {path: 'Installmentsimport', component: InstallmentsImportComponent, canActivate: [AuthGuard]},

  
  {path: 'Disbursement', component: DisbursementComponent, canActivate: [AuthGuard]},
  {path: 'Disbursement/:id', component: DisbursementEditComponent, canActivate: [AuthGuard]},
  {path: 'Disbursementimport', component: DisbursementImportComponent, canActivate: [AuthGuard]},

  {path: 'address', component: AddressComponent, canActivate: [AuthGuard]},
  {path: 'address/:id', component: AddressEditComponent, canActivate: [AuthGuard]},
  {path: 'addressimport', component: AddressImportComponent, canActivate: [AuthGuard]},

  {path: 'Address', component: AddressComponent, canActivate: [AuthGuard]},
  {path: 'Address/:id', component: AddressEditComponent, canActivate: [AuthGuard]},
  {path: 'Addressimport', component: AddressImportComponent, canActivate: [AuthGuard]},

  {path: 'due', component: dueComponent, canActivate: [AuthGuard]},

   // MicriFinance

  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
