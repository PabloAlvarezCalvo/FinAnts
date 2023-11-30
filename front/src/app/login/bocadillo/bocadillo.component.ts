import { Component, OnInit } from "@angular/core";
import { AnimacionService } from "src/app/shared/animacion.service";

@Component({
  selector: "app-bocadillo",
  templateUrl: "./bocadillo.component.html",
  styleUrls: ["./bocadillo.component.css"],
})
export class BocadilloComponent implements OnInit {
  showBocadillo: boolean = false;
  errorMessage: string = "";
  constructor(private animacionService: AnimacionService) {}

  ngOnInit() {
    this.animacionService.showBocadillo$.subscribe((show) => {
      this.showBocadillo = show;
    });

    this.animacionService.errorMessage$.subscribe((message) => {
      this.errorMessage = message.message;
      console.log(this.errorMessage);
    });
  }
}
