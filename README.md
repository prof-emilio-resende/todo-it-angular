# 1. Criando projeto Angular
```bash
npx @angular/cli new todo-it-angular
```
> vamos escolher as opções CSS, sem SSR/SSG

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Agora basta adicionar as diretivas do angular em nosso arquivo styles.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## ajuste o conteúdo de tailwind.config.ts
```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## executando o projeto
```bash
npm run ng serve
```

## alterando o arquivo app.component.html para testar Angular + Tailwind CSS
```html
<div>
  <h1 class="text-3xl text-red-500">Angular + Tailwind!</h1>
</div>


<router-outlet />
```
# 2. Criando o primeiro componente (login)
```bash
npm run ng generate component login
```

ajustando o conteúdo para criar nossa tela de login

> Copie o conteúdo do nosso projeto para a tela de login [login.html](https://github.com/prof-emilio-resende/vite-vanilla-app/blob/main/src/login/index.html)

Agora basta criar a nova rota para navegação em nosso app.routes.ts
```typescript
// ...
import { LoginComponent } from './login/login.component';
// ...
export const routes: Routes = [
  { path: 'login', component: LoginComponent }
];
```
## extraindo o cabeçalho para um componente separado e reutilizável
```bash
npm run ng generate component components/appcontainer
```

## extraia o template principal do site para este componente:
```html
<div class="flex flex-col justify-center">
  <h1 class="text-3xl font-bold text-center leading-10 pt-10 pb-10">{{ title }}</h1>
  <div class="flex flex-col justify-center m-5 space-y-5">
    <h2 class="text-2xl font-bold text-center leading-5 pb-2">{{ subtitle }}</h2>
    <h3 class="text-xl text-center leading-5 pb-5">
      {{ headline }}
    </h3>
    <ng-content></ng-content>
  </div>
  <div
    class="fixed bottom-0 left-0 z-50 h-16 border-t-solid border-t-slate-400 border-t group inline-flex w-full items-center justify-center text-center px-4 py-2"
  >
    <span class="text-sm mt-10">
      Conhe&ccedil;a nossa Pol&iacute;tica de Privacidade
    </span>
  </div>
</div>
```
> observe que criamos áreas "especiais" reservadas para parâmetros de entrada usando "hadlebars" {{}} e também posicionamos a tag <ng-content></ng-content> no espaço reservado para renderização do conteúdo "encapsulado"

## altere o arquivo appcontainer.component.ts para receber os parâmetros
```typescript
  // ...
  @Input()
  title: string = 'TODO IT';

  @Input()
  subtitle: string = 'Subtitle';

  @Input()
  headline: string = 'Something useful';
  // ...
```

# ajuste o login.component.html para utilizar este novo componente
```html
<app-container subtitle="Login" headline="Preencha seu e-mail e defina sua senha">
  <form class="flex flex-col justify-center space-y-5" action="/todo/">
    <input
      type="text"
      placeholder="email@domain.com"
      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    />
    <input
      type="password"
      placeholder="senha"
      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    />
    <button
      type="submit"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-slate-700 text-slate-100 hover:bg-slate-700/90 h-10 px-4 py-2"
    >
      Entrar
    </button>
    <button
      type="button"
      onclick="navegar('/signup/')"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-blue-700 text-slate-100 hover:bg-blue-700/90 h-10 px-4 py-2"
    >
      Criar minha conta
    </button>
  </form>
</app-container>

```
Por fim, precisamos importar a referência ao componente "AppContainerComponent" em nosso login.component.ts

```typescript
// ...
imports: [AppContainerComponent],
// ...
```

# 3. Criando o componente de criação de conta e adicionando navegação

Vamos adicionar um novo componente, através do comando já conhecido
```bash
npm run ng generate component signup
```

Assim como fizemos antes, vamos copiar o conteúdo do já existente signup [signup.html](https://github.com/prof-emilio-resende/vite-vanilla-app/blob/main/src/signup/index.html) como base para a criação do nosso componente

Vamos utilizar o componente container e o resultado final será
```html
<app-container subtitle="Login" headline="Preencha seu e-mail e defina sua senha">
  <form class="flex flex-col justify-center space-y-5">
    <input type="text" placeholder="email@domain.com"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
    <input type="password" placeholder="senha"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
    <button type="button" onclick="navegar('/todo/')"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-slate-700 text-slate-100 hover:bg-slate-700/90 h-10 px-4 py-2">
        Criar minha conta
    </button>
    <button onclick="navegar('/login/')" type="button"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-red-700 text-slate-100 hover:bg-red-700/90 h-10 px-4 py-2">
        Cancelar
    </button>
