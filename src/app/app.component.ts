import { Component, OnDestroy } from "@angular/core";
import { MainStore } from "./Store/MainStore";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  showComponent = true;
  timer: any;
  loop = () => {
    MainStore.testValue.next(MainStore.testValue.value + 1);
  };
  constructor() {
    this.timer = setInterval(this.loop, 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
  onClickToggle() {
    this.showComponent = !this.showComponent;
  }
}
