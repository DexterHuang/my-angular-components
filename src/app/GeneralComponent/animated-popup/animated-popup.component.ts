import {
  Component,
  OnInit,
  ContentChild,
  TemplateRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  ViewEncapsulation
} from "@angular/core";
import anime from "animejs/lib/anime.es.js";
@Component({
  selector: "app-animated-popup",
  templateUrl: "./animated-popup.component.html",
  styleUrls: ["./animated-popup.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AnimatedPopupComponent implements OnInit, AfterViewInit {
  isOpen = false;
  animating = false;
  @Input() paddingX = 20;
  @Input() paddingY = 10;
  @Input() mobilePaddingX = 5;
  @Input() mobilePaddingY = 10;
  @Input() closedRadius: any = "4px";
  @Input() openedRadius: any = "8px";
  @ContentChild("bottom") bottomTemplate: TemplateRef<ElementRef>;
  @ContentChild("top") topTemplate: TemplateRef<ElementRef>;
  @ViewChild("container") containerRef: ElementRef;
  @ViewChild("overlay") overlayRef: ElementRef;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.close();
  }
  async close() {
    if (!this.animating) {
      this.isOpen = false;
      const container: HTMLDivElement = this.containerRef.nativeElement;

      const overlay: HTMLDivElement = this.overlayRef.nativeElement;
      overlay.style.pointerEvents = "none";
      document.body.style.overflowY = "auto";
      await anime({
        targets: container,
        left: "0px",
        right: `0px`,
        top: "0px",
        bottom: "0px",
        easing: "easeOutExpo",
        borderRadius: this.closedRadius,
        duration: 500
      }).finished;

      container.style.zIndex = "1";
      // container.style.left = '0px';
      // container.style.right = `0px`;
      // container.style.top = '0px';
      // container.style.bottom = '0px';
    }
  }
  getContext() {
    return { isOpen: this.isOpen };
  }
  async open() {
    if (!this.isOpen && !this.animating) {
      this.isOpen = true;
      this.animating = true;
      const container: HTMLDivElement = this.containerRef.nativeElement;
      const overlay: HTMLDivElement = this.overlayRef.nativeElement;
      // const content: HTMLDivElement = container.childNodes.item(1) as any;
      container.style.zIndex = "999";
      const { top, left, right, bottom } = container.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;
      let paddingX = this.paddingX;
      let paddingY = this.paddingY;
      if (innerWidth < 599) {
        paddingX = this.mobilePaddingX;
        paddingY = this.mobilePaddingY;
      }
      const paddingXPixel = (paddingX / 100) * innerWidth;
      const paddingYPixel = (paddingY / 100) * innerHeight;
      const paddingLeft = left - paddingXPixel;
      const paddingRight = innerWidth - right - paddingXPixel;
      const paddingTop = top - paddingYPixel;
      const paddingBottom = innerHeight - bottom - paddingYPixel;

      overlay.style.zIndex = "997";
      overlay.style.pointerEvents = "auto";
      overlay.style.left = `${-left}px`;
      overlay.style.top = `${-top}px`;
      overlay.style.right = `${-(innerWidth - right)}px`;
      overlay.style.bottom = `${-(innerHeight - bottom)}px`;

      document.body.style.overflowY = "hidden";

      await anime({
        targets: [container],
        left: `${-paddingLeft}px`,
        right: `${-paddingRight}px`,
        top: `${-paddingTop}px`,
        bottom: `${-paddingBottom}px`,
        easing: "easeOutElastic(1, 1.2)",
        borderRadius: this.openedRadius,
        duration: 500
      }).finished;

      this.animating = false;
      // container.style.left = `${-paddingLeft}px`;
      // container.style.right = `${-paddingRight}px`;
      // container.style.top = `${-paddingTop}px`;
      // container.style.bottom = `${-paddingBottom}px`;
      // container.style.width = `${innerWidth - paddingLeft + paddingRight}`;
    }
  }
  onMouseDown() {
    if (!this.isOpen) {
      const container: HTMLDivElement = this.containerRef.nativeElement;
      anime({
        targets: [container],
        scale: 0.9,
        easing: "easeOutElastic(1, 1.2)",
        duration: 500
      });
    }
  }
  onMouseUp() {
    const container: HTMLDivElement = this.containerRef.nativeElement;
    anime({
      targets: [container],
      scale: 1,
      easing: "easeOutElastic(1, 1.2)",
      duration: 500
    });
  }
  onClickOverlay(event: Event) {
    this.close();
  }
}