</form>
</app-container>
```
Para finalizar, precisamos incluir a referência ao AppContainerComponent em nosso arquivo signup.component.ts e a nova rota no arquivo app.routes.ts
```typescript
// app.routes.ts
import { SignupComponent } from './signup/signup.component';
// ...
{ path: 'signup', component: SignupComponent }
// ...
```

```typescript
// signup.component.ts
// ...
import { AppContainerComponent } from '../components/appcontainer/appcontainer.component';
// ...
imports: [AppContainerComponent],
// ...
```

## adicionando navegação entre os componentes

Para entender melhor a navegação entre componentes, vamos criar um *seriço* no Angular, ou seja, uma classe que terá a responsabilidade de navegar entre os componentes conhecidos através das suas rotas registradas no arquivo app.routes.ts
```bash
npm run ng generate service components/navegador
```

Verifique o conteúdo do arquivo gerado (navegador.service.ts). Ele é um serviço disponível para consumo em nossa aplicação ... para usar seu conteúdo, vamos registrar essa dependência no arquivo login.component.ts
```typescript
// ...
constructor(private navegador: NavegadorService) {}
// ...
```

Agora vamos criar a funcionalidade de navegação no arquivo navegador.service.ts
```typescript
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavegadorService {
  constructor(private router: Router) {}

  navegar(path: string) {
    this.router.navigate([path]);
  }
}
```

Pronto! Serviço configurado e registrado, basta utilizá-lo em nosso componente de login, registrando e expondo uma função para ser acionada no clique dos botões
```typescript
// login.component.ts
// ...
  navegar(path: string) {
    this.navegador.navegar(path);
  }
// ...
```
```html
<!-- ... -->
<button
      type="button"
      (click)="navegar('/signup/')"
      ...
> Criar minha conta </button>
<!-- ... -->
```

Com isso feito, vamos testar essa funcionalidade acessando o componente de login e clicando no botão "Criar minha conta"

> Como próximo passo vamos substituir todas as utilizações de navegação para nossos componentes de login e signup

```html
<!--login.component.html-->
<!-- ... -->
<button
      type="button"
      (click)="navegar('/signup/')"
      ...
> Entrar </button>
<!-- ... -->
```

```typescript
// signup.component.ts
// ...
  navegar(path: string) {
    this.navegador.navegar(path);
  }
// ...
```

```html
<!--signup.component.html-->
<!-- ... -->
<button
type="button"
(click)="navegar('/login/')"
...
> Criar minha conta </button>
<!-- ... -->
```

```html
<!--signup.component.html-->
<!-- ... -->
<button
type="button"
(click)="navegar('/login/')"
...
> Cancelar </button>
<!-- ... -->
```
# 4. Criando componente de listagem de tarefas

Vamos adicionar um novo componente, através do comando já conhecido
```bash
npm run ng generate component todo
```

Assim como fizemos antes, vamos copiar o conteúdo do já existente todo list [todo.html](https://github.com/prof-emilio-resende/vite-vanilla-app/blob/main/src/todo/index.html) como base para a criação do nosso componente

Vamos utilizar o componente container e o resultado final será:

```html
<app-container subtitle="" headline="">
  <div class="flex flex-col justify-center align-middle items-center space-y-5">
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-11/12">
      <div class="flex flex-col space-y-1.5 p-5">
        <div class="flex flex-row justify-between align-middle">
          <h1>Atividade 1</h1>
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <p class="text-slate-500 font-medium">Descri&ccedil;&atilde;o simples</p>
        </div>
        <div class="flex flex-row justify-end">
          <div
            class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-black text-white">
            Pendente
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-11/12">
      <div class="flex flex-col space-y-1.5 p-5">
        <div class="flex flex-row justify-between align-middle">
          <h1>Atividade 2</h1>
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <p class="text-slate-500 font-medium">Descri&ccedil;&atilde;o simples</p>
        </div>
        <div class="flex flex-row justify-end">
          <div
            class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-500 text-black">
            Em andamento
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-11/12">
      <div class="flex flex-col space-y-1.5 p-5">
        <div class="flex flex-row justify-between align-middle">
          <h1>Atividade 3</h1>
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <p class="text-slate-500 font-medium">Descri&ccedil;&atilde;o simples</p>
        </div>
        <div class="flex flex-row justify-end">
          <div
            class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-500 text-white">
            Finalizado
          </div>
        </div>
      </div>
    </div>
  </div>
