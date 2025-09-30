# 🚀 Helpdesk API \& Frontend - Sistema de Gerenciamento de Chamados

Este projeto foi desenvolvido como parte do Desafio Prático do módulo Fullstack da Rocketseat. O objetivo é implementar um sistema completo para gerenciar chamados de suporte, contando com painel dedicado para Administrador, Técnico e Cliente.

## Funcionalidades Principais

- **Autenticação e Autorização via JWT**
Cadastro de usuários e login seguro, com diferentes níveis de acesso: administrador, técnico e cliente.
- **Gestão de Chamados**
    - **CRUD completo de chamados**: criar, visualizar, atualizar e remover chamados.
    - **Atribuição de chamados** a técnicos ou técnicos específicos.
    - **Histórico de interações** nos chamados, com comentários e atualização de status.
- **Gestão de Usuários e Perfis**
    - Administradores criam e gerenciam contas de clientes e técnicos.
    - Perfis personalizados, acesso segmentado conforme o tipo de usuário.
- **Painel Visual Personalizado**
    - Cliente pode abrir chamados e acompanhar status.
    - Técnico visualiza tarefas atribuídas e atualiza progresso.
    - Admin acompanha métricas, atribui chamados e gerencia usuários.

## Tecnologias Utilizadas

- **Back-end:** Node.js + Express.js
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Testes:** Jest
- **Validação:** Zod
- **Autenticação:** JWT (JSON Web Token)
- **Linguagem:** TypeScript
- **Front-end:**
    - Vite
    - TailwindCSS
- **Deploy:**
    - Back-end: Render
    - Front-end: Vercel

## Estrutura do Banco de Dados

- **users:** dados dos usuários (admin, técnicos, clientes)
- **tickets:** chamados criados
- **services:** serviços a serem realziados nos chamados
- **tickets_services:** relacionamento dos serviços aos chamados

## Deploy

- **Back-end:** Render
- **Front-end:** Vercel ou Netlify

## ✍️ Autor e créditos

- 📘 Desafio proposto pela: [Rocketseat](https://www.rocketseat.com.br/)
- 💻 Desenvolvido por: **Rafael Lima Dalmagro**

---

