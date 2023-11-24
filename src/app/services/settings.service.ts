import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Mode } from '@models/misc.model';
import { SOUNDS, Sound } from '@constants/sounds';
import {
  DEFAULT_POMODORE_TIME,
  DEFAULT_SHORT_BREAK_TIME,
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_VOLUME,
} from '@constants/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsChanges = new Subject<void>();

  get pomodoreTime(): number {
    return (
      Number(localStorage.getItem('pomodoreTime')) || DEFAULT_POMODORE_TIME
    );
  }

  set pomodoreTime(value: number) {
    localStorage.setItem('pomodoreTime', String(value));
    this.settingsChanges.next();
  }

  get shortBreakTime(): number {
    return (
      Number(localStorage.getItem('shortBreakTime')) || DEFAULT_SHORT_BREAK_TIME
    );
  }

  set shortBreakTime(value: number) {
    localStorage.setItem('shortBreakTime', String(value));
    this.settingsChanges.next();
  }

  get longBreakTime(): number {
    return (
      Number(localStorage.getItem('longBreakTime')) || DEFAULT_LONG_BREAK_TIME
    );
  }

  set longBreakTime(value: number) {
    this.settingsChanges.next();
    localStorage.setItem('longBreakTime', String(value));
  }

  get volume(): number {
    return Number(localStorage.getItem('volume')) || DEFAULT_VOLUME;
  }

  set volume(value: number) {
    localStorage.setItem('volume', String(value));
    this.settingsChanges.next();
  }

  get mute(): boolean {
    return localStorage.getItem('mute') === 'true';
  }

  set mute(value: boolean) {
    localStorage.setItem('mute', String(value));
    this.settingsChanges.next();
  }

  get notification(): boolean {
    return localStorage.getItem('notification') === 'true';
  }

  set notification(value: boolean) {
    localStorage.setItem('notification', String(value));
    this.settingsChanges.next();
  }

  get sound(): string {
    return localStorage.getItem('sound') || SOUNDS[0].file;
  }

  set sound(value: Sound) {
    localStorage.setItem('sound', String(value));
    this.settingsChanges.next();
  }

  getSettingsChanges(): Observable<void> {
    return this.settingsChanges.asObservable();
  }

  getModeTime(mode: Mode): number {
    switch (mode) {
      case 'pomodore':
        return this.pomodoreTime;
      case 'shortBreak':
        return this.shortBreakTime;
      case 'longBreak':
        return this.longBreakTime;
      default:
        return 0;
    }
  }

  restartSettingsToDefault(): void {
    this.mute = false;
    this.volume = DEFAULT_VOLUME;
    this.sound = SOUNDS[0].file as Sound;
    this.pomodoreTime = DEFAULT_POMODORE_TIME;
    this.shortBreakTime = DEFAULT_SHORT_BREAK_TIME;
    this.longBreakTime = DEFAULT_LONG_BREAK_TIME;
  }
}
