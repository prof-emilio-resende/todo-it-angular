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


