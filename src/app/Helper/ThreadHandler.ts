import { buffer } from "rxjs/operators";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
export class ThreadHandler {
  static bufferMap: { [key: string]: BehaviorSubject<any> } = {};
  static buffer<T>(
    key: string,
    l: T[],
    task: (list: T[]) => Promise<void>,
    { debounceTime = 500 } = {}
  ): void {
    let subject = this.bufferMap[key];
    if (!subject) {
      this.bufferMap[key] = new BehaviorSubject(null);
      subject = this.bufferMap[key];
      subject
        .filter(i => !!i)
        .pipe(buffer(subject.debounceTime(debounceTime)))
        .subscribe(task);
    }
    l.forEach(i => subject.next(i));
  }
}
