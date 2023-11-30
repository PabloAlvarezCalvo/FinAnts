import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "ontimize-web-ngx";

import { MainComponent } from "./main.component";

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "expenses",
        loadChildren: () =>
          import("./expenses/expenses.module").then((m) => m.ExpensesModule),
      },
      {
        path: "incomes",
        loadChildren: () =>
          import("./incomes/incomes.module").then((m) => m.IncomesModule)
      },
      {
        path: "groups",
        loadChildren: () =>
          import("./groups/groups.module").then((m) => m.GroupsModule)
      },
      {
        path: "goals",
        loadChildren: () =>
          import("./goals/goals.module").then((m) => m.GoalsModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
