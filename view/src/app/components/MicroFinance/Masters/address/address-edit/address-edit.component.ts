import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr'; 
import { Photo } from 'src/app/models/photo/photo.model'; 
import { PhotoService } from 'src/app/services/photo.service';
import { AccountService } from 'src/app/services/account.service';
import { DatePipe } from '@angular/common';
import { Address } from '../Address.model';
import { AddressService } from '../Address.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-Address-edit',
  templateUrl: './Address-edit.component.html',
  styleUrls: ['./Address-edit.component.css'],
  providers: [DatePipe]
})
export class AddressEditComponent  implements OnInit , AfterViewInit{
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
    private AddressService: AddressService,
    private photoService: PhotoService,
    private toastr: ToastrService,
    public accountService: AccountService,
    private datePipe:DatePipe,
    private router: Router,
    private dataService:DataService,
  ) { }

  ngOnInit(): void {

     this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.dataForm = this.formBuilder.group({
      id: [this.id],      
      Adhar	: ['', [Validators.required,Validators.minLength(12),Validators.maxLength(12) ]],     
      Address	: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(2000) ]], 

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
    if (!!this.id  && this.id  !== -1) {
      this.showloader=true;
      this.AddressService.get(this.id ).subscribe(data => {
        console.log(JSON.stringify(data)  );
        this.updateForm(data);
        this.showloader=false;
      });
    }
  }
 
  ngAfterViewInit() {
    console.log('Parent After View Init'); 
  }
dob;
  updateForm(Address: Address) {

    this.dataForm.patchValue({
      id: Address.id,    
      Adhar: Address.Adhar, 
      Address: Address.Address,      
 
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
    let data: Address = new Address(); 
    data.id=this.id; 
    data.Adhar=this.dataForm.get("Adhar").value;   
    data.Address= (this.dataForm.get("Address").value);   
    this.AddressService.create(data).subscribe(createddata => {
      this.updateForm(createddata);
      this.toastr.info("Address saved.");
      this.router.navigate(['/Address/']);
    })
  }
}
