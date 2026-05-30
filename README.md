# <h1 align="center">Meu Plantão Web</h1>

<p align="center">
	Sistema administrativo para gestão de plantões, equipe, relatórios e configurações do Meu Plantão.
</p>

<p align="center">
	<img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" />
	<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
	<img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
	<img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
	<img src="https://img.shields.io/badge/next--themes-0.4-111827?style=for-the-badge" />
	<img src="https://img.shields.io/badge/jsPDF-5.0-0F172A?style=for-the-badge" />
</p>

---

## 📋 Sobre o projeto

O **Meu Plantão Web** é o painel administrativo do sistema Meu Plantão. Ele foi construído para centralizar a gestão de plantões, usuários da equipe, relatórios históricos e preferências de interface em uma experiência única, organizada e responsiva.

O objetivo principal é oferecer uma base de front-end clara para consumo de dados, com componentes separados por responsabilidade, tipagem forte em TypeScript e uma estrutura pronta para integrar API, autenticação e persistência real no futuro.

### O que o sistema faz

- Gestão de plantões com ações de aprovar, recusar, visualizar, editar e excluir
- Gestão de usuários da equipe com criação, edição, visualização e remoção
- Histórico de relatórios com filtros e exportação em PDF
- Configurações do sistema com idioma, nome do sistema, e-mail do administrador e tema automático
- Navegação lateral com suporte a português e inglês
- Tema escuro/claro com persistência no navegador

### Objetivos do front-end

- Centralizar as telas administrativas em um layout consistente
- Manter os componentes bem separados por domínio
- Facilitar a troca de dados locais por API no futuro
- Preservar uma identidade visual mais escura, direta e sem bordas arredondadas

---

## 🛠️ Tecnologias

### Front-end

