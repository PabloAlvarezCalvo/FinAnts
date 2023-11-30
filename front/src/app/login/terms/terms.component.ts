import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-terms",
  templateUrl: "./terms.component.html",
  styleUrls: ["./terms.component.css"],
})
export class TermsComponent implements OnInit {
  constructor(private router: Router, private actRoute: ActivatedRoute) {}

  ngOnInit() {}
  buttonAgree() {
    this.router.navigate(["../../login"], {
      relativeTo: this.actRoute,
    });
  }
}
