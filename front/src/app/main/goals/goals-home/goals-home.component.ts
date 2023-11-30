import { Component, Injector, OnInit } from "@angular/core";
import { OTranslateService, OntimizeService } from "ontimize-web-ngx";
import { ChartSeries, PieChartConfiguration } from "ontimize-web-ngx-charts";

@Component({
  selector: "app-goals-home",
  templateUrl: "./goals-home.component.html",
  styleUrls: ["./goals-home.component.css"],
})
export class GoalsHomeComponent implements OnInit {
  protected chartParameters: PieChartConfiguration;
  public lang;
  protected service: OntimizeService;
  constructor(
    private translateService: OTranslateService,
    protected injector: Injector
  ) {
    this.service = this.injector.get(OntimizeService);
    this.translateService.onLanguageChanged.subscribe(() => {
      this.translateNoDataMessage();
    });
    this._confDiscreteBar();
    this.translateNoDataMessage();
  }

  ngOnInit() {}
  public translateNoDataMessage() {
    this.lang = this.translateService.getCurrentLang().toUpperCase();
    this.chartParameters.noDataMessage =
      this.translateService.get("NO_DATA_AVAILABLE");
  }
  public _confDiscreteBar() {
    this.chartParameters = new PieChartConfiguration();
    this.chartParameters.labelType = "percent";
    this.chartParameters.legendPosition = "bottom";
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
}
