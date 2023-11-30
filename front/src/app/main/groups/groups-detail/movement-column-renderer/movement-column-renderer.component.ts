import {
  Component,
  OnInit,
  Injector,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { OBaseTableCellRenderer, OCurrencyPipe } from "ontimize-web-ngx";

@Component({
  selector: "app-movement-column-renderer",
  templateUrl: "./movement-column-renderer.component.html",
  styleUrls: ["./movement-column-renderer.component.css"],
})
export class MovementColumnRendererComponent
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
      currencySimbol: "€",
      currencySymbolPosition: "right",
      decimalDigits: 2,
      grouping: true,
    };
  }

  getCellData(value: any) {
    let cellValue: string;
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
