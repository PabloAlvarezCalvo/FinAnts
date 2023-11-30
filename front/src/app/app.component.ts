
import { Component, OnInit, Injector, ViewChild, Inject } from "@angular/core";
import { OntimizeMatIconRegistry } from "ontimize-web-ngx";

@Component({
  selector: 'o-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   ontimizeMatIconRegistry: OntimizeMatIconRegistry;

   constructor(protected injector: Injector) {

    this.ontimizeMatIconRegistry = this.injector.get(OntimizeMatIconRegistry);

  }

  ngOnInit() {

    const icons = [

      { name: "add_circle_green", path: "assets/images/add_circler_green.svg" },

      { name: "add_circle_red", path: "assets/images/add_circler_red.svg" },

      // Agrega más íconos según sea necesario

    ];

    icons.forEach((icon) => {

      if (this.ontimizeMatIconRegistry.addOntimizeSvgIcon) {

        this.ontimizeMatIconRegistry.addOntimizeSvgIcon(icon.name, icon.path);

      }

    });

  }


}

