import { Component, OnInit } from '@angular/core';
 
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { QuizService } from 'src/app/services/quiz.service';
import { score }   from 'src/app/models/quiz/score.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  qnProgress:any;
  qns:any;
  correctAnswerCount:number;

  constructor(public quizService: QuizService, 
    public router: Router,
    public accountService: AccountService,
    ) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('qnProgress')) == 10) 
    {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));

      this.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.qns = JSON.parse(localStorage.getItem('qns'));
      console.log(this.qns );
      var body = this.qns.map(x => x.qnID);
      this.quizService.getAnswers(body).subscribe(
        (data: any) => {
          this.correctAnswerCount = 0;
          this.qns.forEach((e, i) => {
            if (e.answer == data[i])
              this.correctAnswerCount++;
            e.correct = data[i];
          });
        }
      );
    }
    else
      this.router.navigate(['/quiz']);
  }


  OnSubmit() {

    var body = new score(
      this.accountService.currentUserValue.username,
      this.correctAnswerCount,
      this.quizService.displayTimeElapsed()
      );  

    this.quizService.submitScore(body).subscribe(() => {
      this.restart();
    });
  }

  restart() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/quiz']);
  }

}
