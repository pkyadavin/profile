 
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Address } from '../Address.model';
import { AddressService } from '../Address.service';
@Component({
  selector: 'app-Address',
  templateUrl: './Address.component.html',
  styleUrls: ['./Address.component.css'],
  providers: [DatePipe]
})
export class AddressComponent implements OnInit {

  pagesize = 10;
  gridOptions: GridOptions;
  userdatas: Address[];
  columnDefs = [];

  frameworkComponents:any;
  constructor(
    private AddressService: AddressService,
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
    this.AddressService.getByApplicationUserId(currentApplicationUserId).subscribe(userdatas => {
      this.userdatas = userdatas;
      console.log(userdatas);
    });
  }

  defaultColDef;
  initColumns() {
    console.log("initColumns");
    let cc=this;
    this.columnDefs = [
      { headerName: 'id'.toUpperCase(), field: 'id',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 150 ,floatingFilter:true  },
      { headerName: 'Adhar'.toUpperCase(), field: 'Adhar',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 150 ,floatingFilter:true  },
      { headerName: 'Address'.toUpperCase(), field: 'Address',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 150 ,floatingFilter:true  },
    
    ];
  }


  EDITRenderer(param) {  
    var element = document.createElement('span');
    let template = '<i class="fas fa-edit"></i>';
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

  deleteConfirmed(data: Address, datas: Address[]) {  
    this.AddressService.delete(data.id).subscribe(() => {
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
    if(this.router.url.indexOf("Addresss")>0){
      this.router.navigate([`/Address/`]);
    }else{
      this.router.navigate([`/Addresss/`]);
    }
  }

  editdata(ID: number) {   
    this.router.navigate([`/Address/${ID}`]);
  }

  createdata() { 
    this.router.navigate(['/Address/-1']);
  }

  import = false;
  Import() {
    this.router.navigate(['/Addressimport/']);   
  }

  Export() {
    console.log(this.userdatas);
    let array = this.userdatas.map(v => {
      return {
        //id: v.id.toString(),        
        Adhar: v.Adhar.toString(),      
        Address: v.Address , 
      }
    })
    let col=["Adhar","Address"  ]
    this.excelService.Export( array,col,'Address');
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

}
