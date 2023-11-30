import {
  Component,
  OnInit,
  Injector,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ElementRef,
} from "@angular/core";

import { OntimizeService, OTranslateService } from "ontimize-web-ngx";
import {
  ChartService,
  DiscreteBarChartConfiguration,
  OChartComponent,
} from "ontimize-web-ngx-charts";
import { D3LocaleService } from "src/app/shared/d3-locale/d3Locale.service";
import { D3Locales } from "src/app/shared/d3-locale/locales";

@Component({
  selector: "app-expenses-chart",
  templateUrl: "./expenses-chart.component.html",
  styleUrls: ["./expenses-chart.component.css"],
  providers: [ChartService],
})
export class ExpensesChartComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() sharedDataObject: { data: any[] } | null;
  @ViewChild("discreteBar", { static: false }) discreteBar: OChartComponent;
  @ViewChild("discreteBar", { static: false }) discreteBarNative: ElementRef;
  protected data: Array<Object>;
  protected yAxis: string = "SUM_AMOUNT";
  protected xAxis: string = "DATE_SUM_AMOUNT";
  protected service: OntimizeService;
  public lang;
  protected d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
  protected chartParameters: DiscreteBarChartConfiguration;
  

  constructor(
    protected injector: Injector,
    private d3LocaleService: D3LocaleService,
    private translateService: OTranslateService
  ) {
    this.service = this.injector.get(OntimizeService);
    this.translateService.onLanguageChanged.subscribe(() => {
      this.queryData();
      this.translateNoDataMessage();
    });
    this._confDiscreteBar();
    this.translateNoDataMessage();
    this.queryData();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.sharedDataObject) {
      this.updateChartWithData(this.sharedDataObject);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sharedDataObject && this.sharedDataObject) {
      this.updateChartWithData(this.sharedDataObject);
    }
  }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration("movements");
    this.service.configureService(conf);
  }

  queryData() {
    let service: OntimizeService = this.injector.get(OntimizeService);
    const filter = {
      MOV_MONTH: new Date().getMonth() + 1,
      MOV_YEAR: new Date().getFullYear(),
    };
    const columns = ["SUM_AMOUNT", "DATE_SUM_AMOUNT", "USER_"];
    this.configureService();
    service
      .query(filter, columns, "totalExpensesAmountDay")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.adaptResult(resp.data);
          this.formater();
        } else {
          alert("Impossible to query data!");
        }
      });
  }

  adaptResult(data: any) {
    if (data && data.length) {
      let values = this.processValues(data);
      this.data = [
        {
          key: "Discrete serie",
          values: values,
        },
      ];
    }
  }

  processValues(data: Array<Object>): Array<Object> {
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    var self = this;
    const format_x = (d) => {
      let date = new Date(d);
      const format =
        D3Locales[this.translateService.getCurrentLang().toUpperCase()]["date"];
      return d3Locale.timeFormat(format)(date);
    };

    return data.map((item: any) => {
      return {
        x: format_x(item[self.xAxis]),
        y: item[self.yAxis],
      };
    });
  }

  public formater() {
    const chartService = this.discreteBar.getChartService();
    const chartOps = chartService.getChartOptions();
    chartOps["yAxis"]["tickFormat"] = (d) => {
      return d.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
    };
  }
  public translateNoDataMessage() {
    this.lang = this.translateService.getCurrentLang().toUpperCase();
    this.chartParameters.noDataMessage =
      this.translateService.get("NO_DATA_AVAILABLE");
  }

  public _confDiscreteBar() {
    this.chartParameters = new DiscreteBarChartConfiguration();
    this.chartParameters.margin.left = 80;
    this.chartParameters.color = [
      "#ad6ba9",
      "#bfd1d0",
      "#B6B6FF",
      "#FFE6B6",
      "#FFB6B6",
      "#E6B6FF",
      "#B6E6FF",
      "#FFB6E6",
      "#B6FFE6",
      "#FFD2B6",
      "#D2FFB6",
      "#D2B6FF",
      "#B6D2FF",
      "#e2cbd9",
      "#c2a2c2",
    ];
  }

  public updateChartWithData(obj: { data: any[] }) {
    if (obj && obj.data && obj.data.length > 0) {
      obj.data = this.formatterDataExternal(obj);
      this.adaptResult(obj.data);
      this.formater();
    }
  }


  public formatterDataExternal(obj: { data: any[] }) {
    const sumAmountByDate = obj.data.reduce((acc, item) => {
      const date = new Date(item.MOV_DATE);
      const key = `${item.USER_}_${date}`;
      if (!acc[key]) {
        acc[key] = { USER_: item.USER_, DATE_SUM_AMOUNT: date, SUM_AMOUNT: 0 };
      }
      acc[key].SUM_AMOUNT += item.MOV_AMOUNT;
      return acc;
    }, {});

    const dataFormat = Object.values(sumAmountByDate) as { USER_: string; DATE_SUM_AMOUNT: Date; SUM_AMOUNT: number }[];
    dataFormat.sort((a, b) => a.DATE_SUM_AMOUNT.getTime() - b.DATE_SUM_AMOUNT.getTime());
    return dataFormat;
  }
}
