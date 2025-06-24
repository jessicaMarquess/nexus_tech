# API de Notificações - NexusTech

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Powered-blue.svg)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Este repositório contém o código-fonte da API REST de Notificações, um serviço interno da **NexusTech**.

A aplicação foi desenvolvida utilizando uma stack moderna e robusta com **Node.js, TypeScript e Express**. Os dados são persistidos em um banco de dados **PostgreSQL**, e todo o ambiente de desenvolvimento é containerizado com **Docker e Docker Compose**, garantindo consistência e facilidade na configuração.

## ✨ Features

-   ✅ **Adicionar**, **Listar** e **Excluir** notificações.
-   🔐 **Autenticação** baseada em API Key para proteger os endpoints.
-   ⚙️ **Middleware de tratamento de erros** para respostas padronizadas e seguras.
-   🐘 **Persistência de dados** com PostgreSQL.
-   🐳 **Ambiente de desenvolvimento** totalmente containerizado com Docker.
-   🔄 **Gerenciamento de schema do banco de dados** com um sistema de Migrations.

## 🛠️ Tecnologias Utilizadas

| Categoria              | Tecnologia                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| **Backend** | [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/pt-br/), [TypeScript](https://www.typescriptlang.org/) |
| **Banco de Dados** | [PostgreSQL](https://www.postgresql.org/), [Kysely](https://kysely.dev/) (Query Builder), [node-pg-migrate](https://github.com/salsita/node-pg-migrate) |
| **Containerização** | [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)      |
| **Utilitários** | [dotenv](https://www.npmjs.com/package/dotenv), [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) |

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
-   [**Docker** e **Docker Compose**](https://www.docker.com/products/docker-desktop/)
-   [**Node.js** (versão 20.x ou superior)](https://nodejs.org/en/)
-   [**NPM**](https://www.npmjs.com/)
-   Um cliente de API como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar os endpoints.

## 🚀 Instalação e Execução

Com o Docker, o processo de setup é simplificado e garante que o ambiente funcione de forma idêntica para todos os desenvolvedores.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/jessicaMarquess/nexus_tech.git](https://github.com/jessicaMarquess/nexus_tech.git)
    cd nexus_tech
    ```

2.  **Configure as Variáveis de Ambiente:**
    Crie uma cópia do arquivo de exemplo `.env.example` (se ele existir) ou crie um arquivo `.env` do zero. Este arquivo contém todas as variáveis necessárias para rodar a aplicação.
    ```bash
    cp .env.example .env
    ```
    *(Não é necessário alterar os valores padrão para o ambiente de desenvolvimento).*

3.  **Instale as dependências locais:**
    Necessário para rodar os scripts de linha de comando, como as migrations.
    ```bash
    npm install
    ```

4.  **Inicie os Serviços com Docker Compose:**
    Este comando irá construir a imagem da sua API e iniciar os containers da API e do banco de dados em segundo plano.
    ```bash
    docker-compose up -d --build
    ```

5.  **Execute as Migrations do Banco de Dados:**
    Com os containers rodando, este comando irá criar as tabelas necessárias no banco de dados.
    ```bash
    npm run migrate -- up
    ```

**Pronto!** Sua API está rodando em `http://localhost:3000` e conectada ao banco de dados PostgreSQL.

## 🔄 Gerenciamento do Banco de Dados (Migrations)

Qualquer alteração na estrutura do banco de dados (criar tabelas, adicionar colunas, etc.) deve ser feita através de um novo arquivo de migration.

-   **Para criar um novo arquivo de migration:**
    ```bash
    npm run migrate -- create <nome-descritivo-da-migration>
    ```

-   **Para aplicar todas as migrations pendentes:**
    ```bash
    npm run migrate -- up
    ```

-   **Para reverter a última migration aplicada:**
    ```bash
    npm run migrate -- down
    ```

## 📡 Endpoints da API

A API segue os mesmos contratos de antes. O header `Authorization` é obrigatório em todos os endpoints.

-   **Header:** `Authorization`
-   **Valor:** `my-secret-api-key` (definido no arquivo `.env`)

---

### 1. Listar Notificações

-   **Método:** `GET`
-   **Endpoint:** `/notifications`
-   **Resposta de Sucesso (200 OK):**
    ```json
    [
        {
            "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "user": "ana.silva",
            "message": "Sua fatura de junho foi fechada.",
            "created_at": "2025-06-24T00:00:10.345Z"
        }
    ]
    ```

---

### 2. Adicionar Notificação

-   **Método:** `POST`
-   **Endpoint:** `/notifications`
-   **Corpo da Requisição (Body):**
    ```json
    {
      "user": "carlos.santos",
      "message": "Seu pedido #12345 foi enviado."
    }
    ```
-   **Resposta de Sucesso (201 Created):**
    ```json
    {
        "id": "gerado-pelo-banco-uuid",
        "user": "carlos.santos",
        "message": "Seu pedido #12345 foi enviado.",
        "created_at": "2025-06-24T00:05:20.123Z"
    }
    ```

---

### 3. Excluir Notificação

-   **Método:** `DELETE`
-   **Endpoint:** `/notifications/:id`
-   **Resposta de Sucesso (204 No Content):** Nenhum corpo de resposta.

## 🗂️ Estrutura da Tabela `notifications`

A estrutura da nossa tabela principal é definida pela migration e criada no PostgreSQL.

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user" VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.