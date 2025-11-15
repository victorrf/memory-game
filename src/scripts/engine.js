const flag = [
    "./src/images/Botafogo.png",
    "./src/images/Botafogo.png",
    "./src/images/Corinthians.png",
    "./src/images/Corinthians.png",
    "./src/images/Flamengo.png",
    "./src/images/Flamengo.png",
    "./src/images/Fluminense.png",
    "./src/images/Fluminense.png",
    "./src/images/Palmeiras.png",
    "./src/images/Palmeiras.png",
    "./src/images/Santos.png",
    "./src/images/Santos.png",
    "./src/images/SaoPaulo.png",
    "./src/images/SaoPaulo.png",
    "./src/images/Vasco.png",
    "./src/images/Vasco.png"
];

let openCards = [];
let totalMovimentos = 0;

let shuffleFlag = flag.sort(() => (Math.random() > 0.5 ? 2 : -1));

for(let i=0; i < flag.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = `<img src="${shuffleFlag[i]}">`;
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);

        totalMovimentos++;
    }

    if(openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

function saveScore(playerName, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({ name: playerName, score: score });

    leaderboard.sort((a, b) => a.score - b.score);

    leaderboard = leaderboard.slice(0, 5);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    let message = "🏆 Top 5 Jogadores:\n\n";

    if (leaderboard.length === 0) {
        message += "Nenhuma pontuação ainda!";
    } else {
        leaderboard.forEach((entry, index) => {
            message += `${index + 1}. ${entry.name} - ${entry.score} movimentos\n`;
        });
    }

    alert(message);
}

function checkMatch() {
    const img1 = openCards[0].querySelector("img").src;
    const img2 = openCards[1].querySelector("img").src;

    if(img1 === img2) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if(document.querySelectorAll(".boxMatch").length == flag.length){
        const name = prompt("Digite seu nome para salvar no ranking:");
        saveScore(name, totalMovimentos);
        showLeaderboard();
    }
}