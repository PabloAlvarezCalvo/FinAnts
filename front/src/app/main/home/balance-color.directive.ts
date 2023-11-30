import { Directive, ElementRef, Renderer2, Input } from "@angular/core";

@Directive({
  selector: "[appBalanceColor],[appBalanceBoxShadow]",
})
export class BalanceColorDirective {
  @Input("appBalanceColor") set appBalanceColor(balance: number) {
    if (balance < 0) {
      this.renderer.setStyle(this.el.nativeElement, "color", "red");
    } else {
      this.renderer.setStyle(this.el.nativeElement, "color", "green");
    }
  }
  @Input("appBalanceBoxShadow") set appBalanceBoxShadow(balance: number) {
    if (balance < 0) {
      this.renderer.setStyle(
        this.el.nativeElement,
        "box-shadow",
        "2px 2px 5px 0px rgba(192, 145, 145, 1)"
      );
    } else {
      this.renderer.setStyle(
        this.el.nativeElement,
        "box-shadow",
        "2px 2px 5px 0 rgba(145, 192, 158, 1)"
      );
    }
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
