
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { OValidators, OFormComponent , OFormLayoutDialogComponent} from "ontimize-web-ngx";
import { ExpensesDetailComponent } from "../../expenses/expenses-detail/expenses-detail.component";

@Component({
  selector: 'app-goals-detail',
  templateUrl: './goals-detail.component.html',
  styleUrls: ['./goals-detail.component.css']
})
export class GoalsDetailComponent implements OnInit {
  validatorAmount: ValidatorFn[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ExpensesDetailComponent>
  ) {
      this.validatorAmount.push(
        OValidators.patternValidator(/^\d+([,.]\d+)?$/, "negativeNumber")
      ); 
  }

  onUpdate(event: any) {
   this.dialogRef.close();
  }

  ngOnInit() {
  }

}
