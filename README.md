
# 🦍 Gorilla Bass - "Gorila x 100 Humanos"

## 🎮 Tema
Simulação interativa de uma batalha entre um gorila e 100 humanos invasores utilizando HTML, CSS e JavaScript. O jogador controla o gorila e deve eliminar todos os humanos antes que sua vida acabe.

---

## 👨‍💻 Integrantes

| Nome               | RM       |
|--------------------|----------|
| Diego Andrade      | 566385   |
| Gustavo Crevellari | 561408   |
| Rafaela Ferreira   | 561671   |

---

## 🧠 Descrição do Projeto

Neste jogo, o jogador controla um gorila em uma selva enquanto enfrenta uma invasão de 100 humanos. O objetivo é sobreviver e eliminar todos os inimigos. O gorila pode se mover, atacar, se curar e ficar invulnerável temporariamente. Os humanos se movem automaticamente e atacam o gorila ao se aproximarem.

---

## ✅ Funcionalidades

- ✅ Interface HTML com tela de início, HUD e fim de jogo
- ✅ Movimento do gorila com teclas `W`, `A`, `S`, `D`
- ✅ Ataque com botão esquerdo do mouse (com animação)
- ✅ Modo invulnerável com botão direito do mouse
- ✅ Cura do gorila com tecla `Q`
- ✅ Humanos com movimentação automática
- ✅ Atualização da vida e status em tempo real
- ✅ Log de ações durante a batalha
- ✅ Validação de fim de jogo com tela de encerramento
- ✅ Botão para reiniciar o jogo
- ✅ Salvamento da contagem de humanos mortos com `localStorage`

---

## 🛠 Tecnologias Utilizadas

- HTML5
- CSS3 (externo e responsivo)
- JavaScript (puro, modular e com uso de localStorage)
- DOM API (`getElementById`, `addEventListener`, `setInterval`, etc.)

---

## 📁 Estrutura do Projeto

```
gorilla-bass/
├── index.html
├── README.md
├── style/
│   └── style.css
├── js/
│   └── game.js
├── assets/
│   ├── gorilla.png
│   ├── human.png
│   └── swamp_.png
```

---

## 🔍 Detalhes Técnicos Avaliativos

| Nº | Critério Avaliado                                                                 | Implementado |
|----|------------------------------------------------------------------------------------|--------------|
| 1  | Interface HTML completa com HUD e personagens                                     | ✅            |
| 2  | Ataque do gorila com efeito visual simples (animação)                             | ✅            |
| 3  | Atualização da vida, mortos e vivos em tempo real no DOM                          | ✅            |
| 4  | Funções separadas para atacar, curar, defender, etc                                | ✅            |
| 5  | Uso de array para representar os 100 humanos                                       | ✅            |
| 6  | Loop para movimentação dos humanos e redução de vida                               | ✅            |
| 7  | Log de batalha (exibido no `<div id="log">`)                                       | ✅            |
| 8  | Salvamento da contagem de humanos mortos com `localStorage`                        | ✅            |
| 9  | Validação de fim de jogo com tela de encerramento personalizada                   | ✅            |
| 10 | Estilização externa com tema de selva/gorila e responsividade                     | ✅            |

---

## 🚀 Como Jogar

1. Clique em **START GAME**
2. Use:
   - `W`, `A`, `S`, `D` para mover o gorila
   - Botão esquerdo do mouse para atacar (com animação)
   - Botão direito do mouse para ativar invulnerabilidade por 3 segundos
   - Tecla `Q` para curar o gorila em 10 pontos
3. Derrote todos os 100 humanos ou sobreviva até o fim!

---

## 📦 Instruções de Entrega

- Arquivos compactados em `.zip`
- Entrega pelo Microsoft Teams até **25/05/2025, às 23:59**
- Mínimo de **15 commits distribuídos entre os membros**
- Nenhuma dependência externa

---

## 💡 Aprendizados

- Manipulação de elementos HTML com JavaScript
- Uso de `setInterval()` para lógica de jogo
- Eventos de teclado e mouse
- Armazenamento de estado com `localStorage`
- Organização modular com boas práticas de código
- Trabalho em equipe e divisão de responsabilidades

---

## 📘 Créditos

Desenvolvido por alunos do curso de Front-End, como parte do projeto CP3 — Gorilla x 100 Humanos 🦍
