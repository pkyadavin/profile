import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { Address } from './Address.model';
 

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  create(model: Address) : Observable<Address> {
    return this.http.post<Address>(`${environment.webApi}/Address`, model);
  }

  createall(model: any[]) : Observable<any> {
    return this.http.post<any>(`${environment.webApi}/Address/all`, model);
  }

  get(cid: number) : Observable<Address> {
    return this.http.get<any>(`${environment.webApi}/Common/Address/${cid}`);
  }

  getByApplicationUserId(applicationUserId: number) : Observable<Address[]> {
    return this.http.get<any[]>(`${environment.webApi}/Common/user/Address/${applicationUserId}`);
  }


  delete(cid: number) : Observable<number> {
    return this.http.delete<number>(`${environment.webApi}/Common/Address/${cid}`);
  }
}
