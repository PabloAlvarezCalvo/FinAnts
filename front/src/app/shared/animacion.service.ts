import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AnimacionService {
  private inputChanged = new Subject<{ id: string; value: string }>();
  private focusChanged = new Subject<{ id: string; isFocused: boolean }>();
  private blurChanged = new Subject<{ id: string; isBlurred: boolean }>();
  private showPassword = new Subject<boolean>();
  private showBocadillo = new Subject<boolean>();
  private errorMessage = new Subject<{ message: string }>();

  // Input de escribir
  inputChanged$ = this.inputChanged.asObservable();

  onInputChanged(id: string, value: string) {
    this.inputChanged.next({ id, value });
  }

  // Input de focus
  focusChanged$ = this.focusChanged.asObservable();

  onFocusChanged(id: string, isFocused: boolean) {
    this.focusChanged.next({ id, isFocused });
  }

  // Input de salir del focus
  blurChanged$ = this.blurChanged.asObservable();

  onBlurChanged(id: string, isBlurred: boolean) {
    this.blurChanged.next({ id, isBlurred });
  }

  // Input de mostrar password
  showPassword$ = this.showPassword.asObservable();

  onShowPassword(show: boolean) {
    this.showPassword.next(show);
  }

  // -- BOCADILLO DE JAMÓN -- //

  showBocadillo$ = this.showBocadillo.asObservable();

  onShowBocadillo(show: boolean) {
    this.showBocadillo.next(show);
  }

  errorMessage$ = this.errorMessage.asObservable();

  onErrorMessage(message: string) {
    this.errorMessage.next({ message });
  }
}
