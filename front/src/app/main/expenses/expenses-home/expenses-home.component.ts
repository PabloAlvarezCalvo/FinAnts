import { Component, OnInit, ElementRef } from "@angular/core";
import * as moment from "moment";
import { Expression, FilterExpressionUtils } from "ontimize-web-ngx";
import { ViewChildren, QueryList, ViewChild } from "@angular/core";
import {
  DiscreteBarChartConfiguration,
  OChartComponent,
} from "ontimize-web-ngx-charts";

@Component({
  selector: "app-expenses-home",
  templateUrl: "./expenses-home.component.html",
  styleUrls: ["./expenses-home.component.css"],
})
export class ExpensesHomeComponent implements OnInit {
  @ViewChildren("expenseTable") expenseTable: QueryList<any>;
  @ViewChild("discreteBar", { static: false }) discreteBar: OChartComponent;

  public selected = {};
  public date = [];
  sharedDataObject: { data: any[] } | null = { data: [] };
  protected chartParameters: DiscreteBarChartConfiguration;
  showChart: boolean = true;
  //externalData : any[] | null = null;

  constructor() {}

  ngOnInit() {}

  clearFilters(event) {
    this.expenseTable.first.reloadData();
  }

  getValue() {
    return this.selected;
  }

  public createFilter(values: Array<{ attr; value }>): Expression {
    let filters: Array<Expression> = [];
    values.forEach((fil) => {
      if (fil.value) {
        if (fil.attr === "date_range2") {
          filters.push(
            FilterExpressionUtils.buildExpressionMoreEqual(
              "MOV_DATE",
              fil.value.startDate
            )
          );
          filters.push(
            FilterExpressionUtils.buildExpressionLessEqual(
              "MOV_DATE",
              fil.value.endDate
            )
          );
        }

        if (fil.attr === "CA_ID" && fil.value.length > 0) {
          let valueArray = Array.from(fil.value);
          if (valueArray.length > 1) {
            let filterExpressions = valueArray.map((value) =>
              FilterExpressionUtils.buildExpressionEquals("CA_ID", value)
            );
            let filterExpression = filterExpressions.reduce((exp1, exp2) =>
              FilterExpressionUtils.buildComplexExpression(
                exp1,
                exp2,
                FilterExpressionUtils.OP_OR
              )
            );
            filters.push(filterExpression);
          } else {
            filters.push(
              FilterExpressionUtils.buildExpressionEquals(
                "CA_ID",
                valueArray[0]
              )
            );
          }
        }
      }
    });

    if (filters.length > 0) {
      const filterExpression = filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(
          exp1,
          exp2,
          FilterExpressionUtils.OP_AND
        )
      );
      return filterExpression;
    } else {
      return null;
    }
  }

  public dataFiltered(event) {
    this.sharedDataObject = { data: event };
    console.log(this.sharedDataObject);

    if (event.length === 0) {
      // Cuando no haya nada que mostrar
      this.showChart = false;
    } else {
      // Cuando si
      this.showChart = true;
    }
  }
}
