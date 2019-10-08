import { Component, OnInit } from "@angular/core";
import ObserverComponent from "../../ObserverComponent";
import { MainStore } from "../Store/MainStore";
import { CryptoHelper } from "../Helper/CryptoHelper";
@Component({
  selector: "app-test-component",
  templateUrl: "./app-test-component.html",
  styleUrls: ["./app-test-component.scss"]
})
export class TestComponent extends ObserverComponent implements OnInit {
  potato = [1, 1, 1, 1, 1];
  testValue;
  ngOnInit() {
    this.observe(MainStore.testValue, v => (this.testValue = v));
    // setInterval(() => {
    //   MainStore.testValue.next(this.testValue + 1);
    // }, 1000);
  }
  onClickSave() {}
  onClickLoad() {}
}

const encrypted = CryptoHelper.encryptObject({ ppap: 1 }, "pass");
const decrypted = CryptoHelper.decryptObject(encrypted, "pass");
console.log({ decrypted });
