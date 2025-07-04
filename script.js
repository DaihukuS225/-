const board = document.getElementById('game-board');

// 絵文字ペア（同じ絵柄が2枚ずつ）
const cards = ['🍎', '🍌', '🍇', '🍊', '🍎', '🍌', '🍇', '🍊'];

// カードを1枚ずつ作る
cards.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = '❓';  // 最初は裏面
  card.dataset.emoji = emoji;
  card.dataset.index = index;

  // カードをクリックしたとき
  card.addEventListener('click', () => {
    card.textContent = emoji; // めくる
  });

  board.appendChild(card);
});
