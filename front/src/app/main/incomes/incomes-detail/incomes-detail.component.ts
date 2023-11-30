import { Component, OnInit, Inject } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OValidators } from "ontimize-web-ngx";

@Component({
  selector: "app-incomes-detail",
  templateUrl: "./incomes-detail.component.html",
  styleUrls: ["./incomes-detail.component.css"],
})
export class IncomesDetailComponent implements OnInit {
  validatorAmount: ValidatorFn[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<IncomesDetailComponent>
  ) {
    this.validatorAmount.push(
      OValidators.patternValidator(/^\d+([,.]\d+)?$/, "negativeNumber")
    );
  }

  ngOnInit() {}
  onUpdate(event: any) {
    this.dialogRef.close();
  }
}
