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
});
