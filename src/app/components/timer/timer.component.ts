import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TimerService } from '@services/timer.service';
import { FormatTimePipe } from '@tools/format-time.pipe';
import { tap } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormatTimePipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  timePipe = new FormatTimePipe();

  timer$ = this.timerService.getTimer().pipe(
    takeUntilDestroyed(),
    tap((timer) => {
      document.title = this.timePipe.transform(timer) + ' - Pomodore Clock';
    }),
  );

  constructor(private timerService: TimerService) {}
}
