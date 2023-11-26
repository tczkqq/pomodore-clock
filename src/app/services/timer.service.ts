import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, delay, tap, timer } from 'rxjs';

import { NotificationService } from './notification.service';
import { SettingsService } from './settings.service';
import { SoundService } from './sound.service';
import { Mode } from '@models/misc.model';
import { capitalizeFirstLetter } from '@tools/misc';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerRunning = new BehaviorSubject<boolean>(false);
  private activeMode = new BehaviorSubject<Mode>(this.defaultActiveTimer);
  private timer = new BehaviorSubject<number>(
    this.settingsService.getModeTime(this.activeMode.value) * 60,
  );
  private countdown = timer(0, 1000)
    .pipe(
      takeUntilDestroyed(),
      tap(() => {
        if (this.timerRunning.value) this.timer.next(this.timer.value - 1);
      }),
      tap(() => {
        if (this.timer.value > 1) return;

        if (this.settingsService.notification) {
          const actionName = capitalizeFirstLetter(this.activeMode.value);

          const msg =
            this.activeMode.value === 'pomodore'
              ? "The work is over. It's time to take a break!"
              : 'The rest is over. Get back to work!';

          this.notificationService.sendNotification(`${actionName} finished!`, {
            vibrate: [200, 100, 200],
            requireInteraction: true,
            icon: '../../favicon.ico',
            body: msg,
          });
        }

        this.soundService.playSound();
        this.finishTimer();
      }),
    )
    .subscribe();

  private settingsChanged = this.settingsService
    .getSettingsChanges()
    .pipe(
      takeUntilDestroyed(),
      tap(() => {
        if (!this.timerRunning.value)
          setTimeout(() => this.restartTimer(), 100);
      }),
      delay(1000),
    )
    .subscribe();

  constructor(
    private notificationService: NotificationService,
    private settingsService: SettingsService,
    private soundService: SoundService,
  ) {}

  private get defaultActiveTimer(): Mode {
    return ['pomodore', 'shortBreak', 'longBreak'].includes(
      localStorage.getItem('activeMode') as Mode,
    )
      ? (localStorage.getItem('activeMode') as Mode)
      : 'pomodore';
  }

  startTimer(): void {
    this.timerRunning.next(true);
  }

  stopTimer(): void {
    this.timerRunning.next(false);
  }

  restartTimer(): void {
    this.stopTimer();
    this.timer.next(
      this.settingsService.getModeTime(this.activeMode.value) * 60,
    );
  }

  finishTimer(): void {
    this.activeMode.next(
      this.activeMode.value === 'pomodore' ? 'shortBreak' : 'pomodore',
    );
    this.timerRunning.next(false);
    this.stopTimer();
    this.timer.next(
      this.settingsService.getModeTime(this.activeMode.value) * 60,
    );
  }

  getTimerStatus(): Observable<boolean> {
    return this.timerRunning.asObservable();
  }

  setActiveMode(mode: Mode): void {
    localStorage.setItem('activeMode', mode);
    this.activeMode.next(mode);
    this.restartTimer();
  }

  getActiveMode(): Observable<Mode> {
    return this.activeMode.asObservable();
  }

  getTimer(): Observable<number> {
    return this.timer.asObservable();
  }
}
