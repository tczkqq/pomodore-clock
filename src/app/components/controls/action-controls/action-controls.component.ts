import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { take } from 'rxjs';

import { TimerService } from '@services/timer.service';

@Component({
  selector: 'app-action-controls',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './action-controls.component.html',
  styleUrl: './action-controls.component.scss',
})
export class ActionControlsComponent {
  @Output() settingsButtonClicked = new EventEmitter<void>();

  timerStatus$ = this.timer.getTimerStatus().pipe(takeUntilDestroyed());

  constructor(private timer: TimerService) {}

  onStartPauseClick(): void {
    this.timerStatus$
      .pipe(take(1))
      .subscribe((status) =>
        status ? this.timer.stopTimer() : this.timer.startTimer(),
      );
  }

  onEarlyFinishClick(): void {
    this.timer.finishTimer();
  }

  onRestartClick(): void {
    this.timer.restartTimer();
  }

  onSettingsClick(): void {
    this.settingsButtonClicked.emit();
  }
}
