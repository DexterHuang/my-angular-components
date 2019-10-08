import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TestComponent } from "./TestComponent/TestComponent";
import { ObserverService } from "../Observer.service";
import { AnimatedPopupComponent } from "./GeneralComponent/animated-popup/animated-popup.component";

@NgModule({
  declarations: [AppComponent, TestComponent, AnimatedPopupComponent],
  imports: [BrowserModule],
  providers: [ObserverService],
  bootstrap: [AppComponent]
})
export class AppModule {}
