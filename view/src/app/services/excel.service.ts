import {
  Injectable
} from '@angular/core';
import {
  Workbook
} from 'exceljs';
import * as fs from 'file-saver';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }
  async generateExcel(json: any[]) {
    const header = ['ID', 'QN'];
    // Create workbook and worksheet  
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet();
    // Cell Style : Fill and Header  
    let data = json.map(function (obj) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    });
    var FileName = "ExportuserData";
    const headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFFFFFF'
        },
        bgColor: {
          argb: 'FFFFFFFF'
        },
      };
      cell.font = {
        color: {
          argb: '00000000',
        },
        bold: true
      }
      cell.border = {
        top: {
          style: 'thin'
        },
        left: {
          style: 'thin'
        },
        bottom: {
          style: 'thin'
        },
        right: {
          style: 'thin'
        }
      };
    });

    data.forEach(d => {
      console.log(d);
      const row = worksheet.addRow(d);
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFFFFFF'
        }
      };
      row.font = {
        color: {
          argb: '00000000',
        },
        bold: false
      }
      row.eachCell((cell, number) => {
        cell.border = {
          top: {
            style: 'thin'
          },
          left: {
            style: 'thin'
          },
          bottom: {
            style: 'thin'
          },
          right: {
            style: 'thin'
          }
        };
      });
    });
    worksheet.getColumn(1).width = 10;
    worksheet.getColumn(2).width = 100;

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fs.saveAs(blob, FileName + '.xlsx');
    });
  }

  
  async Export(json: any[], columns, FileName) {

    // Create workbook and worksheet  
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet();
    // Cell Style : Fill and Header  
    let data = json.map(function (obj) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    });
    const header = columns;
    const headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFFFFFF'
        },
        bgColor: {
          argb: 'FF0000FF'
        },
      };
      cell.font = {
        color: {
          argb: '00000000',
        },
        bold: true
      }
      cell.border = {
        top: {
          style: 'thin'
        },
        left: {
          style: 'thin'
        },
        bottom: {
          style: 'thin'
        },
        right: {
          style: 'thin'
        }
      };
    });

    data.forEach(d => {
      console.log(d);
      const row = worksheet.addRow(d);
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFFFFFF'
        }
      };
      row.font = {
        color: {
          argb: '00000000',
        },
        bold: false
      }
      row.eachCell((cell, number) => {
        cell.border = {
          top: {
            style: 'thin'
          },
          left: {
            style: 'thin'
          },
          bottom: {
            style: 'thin'
          },
          right: {
            style: 'thin'
          }
        };
      });
    });

    worksheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });



    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fs.saveAs(blob, FileName + '.xlsx');
    });
  }

  async ExportAllColumns(json: any[], FileName) {

    // Create workbook and worksheet  
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet();
    // Cell Style : Fill and Header  
    let data = json.map(function (obj) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    });

    let columns = json.map(function (obj) {
      return Object.keys(obj).map(function (key) {
        return key;
      });
    });

    const header = columns.toString().split(',');// ['ID', 'QN'];
    const headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFFFFFF'
        },
        bgColor: {
          argb: 'FFFF0000'
        },
      };
      cell.font = {
        color: {
          argb: '00000000',
        },
        bold: true
      }
      cell.border = {
        top: {
          style: 'thin'
        },
        left: {
          style: 'thin'
        },
        bottom: {
          style: 'thin'
        },
        right: {
          style: 'thin'
        }
      };
    });

    data.forEach(d => {
      console.log(d);
      const row = worksheet.addRow(d);
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFFFFFF'
        }
      };
      row.font = {
        color: {
          argb: '00000000',
        },
        bold: false
      }
      row.eachCell((cell, number) => {
        cell.border = {
          top: {
            style: 'thin'
          },
          left: {
            style: 'thin'
          },
          bottom: {
            style: 'thin'
          },
          right: {
            style: 'thin'
          }
        };
      });
    });

    worksheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });



    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fs.saveAs(blob, FileName + '.xlsx');
    });
  }

  import(event) {
    let file;
    let arrayBuffer;
    let arraylist;
    file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      arrayBuffer = fileReader.result;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(arraylist);
    }
  }
}
