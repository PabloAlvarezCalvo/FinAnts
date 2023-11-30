import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { AnimacionService } from "src/app/shared/animacion.service";
import { OntimizeService } from "ontimize-web-ngx";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import confetti from "canvas-confetti";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  protected service: OntimizeService;
  protected showPassword = false;
  @Output() volverLogin = new EventEmitter<void>();

  public respMessage: string = "";
  public errorEmail: boolean = false; //! ERROR DE MAIL
  public errorPassword: boolean = false; //! ERROR DE PASS
  public errorBoth: boolean = false; //! ERROR DE AMBOS
  public showSandwitch: boolean = false;

  @ViewChild("registryForm", { static: false }) Form: ElementRef;

  loginForm: FormGroup = new FormGroup({});
  userCtrl: FormControl = new FormControl("", Validators.required);
  pwdCtrl: FormControl = new FormControl("", Validators.required);
  nameCtrl: FormControl = new FormControl("", Validators.required);
  lastnameCtrl: FormControl = new FormControl("", Validators.required);
  emailCtrl: FormControl = new FormControl("", Validators.required);

  constructor(
    protected injector: Injector,
    private animacionService: AnimacionService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.service = this.injector.get(OntimizeService);
  }
  ngAfterViewInit(): void {}

  ngOnInit() {
    const conf = this.service.getDefaultServiceConfiguration("app");
    this.service.configureService(conf);
    this.loginForm.addControl("username", this.userCtrl);
    this.loginForm.addControl("password", this.pwdCtrl);
    this.loginForm.addControl("name", this.nameCtrl);
    this.loginForm.addControl("lastname", this.lastnameCtrl);
    this.loginForm.addControl("email", this.emailCtrl);
  }
  volverAlLogin() {
    this.animacionService.onShowBocadillo(false);
    this.clearValidatorsAndResetForm();
    this.volverLogin.emit();
  }
  buttonRegister() {
    this.throwConfetti();
    this.router.navigate(["../../login"], {
      relativeTo: this.actRoute,
    });
  }

  throwConfetti() {
    confetti({
      particleCount: 250,
      spread: 120,
    });
  }

  private clearValidatorsAndResetForm() {
    [
      this.userCtrl,
      this.pwdCtrl,
      this.nameCtrl,
      this.lastnameCtrl,
      this.emailCtrl,
    ].forEach((control) => {
      control.clearValidators();
      control.updateValueAndValidity();
    });
    this.loginForm.reset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.animacionService.onShowPassword(this.showPassword);
  }
  onUserInputChanged(id, value) {
    this.animacionService.onInputChanged(id, value);
  }

  onUserFocusChanged(id, isFocused) {
    this.animacionService.onFocusChanged(id, isFocused);
  }

  onBlurChanged(id, isBlurred) {
    this.animacionService.onBlurChanged(id, isBlurred);
  }
  onErrorMessage() {}
  register() {
    const usernameValue =
      this.loginForm.get("username") &&
      this.loginForm.get("username").value != null
        ? this.loginForm.get("username").value
        : "";
    const passwordValue =
      this.loginForm.get("password") &&
      this.loginForm.get("password").value != null
        ? this.loginForm.get("password").value
        : "";
    const nameValue =
      this.loginForm.get("name") && this.loginForm.get("name").value != null
        ? this.loginForm.get("name").value
        : "";
    const lastnameValue =
      this.loginForm.get("lastname") &&
      this.loginForm.get("lastname").value != null
        ? this.loginForm.get("lastname").value
        : "";
    const emailValue =
      this.loginForm.get("email") && this.loginForm.get("email").value != null
        ? this.loginForm.get("email").value
        : "";

    const userData = {
      USER_: usernameValue,
      PASSWORD: passwordValue,
      NAME: nameValue,
      SURNAME: lastnameValue,
      EMAIL: emailValue,
    };
    [
      this.userCtrl,
      this.pwdCtrl,
      this.nameCtrl,
      this.lastnameCtrl,
      this.emailCtrl,
    ].forEach((control) => {
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    });

    const isUserDataValid = Object.keys(userData).every(
      (key) => userData[key] != null && userData[key].length > 0
    );

    const isPasswordValid = passwordValue.length > 7;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    this.errorEmail = isEmailValid ? false : true;
    this.errorPassword = isPasswordValid ? false : true;

    if (this.errorEmail && this.errorPassword) {
      this.animacionService.onErrorMessage("ERROR_PASS_EMAIL");
      this.animacionService.onShowBocadillo(true);
    } else if (this.errorEmail) {
      this.animacionService.onErrorMessage("ERROR_FORMAT_EMAIL");
      this.animacionService.onShowBocadillo(true);
    } else if (this.errorPassword) {
      this.animacionService.onErrorMessage("ERROR_LENGTH_PASSWORD");
      this.animacionService.onShowBocadillo(true);
    }

    if (isUserDataValid && isPasswordValid && isEmailValid) {
      this.service.insert(userData, "register").subscribe({
        next: (resp) => {
          this.Form.nativeElement.reset();
          this.animacionService.onShowBocadillo(false);
          this.volverAlLogin();
          this.buttonRegister();
        },
        error: (error) => {
          console.log(error);
          if (error.status === 409) {
            this.respMessage = error.error;
            this.animacionService.onErrorMessage("ERROR_DUPLICATE_USER");
            this.animacionService.onShowBocadillo(true);
          } else {
            this.respMessage = error.error;
            console.log(error.error);
          }
        },
      });
    }
  }

  updateErrorMessages(
    emailError: boolean,
    passwordError: boolean,
    duplicateUser: boolean
  ) {
    if (emailError || passwordError || duplicateUser) {
      // Mostrar mensaje si hay algún error
      if (emailError && passwordError) {
        // this.errorMessage = "ERROR_PASS_EMAIL";
        this.animacionService.onErrorMessage("ERROR_PASS_EMAIL");
      } else if (emailError) {
        // this.errorMessage = "ERROR_FORMAT_EMAIL";
        this.animacionService.onErrorMessage("ERROR_FORMAT_EMAIL");
      } else if (passwordError) {
        this.animacionService.onErrorMessage("ERROR_LENGTH_PASSWORD");
      } else if (duplicateUser) {
        this.animacionService.onErrorMessage("ERROR_DUPLICATE_USER");
      }
    } else {
      this.animacionService.onErrorMessage("");
    }
  }
}
