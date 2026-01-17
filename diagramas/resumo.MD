# 🧶 Malibu Ateliê - Plataforma de E-commerce de Crochê

## 📄 Visão Geral do Projeto

Este documento descreve a arquitetura técnica, os requisitos funcionais e os padrões de projeto para o desenvolvimento da plataforma "Malibu Ateliê". O sistema conecta **Artesãos** (vendedores) a **Clientes** (compradores) e **Administradores**, permitindo a venda de produtos de crochê.

A arquitetura segue o modelo **C4** (Contexto, Container, Componente) e desce até o nível de código utilizando **Clean Architecture**.

---

## 🛠 Tech Stack & Arquitetura

* **Backend:** Java com Spring Boot.
* **Frontend:** Web App (SPA) em Angular / TypeScript.
* **Banco de Dados:** PostgreSQL (Relacional).
* **Armazenamento de Arquivos:** AWS S3 (Object Storage).
* **Arquitetura de Software:** Clean Architecture (camadas isoladas, inversão de dependência).
* **Autenticação:** JWT (JSON Web Token).

---

## 1. Requisitos Funcionais e Atores (Diagrama de Contexto)

### Atores

1. **Artesão:**
* Cadastra informações, define preços e faz upload de fotos dos produtos.
* Envia os produtos vendidos.


2. **Cliente:**
* Visualiza o catálogo de produtos.
* Adiciona itens ao carrinho.
* Finaliza a compra (Checkout).


3. **Administrador:**
* Gerencia artesãos (adiciona/remove).
* Funções administrativas gerais.



### Integrações Externas

* **API de Frete:** Consulta valor do frete (Baseado em CEP/XML) - *Ex: Correios/Melhor Envio*.
* **Gateway de Pagamento:** Processa transações financeiras (Ex: PIX/Cartão, via JSON).
* **Serviço de Email:** Envia notificações de status de compra e envio (SMTP/AWS SES).

---

## 2. Fluxo e Navegação do Frontend (Diagrama de Container Front)

O Frontend é uma SPA (Single Page Application) que deve gerenciar os estados de navegação:

1. **Tela de Login:** Autentica Admin e Artesão (envia credenciais ao `AuthContainer`).
2. **Roteador:** Direciona o usuário com base no perfil ou ação.
3. **Fluxo de Compra (Cliente):**
* `Catálogo de Produtos`: Exibe lista de itens.
* `Detalhes Produtos`: Mostra fotos, descrição e preço.
* `Carrinho de Compras`: Gerencia itens selecionados.
* `Checkout e Frete`: Coleta dados de envio/pagamento e finaliza a ordem.



---

## 3. Arquitetura do Backend (Diagrama de Componentes)

O Backend (`API Backend`) é o núcleo do sistema e orquestra a comunicação entre o Frontend, Banco de Dados e Serviços Externos.

### Módulos Principais (Componentes)

* **Auth Module:**
* `Auth Controller`: Endpoints de Login/Registro.
* `Auth Service`: Lógica de validação e geração de JWT.
* `User Repository`: Acesso à tabela de Usuários.


* **Product Module:**
* `Product Controller`: Endpoints REST para gestão do catálogo.
* `Product Service`: Regras de negócio de estoque e busca.
* `Image Service`: Lida com upload de imagens para o **Object Storage (AWS S3)**.
* `Product Repository`: Acesso à tabela de Produtos.


* **Order Module:**
* `Order Controller`: Endpoints de Checkout.
* `Order Service`: Calcula totais e chama a API de Frete.
* `Order Repository`: Persiste dados na tabela de Pedidos.



---

## 4. Padrão de Código e Implementação (Diagrama de Código - Nível 4)

**IMPORTANTE PARA A IA DESENVOLVEDORA:** O código **DEVE** seguir estritamente a **Clean Architecture**. O diagrama de código fornece o "blueprint" exato para a funcionalidade de "Criação de Produto", que deve ser replicado para os outros casos de uso.

### Regras de Camadas (Baseado no exemplo `CreateProduct`):

1. **Domain Layer (Núcleo):**
* **Entity (`Product`):** Objeto rico com regras de negócio internas (ex: `validate()`, `updateImage()`). Não deve ter dependências de framework.
* **Interfaces (Gateways):** Definição de contratos para infraestrutura.
* `ProductGateway`: Contrato para salvar/buscar produtos.
* `StorageGateway`: Contrato para upload de arquivos.




2. **Application Layer (Casos de Uso):**
* **UseCase (`CreateProductUseCase`):** Orquestra o fluxo. Recebe um DTO (`CreateProductInput`), cria a Entidade, chama o `StorageGateway` para upload, e o `ProductGateway` para persistência.
* **DTOs:** Objetos simples para transferência de dados entre camadas.


3. **Interface Adapters:**
* **Controller (`ProductController`):** Recebe requisição HTTP, converte para o DTO do UseCase e invoca a aplicação.
* **Presenter (`ProductPresenter`):** Formata a resposta da entidade para o cliente (`ProductResponseDTO`).


4. **Infrastructure Layer:**
* **Implementações:**
* `S3StorageGateway`: Implementa `StorageGateway` usando AWS SDK.
* `PostgresProductGateway`: Implementa `ProductGateway` usando JPA.


* **Frameworks:** Spring Boot Repositories (`JpaProductRepository`).



---

## 📋 Instruções para Início do Desenvolvimento

Para a IA que for gerar o código, siga esta ordem de prioridade:

1. **Defina as Entidades de Domínio:** Comece criando a classe `Product` (com UUID, validações) sem anotações de banco de dados (JPA) inicialmente, para manter o domínio puro.
2. **Crie os Casos de Uso (Application):** Implemente a lógica de cadastro orquestrando as interfaces.
3. **Implemente a Infraestrutura:** Crie as classes que implementam as interfaces (`GatewayImpl`) usando Spring Data JPA e AWS SDK (mockado se necessário).
4. **Exponha via Controllers:** Crie os endpoints REST.
5. **Configure o Banco:** Script SQL para criar tabelas `users`, `products`, `orders` no PostgreSQL.

**Exemplo de Prompt para gerar o código:**

> "Gere o código Java Spring Boot para o caso de uso 'Criar Produto' seguindo o diagrama de Clean Architecture anexo. O domínio deve ser isolado. Crie as interfaces ProductGateway e StorageGateway e suas implementações para Postgres e S3, respectivamente."