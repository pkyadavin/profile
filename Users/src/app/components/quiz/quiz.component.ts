import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
 

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  qns:any;
  qnProgress:any;
  seconds:any;
  constructor(public router: Router, public quizService: QuizService) {


   }

  ngOnInit() {
    console.log("ngOnInit");
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));

      this.seconds = parseInt(localStorage.getItem('seconds'));
      this.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.qns = JSON.parse(localStorage.getItem('qns'));

      console.log("seconds > 0");
      if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else
     {
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (data: any) => {
          this.quizService.qns = data;
          this.qns=data;
          console.log("data");
          console.log(data);
          this.startTimer();
        }
      );
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  Answer(qID, choice) {
    this.qns[this.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.qns));
    this.quizService.qnProgress++;
    this.qnProgress++;
    localStorage.setItem('qnProgress', this.qnProgress.toString());
    if (this.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
