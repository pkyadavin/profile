import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { due } from './due.model';
 

@Injectable({
  providedIn: 'root'
})
export class dueService {

  constructor(
    private http: HttpClient
  ) { }

  create(model: due) : Observable<due> {
    return this.http.post<due>(`${environment.webApi}/vwdue`, model);
  }

  createall(model: any[]) : Observable<any> {
    return this.http.post<any>(`${environment.webApi}/vwdue/all`, model);
  }

  get(cid: number) : Observable<due> {
    return this.http.get<any>(`${environment.webApi}/Common/vwdue/${cid}`);
  }

  getByApplicationUserId(applicationUserId: number) : Observable<due[]> {
    return this.http.get<any[]>(`${environment.webApi}/Common/user/vwdue/${applicationUserId}`);
  }


  delete(cid: number) : Observable<number> {
    return this.http.delete<number>(`${environment.webApi}/Common/vwdue/${cid}`);
  }
}
