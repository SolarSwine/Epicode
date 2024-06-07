import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iUser } from '../../Models/i-user'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] // Assicurati di avere il file SCSS se necessario
})
export class ListComponent implements OnInit {
  users: iUser[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<iUser[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
    });
  }
}
