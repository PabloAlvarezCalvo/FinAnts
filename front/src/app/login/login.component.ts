import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Injector,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AuthService,
  LocalStorageService,
  NavigationService,
} from "ontimize-web-ngx";
import { Observable } from "rxjs";
import { AnimacionService } from "../shared/animacion.service";

@Component({
  selector: "login",
  styleUrls: ["./login.component.scss"],
  templateUrl: "./login.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("user", { static: false })
  user: ElementRef<HTMLInputElement>;
  @ViewChild("password", { static: false })
  password: ElementRef<HTMLInputElement>;
  public showRegister = false;
  loginForm: FormGroup = new FormGroup({});
  userCtrl: FormControl = new FormControl("", Validators.required);
  pwdCtrl: FormControl = new FormControl("", Validators.required);
  sessionExpired = false;
  protected showPassword = false;
  warningMessagePass: String;
  warningMessageEmail: String;
  public showSandwich: boolean = false;
  public customErrorMessage: string;
  router: Router;
  errorMessage: string;
  respMessage: string;
  duplicateUser: boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    router: Router,
    @Inject(NavigationService) public navigation: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(LocalStorageService) private localStorageService,
    public injector: Injector,
    private animacionService: AnimacionService
  ) {
    this.router = router;

    const qParamObs: Observable<any> = this.actRoute.queryParams;
    qParamObs.subscribe((params) => {
      if (params) {
        const isDetail = params["session-expired"];
        if (isDetail === "true") {
          this.sessionExpired = true;
        } else {
          this.sessionExpired = false;
        }
      }
    });
  }
  buttonTerms() {
    this.router.navigate(["../login/Privacy-Policy"], {
      relativeTo: this.actRoute,
    });
  }
  ngAfterViewInit(): void {}

  onUserInputChanged(id, value) {
    this.animacionService.onInputChanged(id, value);
  }

  onUserFocusChanged(id, isFocused) {
    this.animacionService.onFocusChanged(id, isFocused);
  }

  onBlurChanged(id, isBlurred) {
    this.animacionService.onBlurChanged(id, isBlurred);
  }

  ngOnInit(): any {
    this.showSandwich = false;
    this.navigation.setVisible(false);

    this.loginForm.addControl("username", this.userCtrl);
    this.loginForm.addControl("password", this.pwdCtrl);

    if (this.authService.isLoggedIn()) {
      this.router.navigate(["../"], { relativeTo: this.actRoute });
    } else {
      this.authService.clearSessionData();
    }
  }

  login() {
    const userName = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (userName && userName.length > 0 && password && password.length > 0) {
      const self = this;
      this.authService.login(userName, password).subscribe(() => {
        self.sessionExpired = false;
        self.router.navigate(["../"], { relativeTo: this.actRoute });
      }, this.handleError);
    }
  }

  handleError(error) {
    switch (error.status) {
      case 401:
        console.error("Email or password is wrong.");
        break;
      default:
        break;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.animacionService.onShowPassword(this.showPassword);
  }
}
