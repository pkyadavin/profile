import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { Profile } from './profile.model';
 

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  create(model: Profile) : Observable<Profile> {
    return this.http.post<Profile>(`${environment.webApi}/Profile`, model);
  }

  createall(model: any[]) : Observable<any> {
    return this.http.post<any>(`${environment.webApi}/Profile/all`, model);
  }

  get(cid: number) : Observable<Profile> {
    return this.http.get<any>(`${environment.webApi}/Common/Profile/${cid}`);
  }

  getByApplicationUserId(applicationUserId: number) : Observable<Profile[]> {
    return this.http.get<any[]>(`${environment.webApi}/Common/user/Profile/${applicationUserId}`);
  }


  delete(cid: number) : Observable<number> {
    return this.http.delete<number>(`${environment.webApi}/Common/Profile/${cid}`);
  }
}
