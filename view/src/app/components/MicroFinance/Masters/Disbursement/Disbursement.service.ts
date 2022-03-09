import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { Disbursement } from './Disbursement.model';
 

@Injectable({
  providedIn: 'root'
})
export class DisbursementService {

  constructor(
    private http: HttpClient
  ) { }

  create(model: Disbursement) : Observable<Disbursement> {
    return this.http.post<Disbursement>(`${environment.webApi}/Disbursement`, model);
  }

  createall(model: any[]) : Observable<any> {
    return this.http.post<any>(`${environment.webApi}/Disbursement/all`, model);
  }

  get(cid: number) : Observable<Disbursement> {
    return this.http.get<any>(`${environment.webApi}/Common/Disbursement/${cid}`);
  }

  getByApplicationUserId(applicationUserId: number) : Observable<Disbursement[]> {
    return this.http.get<any[]>(`${environment.webApi}/Common/user/Disbursement/${applicationUserId}`);
  }


  delete(cid: number) : Observable<number> {
    return this.http.delete<number>(`${environment.webApi}/Common/Disbursement/${cid}`);
  }
}
