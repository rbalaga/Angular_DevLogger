import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/Logs';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLogId: string = '';

  constructor(private logsService: LogsService) {}

  ngOnInit(): void {
    this.logsService.getLogs().subscribe((logs) => {
      this.logs = logs;
    });
    this.logsService.selectedLogId.subscribe((logId) => {
      this.selectedLogId = logId;
    });
  }

  selectLog = (log: Log) => {
    this.logsService.setLogSource(log);
  };

  removeLog = (log: Log) => {
    this.logsService.removeLog(log);
  };
}
