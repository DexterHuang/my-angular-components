import { Injectable } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ObserverService {
  subPool: Subscription[] = [];
  constructor() {
    console.log("constructed");
  }
  on<T>(subject: Observable<T>, onChange: (value: T) => void): Subscription {
    const sub = subject.subscribe(onChange);
    this.subPool.push(sub);
    return sub;
  }
  ngOnDestroy() {
    this.subPool.forEach(sub => sub.unsubscribe());
    this.subPool = [];
    console.log("Destory from ObserverComponent");
  }
}