</app-container>

```

> A versão estática já está funcional, chegou a hora de integrar com nossa API ... que tal gerarmos os Cards a partir de uma chamada de API?

Como primeira etapa, vamos ajustar nosso serviço para ele trazer dados fictícios dos Cards

```typescript
// todo.component.ts
// ...
interface TodoEntity {
  title: string;
  description: string;
  status: string;
}
// ...
todoList: Array<TodoEntity> = [];
constructor() {
  this.todoList = this.loadData();
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
// ...
```

E agora vamos extrair o componente Card do nosso TODO
```bash
npm run ng generate component components/card
```

```typescript
// components/card.component.ts
import {Component, HostBinding, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {NavegadorService} from '../navegador.service';

@Component({
  selector: 'app-card',
  imports: [
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() status: string = '';

  @HostBinding('class') get hostClasses() {
    return "rounded-lg border bg-card text-card-foreground shadow-sm w-11/12";
  }

  getCardBadgeClasses() {
    const allClasses = "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ";
    const badges = {
      "Pendente": "bg-black text-white",
      "Em andamento": "bg-yellow-500 text-black",
      "Finalizado": "bg-green-500 text-white",
    } as Record<string, string>;

    return allClasses + badges[this.status];
  }
}

```

```html
<!--card.component.html-->
<div class="">
  <div class="flex flex-col space-y-1.5 p-5">
    <div class="flex flex-row justify-between align-middle">
      <h1>{{title}}</h1>
      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
          fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </div>
    <div>
      <p class="text-slate-500 font-medium">{{description}}</p>
    </div>
    <div class="flex flex-row justify-end">
      <div
        [ngClass]="getCardBadgeClasses()">
        {{status}}
      </div>
    </div>
  </div>
</div>
```

### nova versão do todo.component.html, após extrair o componente card

```angular181html
<app-container subtitle="" headline="">
  <div class="flex flex-col justify-center align-middle items-center space-y-5">
    @for (task of todoList; track task.title) {
    <app-card [title]="task.title" [description]="task.description" [status]="task.status" />
    }
  </div>
  <div class="w-full content-end text-right p-5">
    <button type="button" (click)="navegar('/todo/create')"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-slate-700 text-slate-100 hover:bg-slate-700/90 h-10 px-4 py-2">
      Novo Item
    </button>
  </div>
</app-container>
```

Por fim, adicionamos navegar ao nosso componente todo.component.ts
```typescript
// ...
    constructor(private navegador: NavegadorService) {
// ...
  navegar(path: string) {
    this.navegador.navegar(path);
  }
```
## adicionando a chamada HTTP
Para fazer uma chamada HTTP, vamos utilizar o serviço HttpClient da core-library do angular

```typescript
// app.config.ts
// ...
import {provideHttpClient, withFetch} from '@angular/common/http';
// ...
providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withFetch())]
```

```typescript
// todo.component.ts
import {Component, OnInit} from '@angular/core';
// ...
export class TodoComponent implements OnInit {
// ...
  constructor(private http: HttpClient, private navegador: NavegadorService) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }
  // ...
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
}
```

## implementando o serviço de deleção para os cards
```typescript
// card.component.ts
// ...
@Input() id: number = 0;
@Output() destroyFct: EventEmitter<number> = new EventEmitter(); //parametro para propagar chamada ao componente "pai"
// ...
destroy() {
  this.destroyFct.emit(this.id);
}
```
```html
<!--card.component.html-->
<svg (click)="destroy()" ...></svg> 
```
```typescript
// todo.component.ts
// ...
interface TodoEntity {
  id: number;
  title: string;
  description: string;
  status: string;
}
// ...
destroy(id: number) {
  const self = this;
  this.http.delete(`http://localhost:3000/api/todo/${id}`)
    .subscribe({
      next: async (res: any) => {
        console.log('chamada a API (destroy) com sucesso.');
        console.log(self);
        await self.loadData();
      },
      error: (err) => {
        console.log('erro ao carregar contas!');
        console.log(err);
      },
    });
}
```
```angular181html
<app-card [title]="task.title" [description]="task.description" [status]="task.status" [id]="task.id" (destroyFct)=destroy(task.id) />
```

Finalmente, vamos criar o último componente para criação de novas tarefas
