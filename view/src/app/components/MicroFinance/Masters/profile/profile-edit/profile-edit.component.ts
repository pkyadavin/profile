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
      phone	: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10) ]],
      photo	: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(500) ]], 
      name	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      dob	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      gender	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      fatherhusbandName	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      fatherhusbandId	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      fatherhusbanddob	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      motherName	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      Address	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      district 	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      language	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      familyIncome	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      RentedOrSelfHome	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      loanAmount	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      loanProcesingFee	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      insuranceFee	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      loanPurpose 	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      coinsurerName	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      CiGeneder	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      Cidob	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      CiIdProof	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      pin	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      bankAccountHolderName	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      accountNumber	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      ifscCode	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]], 
      bankName	 : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50) ]],      

      Profile	: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(2000) ]], 

    });
  
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
    data.Profile=JSON.stringify (this.dataForm.value);   
    this.ProfileService.create(data).subscribe(createddata => {
      this.updateForm(createddata);
      this.toastr.info("Profile saved.");
      this.router.navigate(['/Profile/']);
    })
  }
  response;
  public uploadFinished = (event) => {
    this.response = event.fileURL;
    this.dataForm.patchValue({
      photo: this.response       
 
    });  
    console.log(this.response);
  }
}
