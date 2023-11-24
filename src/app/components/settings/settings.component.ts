import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { SettingsService } from '@services/settings.service';
import { SoundService } from '@services/sound.service';
import { DEFAULT_SETTING_DEBOUNCE } from '@constants/settings';
import { SOUNDS, Sound } from '@constants/sounds';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements AfterViewInit {
  pomodoreControl = new FormControl(this.settingService.pomodoreTime, [
    Validators.min(1),
    Validators.max(99),
  ]);

  shortBreakControl = new FormControl(this.settingService.shortBreakTime, [
    Validators.min(1),
    Validators.max(99),
  ]);

  longBreakControl = new FormControl(this.settingService.longBreakTime, [
    Validators.min(1),
    Validators.max(99),
  ]);

  muteControl = new FormControl(this.settingService.mute);

  volumeControl = new FormControl(this.settingService.volume);

  soundControl = new FormControl(this.settingService.sound);

  soundList = SOUNDS;

  settingsChanged$ = this.settingService.getSettingsChanges().pipe(
    takeUntilDestroyed(),
    tap(() => {
      this.pomodoreControl.setValue(this.settingService.pomodoreTime);
      this.shortBreakControl.setValue(this.settingService.shortBreakTime);
      this.longBreakControl.setValue(this.settingService.longBreakTime);
      this.muteControl.setValue(this.settingService.mute);
      this.volumeControl.setValue(this.settingService.volume);
      this.soundControl.setValue(this.settingService.sound);
    }),
  );

  constructor(
    private settingService: SettingsService,
    private soundService: SoundService,
  ) {}

  ngAfterViewInit(): void {
    this.pomodoreControl.valueChanges
      .pipe(
        debounceTime(DEFAULT_SETTING_DEBOUNCE),
        distinctUntilChanged(),
        tap((newValue) => {
          if (this.pomodoreControl.valid && newValue)
            this.settingService.pomodoreTime = newValue;
        }),
      )
      .subscribe();

    this.shortBreakControl.valueChanges
      .pipe(
        debounceTime(DEFAULT_SETTING_DEBOUNCE),
        distinctUntilChanged(),
        tap((newValue) => {
          if (this.shortBreakControl.valid && newValue)
            this.settingService.shortBreakTime = newValue;
        }),
      )
      .subscribe();

    this.longBreakControl.valueChanges
      .pipe(
        debounceTime(DEFAULT_SETTING_DEBOUNCE),
        distinctUntilChanged(),
        tap((newValue) => {
          if (this.longBreakControl.valid && newValue)
            this.settingService.longBreakTime = newValue;
        }),
      )
      .subscribe();

    this.muteControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((newValue) => {
          if (newValue !== null) this.settingService.mute = newValue;
        }),
      )
      .subscribe();

    this.volumeControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((newValue) => {
          if (this.volumeControl.valid && newValue)
            this.settingService.volume = newValue;
        }),
      )
      .subscribe();

    this.soundControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((newValue) => {
          this.settingService.sound = newValue as Sound;
        }),
      )
      .subscribe();

    this.settingsChanged$.subscribe();
  }

  formatLabel(value: number): string {
    return `${value}%`;
  }

  onTestSoundClick(): void {
    this.soundService.playSound();
  }

  onRestartSettingsClick(): void {
    this.settingService.restartSettingsToDefault();
  }
}
