import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { AnimacionService } from "src/app/shared/animacion.service";

@Component({
  selector: "app-animacion",
  templateUrl: "./animacion.component.html",
  styleUrls: ["./animacion.component.css"],
})
export class AnimacionComponent implements OnInit, AfterViewInit {
  @ViewChild("leftEye", { static: false })
  leftEye: ElementRef<HTMLImageElement>;
  @ViewChild("rightEye", { static: false })
  rightEye: ElementRef<HTMLImageElement>;

  showPassword: boolean = false;

  protected imagePaths: string[] = [
    "../../assets/images/logo/Animacion/login-logo-fr1.png",
    "../../assets/images/logo/Animacion/login-logo-fr2.png",
    "../../assets/images/logo/Animacion/login-logo-fr3.png",
    "../../assets/images/logo/Animacion/login-logo-fr4.png",
    "../../assets/images/logo/Animacion/login-logo-fr5.png",
    "../../assets/images/logo/Animacion/login-logo-fr6.png",
    "../../assets/images/logo/Animacion/login-logo-fr7.png",
    "../../assets/images/logo/Animacion/login-logo-fr8.png",
    "../../assets/images/logo/Animacion/login-logo-fr9.png",
  ];
  protected reverseImage: string[] = [
    "../../assets/images/logo/Animacion/login-logo-fr9.png",
    "../../assets/images/logo/Animacion/login-logo-fr8.png",
    "../../assets/images/logo/Animacion/login-logo-fr7.png",
    "../../assets/images/logo/Animacion/login-logo-fr6.png",
    "../../assets/images/logo/Animacion/login-logo-fr5.png",
    "../../assets/images/logo/Animacion/login-logo-fr4.png",
    "../../assets/images/logo/Animacion/login-logo-fr3.png",
    "../../assets/images/logo/Animacion/login-logo-fr2.png",
    "../../assets/images/logo/Animacion/login-logo-fr1.png",
  ];

  protected showImage = false;
  protected currentImage: string;
  protected timeoutId;
  protected currentImageIndex: number = 0;
  protected length: number;

  constructor(private animacionService: AnimacionService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.animacionService.showPassword$.subscribe((show) => {
      console.log("show", show);
      this.showPassword = show;
    });

    this.animacionService.inputChanged$.subscribe((data) => {
      try {
        if (data.id === "input") {
          this.length = data.value.length;
          this.resetEyeTransform();
          this.updateEyeTransforms(this.length);
        }

        if (data.id === "focus") {
          this.length = data.value.length;
          this.updateEyeTransforms(this.length);
        }
        if (data.id === "blur") {
          this.resetEyeTransform();
        }

        ///PASSWORD

        if (data.id === "passwordInput") {
          this.length = this.showPassword ? data.value.length : 0;
          this.updateEyeTransforms(this.length);
        }
        if (data.id === "passwordFocus") {
          if (this.showPassword) {
            this.length = data.value.length;
          } else {
            this.currentImageIndex = 0;
            this.advanceAnimation();
            this.showImage = true;
            this.length = 0;
          }
          this.updateEyeTransforms(this.length);
        }
        if (data.id === "passwordBlur") {
          if (this.showPassword) {
            this.resetEyeTransform();
          } else {
            this.currentImageIndex = 0;
            this.reverseAnimation();
            this.length = 0;
          }
          this.updateEyeTransforms(this.length);
        }

        ///
        if (data.id === "passwordRightInput") {
          this.length = this.showPassword ? 6 + data.value.length : 0;
          this.updateEyeTransforms(this.length);
        }
        if (data.id === "passwordRightFocus") {
          if (this.showPassword) {
            this.length = 6 + data.value.length;
          } else {
            this.currentImageIndex = 0;
            this.advanceAnimation();
            this.showImage = true;
            this.length = 0;
          }
          this.updateEyeTransforms(this.length);
        }
        if (data.id === "passwordRightBlur") {
          if (this.showPassword) {
            this.resetEyeTransform();
          } else {
            this.currentImageIndex = 0;
            this.reverseAnimation();
            this.length = 0;
          }
          this.updateEyeTransforms(this.length);
        }

        ///RIGHT INPUTS
        if (data.id === "rightInput") {
          this.length = 6 + data.value.length;
          this.resetEyeTransform();
          this.updateEyeTransforms(this.length);
        }
      } catch (error) {}
    });
  }

  updateEyeTransforms(length) {
    let startPosition = -4;
    const maxEyeX = 3 * 0.6; // Establece el límite máximo para la transformación

    const leftEyeX = Math.min(startPosition + length * 0.6, maxEyeX);
    const rightEyeX = Math.min(startPosition + length * 0.6, maxEyeX);
    this.leftEye.nativeElement.style.transform = `translateX(${leftEyeX}px)`;
    this.rightEye.nativeElement.style.transform = `translateX(${rightEyeX}px)`;
  }
  resetEyeTransform() {
    // Restablecer la transformación de los ojos a su posición inicial
    this.leftEye.nativeElement.style.transform = "translateX(0)";
    this.rightEye.nativeElement.style.transform = "translateX(0)";
  }

  advanceAnimation() {
    this.currentImage = this.imagePaths[this.currentImageIndex];
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.imagePaths.length;

    if (this.currentImageIndex === 0) {
      // Cuando llega al final del arreglo, mantén el índice en la última imagen
      this.currentImageIndex = this.imagePaths.length - 1;
      clearTimeout(this.timeoutId);
    } else {
      this.timeoutId = setTimeout(() => this.advanceAnimation(), 60);
    }
  }
  reverseAnimation() {
    this.currentImage = this.reverseImage[this.currentImageIndex];
    // Usar el arreglo reverseImage en lugar de imagePaths
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.reverseImage.length;

    if (this.currentImageIndex === 0) {
      this.currentImageIndex = this.reverseImage.length - 1;
      clearTimeout(this.timeoutId);
      this.showImage = false;
    } else {
      this.timeoutId = setTimeout(() => this.reverseAnimation(), 60);
    }
  }
}
