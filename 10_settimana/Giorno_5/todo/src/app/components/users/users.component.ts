// src/app/components/users/users.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TodoService } from '../../services/todo.service';
import { User } from '../../models/user';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  todos: Todo[] = [];

  constructor(private userService: UserService, private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadTodos();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  getUserTodos(userId: number): Todo[] {
    return this.todos.filter(todo => todo.userId === userId);
  }

  updateTodoStatus(todo: Todo): void {
    this.todoService.updateTodoStatus(todo.id, !todo.completed).subscribe(() => {
      // Aggiorna la lista dei todo dopo aver aggiornato lo stato
      this.loadTodos();
    });
  }
}
