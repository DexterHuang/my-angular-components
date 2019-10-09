import { buffer } from "rxjs/operators";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable, Subject } from "rxjs";
export class ThreadHandler {
  static subjectMap: { [key: string]: Subject<any> } = {};
  static buffer<T, R>(
    key: string,
    l: T[],
    task: (list: T[]) => Promise<R>,
    { debounceTime = 500 } = {}
  ): Promise<R> {
    return new Promise(resolve => {
      const onCompleteKey = `${key}_ON_COMPLETE`;
      let subject = this.subjectMap[key];
      if (!subject) {
        this.subjectMap[key] = new Subject();
        subject = this.subjectMap[key];
        const debounced = subject.pipe(
          buffer(subject.debounceTime(debounceTime))
        );

        const onCompleteSubject = new Subject();
        this.subjectMap[onCompleteKey] = onCompleteSubject;
        debounced.subscribe(async list => {
          const result = await task(list);
          onCompleteSubject.next(result);
        });
      }
      const onComplete = this.subjectMap[onCompleteKey];
      onComplete.subscribe(result => {
        resolve(result);
      });
      l.forEach(i => subject.next(i));
    });
  }
}
