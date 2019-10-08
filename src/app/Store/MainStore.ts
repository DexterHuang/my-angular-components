import { BehaviorSubject } from "rxjs";
import { Potato } from "../Model/Potato";
import { Person } from "../Model/Person";
export class MainStore {
  static testValue = new BehaviorSubject<number>(0);
  static potato: BehaviorSubject<Potato> = new BehaviorSubject<Potato>(
    new Potato()
  );
  static ppap: Person = new Person();
}
