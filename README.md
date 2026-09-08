# tria

**três tarefas. um tempo.**

Um timer gratuito para dar espaço ao que importa agora. Escolha um tempo, selecione o contexto e cuide de apenas três tarefas.

## O produto

- Timer com iniciar, pausar, continuar e reiniciar.
- Sessões de 25, 45 ou 60 minutos; duração personalizada de 1 a 180 minutos.
- Tags selecionáveis, com criação de até 12 tags por sessão.
- Exatamente três espaços para tarefas: editar, concluir e apagar.
- Interface monocromática fluida com vidro fosco, campos com destaque de edição e áreas de toque de 44 px.
- Tema automático que acompanha o sistema, com opções claro e escuro salvas no dispositivo.
- Ruído marrom contínuo e suave, iniciado por toque, com volume e transições graduais.
- Controles com rótulos acessíveis e navegação por teclado.
- Sem cadastro, anúncios, rastreamento ou dependências externas.

## Uso

Abra o site, escolha a duração e preencha até três tarefas. Selecione uma tag e pressione **Iniciar**. O contador acompanha o relógio ao retornar de uma aba em segundo plano. Se o navegador suspender a página, a indicação de conclusão será atualizada quando ela voltar a executar.

Esta versão mantém tarefas e tags somente na sessão da página. Recarregar ou fechar apaga o conteúdo. Não há sincronização entre dispositivos nem aviso sonoro de conclusão. O som ambiente é independente do timer e começa desligado a cada abertura. Tema e volume ficam salvos localmente quando o navegador permite.

## Desenvolvimento

HTML, CSS e JavaScript nativos. Nenhuma instalação ou etapa de compilação.

Com Python 3 instalado, execute na raiz do projeto:

```sh
python3 -m http.server 8000
```

Abra `http://localhost:8000`.

## Estrutura

- `index.html`: interface e metadados.
- `style.css`: identidade visual e responsividade.
- `app.js`: timer, tags e tarefas.
- `theme.js`: aparência automática e preferência local.
- `ambient.js` e `brown-noise.js`: controles e geração do áudio via AudioWorklet (HTTPS ou localhost).
- `icon.svg`: símbolo da marca.
- `BRAND.md`: posicionamento e textos de divulgação.

## Publicação

Os arquivos estão na raiz do repositório e usam caminhos relativos compatíveis com GitHub Pages em `/tria/`. A configuração e ativação da hospedagem será feita separadamente pelo proprietário. O arquivo `.nojekyll` permite servir os arquivos estáticos diretamente.

## Identidade no GitHub

Repositório: [jontsm0/tria](https://github.com/jontsm0/tria).

Descrição: “Três tarefas. Um tempo. Timer minimalista gratuito com tags e foco no essencial.”

Tópicos: `focus`, `timer`, `productivity`, `minimal`, `vanilla-javascript`, `responsive`.

O nome é uma proposta criativa; disponibilidade de marca e domínio não foi verificada. O projeto ainda não define uma licença de redistribuição; uso gratuito do site não significa automaticamente código aberto.

## Decisões de interface e referências

Tipografia nativa do sistema (`system-ui`), campos em `1rem` (16 px na configuração padrão), rótulos regulares em `0.875rem` e números do timer com escala fluida e algarismos tabulares. Esses tamanhos são escolhas de design, não mínimos impostos pelas WCAG.

- [W3C — ampliação de texto até 200%](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).
- [W3C — reflow e largura de 320 CSS px](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html).
- [Radix UI — componentes e acessibilidade](https://www.radix-ui.com/primitives/docs/overview/accessibility): avaliado; não adotado porque o projeto é estático e os controles usados têm equivalentes HTML nativos.
- [MDN — backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter): blur no fundo do painel, sem desfocar conteúdo; fallback opaco e preferência por transparência reduzida.
- [MDN — prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme).
- [MDN — AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet): integração de ruído aleatório contínuo, filtragem de graves extremos e agudos e ganho gradual; sem arquivos de áudio externos.

O áudio é uma opção de ambientação, sem promessa de efeito cognitivo. A reprodução pode ser interrompida pelo sistema ao bloquear a tela ou trocar de aplicativo. Não houve validação visual nem teste auditivo em aparelhos físicos nesta revisão.
