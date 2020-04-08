import { Injectable } from '@angular/core';
import { Log } from '../models/Logs';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({
    id: null,
    title: null,
    date: null,
  });
  selectedLog = this.logSource.asObservable();

  constructor() {
    this.logs = [
      {
        id: 'RAMMOHANA RAO BALAGA',
        title: 'RAMMOHANA RAO BALAGA',
        date: new Date(),
      },
      {
        id: '2',
        title: 'SURESH BALAGA',
        date: new Date(),
      },
    ];
  }

  setLogSource = (log: Log) => {
    this.logSource.next(log);
  };

  getLogs = (): Observable<Log[]> => {
    return of(this.logs);
  };

  addLog = (log: Log) => {
    this.logs.unshift({
      id: this.logs.length.toString(),
      title: log.title,
      date: new Date(),
    });
  };

  removeLog = (log: Log) => {
    this.logs = this.logs.filter((lookupLog) => log.id === lookupLog.id);
  };

  updateLog = (log: Log) => {
    this.logs = this.logs.map((lookupLog) =>
      log.id === lookupLog.id ? log : lookupLog
    );
  };
}
