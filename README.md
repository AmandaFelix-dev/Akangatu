# Akangatu ✦

> Um jogo da memória que transforma cada partida em uma experiência de atenção, descoberta e evolução.

Akangatu é um jogo da memória desenvolvido como projeto acadêmico. Nele, o jogador escolhe o nível de dificuldade, personaliza a partida com temas visuais e acompanha seu desempenho por meio de tempo, tentativas, histórico e recordes.

Além de encontrar os pares, o objetivo é desbloquear novas coleções e tornar cada partida uma pequena conquista.

## Sobre o jogo

Em cada partida, as cartas começam viradas para baixo. O jogador deve revelar duas por vez e encontrar os pares correspondentes com o menor número possível de tentativas e no menor tempo possível.

O Akangatu foi pensado para ser mais do que um jogo: uma experiência visual leve, divertida e personalizada, com diferentes universos para explorar.

## Funcionalidades

* Escolha de dificuldade: Fácil, Médio ou Difícil.
* Escolha de tema para personalizar as cartas.
* Cartas embaralhadas a cada partida.
* Comparação automática entre duas cartas.
* Contador de tentativas.
* Cronômetro em tempo real.
* Pausa de partida.
* Detecção de vitória.
* Modo Desafio com limite de tempo ou tentativas.
* Histórico de partidas.
* Recordes separados por dificuldade.
* Sistema de progresso e desbloqueio de temas.
* Manual de como jogar no primeiro acesso.

## Níveis de dificuldade

| Dificuldade | Cartas | Pares |
| ----------- | -----: | ----: |
| Fácil       |      8 |     4 |
| Médio       |     12 |     6 |
| Difícil     |     16 |     8 |

## Temas

Cada tema cria uma experiência visual diferente para o jogo. Alguns temas estarão disponíveis desde o início, enquanto outros poderão ser desbloqueados conforme o progresso do jogador.

* **Pessoas** — estilos, histórias e personalidades.
* **Animais** — diversidade, curiosidade e fauna.
* **Emoções** — sentimentos para reconhecer e combinar.
* **Xadrez** — peças, estratégia e movimentos.
* **Princesas** — personagens, cenários e detalhes marcantes.
* **Criaturas** — seres originais, misteriosos e divertidos.

## Tecnologias utilizadas

* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vite.dev/)
* [CSS Modules](https://github.com/css-modules/css-modules)
* [Motion](https://motion.dev/)
* localStorage
* Vitest
* Testing Library

## Como executar o projeto

Clone este repositório:

```bash
git clone https://github.com/AmandaFelix-dev/Akangatu_Dev.git
```

Acesse a pasta do projeto:

```bash
cd Akangatu_Dev
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Depois, abra o endereço exibido no terminal — normalmente:

```text
http://localhost:5173
```

## Estrutura do projeto

```text
src/
├── assets/        # Imagens, ícones e artes dos temas
├── components/    # Componentes reutilizáveis
├── data/          # Dados fixos, temas, níveis e regras
├── features/      # Funcionalidades e telas do jogo
├── hooks/         # Hooks personalizados
├── services/      # Persistência e regras de armazenamento
├── styles/        # Estilos globais e variáveis
├── types/         # Tipos compartilhados do TypeScript
└── utils/         # Funções auxiliares
```

## Status do projeto

Em desenvolvimento. ✦

A estrutura inicial, identidade visual e telas de apresentação estão sendo construídas. As próximas etapas incluem a implementação completa do tabuleiro, lógica de comparação, cronômetro, histórico, desafios e sistema de desbloqueio.

---

Sendo desenvolvido por [Amanda Felix](https://github.com/AmandaFelix-dev) e [Ryane Feitosa]().
## Fluxo principal implementado

Home → coleção → dificuldade (4, 6 ou 8 pares) → partida → pausa → desempenho.
A Fauna está disponível; Flora e Xilogravura têm apresentação e dados de bloqueio, sem regras de desbloqueio ativas. A conclusão usa uma mensagem simples, sem medalhas ou estrelas.

### Organização

- `src/app/routes.ts`: rotas por hash, compatíveis com hospedagem estática. A rota antiga de dificuldade retorna à escolha de tema para preservar a ordem da jornada.
- `src/features/`: páginas e componentes organizados por funcionalidade. `memory-game` separa tabuleiro, carta, pausa, reducer e hook do jogo; `game-setup` separa tema e dificuldade; `profile` apresenta desempenho.
- `src/components/Modal`: diálogo nativo reutilizável, com foco, Escape e restauração de foco.
- `src/data/`: temas, disponibilidade, descrições de desbloqueio e dificuldades.
- `src/utils/`: embaralhamento, criação de pares e formatação de tempo.
- `src/services/history.service.ts`: registros versionados no localStorage, validação de dados e alternativa em memória quando o armazenamento está indisponível. Apenas partidas concluídas são registradas.
- `src/assets/images/optimized/`: cópias leves das ilustrações. Os originais foram preservados; as pranchas completas de cartas não são carregadas pela interface.
- `scripts/optimize-assets.ps1`: gera novamente os JPEGs de entrega a partir das imagens embutidas nos SVGs originais (Windows / System.Drawing).

A identidade visual combina papel, verde profundo, terracota, títulos em serifas e ilustrações das próprias coleções. Os layouts são responsivos e respeitam a preferência por movimento reduzido.

### Executar e verificar

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

No PowerShell com execução de scripts restrita, use `npm.cmd`.

Os registros já incluem ID, data, tema, dificuldade, tempo e tentativas para permitir uma tela futura de histórico. Os tipos de configuração e os metadados das coleções permitem evoluir modos e desbloqueios separadamente da mecânica tradicional. Modo Desafio, histórico detalhado, medalhas e regras completas de desbloqueio ainda não foram implementados.
