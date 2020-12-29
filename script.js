const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    if(lockboard) return;
    if(this === firstCard) return;
    this.classList.toggle('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.pokemon === secondCard.dataset.pokemon;
    isMatch ? disableCards() : unflipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockboard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockboard = false;
        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockboard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomNo = Math.floor(Math.random() * 12);
        card.style.order = randomNo;
    });
})();