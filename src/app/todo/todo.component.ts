import { Component } from '@angular/core';
import {AppContainerComponent} from '../components/appcontainer/appcontainer.component';
import {CardComponent} from '../components/card/card.component';
import {NavegadorService} from '../components/navegador.service';

interface TodoEntity {
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
export class TodoComponent {
  todoList: Array<TodoEntity> = [];

  constructor(private navegador: NavegadorService) {
    this.todoList = this.loadData();
  }

  navegar(path: string) {
    this.navegador.navegar(path);
  }

  loadData() {
    return [
      {
        title: "Atividade 1",
        description: "Descrição atividade um",
        status: "Pendente",
      },
      {
        title: "Atividade 2",
        description: "Descrição atividade dois",
        status: "Em andamento",
      },
      {
        title: "Atividade 3",
        description: "Descrição atividade três",
        status: "Finalizado",
      }
    ]
  }
}
