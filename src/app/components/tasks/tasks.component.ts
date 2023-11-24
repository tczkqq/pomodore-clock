import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { ITask } from '@models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  tasksSelected: ITask[] = [];
  tasks: ITask[] = [];

  newTaskControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.loadTasksFromStorage();
  }

  deleteSelectedTasks(): void {
    this.tasksSelected.forEach((task) => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
    this.tasksSelected = [];
    this.saveTasksToStorage();
  }

  onNewTaskClick(): void {
    if (this.newTaskControl.valid) {
      this.tasks.push({
        id: this.tasks.length,
        completed: false,
        name: this.newTaskControl.value as string,
      });
      this.newTaskControl.reset();
      this.saveTasksToStorage();
    }
  }

  loadTasksFromStorage(): void {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
    const tasksSelected = localStorage.getItem('tasksSelected');
    if (tasksSelected) {
      this.tasksSelected = JSON.parse(tasksSelected);
    }

    this.tasks.forEach((task) => {
      if (this.tasksSelected.find((t) => t.id === task.id)) {
        task.completed = true;
      } else {
        task.completed = false;
      }
    });
  }

  saveTasksToStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('tasksSelected', JSON.stringify(this.tasksSelected));
  }
}
