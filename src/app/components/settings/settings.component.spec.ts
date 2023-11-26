import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should restart settings to default', () => {
    const spy = spyOn(component['settingService'], 'restartSettingsToDefault');
    component.onRestartSettingsClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should test sound', () => {
    const spy = spyOn(component['soundService'], 'playSound');
    component.onTestSoundClick();
    expect(spy).toHaveBeenCalled();
  });
});
