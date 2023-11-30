import {
  Component,
  OnInit,
  Injector,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { OBaseTableCellRenderer, OPercentPipe } from "ontimize-web-ngx";
@Component({
  selector: "app-o-table-column-renderer-percentage-color",
  templateUrl: "./o-table-column-renderer-percentage-color.component.html",
  styleUrls: ["./o-table-column-renderer-percentage-color.component.css"],
})
export class OTableColumnRendererPercentageColorComponent
  extends OBaseTableCellRenderer
  implements OnInit
{
  @ViewChild("templateref", { read: TemplateRef, static: false })
  public templateref: TemplateRef<any>;
  constructor(protected injector: Injector) {
    super(injector);
    this.setComponentPipe();
  }
  setComponentPipe() {
    this.componentPipe = new OPercentPipe(this.injector);
  }
  ngOnInit() {
    this.pipeArguments = {
      minDecimalDigits: 2,
      maxDecimalDigits: 2,
      decimalSeparator: ",",
      grouping: true,
    };
  }

  getCellData(value: any) {
    let cellValue: any;

    if (
      this.componentPipe &&
      typeof this.pipeArguments !== "undefined" &&
      value !== undefined
    ) {
      cellValue = this.componentPipe.transform(value, this.pipeArguments);
    }

    return cellValue;
  }
}
