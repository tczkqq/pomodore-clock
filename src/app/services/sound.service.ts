import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs';

import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  settingsChanged = this.settingsService
    .getSettingsChanges()
    .pipe(
      takeUntilDestroyed(),
      tap(() => {
        this.volume = this.settingsService.volume;
        this.mute = this.settingsService.mute;
        this.sound = this.settingsService.sound;
      }),
    )
    .subscribe();

  volume = this.settingsService.volume;
  mute = this.settingsService.mute;
  sound = this.settingsService.sound;

  constructor(private settingsService: SettingsService) {}

  playSound(): void {
    if (this.mute) return;
    const audio = new Audio(`assets/sounds/${this.sound}`);
    audio.volume = this.volume / 100;
    audio.play();
  }
}
