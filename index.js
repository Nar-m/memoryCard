
const conteiner = document.querySelector('.grid-conteiner');
const restartBtn = document.querySelector('.restart');
const scores = document.querySelector('.score');

const card = [
    {

        image: "🍎",
    },
    {

        image: "'🍌",
    },
    {

        image: "🍇",
    },
    {

        image: "🍓",
    },
    {

        image: "🍉",
    },
    {

        image: "🍒",
    },
    {

        image: "🍍",
    },
    {

        image: "🥝",
    },
    {

        image: "🍎",
    },
    {

        image: "'🍌",
    },
    {

        image: "🍇",
    },
    {

        image: "🍓",
    },
    {

        image: "🍉",
    },
    {

        image: "🍒",
    },
    {

        image: "🍍",
    },
    {

        image: "🥝",
    },

]
let checkCard = [];
let score = 0;
let localBoard = false;

scores.innerHTML = `Score: ${score}`;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

shuffle(card);

function renderCard() {
    conteiner.innerHTML = "";
    card.forEach((cards) => {
        let div = document.createElement("div");
        div.dataset.value = cards.image;
        let image = document.createElement("div");
        div.classList.add('card');
        div.appendChild(image);
        image.classList.add('front');
        image.innerHTML = cards.image;
        div.addEventListener("click", handleCardClick);
        conteiner.appendChild(div);
    })
}

renderCard()

function handleCardClick(event) {
    const clickedCard = event.target;
    if (checkCard.length < 2 && !clickedCard.classList.contains('flipped')) {
        clickedCard.classList.add('flipped');
        checkCard.push(clickedCard);
    }
    if (checkCard.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = checkCard;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matches');
        card2.classList.add('matches');
        card.splice(card1, 1)
        card.splice(card2, 1)
        score += 2;
        scores.innerHTML = `Score: ${score}`;

        if (score === card.length) {
            setTimeout(() => {
                alert("You won games");
                restart();
            }, 600);
        }
        if (score === card.length && card1.dataset.value !== card2.dataset.value) {
            setTimeout(() => {
                alert("Game Over");
                restart();
            }, 600)
        }
        setTimeout(() => {
            card1.classList.remove('matches');
            card2.classList.remove('matches');
            card1.classList.add('remove');
            card2.classList.add('remove');
        }, 1200);
    }
    else {
        setTimeout(() => {
            card1.classList.remove('flipped')
            card2.classList.remove('flipped')
        }, 1000)
    }
    checkCard = []
}

restartBtn.addEventListener("click", restart)

function restart() {
    score = 0;
    scores.innerHTML = `Score: ${score}`;
    checkCard = [];
    localBoard = false;
    renderCard()
}
