import { Component } from '@angular/core';
import {
  IFloatingFilter,
  IFloatingFilterParams,
  NumberFilter,
  TextFilter,
  NumberFilterModel,
} from '@ag-grid-community/core';
import { AgFrameworkComponent } from '@ag-grid-community/angular';
 

export interface marritalStatusFloatingFilterParams extends IFloatingFilterParams {
  value: number;
  maxValue: number;
}

@Component({
  template: ` <div> <select id="marritalStatus" class=""  [(ngModel)]="currentValue"
  (ngModelChange)="valueChanged()">
  <option value="ALL">ALL</option>
  <option value="M">Married</option>
  <option value="S">Single</option>
  <option value="W">Widow</option>
  <option value="D">Devorce</option>
</select></div>

  `,
})
export class marritalStatusFloatingFilter
  implements IFloatingFilter, AgFrameworkComponent<marritalStatusFloatingFilterParams> {
  private params: marritalStatusFloatingFilterParams;

  public maxValue: number;
  public currentValue: string;

  agInit(params: marritalStatusFloatingFilterParams): void {
    this.params = params;
    this.maxValue = this.params.maxValue;
    this.currentValue = "ALL";
  }

  valueChanged() {
    let valueToUse =   this.currentValue ==="ALL" ? null : this.currentValue;
    this.params.parentFilterInstance(function (instance) {
      (<TextFilter>instance).onFloatingFilterChanged(
        'equals',
        valueToUse
      );
    });
  }

  onParentModelChanged(parentModel: NumberFilterModel): void {
    if (!parentModel) {
      this.currentValue = "ALL";
    } else {
      // note that the filter could be anything here, but our purposes we're assuming a greater than filter only,
      // so just read off the value and use that
     // this.currentValue = parentModel.filter;
    }
  }
}