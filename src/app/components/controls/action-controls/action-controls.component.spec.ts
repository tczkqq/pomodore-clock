import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionControlsComponent } from './action-controls.component';

describe('ActionControlsComponent', () => {
  let component: ActionControlsComponent;
  let fixture: ComponentFixture<ActionControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open tasks list', () => {
    const spy = spyOn(component.tasksListButtonClicked, 'emit');
    component.onTasksListClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should open tasks list', () => {
    const spy = spyOn(component.settingsButtonClicked, 'emit');
    component.onSettingsClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should restart timer', () => {
    const spy = spyOn(component['timer'], 'restartTimer');
    component.onRestartClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should finish timer', () => {
    const spy = spyOn(component['timer'], 'finishTimer');
    component.onEarlyFinishClick();
    expect(spy).toHaveBeenCalled();
  });
});
