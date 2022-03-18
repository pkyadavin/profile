import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Photo } from 'src/app/models/photo/photo.model';  
import { AccountService } from 'src/app/services/account.service';
import { DatePipe } from '@angular/common'; 
import { ProfileService } from '../profile.service'; 
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-Profile-view',
  templateUrl: './Profile-view.component.html',
  styleUrls: ['./Profile-view.component.css'],
  providers: [DatePipe]
})
export class ProfileViewComponent  implements OnInit , AfterViewInit{
  showloader=false;
  dataForm: FormGroup;
  confirmImageDelete: boolean = false;
  userPhotos: Photo[] = [];
  id=0;
  img='';
  centerlist=[];
  branchlist=[];
  customerlist=[];
  productlist=[];
  @ViewChild('dob') dobElementRef:ElementRef;
  constructor(
    private route: ActivatedRoute, 
    private ProfileService: ProfileService, 
    public accountService: AccountService,   
  ) { }

  profile;
  ngOnInit(): void {
 
     this.id = parseInt(this.route.snapshot.paramMap.get('id'));
     let adhar="";
     if(this.id!=-1 ){
       adhar=this.id.toString();
     }

    if (!!this.id  && this.id  !== -1) {
      this.showloader=true;
      this.ProfileService.get(this.id ).subscribe(data => {
        console.log(JSON.stringify(data)  );
        this.profile=JSON.parse(data.Profile) ;
        this.showloader=false;
        this.showgrid=true;
      });
    }
  }
 
  ngAfterViewInit() {
    console.log('Parent After View Init'); 
 
  } 

  onSubmit() {    
    
  }
  showgrid=false
  Show(){
    this.showgrid=!this.showgrid;
  }
}
