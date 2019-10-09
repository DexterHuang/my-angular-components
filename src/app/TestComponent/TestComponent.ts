import { Component, OnInit } from "@angular/core";
import ObserverComponent from "../../ObserverComponent";
import { MainStore } from "../Store/MainStore";
import { ThreadHandler } from "../Helper/ThreadHandler";
@Component({
  selector: "app-test-component",
  templateUrl: "./app-test-component.html",
  styleUrls: ["./app-test-component.scss"]
})
export class TestComponent extends ObserverComponent implements OnInit {
  potato = [1, 1, 1, 1, 1];
  testValue;
  async ngOnInit() {
    this.observe(MainStore.testValue, v => (this.testValue = v));
    // setInterval(() => {
    //   MainStore.testValue.next(this.testValue + 1);
    // }, 1000);

    console.log("start");
    const task = (l: number[]) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(l);
        }, 1000);
      });
    };
    ThreadHandler.buffer("1", [1, 1, 1, 1], task);
    ThreadHandler.buffer("1", [2, 2, 2, 2], task);
    const r = await ThreadHandler.buffer("1", [1, 1, 11], task);
    console.log({ r });
  }
  onClickSave() {}
  onClickLoad() {}
}

// const encrypted = CryptoHelper.encryptObject({ ppap: 1 }, "pass");
// const decrypted = CryptoHelper.decrypt(encrypted, "pass");
// console.log({ decrypted });
