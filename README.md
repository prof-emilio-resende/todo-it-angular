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

> Copie o conteúdo do nosso projeto para a tela de login [login.html]()

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
