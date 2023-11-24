import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';

import { ActionControlsComponent } from '@components/controls/action-controls/action-controls.component';
import { ModeControlsComponent } from '@components/controls/mode-controls/mode-controls.component';
import { TimerComponent } from '@components/timer/timer.component';
import { SettingsComponent } from '@components/settings/settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TimerComponent,
    ActionControlsComponent,
    ModeControlsComponent,
    SettingsComponent,
    MatDividerModule,
    MatSidenavModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pomodore-clock';

  showSettings = false;
}
