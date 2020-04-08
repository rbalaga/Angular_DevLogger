import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';
import { Log } from 'src/app/models/Logs';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css'],
})
export class LogFormComponent implements OnInit {
  log: Log = {
    id: null,
    title: null,
    date: new Date(),
  };
  isNew: boolean = true;

  constructor(private logService: LogsService) {}

  ngOnInit(): void {
    this.logService.selectedLog.subscribe((log) => {
      this.isNew = false;
      this.log = log;
    });
  }

  onLogSelectTrigger = () => {};

  formSubmit = () => {
    if (this.log.id === null) {
      this.logService.addLog(this.log);
    } else {
      this.logService.updateLog(this.log);
    }
    this.resetForm();
  };

  resetForm = () => {
    this.isNew = true;
    this.log = {
      id: null,
      title: null,
      date: null,
    };
  };
}
