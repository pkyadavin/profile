import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }


  getBranch(id: number) : Observable<any> {  
    return this.http.get<any[]>(`${environment.webApi}/Common/user/branch/${id}`);
  }

  getCenter(id: number) : Observable<any> {  
    return this.http.get<any[]>(`${environment.webApi}/Common/user/center/${id}`);
  }

  getCustomer(id: number) : Observable<any> {  
    return this.http.get<any[]>(`${environment.webApi}/Common/user/Customer/${id}`);
  }

  getProduct(id: number) : Observable<any> {  
    return this.http.get<any[]>(`${environment.webApi}/Common/user/product/${id}`);
  }

  getCoInsurer(id: number) : Observable<any> {  
    return this.http.get<any[]>(`${environment.webApi}/Common/user/coInsurer/${id}`);
  }

  getBank(id: number) : Observable<any> {  
    return this.http.get<any[]>(`${environment.webApi}/Common/user/bank/${id}`);
  }
  
}
