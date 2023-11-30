import { Component, OnInit, Inject } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OValidators } from "ontimize-web-ngx";

@Component({
  selector: "app-expenses-detail",
  templateUrl: "./expenses-detail.component.html",
  styleUrls: ["./expenses-detail.component.css"],
})
export class ExpensesDetailComponent implements OnInit {
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

  ngOnInit(): void {}
}
