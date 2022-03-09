import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr'; 
import { Photo } from 'src/app/models/photo/photo.model'; 
import { PhotoService } from 'src/app/services/photo.service';
import { AccountService } from 'src/app/services/account.service';
import { DatePipe } from '@angular/common';
import { Installments } from '../Installments.model';
import { InstallmentsService } from '../Installments.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-Installments-edit',
  templateUrl: './Installments-edit.component.html',
  styleUrls: ['./Installments-edit.component.css'],
  providers: [DatePipe]
})
export class InstallmentsEditComponent  implements OnInit , AfterViewInit{
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
    private InstallmentsService: InstallmentsService,
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
      Amount	: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(5) ]], 

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
  
  }
 
  ngAfterViewInit() {
    console.log('Parent After View Init'); 
  }
dob;
 

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
    let data: Installments = new Installments(); 
    data.id=-1; 
    data.Adhar=this.dataForm.get("Adhar").value ;   
    data.Amount= (this.dataForm.get("Amount").value);   
    this.InstallmentsService.create(data).subscribe(createddata => {
      
      this.toastr.info("Installments saved.");
      this.router.navigate(['/Installments/']);
    })
  }
}
