# Akangatu ✦

> Um jogo da memória que transforma cada partida em uma experiência de atenção, descoberta e evolução.

Akangatu é um jogo da memória desenvolvido como projeto acadêmico. A pessoa escolhe uma coleção visual, define a dificuldade e encontra os pares no menor tempo e com o menor número possível de tentativas.

Mais do que completar uma partida, o jogo propõe uma experiência de descoberta: cada coleção apresenta um universo próprio, enquanto o desempenho registrado incentiva novas tentativas e a evolução ao longo do tempo.

## Sobre o jogo

Em cada partida, as cartas começam viradas para baixo. A pessoa deve revelar duas por vez e encontrar os pares correspondentes, acompanhando o cronômetro e o número de tentativas em tempo real.

O Akangatu foi pensado como uma experiência leve, visual e personalizada, inspirada em natureza, cultura, memória e artesanato.

## Fluxo principal implementado

**Home → Coleções → Dificuldade → Partida → Pausa → Desempenho**

* Na Home, a pessoa pode iniciar uma partida, consultar o manual e acessar seu desempenho.
* Em Coleções, escolhe o universo visual da partida.
* Após selecionar uma coleção disponível, define a dificuldade entre 4, 6 ou 8 pares.
* Durante a partida, acompanha o tempo e as tentativas.
* A pausa permite continuar, reiniciar ou sair da partida com confirmação.
* Ao concluir uma partida, o desempenho é salvo localmente e pode ser consultado na tela de Desempenho.

## Funcionalidades atuais

* Escolha de coleção/tema.
* Fauna disponível para jogar.
* Flora e Xilogravura apresentadas como coleções bloqueadas.
* Escolha de dificuldade: 4, 6 ou 8 pares.
* Cartas embaralhadas a cada nova partida.
* Comparação automática entre duas cartas.
* Contador de tentativas.
* Cronômetro em tempo real.
* Pausa de partida.
* Reinício e saída com confirmação.
* Detecção de conclusão da partida.
* Registro local de partidas concluídas.
* Tela de desempenho com total de partidas, melhor tempo, menor número de tentativas e resumo por dificuldade.
* Manual/Sobre acessível pela Home.
* Interface responsiva e compatível com preferência por movimento reduzido.

## Níveis de dificuldade

| Dificuldade | Cartas | Pares |
| ----------- | -----: | ----: |
| Fácil       |      8 |     4 |
| Médio       |     12 |     6 |
| Difícil     |     16 |     8 |

## Coleções

Cada coleção cria uma experiência visual diferente para as cartas. Algumas ficam disponíveis desde o início, enquanto outras aparecem bloqueadas e serão liberadas com o progresso do jogador em versões futuras.

* **Fauna** — diversidade, curiosidade e vida selvagem.
* **Flora** — formas, cores e detalhes da natureza.
* **Xilogravura** — referências visuais à impressão artesanal e à cultura popular.

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

Depois, abra o endereço exibido no terminal — normalmente http://localhost:5173.

## Estrutura do projeto

```text
src/
├── app/            # Rotas e estrutura principal da aplicação
├── assets/         # Imagens, ícones e artes das coleções
├── components/     # Componentes reutilizáveis
├── data/           # Coleções, dificuldades e dados fixos
├── features/       # Funcionalidades organizadas por domínio
├── hooks/          # Hooks personalizados
├── services/       # Persistência local e serviços
├── styles/         # Estilos globais e variáveis
├── types/          # Tipos compartilhados do TypeScript
└── utils/          # Funções auxiliares
```

A funcionalidade de jogo está separada por responsabilidade: configuração da partida, tabuleiro, cartas, pausa, lógica do jogo e desempenho. Os registros salvos incluem ID, data, coleção, dificuldade, tempo e tentativas, deixando a base preparada para futuras telas de histórico e progresso.

## Como verificar

```bash
npm run dev
npm run build
npm run lint
npm test
```

No PowerShell com execução de scripts restrita, use `npm.cmd`.

## Próximas funcionalidades

* Modo Desafio com limite de tempo ou tentativas.
* Histórico detalhado de partidas.
* Regras reais para desbloqueio de coleções.
* Tela de resultado com medalhas, estrelas e comparação de recordes.

## Status do projeto

Em desenvolvimento. ✦

Desenvolvido por [Amanda Felix](https://github.com/AmandaFelix-dev) e Ryane Feitosa.
