import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  //---------------- Properties---------------
 // readonly rootUrl = 'http://localhost:2690';
  readonly rootUrl = environment.webApi.replace("/api","");
 

  public qns: any[];
  public seconds: number;
  public timer;
  public qnProgress: number;
  public correctAnswerCount: number = 0;

  //---------------- Helper Methods---------------
  constructor(private http: HttpClient) { }
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.Name;
  }


  //---------------- Http Methods---------------

  insertParticipant(name: string, email: string) {
    var body = {
      Name: name,
      Email: email
    }
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }

  getQuestions() {
    return this.http.get(this.rootUrl + '/api/quiz/Questions');
  }

  getAnswers(body) {    
    return this.http.post(this.rootUrl + '/api/quiz/Answers', body);
  }

  submitScore(body) {

    return this.http.post(this.rootUrl + "/api/quiz/UpdateOutput", body);
  }

}
