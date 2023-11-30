import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { IncomesRoutingModule } from './incomes-routing.module';
import { IncomesHomeComponent } from './incomes-home/incomes-home.component';
import { IncomesNewComponent } from './incomes-new/incomes-new.component';
import { OChartModule } from 'ontimize-web-ngx-charts';
import { SharedModule } from "src/app/shared/shared.module";
import { IncomesChartComponent } from './incomes-chart/incomes-chart.component';
import { DatePipe } from '@angular/common';
import { IncomesDetailComponent } from './incomes-detail/incomes-detail.component';

@NgModule({
  declarations: [IncomesHomeComponent, IncomesNewComponent, IncomesChartComponent,IncomesDetailComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    IncomesRoutingModule, 
    OChartModule, 
    SharedModule
  ], exports: [
    IncomesChartComponent
  ], 
  providers:[DatePipe]
})
export class IncomesModule { }
