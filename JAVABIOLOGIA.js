const questions = [
    {
        question: "¿Cuál es el órgano principal del sistema reproductor masculino?",
        answer: "pene",
        hints: [
            "Es un órgano externo.",
            "Es el órgano a través del cual se expulsa la orina y el semen."
        ]
    },
    {
        question: "¿Qué glándula produce el líquido que nutre y transporta a los espermatozoides?",
        answer: "prostata",
        hints: [
            "Esta glándula se encuentra debajo de la vejiga.",
            "Produce un líquido que es parte del semen."
        ]
    },
    {
        question: "¿Cuál es el nombre de los tubos donde se almacenan y maduran los espermatozoides?",
        answer: "epidídimo",
        hints: [
            "Estos tubos están situados en la parte superior de los testículos.",
            "Son responsables de la maduración de los espermatozoides."
        ]
    },
    {
        question: "¿Cómo se llaman las células reproductivas masculinas?",
        answer: "espermatozoides",
        hints: [
            "Son las células encargadas de fertilizar el óvulo.",
            "Son producidas en los testículos."
        ]
    },
    {
        question: "¿Cuál es el nombre del conducto por donde pasan los espermatozoides desde los testículos hasta la uretra?",
        answer: "conducto deferente",
        hints: [
            "Este conducto conecta los testículos con la uretra.",
            "Es parte del sistema reproductor masculino."
        ]
    },
    {
        question: "¿Cómo se llama el tejido que rodea el testículo y ayuda a regular su temperatura?",
        answer: "escroto",
        hints: [
            "Es una bolsa de piel que cuelga fuera del cuerpo.",
            "Ayuda a mantener la temperatura adecuada para la producción de espermatozoides."
        ]
    }
];

let currentQuestion = {};
let guessedWord = [];
let attemptsLeft = 3;
let timer;
let timerDisplay;
const timeLimit = 30; 

function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

function startGame() {
    const question = getRandomQuestion();
    currentQuestion = question;
    guessedWord = Array(question.answer.length).fill("_");
    attemptsLeft = 3;

    document.getElementById("word").textContent = guessedWord.join(" ");
    document.getElementById("attempts").textContent = `Intentos restantes: ${attemptsLeft}`;
    document.getElementById("message").textContent = "";
    document.getElementById("letter-input").disabled = false;
    document.getElementById("letter-input").focus();

    document.getElementById("question").textContent = `Pregunta: ${question.question}`;
    document.getElementById("hint1").textContent = `Pista 1: ${question.hints[0]}`;
    document.getElementById("hint2").textContent = `Pista 2: ${question.hints[1]}`;

    startTimer();
}

function startTimer() {
    let timeLeft = timeLimit;
    timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = `Tiempo restante: ${timeLeft} segundos`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Tiempo restante: ${timeLeft} segundos`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("message").textContent = "¡Se acabó el tiempo!";
            attemptsLeft = 0; 
            document.getElementById("attempts").textContent = `Intentos restantes: ${attemptsLeft}`;
            showGameOverModal();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
}

document.getElementById("letter-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkLetter();
    }
});

function checkLetter() {
    const input = document.getElementById("letter-input");
    const letter = input.value.toLowerCase();
    let correct = false;

    for (let i = 0; i < currentQuestion.answer.length; i++) {
        if (currentQuestion.answer[i] === letter) {
            guessedWord[i] = letter;
            correct = true;
        }
    }

    document.getElementById("word").textContent = guessedWord.join(" ");

    if (correct) {
        document.getElementById("message").textContent = "¡Correcto!";
        if (!guessedWord.includes("_")) {
            handleWin();
        }
    } else {
        attemptsLeft--;
        document.getElementById("message").textContent = "Letra incorrecta.";
        document.getElementById("attempts").textContent = `Intentos restantes: ${attemptsLeft}`;
        if (attemptsLeft === 0) {
            resetTimer();
            showGameOverModal();
        }
    }

    input.value = "";
    input.focus();
}

function handleWin() {
    resetTimer();
    const choice = confirm("¡Felicidades! Has adivinado la palabra. ¿Deseas volver a intentarlo? Presiona 'Aceptar' para reiniciar el juego o 'Cancelar' para ir a la página de agradecimiento.");

    if (choice) {
        startGame();
    } else {
        window.location.href = "agradecimiento.html"; 
    }
}

function showGameOverModal() {
    document.getElementById("letter-input").disabled = true;
    const modal = document.getElementById("gameOverModal");
    modal.style.display = "block";

    document.getElementById("retryButton").onclick = function() {
        modal.style.display = "none";
        document.getElementById("message").textContent = "¡Genial, intentémoslo nuevamente!";
        setTimeout(() => {
            startGame();
        }, 2000);
    };

    document.getElementById("closeButton").onclick = function() {
        const userChoice = confirm("Lo siento, has perdido. ¿Deseas ir a la página de agradecimiento? Presiona 'Aceptar' para ir a la página de agradecimiento o 'Cancelar' para cerrar la ventana.");
        if (userChoice) {
            window.location.href = "file:///C:/Users/DELL/OneDrive/Escritorio/juego%20de%20biologia/agradecimiento.html"; // Redirigir a la página de agradecimiento
        } else {
            window.close(); 
        }
    };
}


window.onload = startGame;
