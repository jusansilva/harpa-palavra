# Harpa & Palavra

Aplicação Next.js para leitura bíblica e repertório de hinos com foco em conteúdo autorizado. Este repositório não inclui os 640 hinos nem o texto integral da Bíblia: ambos só entram por fontes que informem licença e atribuição verificáveis.

## Arquitetura

O Next.js é exclusivamente o frontend estático (`out/`). Firebase fornece Authentication e Cloud Firestore; não há API routes, banco PostgreSQL, Prisma ou backend Next.js neste projeto.

## Executar localmente

1. Crie um projeto Firebase, habilite **Authentication > E-mail/senha** e **Google** em Authentication > Sign-in method, e crie o Firestore em modo produção.
2. Copie `.env.example` para `.env.local` e preencha as configurações públicas da Web App do Firebase.
3. Instale: `npm install`.
4. Execute `npm run dev`.

## Operação

- `npm run typecheck` verifica TypeScript.
- `npm run test` executa testes unitários.
- `npm run test:e2e` executa Playwright (requer navegador instalado: `npx playwright install`).
- `npm run build` gera a exportação estática em `out/`.
- Para Firebase Hosting: `firebase deploy --only firestore,hosting`. O usuário autenticado `jusanmagno@gmail.com` é o root inicial pelas regras do Firestore. Para outros administradores, use a custom claim `admin: true` atribuída em ambiente seguro.

## Segurança e conteúdo

As regras em `firestore.rules` exigem a custom claim `admin` para importar ou editar conteúdo público. Usuários só leem/escrevem seus próprios favoritos, repertórios e progresso. Publique as regras antes de expor o app.

As coleções públicas previstas são `hymns`, `hymnEditions`, `bibleTranslations`, `bibleBooks`, `bibleVerses`, `contentSources` e `importJobs`; os dados privados ficam em `users/{uid}`. A confirmação de direitos e o conteúdo efetivo permanecem responsabilidade do administrador.

## Primeira carga

O repositório começa deliberadamente sem Bíblia ou Harpa, pois não inclui obras licenciadas. Entre como `jusanmagno@gmail.com`, abra `/admin` e importe um JSON autorizado. A tela informa os campos obrigatórios para hinos e traduções. Para leitura bíblica, também carregue livros, capítulos e versículos licenciados na coleção `bibleVerses` (com `translationId`, referência e texto), respeitando créditos.

Há três exemplos de versículos da Bíblia Livre (CC BY 4.0 BR) em `public/import-examples/biblia-livre-3-versiculos.json` e o registro de tradução com a atribuição em `public/import-examples/biblia-livre-traducao.json`. Importe primeiro a tradução e depois os versículos.
