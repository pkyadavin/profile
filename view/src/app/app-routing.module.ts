import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';
 
import { AuthGuard } from './guards/auth.guard';
 

import { ProfileComponent } from './components/MicroFinance/Masters/profile/profile/profile.component';
import { ProfileImportComponent } from './components/MicroFinance/Masters/profile/profile-import/profile-import.component';
import { ProfileEditComponent } from './components/MicroFinance/Masters/profile/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './components/MicroFinance/Masters/profile/profile-view/profile-view.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'photo-album', component: PhotoAlbumComponent, canActivate: [AuthGuard]},
  // MicriFinance
 


  {path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'Profile/:id', component: ProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'Profileimport', component: ProfileImportComponent, canActivate: [AuthGuard]},

  {path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'Profile/:id', component: ProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'Profileimport', component: ProfileImportComponent, canActivate: [AuthGuard]},
  {path: 'ProfileView/:id', component: ProfileViewComponent, canActivate: [AuthGuard]},


   // MicriFinance

  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
