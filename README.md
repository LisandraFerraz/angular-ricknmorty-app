# Rick and Morty Pédia 🧪🤓

O projeto foi criado com o objetivo de criar uma plataforma limpa e convidativa para fãs da série Rick and Morty.

Com essa ferramente, fãs pode pesquisar sobre os personagens - e versões diferentes dos mesmos - que mais gosta.

![Prévia do projeto](https://github.com/user-attachments/assets/55202d3e-f7a2-4045-994d-0927b420cf6a)

## Rodando localmente

Requisitos:

- Angular ver. >18.2.18
- Node >18.19.1

Comandos para instalação e inicialização:

      > npm install -g @angular/cli
      > git clone <link-do-repositorio>
      > cd angular-ricknmorty-app
      > npm install
      > ng serve

## Guia pelo projeto

      src
      ├── app
      │   ├── core
      │   │   ├── core-api.service.ts // configuração de HTTP requests
      │   │   ├── endpoints.ts // variáveis de endpoints de APIs
      │   │   ├── environment.ts // ambiente para URLs
      │   │   └── interceptor.interceptor.ts // interceptor de requests HTTP, prepara a URL
      │   ├── pages
      │   │   ├── character-details // página para detalhes de personagens
      │   │   ├── characters-list // listagem de personagens
      │   │   └── episodes-list // listagem de episódios
      │   ├── services
      │   │   ├── content.service.ts // funções para retorno de observables em requisições HTTP
      │   │   ├── loader.service.ts // emissor de behavior para o loader
      │   │   └── search.service.ts // funções de filtragem compartilhadas entre personagens e episodios
      │   └── shared
      │       ├── components
      │       │   ├── character-card // componente card para personagens
      │       │   ├── episodes-card // componente card para episódios
      │       │   ├── horizontal-scroller // scroller para listagem horizontal
      │       │   ├── list-header // header dos componentes de listagem
      │       │   ├── loader // componente visual loader
      │       │   ├── modal-template // template padrão para modals
      │       │   │   ├── episode-details-modal // modal de detalhes do episodio
      │       │   │   └── search-modal // template padrão para filtragem
      │       │   │       ├── search-character // modal para filtragem de personagem com campos especificos
      │       │   │       ├── search-episode // modal para filtragem de episodio com campos especificoss
      │       │   └── sidebar
      │       ├── data // mocks
      │       └── utils
      │           ├── classes // classes das propriedades
      │           ├── directives // diretiva para scroll infinito
      │           ├── functions // funcoes compartilhaveis
      │           └── interfaces // interfaces de referencia para propriedades
      ├── global.scss // arquivo de estilo padrão
      ├── index.html
      ├── main.ts
      └── styles
         └── _custom.scss // configuração de variáveis de estilo e reset de outras do bootstrap
