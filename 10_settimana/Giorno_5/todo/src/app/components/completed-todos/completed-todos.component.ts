import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-completed-todos',
  templateUrl: './completed-todos.component.html',
  styleUrls: ['./completed-todos.component.scss']
})
export class CompletedTodosComponent implements OnInit {
  completedTodos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadCompletedTodos();
  }

  loadCompletedTodos(): void {
    this.todoService.getCompletedTodos().subscribe(todos => {
      this.completedTodos = todos;
    });
  }

  updateTodoStatus(todo: Todo): void {
    this.todoService.updateTodoStatus(todo.id, !todo.completed).subscribe(() => {
      // Rimuovi il todo completato dalla lista dei todo visualizzati
      this.completedTodos = this.completedTodos.filter(t => t.id !== todo.id);
    });
  }
}
