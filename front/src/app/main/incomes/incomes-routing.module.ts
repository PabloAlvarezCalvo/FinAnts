import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IncomesHomeComponent } from "./incomes-home/incomes-home.component";
import { IncomesNewComponent } from "./incomes-new/incomes-new.component";
import { IncomesDetailComponent } from "./incomes-detail/incomes-detail.component";

const routes: Routes = [
  {
    path: "",
    component: IncomesHomeComponent,
  },
  {
    path: "new",
    component: IncomesNewComponent,
  },
  {
    path: ":MOV_ID",
    component: IncomesDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomesRoutingModule {}
