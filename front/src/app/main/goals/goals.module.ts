import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OChartModule } from "ontimize-web-ngx-charts";
import { SharedModule } from "src/app/shared/shared.module";
import { GoalsRoutingModule } from "./goals-routing.module";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { GoalsHomeComponent } from "./goals-home/goals-home.component";
import { GoalsNewComponent } from "./goals-new/goals-new.component";
import { GoalsDetailComponent } from "./goals-detail/goals-detail.component";
import { OTableColumnRendererTotalreadyComponent } from "./goals-home/o-table-column-renderer-totalready/o-table-column-renderer-totalready.component";
import { OTableColumnRendererPercentageColorComponent } from "./goals-home/o-table-column-renderer-percentage-color/o-table-column-renderer-percentage-color.component";

@NgModule({
  declarations: [
    GoalsHomeComponent,
    GoalsNewComponent,
    GoalsDetailComponent,
    OTableColumnRendererTotalreadyComponent,
    OTableColumnRendererPercentageColorComponent,
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    OntimizeWebModule,
    SharedModule,
    OChartModule,
  ],
})
export class GoalsModule {}
