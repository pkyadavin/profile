import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionCreate } from '../models/question/question-create.model';
import { QuestionPaging } from '../models/question/question-paging.model';
import { Question } from '../models/question/question.model';
import { PagedResult } from '../models/question/paged-result.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  create(model: QuestionCreate) : Observable<Question> {
    return this.http.post<Question>(`${environment.webApi}/Question`, model);
  }

  getAll(questionPaging: QuestionPaging) : Observable<PagedResult<Question>> {
    return this.http.get<PagedResult<Question>>(
      `${environment.webApi}/Question?Page=${questionPaging.page}&PageSize=${questionPaging.pageSize}`);
  }

  get(questionId: number) : Observable<Question> {
    return this.http.get<Question>(`${environment.webApi}/Question/${questionId}`);
  }

  getByApplicationUserId(applicationUserId: number) : Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.webApi}/Question/user/${applicationUserId}`);
  }

  getMostFamous() : Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.webApi}/Question/famous`);
  }

  delete(questionId: number) : Observable<number> {
    return this.http.delete<number>(`${environment.webApi}/Question/${questionId}`);
  }
}
