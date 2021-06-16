const random_words = [
  {
    subject: "Tech",
    words: [
      "phone",
      "gamepad",
      "microphone",
      "headphones",
      "computer",
      "printer",
      "scanner",
      "mouse",
      "keyboard",
    ],
  },
  {
    subject: "House",
    words: [
      "pillow",
      "bed",
      "blanket",
      "chair",
      "sofa",
      "bedroom",
      "bathroom",
      "living room",
      "carpet",
      "lamp",
      "balkon",
      "roof",
      "garden",
    ],
  },
  {
    subject: "School",
    words: [
      "pen",
      "pencil",
      "pencil case",
      "eraser",
      "pencil sharpener",
      "desk",
      "teacher",
      "student",
      "chalk",
      "classroom",
      "book",
      "notebook",
    ],
  },
  {
    subject: "Places",
    words: [
      "eiffel tower",
      "the colosseum",
      "statue of liberty",
      "the acropolis",
      "pyramids of giza",
      "great wall of china",
      "niagara falls",
      "sydney opera house",
      "kilimanjaro",
      "big ben",
    ],
  },
  {
    subject: "Parts Of Body",
    words: [
      "hand",
      "nose",
      "hand",
      "finger",
      "eye",
      "foot",
      "leg",
      "body",
      "head",
      "ear",
      "mouth",
      "hair",
      "tooth",
    ],
  },
  {
    subject: "Brands",
    words: [
      "apple",
      "samsung",
      "logitech",
      "amazon",
      "nike",
      "nokia",
      "adidas",
      "sega",
      "twitter",
      "lego",
      "fanta",
      "coca cola",
      "google",
      "starbucks",
      "facebook",
      "instagram",
    ],
  },
  {
    subject: "Meal",
    words: ["meat", "spagetti", "rice", "pizza", "soup", "burger", "cake"],
  },
  {
    subject: "Fruits & Vegetables",
    words: [
      "apple",
      "banana",
      "grape",
      "watermelon",
      "orange",
      "strawberry",
      "cherry",
      "mango",
      "pomegranate",
      "raspberry",
      "kiwi",
      "pineapple",
      "lemon",
      "peach",
      "blueberry",
      "lime",
      "pear",
      "cucumber",
      "tomato",
      "carrot",
      "onion",
      "pepper",
      "cabbage",
      "mushroom",
      "pumpkin",
      "potato",
      "corn",
    ],
  },
  {
    subject: "Animals",
    words: [
      "lion",
      "leopard",
      "chetah",
      "frog",
      "dog",
      "cat",
      "elephant",
      "girrafe",
      "bird",
      "fox",
      "monkey",
      "gorilla",
      "turtle",
      "bear",
      "eagle",
      "hippo",
      "jaguar",
      "koala",
      "zebra",
      "wolf",
      "chimpanzee",
    ],
  },
];

// Functions
const randomArrItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomWord = () => {
  const randomWords = randomArrItem(random_words);
  const randomSubject = randomWords["subject"];
  const randomWord = randomArrItem(randomWords["words"]);
  return [randomSubject, randomWord];
};

const playAudio = (audioName) => {
  let audio = new Audio(audioName);
  audio.play();
};

const showResults = (isWon) => {
  setTimeout(() => {
    modelContainerEl.style.visibility = "visible";
    document.querySelector(".model_container").style.animation =
      "model 1s ease 1 forwards";
    randomWordSpanModelEl.textContent = randomWord[1];
    if (isWon) {
      // WHEN PLAYER WINS
      resultModelEl.classList.add("won");
      randomWordContainerModelEl.style.display = "none";
      wrongGuessesContainerModelEl.style.display = "block";
      wrongGuessesSpanModelEl.textContent = current_guesses;

      if (current_guesses <= 2) {
        wrongGuessesSpanModelEl.style.color = "rgba(29, 233, 29, 0.9)";
      } else if (current_guesses <= 4) {
        wrongGuessesSpanModelEl.style.color = "rgba(255, 136, 0, 0.973)";
      } else if (current_guesses <= 6) {
        wrongGuessesSpanModelEl.style.color = "red";
      }
    } else {
      // WHEN PLAYER LOSES
      resultModelEl.classList.add("lost");
      randomWordContainerModelEl.style.display = "block";
    }
  }, 300);
};

