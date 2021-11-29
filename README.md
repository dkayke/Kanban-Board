# Kanban Board
![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

Esse projeto tem como objetivo principal criar uma interface Kanban minimamente útil com inserção alteração e deleção de tasks/cards e manipulação entre 3 colunas (To Do / In Progress / Done).

### Tecnologias

Foi utilizado diversar tecnologias no projeto, abaixo estão as principais:

- [React] - principal biblioteca
- [Typescript] - superset JavaScript
- [Axios] - para integração com backend fornecido.
- [JavaScript Cookie] - para manutenção do token de sessão
- [RxJS] - na criação de observadores de conexão
- [React Icons] - iconização do projeto

Todas as tecnologias citadas são gratuitas e de fácil acesso.

### Instalação

É necessário possui o Node.js instalado.

Instale as dependências.

```sh
npm i
```

Execute o script abaixo para inicializar o projeto, o servidor subirá na porta 3000 caso a mesma não esteja em uso.

```sh
npm run start
```
```sh
127.0.0.1:3000
```
Para ambiente de produção, execute o comando de build.

```sh
npm run build
```

### Backend

Para inicializar o backend, execute os seguintes comandos a partir da raiz desse repositório.

```sh
cd backend
npm i
npm run server
```

Ele responderá às requisições em na porta 5000 caso não esteja em uso.

```sh
127.0.0.1:5000
```
### License

MIT
