import { Observable, Subscription } from "rxjs";

export const injectObserable = (observables: {
  [key: string]: Observable<any>;
}) => {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    const subPool: Subscription[] = [];
    Object.entries(observables).forEach(([key, observable]) => {
      const sub = observable.subscribe(v => {
        constructor.prototype[key] = v;
      });
      subPool.push(sub);
    });
    const oldOnDestory = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = () => {
      oldOnDestory();
      subPool.forEach(sub => sub.unsubscribe());
      console.log("[InjectObserver]: Unsubed all subscriptions");
    };
    return class extends constructor {
      someMethod() {}
    };
  };
};
