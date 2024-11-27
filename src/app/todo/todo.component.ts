import {Component, OnInit} from '@angular/core';
import {AppContainerComponent} from '../components/appcontainer/appcontainer.component';
import {CardComponent} from '../components/card/card.component';
import {NavegadorService} from '../components/navegador.service';
import {HttpClient} from '@angular/common/http';

interface TodoEntity {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-todo',
  imports: [AppContainerComponent, CardComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  standalone: true,
})
export class TodoComponent implements OnInit {
  todoList: Array<TodoEntity> = [];

  constructor(private http: HttpClient, private navegador: NavegadorService) {
  }

  async ngOnInit(): Promise<void> {
      await this.loadData();
  }

  navegar(path: string) {
    this.navegador.navegar(path);
  }

  async loadData() {
    this.http.get("http://localhost:3000/api/todo")
      .subscribe({
        next: (res: any) => {
          console.log('chamada a API com sucesso.');
          console.log(res);
          this.todoList = res;
        },
        error: (err) => {
          console.log('erro ao carregar contas!');
          console.log(err);
        },
      });
  }

  destroy(id: number) {
    const self = this;
    this.http.delete(`http://localhost:3000/api/todo/${id}`)
      .subscribe({
        next: async (res: any) => {
          console.log('chamada a API (destroy) com sucesso.');
          console.log('1 ...');
          console.log(self);
          console.log('2 ...');
          await self.loadData();
          console.log('3 ...');
        },
        error: (err) => {
          console.log('erro ao carregar contas!');
          console.log(err);
        },
      });
  }
}
