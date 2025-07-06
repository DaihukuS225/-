const board = document.getElementById('game-board');

const firstButton = document.getElementById('first-button');
const secondButton = document.getElementById('second-button');

let cards = [];  //カードに使うカードセット（最初は空）
let flippedCards = [];  //今めくっているカード２枚保持
let lock = false;       //めくり中の操作制限

// シャッフル関数
function shuffle(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame(levelData){
  board.innerHTML = "";
  cards = [...levelData,...levelData];
  shuffle(cards);

  flippedCards = [];
  lock = false;


// カードを1枚ずつ作る
cards.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = '❓';  // 最初は裏面
  card.dataset.emoji = emoji;
  card.dataset.index = index;



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
}

// ボタンにイベントを設定
firstButton.addEventListener("click", () => startGame(level1card));
secondButton.addEventListener("click", () => startGame(level2card));