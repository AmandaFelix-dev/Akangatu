# Akangatu

> Jogo da memória web desenvolvido em React como projeto de portfólio.

**Fonte original:** [`ORIGIN.md`](ORIGIN.md). Este documento organiza o conteúdo de `ORIGIN.md` e incorpora as decisões tomadas pelo autor depois dele (ver [Decisões tomadas](#7-decisões-tomadas)). **Em caso de divergência, este documento e os docs de `features/` prevalecem sobre `ORIGIN.md`.** Lacunas que ainda existem estão em [Pontos em aberto](#8-pontos-em-aberto) e **não devem ser resolvidas sem consultar o autor**.

---

## 1. Visão geral

**Título:** Akangatu

**Descrição:** Jogo da memória em que o usuário escolhe o nível de dificuldade e personaliza a partida com temas desbloqueáveis. Durante o jogo, um cronômetro registra o tempo da partida, enquanto o número de tentativas também é contabilizado. O usuário pode acompanhar seu desempenho geral, consultar o histórico de partidas e verificar seu progresso para desbloquear novos temas.

**Contexto:** Projeto de portfólio, avaliado por um orientador.

## 2. Stack

| Categoria             | Tecnologia                         |
|-----------------------|------------------------------------|
| Plataforma            | Web, com foco em mobile            |
| Base do projeto       | React, TypeScript, Vite            |
| Estilização           | CSS Modules                        |
| Animações             | Motion                             |
| Armazenamento local   | localStorage                       |
| Testes                | Vitest, React Testing Library      |
| Deploy                | a definir                          |

## 3. Escopo — funcionalidades

O escopo do projeto é composto **apenas** pelas funcionalidades abaixo. Qualquer funcionalidade não listada está fora de escopo até ser definida pelo autor.

| ID  | Funcionalidade                  | Doc                                                              |
|-----|---------------------------------|------------------------------------------------------------------|
| F01 | Modo Desafio                    | [01-modo-desafio.md](features/01-modo-desafio.md)                |
| F02 | Virar carta ao clicar           | [02-virar-carta.md](features/02-virar-carta.md)                  |
| F03 | Comparar duas cartas            | [03-comparar-cartas.md](features/03-comparar-cartas.md)          |
| F04 | Esconder cartas diferentes      | [04-esconder-cartas-diferentes.md](features/04-esconder-cartas-diferentes.md) |
| F05 | Detectar vitória                | [05-detectar-vitoria.md](features/05-detectar-vitoria.md)        |
| F06 | Contador de tentativas          | [06-contador-de-tentativas.md](features/06-contador-de-tentativas.md) |
| F07 | Cronômetro                      | [07-cronometro.md](features/07-cronometro.md)                    |
| F08 | Pausar partida                  | [08-pausar-partida.md](features/08-pausar-partida.md)            |
| F09 | Nível de dificuldade            | [09-nivel-de-dificuldade.md](features/09-nivel-de-dificuldade.md) |
| F10 | Escolher tema da partida        | [10-escolher-tema.md](features/10-escolher-tema.md)              |
| F11 | Desbloquear tema                | [11-desbloquear-tema.md](features/11-desbloquear-tema.md)        |
| F12 | Visualizar métricas do usuário  | [12-metricas-do-usuario.md](features/12-metricas-do-usuario.md)  |
| F13 | Manual do jogo                  | [13-manual-do-jogo.md](features/13-manual-do-jogo.md)            |

## 4. Configuração da partida

### 4.1 Temas

| Tema                  | Estado inicial | Imagens (pasta) |
|-----------------------|----------------|-----------------|
| Fauna                 | Desbloqueado   | Animals         |
| Artefatos             | Desbloqueado   | Draws           |
| Flora                 | Desbloqueado   | Flowers         |
| Reservas biológicas   | Bloqueado      | Biological reserves |
| Cultura global        | Bloqueado      | Around the world |
| Xilogravura           | Bloqueado      | Xilogravura     |

- **Três** temas (Fauna, Artefatos e Flora) ficam disponíveis desde o início; os outros três começam bloqueados.
- Cada tema bloqueado exibe sua condição de desbloqueio e seu progresso. Cada condição desbloqueia um tema; o mapeamento atual é **provisório** (P06).
- As imagens ficam em `src/assets/images/`, na pasta indicada na tabela.

**Condições de desbloqueio** (as únicas válidas):

- Concluir **uma partida no nível Difícil** no Desafio de tempo, vencendo dentro do limite (50 s). → **Xilogravura** *(provisório, P06)*
- Concluir **duas partidas consecutivas no nível Médio** no Desafio de tempo, vencendo dentro do limite (40 s). → **Cultura global** *(provisório, P06)*
- Concluir **três partidas consecutivas no nível Fácil** no Desafio de tentativas, vencendo dentro do limite (10). → **Reservas biológicas** *(provisório, P06)*

O limite de tempo é o **tempo fixo por dificuldade** (ver 4.2). Cada condição vale para a dificuldade e o tipo de Desafio indicados. Uma **derrota** nessa dificuldade e nesse tipo interrompe a sequência. Partidas no Normal, em outra dificuldade, no outro tipo de Desafio e partidas abandonadas não a interrompem. *(decisões P08, P09)*

### 4.2 Dificuldades

| Dificuldade | Cartas | Pares | Tempo estabelecido | Limite de tentativas (Desafio) |
|-------------|--------|-------|--------------------|--------------------------------|
| Fácil       | 8      | 4     | 30 s               | 10                             |
| Médio       | 12     | 6     | 40 s               | 14                             |
| Difícil     | 16     | 8     | 50 s               | 18                             |

O tempo estabelecido vale para as condições de desbloqueio e para o limite de tempo do Modo Desafio.

Na interface, a dificuldade é identificada pelo número de cartas (8, 12 ou 16), com os pares como detalhe; Fácil, Médio e Difícil são só a nomenclatura interna. O tabuleiro tem sempre 4 colunas; o número de linhas varia (2, 3 ou 4). *(decisão P15)*

### 4.3 Modos de jogo

- **Normal**
- **Desafio:** limite de tempo **ou** limite de tentativas.
  - O jogador escolhe só o tipo de limite; o valor é o da dificuldade escolhida (4.2).
  - No limite de tempo, o cronômetro é **regressivo**.

Dificuldade e modo são escolhidos juntos, em um único modal.

## 5. Fluxo do jogo

```
Tela inicial ─► Tema ─► Dificuldade + Modo (modal) ─► Confirmação/Preparação ─► Partida ─► Final
                 ▲                                          │ Cancelar
                 └──────────────────────────────────────────┘
```

### 5.1 Tela inicial — primeiro acesso

O primeiro acesso dura até o jogador concluir a primeira partida (vitória ou derrota).

- Botão **Entrar** → escolha do tema (5.3).
- Botão **Manual de como jogar** → manual/tutorial, com opção **Pular**.
- Botão **Desempenho** → métricas do usuário (vazia se nenhuma partida foi jogada).

### 5.2 Tela inicial — acessos seguintes

- Botão **Jogar** → área de partidas (5.11).
- Botão **Manual de como jogar**.

### 5.3 Escolha do tema

O usuário visualiza:

- Os três temas disponíveis desde o início.
- Os temas bloqueados.
- As condições necessárias para desbloquear cada tema.

Após selecionar um tema disponível, segue para a escolha da dificuldade e do modo.

### 5.4 Escolha da dificuldade e do modo

Modal único com dificuldade (4.2) e modo (4.3). Após selecionar tudo, o usuário clica em **Continuar**, que leva à confirmação.

### 5.5 Confirmação e preparação da partida

Modal exibido sobre o tabuleiro, com todas as cartas viradas para baixo, em que o usuário confirma se quer iniciar o jogo com as escolhas feitas ou volta para trocá-las. O usuário visualiza:

- O tema escolhido.
- A dificuldade selecionada.
- O modo selecionado (e o limite, no Modo Desafio).
- Botão **Começar**: fecha o modal e inicia a partida e o cronômetro.
- Botão **Cancelar**: volta para a tela de **Temas** para trocar as escolhas.

O cronômetro só começa quando o usuário clica em **Começar** e o modal some.

### 5.6 Funcionamento da partida

1. O usuário clica na primeira carta.
2. A carta revela sua imagem.
3. O usuário seleciona uma segunda carta.
4. O contador registra uma tentativa.
5. O jogo compara as imagens das duas cartas.
6. Se forem diferentes, ficam visíveis por 850 ms e são viradas para baixo novamente.
7. Se forem iguais, permanecem visíveis.
8. O processo continua até que todos os pares sejam encontrados (ou, no Modo Desafio, até o limite ser atingido).

Enquanto duas cartas estão sendo comparadas, as demais ficam bloqueadas para impedir novos cliques.

### 5.7 Pausa

Ao clicar em **Pausar**:

- O cronômetro é interrompido.
- As cartas ficam escondidas e bloqueadas.
- O usuário não pode interagir com o tabuleiro.
- São exibidas as opções **Continuar**, **Reiniciar (embaralhar novamente)** e **Sair**. No Modo Desafio, não há **Reiniciar**.

Ao clicar em **Continuar**, o tabuleiro é liberado e o cronômetro volta a contar. **Reiniciar** e **Sair** encerram a partida atual sem salvar o desempenho:

- **Reiniciar:** sem confirmação, embaralha as cartas, zera o tempo e as tentativas e começa a nova partida direto, com o mesmo tema, dificuldade e modo.
- **Sair:** pede confirmação e volta para a tela de **Temas**.

A partida também é pausada automaticamente quando o usuário troca de aba ou minimiza o navegador.

### 5.8 Final da partida — vitória

A partida termina com vitória quando todos os pares são encontrados (no Modo Desafio, dentro do limite). Nesse momento:

- O cronômetro é interrompido.
- Uma vitória é contabilizada.
- O tempo total e a quantidade de tentativas são exibidos.
- O resultado é comparado com as vitórias anteriores da mesma dificuldade e do mesmo modo.
- O usuário é informado caso tenha conquistado um novo recorde de tempo ou de tentativas.
- O histórico de partidas é atualizado.
- O progresso para desbloquear novos temas é atualizado.
- Um novo tema é liberado caso alguma condição de desbloqueio tenha sido cumprida.
- No modo Normal, a tela final se apresenta como partida concluída; a tela de vitória é só do Modo Desafio.

### 5.9 Final da partida — derrota (Modo Desafio)

A partida termina com derrota quando o limite é atingido antes de todos os pares serem encontrados. Nesse caso:

- A partida conta como **concluída** e é registrada no histórico com resultado de derrota.
- A derrota **interrompe** a sequência de partidas consecutivas usada no desbloqueio de temas.
- A tela final oferece as **mesmas opções da vitória**.

### 5.10 Opções ao final da partida (vitória ou derrota)

- **Jogar novamente:** inicia outra partida com o mesmo tema, a mesma dificuldade e o mesmo modo (e limite), direto, sem o modal **Começar**. *(decisão P14)*
- **Voltar ao início:** retorna para a seleção de temas.
- **Ver desempenho:** só no modo Normal; abre a área de desempenho (5.11).

### 5.11 Área de partidas / Meu Histórico / Meu perfil

O usuário visualiza:

- Botão **Novo jogo** → escolha do tema e, depois, da dificuldade.
- Histórico de partidas.
- Quantidade total de vitórias.
- Progresso das conclusões consecutivas.
- Recordes de tempo por dificuldade e modo.
- Recordes de tentativas por dificuldade e modo.
- Temas disponíveis e bloqueados.
- Progresso para desbloquear o próximo tema.

## 6. Regras gerais (transversais)

- **Tabuleiro bloqueado:** durante a comparação de duas cartas, durante a exibição de cartas diferentes, durante a pausa e após o fim da partida.
- **Tentativa:** cada duas cartas selecionadas contam uma tentativa, formando par ou não.
- **Partida concluída:** termina em vitória ou em derrota (Modo Desafio). Entra no histórico e atualiza o progresso de desbloqueio.
- **Partida abandonada:** encerrada pela pausa via *Reiniciar* ou *Sair*, ou ao sair da partida por outra navegação. Não é salva: não entra no histórico e não atualiza o progresso de desbloqueio.
- **Saída da partida em andamento:** ao tentar ir para outra tela, o jogo pede confirmação ("Sair da partida?"); ao fechar ou recarregar a página, o navegador exibe um aviso.
- **Tela da partida:** exibe o tempo, as tentativas e o botão de pausa.
- **Persistência:** histórico, métricas, progresso e temas desbloqueados ficam salvos em `localStorage` e permanecem após o jogo ser fechado.
- **Recordes** de tempo e de tentativas são separados por dificuldade e por modo; só vitórias contam. *(decisão P11)*

## 7. Decisões tomadas

Decisões do autor que complementam ou corrigem `ORIGIN.md`.

| ID  | Decisão |
|-----|---------|
| P01 | Ordem: **Tema → Dificuldade + Modo → Confirmação**. A tela de confirmação serve para o usuário confirmar se quer iniciar com aquele tema e aquele modo; se não, ele volta e troca as escolhas. |
| P02 | A pausa oferece **Continuar**, **Reiniciar (embaralhar novamente)** e **Sair**. A opção "iniciar novo jogo" da F08 original foi descartada. |
| P03 | O manual é acessado **pela tela inicial**. Ele não é exibido automaticamente na primeira utilização. |
| P04 | Como o manual é acessado pela tela inicial, ele não é aberto durante a partida. |
| P05 | O "tempo estabelecido" (o limite de tempo do Desafio) é **fixo por dificuldade**: **30 s** (Fácil), **40 s** (Médio) e **50 s** (Difícil). |
| P06 | Os temas são: **Fauna, Artefatos, Flora, Reservas biológicas, Cultura global e Xilogravura**. **Fauna, Artefatos e Flora** começam desbloqueados. Cada condição desbloqueia um tema, por um mapeamento **provisório** (4.1). Cada tema usa as imagens da sua pasta (Artefatos: Draws). |
| P07 | Valem **apenas** as três condições de desbloqueio do fluxo. As condições citadas na descrição da F11 eram exemplos. |
| P08 | Cada condição tem a **própria sequência** (dificuldade e tipo de Desafio). Só uma derrota nela a interrompe; Normal, outra dificuldade, o outro tipo de Desafio e partidas **abandonadas** não. |
| P09 | A derrota no Modo Desafio **conta como partida concluída**, **entra no histórico**, **interrompe a sequência** de partidas consecutivas e a tela final tem **as mesmas opções da vitória**. |
| P10 | O limite do Desafio é **um valor por dificuldade**: tempo = tempo estabelecido (P05); tentativas = **10** (Fácil), **14** (Médio) e **18** (Difícil). O jogador escolhe só entre limite de tempo ou de tentativas. No limite de tempo, o cronômetro é **regressivo**. |
| P11 | Recordes de tempo e de tentativas são **separados por dificuldade e por modo**. Só vitórias contam (**derrotas não**). É recorde apenas o resultado **estritamente melhor** que o anterior (empate não é anunciado); a **primeira vitória** em uma dificuldade e modo não é anunciada como recorde. |
| P12 | As cartas diferentes ficam visíveis por **850 ms**. O valor pode ser ajustado conforme os testes manuais. |
| P13 | O **primeiro acesso** dura até o jogador concluir a primeira partida. |
| P14 | **Jogar novamente** mantém tema, dificuldade, modo e limite do Desafio, e começa a nova partida direto, sem passar pelo modal **Começar**. |
| P15 | Tabuleiro com **4 colunas** em todas as dificuldades; linhas: **2** (8 cartas), **3** (12) e **4** (16). |
| P16 | A tela final tem **Jogar novamente** e **Voltar ao início** (para a seleção de temas). No modo Normal, também tem **Ver desempenho** (para a área de desempenho). |
| P17 | Um **único jogador local**, sem login. A persistência é feita com **localStorage**. |
| P18 | **Reiniciar** embaralha, zera tempo e tentativas e começa a nova partida direto, mantendo tema, dificuldade e modo. No Modo Desafio, a pausa não tem Reiniciar. **Sair** volta para a tela de Temas. |
| P19 | Confirmação e preparação são a mesma etapa: um **modal sobre o tabuleiro virado**. O botão **Começar** fecha o modal e inicia o cronômetro. |
| — | **Proteções da partida**, mantidas do código do time: confirmação antes de Sair (Reiniciar é direto), pausa automática ao trocar de aba, confirmação ao navegar para outra tela, aviso ao fechar a página. |
| — | **Layout responsivo.** O jogo é pensado para mobile e se adapta aos diferentes tamanhos de smartphone; telas maiores também são atendidas. Orientação: somente retrato. |
| — | **Vitória no modo Normal.** Encontrar todos os pares conta como vitória em qualquer modo (total de vitórias, recordes e desbloqueio). No modo Normal, a tela final se apresenta como **partida concluída**; a **tela de vitória** é só do Modo Desafio. |

## 8. Pontos em aberto

**O agente não deve decidir estes pontos sozinho.**

Pontos marcados com 🚫 são **bloqueantes**: a parte do comportamento que depende deles **não deve ser implementada** até o autor decidir. O agente não deve inventar valores, placeholders ou soluções provisórias para eles. Se uma tarefa esbarrar em um ponto bloqueante, o agente deve parar essa parte e informar o autor.

| ID  | Ponto | Features |
|-----|-------|----------|
| P06 | **Condição definitiva de cada tema.** Hoje vale o mapeamento provisório da seção 4.1. | F10, F11 |