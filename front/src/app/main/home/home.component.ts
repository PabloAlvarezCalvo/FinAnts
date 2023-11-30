import { Component, Injector, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { OntimizeService, OTranslateService } from "ontimize-web-ngx";
import { ExpensesNewComponent } from "../expenses/expenses-new/expenses-new.component";
import { IncomesNewComponent } from "../incomes/incomes-new/incomes-new.component";
import { D3LocaleService } from "src/app/shared/d3-locale/d3Locale.service";
import { D3Locales } from "src/app/shared/d3-locale/locales";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  protected service: OntimizeService;
  public balance: number = 0;
  public expenseBalance: number = 0;
  public incomeBalance: number = 0;
  public ACTUAL_MONTH: string;
  public MONTHLY_BALANCE: string = "MONTHLY_BALANCE";
  public TOTAL_BALANCE: string = "TOTAL_BALANCE";
  public TOTAL_EXPENSE: string = "TOTAL_EXPENSE";
  public TOTAL_INCOME: string = "TOTAL_INCOME";

  public user: string;
  protected d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
  httpOptions: any;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    protected injector: Injector,
    public dialog: MatDialog,
    private d3LocaleService: D3LocaleService,
    private translateService: OTranslateService
  ) {
    this.service = this.injector.get(OntimizeService);
    this.translateService.onLanguageChanged.subscribe(() => {
      this.actualMonth();
    });
  }

  ngOnInit() {
    this.queryBalance();
    this.queryExpenseBalance();
    this.queryIncomeBalance();
    this.actualMonth();
  }

  queryBalance() {
    const filter = {
      MONTH: new Date().getMonth() + 1,
      YEAR: new Date().getFullYear(),
    };
    const columns = ["user_", "balance"];
    this.service.query(filter, columns, "balance").subscribe((resp) => {
      if (resp.code === 0) {
        this.getBalance(resp.data);
      }
    });
  }
  queryExpenseBalance() {
    const filter = {};
    const columns = ["user_", "expenseBalance"];
    this.service
      .query(filter, columns, "totalExpensesForCurrentMonth")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.getExpenseBalance(resp.data);
        }
      });
  }
  queryIncomeBalance() {
    const filter = {};
    const columns = ["user_", "incomeBalance"];
    this.service
      .query(filter, columns, "totalIncomesForCurrentMonth")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.getIncomeBalance(resp.data);
        }
      });
  }
  getBalance(data: { balance: number }[]) {
    this.balance = data[0].balance || 0;
  }
  getExpenseBalance(data: { expenseBalance: number }[]) {
    this.expenseBalance = data[0].expenseBalance || 0;
  }

  getIncomeBalance(data: { incomeBalance: number }[]) {
    this.incomeBalance = data[0].incomeBalance || 0;
  }

  protected configureService() {
    const conf = this.service.getDefaultServiceConfiguration("movements");
    this.service.configureService(conf);
  }

  navigate() {
    this.router.navigate(["../", "login"], { relativeTo: this.actRoute });
  }

  buttonExpenses() {
    this.dialog.open(ExpensesNewComponent, {
      data: { showCloseButton: true },
      width: "fit-content",
      height: "580px",
      closeOnNavigation: false,
    });
  }
  buttonIncomes() {
    this.dialog.open(IncomesNewComponent, {
      data: { showCloseButton: true },
      width: "fit-content",
      height: "580px",
      closeOnNavigation: false,
    });
  }

  actualMonth() {
    // Obtén el idioma actual
    const lang = this.translateService.getCurrentLang().toUpperCase();
    console.log("Idioma actual:", lang);

    // Verifica si la configuración de idioma existe en D3Locales
    const localeConfig = D3Locales[lang];
    if (!localeConfig) {
      console.error(`Configuración de idioma no encontrada para ${lang}`);
      return;
    }

    // Obtén la fecha actual
    let date = new Date();
    console.log({ date });

    // Extrae el mes actual de la fecha
    const currentMonthIndex = date.getMonth(); // getMonth devuelve un índice de 0 a 11

    // Usa el índice para obtener el nombre del mes de la configuración de locale
    const currentMonthName = localeConfig.months[currentMonthIndex];
    console.log("Mes actual:", currentMonthName);

    // Actualiza la variable ACTUAL_MONTH
    this.ACTUAL_MONTH = currentMonthName;
  }
}
