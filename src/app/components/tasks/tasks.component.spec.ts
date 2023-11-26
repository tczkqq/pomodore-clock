import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete selected tasks', () => {
    component.tasks = [
      { id: 0, name: 'Task 1', completed: false },
      { id: 1, name: 'Task 2', completed: false },
      { id: 2, name: 'Task 3', completed: false },
    ];
    component.tasksSelected = [
      { id: 0, name: 'Task 1', completed: false },
      { id: 2, name: 'Task 3', completed: false },
    ];
    component.deleteSelectedTasks();
    expect(component.tasks).toEqual([
      { id: 1, name: 'Task 2', completed: false },
    ]);
  });

  it('should add new task', () => {
    component.tasks = [
      { id: 0, name: 'Task 1', completed: false },
      { id: 1, name: 'Task 2', completed: false },
      { id: 2, name: 'Task 3', completed: false },
    ];
    component.newTaskControl.setValue('Task 4');
    component.onNewTaskClick();
    expect(component.tasks).toEqual([
      { id: 0, name: 'Task 1', completed: false },
      { id: 1, name: 'Task 2', completed: false },
      { id: 2, name: 'Task 3', completed: false },
      { id: 3, name: 'Task 4', completed: false },
    ]);
  });

  it('should not add new task if control is invalid', () => {
    component.tasks = [
      { id: 0, name: 'Task 1', completed: false },
      { id: 1, name: 'Task 2', completed: false },
      { id: 2, name: 'Task 3', completed: false },
    ];
    component.newTaskControl.setValue('');
    component.onNewTaskClick();
    expect(component.tasks).toEqual([
      { id: 0, name: 'Task 1', completed: false },
      { id: 1, name: 'Task 2', completed: false },
      { id: 2, name: 'Task 3', completed: false },
    ]);
  });
});
