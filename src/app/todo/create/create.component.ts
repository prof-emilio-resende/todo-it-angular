import {Component} from '@angular/core';
import {AppContainerComponent} from '../../components/appcontainer/appcontainer.component';
import {NavegadorService} from '../../components/navegador.service';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {createApplication} from '@angular/platform-browser';

interface TarefaEntity {
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-create',
  imports: [
    AppContainerComponent,
    FormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  standalone: true,
})
export class CreateComponent {
  title: string = '';
  description: string = '';

  constructor(private http: HttpClient, private navegador: NavegadorService) {
  }

  navegar(path: string) {
    this.navegador.navegar(path);
  }

  criarTarefa() {
    const novaTarefa = {
      title: this.title,
      description: this.description,
      status: "Pendente"
    } as TarefaEntity;

    console.log("criando nova tarefa ...");
    console.log(novaTarefa);

    this.http.post("http://localhost:3000/api/todo", novaTarefa).subscribe({
      next: (res: any) => {
        console.log("Nova tarefa criada com sucesso!");
        this.navegador.navegar("/todo");
      },
      error: err => {
        console.log("Erro ao tentar criar nova tarefa.");
        console.log(err);
      }
    })

  }

  protected readonly createApplication = createApplication;
}
