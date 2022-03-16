import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr'; 
import { Photo } from 'src/app/models/photo/photo.model'; 
import { PhotoService } from 'src/app/services/photo.service';
import { AccountService } from 'src/app/services/account.service';
import { DatePipe } from '@angular/common';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-Profile-edit',
  templateUrl: './Profile-edit.component.html',
  styleUrls: ['./Profile-edit.component.css'],
  providers: [DatePipe]
})
export class ProfileEditComponent  implements OnInit , AfterViewInit{
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
    private formBuilder: FormBuilder,
    private ProfileService: ProfileService,
    private photoService: PhotoService,
    private toastr: ToastrService,
    public accountService: AccountService,
    private datePipe:DatePipe,
    private router: Router,
    private dataService:DataService,
  ) { }

  ngOnInit(): void {

     this.id = parseInt(this.route.snapshot.paramMap.get('id'));
     let adhar="";
     if(this.id!=-1 ){
       adhar=this.id.toString();
     }
    this.dataForm = this.formBuilder.group({
      id: [-1],      
      Adhar	: [adhar, [Validators.required,Validators.minLength(12),Validators.maxLength(12) ]],     
      Profile	: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(2000) ]], 

    });

    // this.photoService.getByApplicationUserId().subscribe(userPhotos => {
    //   this.userPhotos = userPhotos;     
    // }); 
    // this.dataService.getBranch(this.accountService.currentUserValue.applicationUserId).subscribe(res => {
    //   this.branchlist= res;        
    // }); 
    // this.dataService.getProduct(this.accountService.currentUserValue.applicationUserId).subscribe(res => {
    //   this.productlist= res;             
    // });
    // this.dataService.getCenter(this.accountService.currentUserValue.applicationUserId).subscribe(res => {
    //   this.centerlist= res;              
    // }); 
    // if (!!this.id  && this.id  !== -1) {
    //   this.showloader=true;
    //   this.ProfileService.get(this.id ).subscribe(data => {
    //     console.log(JSON.stringify(data)  );
    //     this.updateForm(data);
    //     this.showloader=false;
    //   });
    // }
  }
 
  ngAfterViewInit() {
    console.log('Parent After View Init'); 
  }
dob;
  updateForm(Profile: Profile) {

    this.dataForm.patchValue({
      id: Profile.id,    
      Adhar: Profile.Adhar, 
      Profile: Profile.Profile,      
 
    });  
    console.log(this.dataForm);
  }

  isTouched(field: string) {
    return this.dataForm.get(field).touched;
  }

  hasErrors(field: string) {
    return this.dataForm.get(field).errors;
  }

  hasError(field: string, error: string) {
    return !!this.dataForm.get(field).hasError(error);
  }

  isNew() {
    return parseInt(this.dataForm.get('id').value) === -1;
  }

  detachPhoto() {
    this.dataForm.patchValue({
      photoId: null,
      photoDescription: null
    });
  }



  onSelect(event: TypeaheadMatch): void {
    let chosenPhoto: Photo = event.item;

    this.dataForm.patchValue({
      photoId: chosenPhoto.photoId,
      photoDescription: chosenPhoto.description
    });
  }

  onSubmit() {    
    let data: Profile = new Profile(); 
    data.id=-1; 
    data.Adhar=this.dataForm.get("Adhar").value;   
    data.Profile= (this.dataForm.get("Profile").value);   
    this.ProfileService.create(data).subscribe(createddata => {
      this.updateForm(createddata);
      this.toastr.info("Profile saved.");
      this.router.navigate(['/Profile/']);
    })
  }
}