| Tecnologia | Versão | Uso |
|---|---:|---|
| [Next.js](https://nextjs.org/) | 16.2.6 | Framework principal com App Router |
| [React](https://react.dev/) | 19.2.4 | Biblioteca de interface |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Estilização utilitária |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6 | Controle do tema escuro/claro |
| [Font Awesome](https://fontawesome.com/) | 7.x | Ícones da interface |
| [Lucide React](https://lucide.dev/) | 1.x | Ícones complementares |
| [jsPDF](https://github.com/parallax/jsPDF) | 5.x | Geração de PDF |
| [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) | 5.x | Tabelas dentro do PDF |

### UI e apoio

| Tecnologia | Uso |
|---|---|
| `tailwind-merge` | Combinação segura de classes Tailwind |
| `clsx` | Montagem condicional de classes |
| `radix-ui` | Base para possíveis componentes de interface |
| `shadcn` | Tokens e padrões visuais auxiliares |
| `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` | Efeitos visuais e camadas decorativas |

---

## 📁 Estrutura do projeto

```bash
meuplantao-web/
├── app/
│   ├── globals.css              # Estilos globais e tokens de tema
│   ├── layout.tsx               # Layout raiz com ThemeProvider e LanguageProvider
│   ├── page.tsx                 # Redireciona para a tela de login
│   └── pages/
│       ├── dashboard/           # Rota da dashboard principal
│       ├── equipe/              # Rota de gestão de usuários
│       ├── login/               # Tela de autenticação
│       ├── plantoes/            # Rota de gestão de plantões
│       ├── relatorios/          # Rota de histórico e exportação
│       └── configuracoes/       # Rota de preferências do sistema
├── components/
│   ├── sidebar/                 # Navegação lateral global
│   ├── dashboard/               # Componentes da dashboard
│   ├── plantoes/                # Componentes da página de plantões
│   ├── equipe/                  # Componentes da página de equipe
│   ├── relatorios/              # Componentes da página de relatórios
│   ├── configuracoes/           # Componentes da página de configurações
│   ├── language-provider.tsx     # Contexto global de idioma
│   ├── theme-provider.tsx       # Wrapper do next-themes
│   └── ui/                      # Componentes de interface reutilizáveis
├── lib/
│   └── utils.ts                 # Helpers utilitários
├── public/                      # Arquivos estáticos
└── scripts/                     # Scripts de geração de PDF
```

---

## 🧭 Como o projeto se organiza

O app segue uma regra simples:

1. `app/layout.tsx` define o ambiente global.
2. `components/sidebar/sidebar.tsx` define a navegação da aplicação.
3. Cada pasta de domínio em `components/` concentra os dados, filtros, tabelas e modais daquela tela.
4. As rotas em `app/pages/...` apenas apontam para os componentes principais.

Isso facilita a leitura do código, porque o comportamento não fica espalhado em múltiplas camadas sem necessidade.

### Fluxo visual

- Sidebar fixa à esquerda
- Fundo com partículas e camadas radiais escuras
- Conteúdo principal com espaçamento amplo
- Cards e painéis com bordas retas
- Dark mode com superfícies neutras e mais escuras

---

## 🚀 Como rodar localmente

### Pré-requisitos

Antes de começar, verifique se você tem instalado:

- [Node.js](https://nodejs.org/) 18 ou superior
- [npm](https://www.npmjs.com/)

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

O projeto usa `next dev --webpack` para evitar problemas de estabilidade encontrados com Turbopack neste repositório.

Depois de subir o servidor, acesse:

```bash
http://localhost:3000
```

### Build de produção

```bash
npm run build
```

### Rodar em modo produção local

```bash
npm run start
```

### Lint

```bash
npm run lint
```

---

## 🌐 Acesso publicado na Vercel

O projeto está publicado na **Vercel**.

### URL do deploy

```text
https://meuplantao-web.vercel.app/
```

### Como a publicação funciona

- Cada push na branch principal pode acionar um novo deploy
- A Vercel compila o projeto Next.js automaticamente
- A mesma aplicação pode ser usada para preview e produção

---

## 📌 Telas do sistema

### Dashboard

Resumo operacional com:

- Filtros de busca e período
- Cards com métricas principais
- Gráfico semanal
- Lista de atenção imediata
- Tabela de plantões recentes

### Plantões

Tela para gestão de solicitações de plantão com:

- Busca por múltiplos campos
- Filtro por status
- Aprovação e recusa com confirmação
- Modal de visualização e edição
- Exclusão de registro

### Equipe

Tela para gestão de usuários do sistema com:

- Busca por nome, e-mail, departamento e cargo
- Filtro por perfil de acesso
- Criação de usuário
- Edição e visualização
- Exclusão de registros

### Relatórios

Tela de histórico consolidado com:

- Soma de registros e receita
- Filtro por texto e status
- Tabela histórica
- Exportação em PDF

### Configurações

Tela para preferências do sistema com:

- Nome do sistema
- E-mail do administrador
- Idioma da interface
- Modo escuro automático

---

## 📡 Dados e contratos importantes

O projeto foi desenhado com contratos de dados bem claros para facilitar a migração para API.

### Principais tipos

- `PlantaoItem`
- `EquipeMember`
- `RelatorioPlantao`
- `ConfiguracoesState`

### Regra prática para integração futura

Se o front-end passar a consumir uma API, o ideal é manter os mesmos nomes e formatos de campos usados hoje nos arquivos `*-data.ts`. Isso reduz retrabalho e evita quebrar os componentes existentes.

---

## 📄 Geração de PDF

O projeto inclui scripts que geram guias em PDF dentro da pasta `docs/`:

- `scripts/generate-frontend-guide.cjs`
- `scripts/generate-project-guide.cjs`

Esses arquivos servem para documentar o front-end e a estrutura do projeto para leitura rápida por novos desenvolvedores.

---

## 👥 Contribuidores

Projeto desenvolvido para o sistema **Meu Plantão**.

---

## 📎 Observações

- A interface foi pensada para ser mais escura e menos azulada.
- O idioma da aplicação pode alternar entre português e inglês.
- O tema escuro é persistido e aplicado globalmente.
- A base do projeto está pronta para trocar seeds locais por dados de API.
