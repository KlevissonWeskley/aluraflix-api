# Alura Flix API

### API desenvolvida no desafio de back-end da Alura, consiste em uma API de cadastro de vídeos.

## Rodando o servidor

- `git clone https://github.com/KlevissonWeskley/aluraflix-api.git`

- `cd alura-flix-api`
- `npm i`
- `docker compose up -d`
- `npx prisma migrate dev`
- `npm run dev`



## Endpoints

A seguir estão os principais endpoints disponíveis na API:

- `Users`

-  `POST /users` => Registrar um usuário
-  `POST /users/login` => Fazer login

#

- `Videos`

- `GET /videos` => Pegar todos os vídeos
- `GET /videos/:videoId` => Pegar um vídeo pelo ID    
- `GET /videos/search` => Pesquisar um vídeo por título   
- `GET /videos/category/:categoryId` => Pegar os vídeos associados a uma categoria    
- `POST /videos` => Criar um vídeo    
- `PUT /videos/:videoId` => Editar um vídeo    
- `DELETE /videos/:videoId` => Deletar um vídeo   

#

- `Categorias`

- `GET /categories` => Pegar todas as categorias
- `GET /categories/:categoryId` => Pegar uma categoria por ID
- `POST /categories` => Criar uma categoria
- `PATCH /categories` => Editar uma categoria
- `DELETE /categories/:categoryId` => Deletar uma categoria

## Tecnologias

[![My Skills](https://skillicons.dev/icons?i=nodejs,ts,postgresql,prisma,docker)](https://skillicons.dev)