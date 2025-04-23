# Empresa API - Cadastro de Empresas com CNPJ

Este é um projeto de backend desenvolvido em **ASP.NET Core** com autenticação **JWT** e integração com a API pública **ReceitaWS** para o cadastro de empresas usando **CNPJ**. A aplicação também é containerizada usando **Docker** e pode ser deployada na plataforma **Render**.

## Funcionalidades

- **Cadastro de Usuário**:
  - Cadastro com nome, e-mail e senha (armazenada com hash).
  - Autenticação JWT para login.

- **Cadastro de Empresas**:
  - O usuário logado pode cadastrar uma empresa fornecendo apenas o **CNPJ**.
  - A API consulta os dados no endpoint da **ReceitaWS** para obter informações da empresa (nome, fantasia, situação, etc.).

- **Listagem de Empresas**:
  - O usuário logado pode visualizar todas as empresas cadastradas.

## Tecnologias

- **ASP.NET Core 6.0+**
- **JWT Authentication**
- **API da ReceitaWS**
- **Docker** (para containerização)
- **Banco de Dados In-Memory** (para persistência dos dados)
- **Swagger** para documentação e testes da API
- **Render** para o deploy da aplicação

## Como Rodar Localmente

### 1. Clonando o Repositório

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
