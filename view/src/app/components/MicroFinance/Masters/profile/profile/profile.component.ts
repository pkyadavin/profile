 
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions, ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
 
import { AccountService } from 'src/app/services/account.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {

  pagesize = 10;
  gridOptions: GridOptions;
  userdatas: Profile[];
  columnDefs = [];
  tooltipShowDelay = 0;
   tooltipHideDelay = 2000;
   searchwords;
 
 
  constructor(
    private ProfileService: ProfileService,
    private router: Router,
    private toastr: ToastrService,
    private accountService: AccountService,
    public excelService: ExcelService,
    private datePipe:DatePipe,
  ) {
    this.gridOptions = <GridOptions>{
 
    }
    this.gridOptions.paginationPageSize=this.pagesize;
 
   // this.gridOptions.floatingFilter=true;
    
 

    this.initColumns();
  }

  ngOnInit(): void {
    this.userdatas = [];
    let currentApplicationUserId = this.accountService.currentUserValue.applicationUserId;
    this.ProfileService.getByApplicationUserId(currentApplicationUserId).subscribe(userdatas => {
      this.userdatas = userdatas;
      console.log(userdatas);
    });
  }
  search(){ 

    if(this.userdatas.filter(v=>v.Profile && v.Profile.indexOf(this.searchwords)>-1).slice().length>0){
      this.userdatas = this.userdatas.filter(v=>v.Profile && v.Profile.indexOf(this.searchwords)>-1).slice(); 
      this.onChangePageSize();
      if(this.userdatas.length>0){
        this.showgrid=true;
      }else{
        this.showgrid=false;
      } 
    }else{
      this.toastr.info("No Data found matching search."); 

    }       
  }

  defaultColDef;
  initColumns() {
    console.log("initColumns");
    let cc=this;
    this.columnDefs = [
      { headerName: 'id'.toUpperCase(), field: 'id',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 150 ,floatingFilter:true  },
      { headerName: 'Adhar'.toUpperCase(), field: 'Adhar',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 150 ,floatingFilter:true  },
      { headerName: 'Profile'.toUpperCase(), field: 'Profile',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 300 ,floatingFilter:true 
      
     },
      {
        headerName: 'View', width: 75, cellRenderer: (param) =>
        this.EDITRenderer(param)
      }, 
    ];
  }

 
  EDITRenderer(param) {  
    var element = document.createElement('span');
    let template = '<i class="fas fa-eye"></i>';
    element.innerHTML = template;
    element.addEventListener('click', () => {
      this.editdata(param.data.id);
    });
    return element;
  }

  DeleteRenderer(param) {
     var element = document.createElement('span');
    let template = '<i class="fas fa-trash-alt"></i>';
    element.innerHTML = template;
    element.addEventListener('click', () => {
      this.deleteConfirmed(param.data, this.userdatas);
    });
    return element;
  }

  deleteConfirmed(data: Profile, datas: Profile[]) {  
    this.ProfileService.delete(data.id).subscribe(() => {
      let index = 0;
      for (let i = 0; i < datas.length; i++) {
        if (datas[i].id === data.id) {
          index = i;
        }
      }
      if (index > -1) {
        datas.splice(index, 1);
      }
      this.toastr.info("data deleted."); 
    //  this.reloadPage();      
    });
  }

  reloadPage(){ 
    if(this.router.url.indexOf("Profiles")>0){
      this.router.navigate([`/Profile/`]);
    }else{
      this.router.navigate([`/Profiles/`]);
    }
  }

  editdata(ID: number) {   
    this.router.navigate([`/ProfileView/${ID}`]);
  }

  createdata() { 
    this.router.navigate(['/Profile/-1']);
  }

  import = false;
  Import() {
    this.router.navigate(['/Profileimport/']);   
  }

  Export() {
    console.log(this.userdatas);
    let array = this.userdatas.map(v => {
      return {
        //id: v.id.toString(),        
        Adhar: v.Adhar.toString(),      
        Profile: v.Profile , 
      }
    })
    let col=["Adhar","Profile"  ]
    this.excelService.Export( array,col,'Profile');
  }

  Print(id){
    var html="<html>";
    html+= document.getElementById(id).innerHTML; 
    html+="</html>"; 
    var printWin = window.open('','','left=100,top=100,width=800,height=800,toolbar=0,scrollbars=0,status  =0');
    printWin.document.write(html);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
  }

  ExportPDF(){
      this.Print("pdfdata");
  }

  onChangePageSize() {
    this.gridOptions.api.paginationSetPageSize(Number(this.pagesize));
    this.gridOptions.api.onFilterChanged();
  }
  showgrid=false
  Show(){
    this.showgrid=!this.showgrid;
  }
}
