const board = document.getElementById('game-board');

// 絵文字ペア（同じ絵柄が2枚ずつ）
const cards = ['🍎', '🍌', '🍇', '🍊', '🍎', '🍌', '🍇', '🍊'];
let flippedCards = [];  //今めくっているカード２枚保持
let lock = false;       //めくり中の操作制限


// カードを1枚ずつ作る
cards.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = '❓';  // 最初は裏面
  card.dataset.emoji = emoji;
  card.dataset.index = index;

  /*//カードをクリックしたとき
  card.addEventListener('click', () => {
    card.textContent = emoji; // めくる
  });
  */

  card.addEventListener('click', () => {
    if (lock) return;          //処理ロック中は無視
    if (flippedCards.includes(card)) return;  //同じカードは無視
    if (card.textContent !== '❓') return;   //すでにめくってるカードは無視

    card.textContent = emoji; // めくる
    flippedCards.push(card);

    if (flippedCards.length === 2){
        lock = true;  //二枚めくったら操作をロック

        if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji){
            flippedCards = [];
            lock = false;
        } else {
            setTimeout (() => {
                flippedCards.forEach(c => c.textContent = '❓');
                flippedCards = [];
                lock = false;
            }, 500);
        }
    }
  })

  board.appendChild(card);
});
