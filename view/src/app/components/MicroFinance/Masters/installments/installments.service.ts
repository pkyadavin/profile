import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { Installments } from './Installments.model';
 

@Injectable({
  providedIn: 'root'
})
export class InstallmentsService {

  constructor(
    private http: HttpClient
  ) { }

  create(model: Installments) : Observable<Installments> {
    return this.http.post<Installments>(`${environment.webApi}/Collection`, model);
  }

  createall(model: any[]) : Observable<any> {
    return this.http.post<any>(`${environment.webApi}/Collection/all`, model);
  }

  get(cid: number) : Observable<Installments> {
    return this.http.get<any>(`${environment.webApi}/Common/Collection/${cid}`);
  }

  getByApplicationUserId(applicationUserId: number) : Observable<Installments[]> {
    return this.http.get<any[]>(`${environment.webApi}/Common/user/Collection/${applicationUserId}`);
  }


  delete(cid: number) : Observable<number> {
    return this.http.delete<number>(`${environment.webApi}/Common/Collection/${cid}`);
  }
}
