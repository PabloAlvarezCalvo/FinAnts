import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { OBaseTableCellRenderer, OCurrencyPipe } from "ontimize-web-ngx";

@Component({
  selector: "app-o-table-column-renderer-totalready",
  templateUrl: "./o-table-column-renderer-totalready.component.html",
  styleUrls: ["./o-table-column-renderer-totalready.component.css"],
})
export class OTableColumnRendererTotalreadyComponent
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
    this.componentPipe = new OCurrencyPipe(this.injector);
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
    let parsedValue: string;
    if (
      this.componentPipe &&
      typeof this.pipeArguments !== "undefined" &&
      value !== undefined
    ) {
      parsedValue = this.componentPipe.transform(value, this.pipeArguments);
      console.log({ parsedValue });
    }

    return parsedValue;
  }
}
