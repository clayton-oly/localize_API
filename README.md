# 🏢 Localize

**Localize** é uma aplicação web para cadastro e consulta de empresas brasileiras via CNPJ. Utiliza a API pública da ReceitaWS para obter os dados e armazena localmente os cadastros por usuário autenticado.

## 🌐 Acesse

- Frontend: [https://localize-api.vercel.app](https://localize-api.vercel.app)
- Backend: [https://empresas-api-lqwm.onrender.com](https://empresas-api-lqwm.onrender.com)

## ✨ Funcionalidades

- 🔐 Autenticação de usuários com JWT
- 🏢 Cadastro de empresa por CNPJ (com consumo da API ReceitaWS)
- 📄 Listagem das empresas cadastradas por usuário
- ❌ Validações para evitar CNPJs inválidos ou dados incompletos

## 🚀 Tecnologias

### Backend
- .NET 8 / ASP.NET Core
- Entity Framework InMemory
- JWT Authentication
- Consumo de API externa (ReceitaWS)
- Deploy: Render

### Frontend
- Angular 15
- Reactive Forms
- Deploy: Vercel

## 🛠️ Como rodar localmente

### Backend
```bash
git clone https://github.com/clayton-oly/empresa_api_back.git
cd backend-localize
dotnet run
```

### Frontend
```bash
git clone https://github.com/clayton-oly/empresa_api_front.git
cd frontend-localize
npm install
ng serve
```

## 📬 Contato

Feito com ❤️ por **Clayton William**  
📧 Email: clayton.will08@gmail.com 
💼 LinkedIn: [linkedin.com/in/clayton-oly](https://www.linkedin.com/in/clayton-oly)
