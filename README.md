# API de Notificações - NexusTech

Este repositório contém o código-fonte da API REST de Notificações, um serviço interno da **NexusTech**.

A API foi desenvolvida com Node.js e Express, e tem como objetivo gerenciar um sistema simples de notificações. O projeto demonstra o uso de middlewares para autenticação e tratamento de erros, e utiliza um armazenamento de dados em memória para simplicidade e agilidade no desenvolvimento.

## ✨ Features

-   ✅ **Adicionar** uma nova notificação.
-   ✅ **Listar** todas as notificações existentes.
-   ✅ **Excluir** uma notificação pelo seu ID.
-   🔐 **Autenticação** baseada em API Key para proteger os endpoints.
-   ⚙️ **Middleware de tratamento de erros** para respostas padronizadas e seguras.

## 🛠️ Tecnologias Utilizadas

-   [Node.js](https://nodejs.org/en/)
-   [Express.js](https://expressjs.com/pt-br/)
-   [uuid](https://www.npmjs.com/package/uuid) para a geração de IDs únicos.

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
-   [Node.js (versão 18.x ou superior)](https://nodejs.org/en/)
-   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## 🚀 Instalação e Execução

1.  **Clone o repositório:**
    ```bash
   
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd nexus-notifications-api
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor:**
    ```bash
    npm start
    ```

O servidor será iniciado em `http://localhost:3000`.

## 📡 Endpoints da API

A seguir estão detalhados os endpoints disponíveis na API.

### Autenticação

Todos os endpoints requerem uma chave de API para serem acessados. A chave deve ser enviada no header da requisição.

-   **Header:** `Authorization`
-   **Valor:** `my-secret-api-key` (Esta é a chave de exemplo usada no projeto)

Se a chave não for fornecida ou for inválida, a API retornará um erro `401 Unauthorized`.

---

### 1. Listar Notificações

Retorna a lista de todas as notificações cadastradas.

-   **Método:** `GET`
-   **Endpoint:** `/notifications`
-   **Headers:**
    -   `Authorization: my-secret-api-key`
-   **Resposta de Sucesso (200 OK):**
    ```json
    [
        {
            "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "user": "ana.silva",
            "message": "Sua fatura de junho foi fechada.",
            "createdAt": "2025-06-23T23:00:00.000Z"
        },
        {
            "id": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
            "user": "bruno.costa",
            "message": "Lembrete: Reunião de equipe amanhã às 10h.",
            "createdAt": "2025-06-23T23:05:10.000Z"
        }
    ]
    ```

---

### 2. Adicionar Notificação

Cria uma nova notificação.

-   **Método:** `POST`
-   **Endpoint:** `/notifications`
-   **Headers:**
    -   `Authorization: my-secret-api-key`
    -   `Content-Type: application/json`
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
        "id": "gerado-pela-api-uuid",
        "user": "carlos.santos",
        "message": "Seu pedido #12345 foi enviado.",
        "createdAt": "2025-06-23T23:10:15.000Z"
    }
    ```
-   **Resposta de Erro (400 Bad Request):**
    -   Caso os campos `user` ou `message` não sejam enviados.
    ```json
    {
      "error": "Os campos 'user' e 'message' são obrigatórios."
    }
    ```

---

### 3. Excluir Notificação

Remove uma notificação específica pelo seu `id`.

-   **Método:** `DELETE`
-   **Endpoint:** `/notifications/:id`
-   **Headers:**
    -   `Authorization: my-secret-api-key`
-   **Parâmetro de URL:**
    -   `id`: O ID da notificação a ser excluída.
-   **Resposta de Sucesso (204 No Content):**
    -   Nenhum corpo de resposta é retornado.
-   **Resposta de Erro (404 Not Found):**
    -   Caso a notificação com o `id` informado não exista.
    ```json
    {
      "error": "Notificação não encontrada."
    }
    ```

## ⚙️ Middlewares

### `authMiddleware`

Este middleware é responsável por proteger os endpoints. Ele verifica a presença e a validade do header `Authorization`. Se a chave de API estiver incorreta ou ausente, a requisição é interrompida e uma resposta `401 Unauthorized` é enviada.

### `errorMiddleware`

Este é um middleware de tratamento de erros global. Ele captura quaisquer erros que ocorram durante o processamento da requisição (seja por um `throw new Error()` ou passando o erro para `next(error)`). Ele garante que o cliente sempre receba uma resposta JSON padronizada, evitando que a aplicação quebre e exponha *stack traces*.

## 🗂️ Estrutura de Dados

A entidade `Notificação` é armazenada em memória em um array simples. Cada objeto de notificação possui a seguinte estrutura:

```typescript
{
  id: string;         // Gerado automaticamente com UUID v4
  user: string;       // Identificador do usuário que recebe a notificação
  message: string;    // Conteúdo da notificação
  createdAt: Date;    // Data e hora da criação da notificação
}
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.# nexus_tech
