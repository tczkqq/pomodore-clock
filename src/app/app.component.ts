import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';

import { ActionControlsComponent } from '@components/controls/action-controls/action-controls.component';
import { ModeControlsComponent } from '@components/controls/mode-controls/mode-controls.component';
import { SettingsComponent } from '@components/settings/settings.component';
import { TasksComponent } from '@components/tasks/tasks.component';
import { TimerComponent } from '@components/timer/timer.component';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatSidenavModule,
    MatCardModule,
    ActionControlsComponent,
    ModeControlsComponent,
    SettingsComponent,
    TimerComponent,
    TasksComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'pomodore-clock';

  showSettings = false;
  showTasksList = false;

  constructor(private notificationService: NotificationService) {}

  ngAfterViewInit(): void {
    this.notificationService.requestPermission();
  }
}
