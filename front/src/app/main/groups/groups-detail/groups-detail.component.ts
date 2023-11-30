import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { OListComponent } from "ontimize-web-ngx";

@Component({
  selector: "app-groups-detail",
  templateUrl: "./groups-detail.component.html",
  styleUrls: ["./groups-detail.component.css"],
})
export class GroupsDetailComponent implements OnInit, AfterViewInit {
  @ViewChild("list", { static: false }) list: OListComponent;
  @ViewChild("toolbar", { static: false }) toolbar: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const list = this.el.nativeElement.querySelector("#myUniqueList");
    const toolbar = list.querySelector(".o-data-toolbar");
    if (toolbar) {
      this.renderer.setStyle(toolbar, "display", "none");
    }
  }

  prepareData(data) {
    let groupedData = {};
    data.forEach((item) => {
      if (!groupedData[item.PAYER]) {
        groupedData[item.PAYER] = {
          PAYER: this.capitalizeFirstLetter(item.PAYER),
          payments: [],
        };
      }
      groupedData[item.PAYER].payments.push({
        recipient: this.capitalizeFirstLetter(item.RECIPIENT),
        amount: item.AMOUNT,
      });
    });

    let finalData = Object.keys(groupedData).map((key) => groupedData[key]);
    this.list.dataArray = finalData;
    console.log(finalData);
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
