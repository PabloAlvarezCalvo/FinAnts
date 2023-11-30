import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { OBaseTableCellRenderer } from "ontimize-web-ngx";

@Component({
  selector: "app-group-detail-user-color",
  templateUrl: "./group-detail-user-color.component.html",
  styleUrls: ["./group-detail-user-color.component.css"],
})
export class GroupDetailUserColorComponent
  extends OBaseTableCellRenderer
  implements OnInit
{
  username: string = "";
  @ViewChild("templateref", { read: TemplateRef, static: false })
  public templateref: TemplateRef<any>;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    let sessionData = localStorage.getItem("com.ontimize.finants.front");
    this.username = JSON.parse(sessionData).session["user"];
  }
}
