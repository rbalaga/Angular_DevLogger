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
  private selectedLogSource = new BehaviorSubject<string>(null);
  selectedLogId = this.selectedLogSource.asObservable();

  constructor() {
    this.logs = [
      {
        id: '0',
        title: 'Add your logs',
        date: new Date(),
      },
      {
        id: '1',
        title: 'Logs will be persistant over refresh 😎',
        date: new Date(),
      },
    ];
    if (this.getLocalStorage().length == 0) this.setLocalStorage();
  }

  setLogSource = (log: Log) => {
    this.logSource.next(log);
    this.selectedLogSource.next(log.id);
  };

  setSelectedLogId = (logId: string) => {
    this.selectedLogSource.next(logId);
  };

  getLogs = (): Observable<Log[]> => {
    this.logs = this.getLocalStorage();
    return of(this.logs);
  };

  addLog = (log: Log) => {
    this.logs.unshift({
      id: this.uuidv4(),
      title: log.title,
      date: new Date(),
    });
    this.setLocalStorage();
  };

  uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  removeLog = (log: Log) => {
    this.logs.forEach((lookupLog, idx) => {
      if (lookupLog.id === log.id) this.logs.splice(idx, 1);
    });
    this.setLocalStorage();
  };

  updateLog = (log: Log) => {
    this.logs.forEach((lookupLog, idx) => {
      if (lookupLog.id === log.id) this.logs.splice(idx, 1);
    });
    this.logs.unshift(log);
    this.setLocalStorage();
  };

  setLocalStorage = () => {
    localStorage.setItem('logs', JSON.stringify(this.logs));
  };

  getLocalStorage = (): Log[] =>
    localStorage.getItem('logs') !== null
      ? JSON.parse(localStorage.getItem('logs'))
      : [];
}