// Global Variables
// HTML Elements
const keyboardDiv = document.querySelector(".keyboard");
const wordEl = document.querySelector(".action_container .word");
const subjectEl = document.querySelector(".subject span");
const imageEl = document.querySelector(".images img");
const wrongGuessesTextEl = document.querySelector(".wrong_guesses");
const currentGuessesEl = document.querySelector(
  ".wrong_guesses .current_guesses"
);
const allGuessesEl = document.querySelector(".wrong_guesses .all_guesses");
const modelContainerEl = document.querySelector(".end_container");
const resultModelEl = document.querySelector(".result");
const randomWordContainerModelEl = document.querySelector(".model_random_word");
const randomWordSpanModelEl = document.querySelector(".model_random_word span");
const wrongGuessesContainerModelEl = document.querySelector(
  ".model_wrong_guesses"
);
const wrongGuessesSpanModelEl = document.querySelector(
  ".model_wrong_guesses span"
);

// Variables
var randomWord = getRandomWord();
var keyboardBtns;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const all_guesses = 6;
var current_guesses = 0;
var extraLetterAfter = 7;
var extraLetterCount = 3;

// Subject
subjectEl.textContent = randomWord[0];

// Guesses
currentGuessesEl.textContent = current_guesses;
allGuessesEl.textContent = all_guesses;

// Keyboard
for (let i = 0; i < alphabet.length; i++) {
  let newAlphabetButton = document.createElement("button");
  newAlphabetButton.textContent = alphabet[i];
  newAlphabetButton.id = alphabet[i];
  newAlphabetButton.classList.add("keyboard_button");
  keyboardDiv.append(newAlphabetButton);
}

// Keyboard Buttons
keyboardBtns = document.querySelectorAll(".keyboard_button");
keyboardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.disabled = true;
    // CORRECT
    if (randomWord[1].includes(btn.id)) {
      for (let i = 0; i < randomWord[1].length; i++) {
        if (randomWord[1][i] == btn.id) {
          wordEl.childNodes[i].textContent = btn.id;
          playAudio("audio/correct.mp3");
          btn.classList.add("correct");
        }
      }
      // WRONG
    } else {
      current_guesses += 1;
      currentGuessesEl.textContent = current_guesses;
      playAudio("audio/wrong.mp3");
      btn.classList.add("wrong");

      imageEl.src = `images/${current_guesses}.jpg`;
      if (current_guesses <= 2) {
        wrongGuessesTextEl.style.color = "rgba(29, 233, 29, 0.9)";
      } else if (current_guesses <= 4) {
        wrongGuessesTextEl.style.color = "rgba(255, 136, 0, 0.973)";
      } else if (current_guesses <= 6) {
        wrongGuessesTextEl.style.color = "red";
      }

      if (current_guesses >= 6) {
        showResults(false);
      }
    }

    if (!wordEl.textContent.includes("_")) {
      showResults(true);
    }
  });
});

// Adding to a word element some spans with letter of a random word
for (let i = 0; i < randomWord[1].length; i++) {
  let letter = randomWord[1][i];
  let newSpan = document.createElement("span");
  if (letter == " ") {
    newSpan.classList.add("empty");
  } else {
    newSpan.textContent = "_";
  }
  wordEl.append(newSpan);
}

// Add Extra Helping Letters
if (randomWord[1].length > extraLetterAfter) {
  for (let i = 0; i < extraLetterCount; i++) {
    let randomLetter = randomArrItem(randomWord[1]);
    if (randomWord[1].includes(randomLetter)) {
      for (let i = 0; i < randomWord[1].length; i++) {
        if (randomWord[1][i] == randomLetter) {
          wordEl.childNodes[i].textContent = randomLetter;
          keyboardBtns.forEach((btn) => {
            if (btn.id == randomLetter) {
              btn.disabled = true;
            }
          });
        }
      }
    }
  }
}
