import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question/question.model'; 
import { AccountService } from 'src/app/services/account.service';
import { AdminService } from 'src/app/services/admin.service';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userQuestions: Question[];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.userQuestions = [];

    let currentApplicationUserId = this.accountService.currentUserValue.applicationUserId;

    this.adminService.getByApplicationUserId(currentApplicationUserId).subscribe(userQuestions => {
      this.userQuestions = userQuestions;
    });
  }

  confirmDelete(question: Question) {
    question.deleteConfirm = true;
  }

  cancelDeleteConfirm(question: Question) {
    question.deleteConfirm = false;
  }

  deleteConfirmed(question: Question, questions: Question[]) {
    this.adminService.delete(question.qnId).subscribe(() => {

      let index = 0;

      for (let i=0; i<questions.length; i++) {
        if (questions[i].qnId === question.qnId) {
          index = i;
        }
      }

      if (index > -1) {
        questions.splice(index, 1);
      }

      this.toastr.info("Question deleted.");
    });
  }

  editQuestion(qnId: number) {
    this.router.navigate([`/dashboard/${qnId}`]);
  }

  createQuestion() {
    this.router.navigate(['/dashboard/-1']);
  }
}
