import "reflect-metadata";
import { BehaviorSubject } from "rxjs";
export function serializable(Clazz?: new () => any) {
  return (target, key) => {
    if (Clazz) {
      Reflect.defineMetadata("serialize:class", Clazz, target, key);
    }
  };
}
export const serialize = (store: any) => {
  const obj: any = {};
  for (const [key, value] of Object.entries(store)) {
    if (value instanceof BehaviorSubject) {
      const subject = value;
      const v = subject.getValue();
      if (v) {
        obj[key] = v;
      }
    } else {
      obj[key] = value;
    }
  }
  return JSON.stringify(obj);
};

export const hydrate = <T>(sourceObj: Object, targetObject: T): T => {
  for (let [key, sourceValue] of Object.entries(sourceObj)) {
    const C = Reflect.getMetadata("design:type", targetObject, key);
    if (C) {
      sourceValue = hydrate(sourceValue, new C());
    }
    if (sourceValue) {
      const targetValue = targetObject[key];
      if (targetValue instanceof BehaviorSubject) {
        targetValue.next(sourceValue);
      } else {
        targetObject[key] = sourceValue;
      }
    }
  }
  return targetObject;
};
