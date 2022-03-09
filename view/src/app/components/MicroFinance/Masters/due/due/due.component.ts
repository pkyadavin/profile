 
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { ExcelService } from 'src/app/services/excel.service';
import { due } from '../due.model';
import { dueService } from '../due.service';
@Component({
  selector: 'app-due',
  templateUrl: './due.component.html',
  styleUrls: ['./due.component.css'],
  providers: [DatePipe]
})
export class dueComponent implements OnInit {

  pagesize = 10;
  gridOptions: GridOptions;
  userdatas: due[];
  columnDefs = [];

  frameworkComponents:any;
  constructor(
    private dueService: dueService,
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
    this.dueService.getByApplicationUserId(currentApplicationUserId).subscribe(userdatas => {
      this.userdatas = userdatas;
      console.log(userdatas);
    });
  }

  defaultColDef;
  initColumns() {
    console.log("initColumns");
    let cc=this;
    this.columnDefs = [
      
      { headerName: 'Adhar'.toUpperCase(), field: 'Adhar',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 150 ,floatingFilter:true  },
      { headerName: 'Address'.toUpperCase(), field: 'Address',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 350 ,floatingFilter:true  },
      { headerName: 'Due'.toUpperCase(), field: 'Due',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 150 ,floatingFilter:true  },
      { headerName: 'Collection'.toUpperCase(), field: 'Collection',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 150 ,floatingFilter:true  },
      { headerName: 'Pending'.toUpperCase(), field: 'Pending',editable: true, sortable: true, filter: 'agTextColumnFilter', width: 150 ,floatingFilter:true  },
      {
        headerName: 'Add'.toUpperCase(), width: 75, cellRenderer: (param) =>
        this.EDITRenderer(param)
      }
    ];
  }


  EDITRenderer(param) {  
    var element = document.createElement('span');
    let template = '<i class="fas fa-plus"></i>';
    element.innerHTML = template;
    element.addEventListener('click', () => {
      this.editdata(param.data.Adhar);
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

  deleteConfirmed(data: due, datas: due[]) {  
    this.dueService.delete(data.id).subscribe(() => {
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
    if(this.router.url.indexOf("dues")>0){
      this.router.navigate([`/due/`]);
    }else{
      this.router.navigate([`/dues/`]);
    }
  }

  editdata(ID: number) {   
    this.router.navigate([`/Installments/${ID}`]);
  }

  createdata() { 
    this.router.navigate(['/due/-1']);
  }

  import = false;
  Import() {
    this.router.navigate(['/dueimport/']);   
  }

  Export() {
    let array = this.userdatas.map(v => {
      return {
      //  id: v.id.toString(),        
        Adhar: v.Adhar.toString(),      
        Address: v.Address ||"",
        Due: v.Due,
        Collection: v.Collection,
        Pending: v.Pending,
      }
    })
    let col=[ "Adhar","Address","Due","Collection","Pending"  ]
    this.excelService.Export( array,col,'due');
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
