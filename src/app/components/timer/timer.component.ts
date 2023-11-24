import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TimerService } from '@services/timer.service';
import { FormatTimePipe } from '@tools/format-time.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormatTimePipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  timer$ = this.timerService.getTimer().pipe(takeUntilDestroyed());

  constructor(private timerService: TimerService) {}
}
