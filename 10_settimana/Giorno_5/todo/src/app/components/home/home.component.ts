import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { UserService } from '../../services/user.service';
import { Todo } from '../../models/todo';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  users: User[] = [];
  searchQuery: string = '';

  constructor(private todoService: TodoService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadTodos();
    this.loadUsers();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.assignUserNames();
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.assignUserNames();
    });
  }

  assignUserNames(): void {
    this.todos.forEach(todo => {
      const user = this.users.find(user => user.id === todo.userId);
      if (user) {
        todo.userName = `${user.firstName} ${user.lastName}`;
      }
    });
  }

  updateTodoStatus(todo: Todo): void {
    this.todoService.updateTodoStatus(todo.id, !todo.completed).subscribe(updatedTodos => {
      this.todos = updatedTodos;
    });
  }

  filterTodos(): Todo[] {
    if (!this.searchQuery) {
      return this.todos;
    }
    return this.todos.filter(todo => todo.userName?.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
