import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { TimerService } from '@services/timer.service';
import { Mode } from '@models/misc.model';

@Component({
  selector: 'app-mode-controls',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './mode-controls.component.html',
  styleUrl: './mode-controls.component.scss',
})
export class ModeControlsComponent {
  activeMode$ = this.timer.getActiveMode().pipe(takeUntilDestroyed());

  constructor(private timer: TimerService) {}

  setActiveMode(mode: Mode) {
    this.timer.setActiveMode(mode);
  }
}
