const MIN_NUMBER = 1;
const MAX_NUMBER = 5;

const game = {
  attempts: 1,
  searchedNumber: null, // On met null en attendant d'initialiser la valeur lorsqu'on débute la partie.
};

const scores = [];

play();


function play() {
  const game = {
    attempts: 1, // A chaque game, on réinitialise le nombre d'attempt
    searchedNumber: generateRandomNumber(MIN_NUMBER, MAX_NUMBER), // A chaque game, on génère un nouveau nombre
  };

  // Demande le nombre à l'utilisateur
  let enteredNumber = parseInt(prompt('Quel est le nombre à trouver ?'));

  while (enteredNumber !== game.searchedNumber) {
    if (!enteredNumber) { // Si l'utilsateur rentre un nombre (ex: 45, alors !45 === false, donc on ne rentre pas dans la boucle)
      break; // Si l'utilisateur clique sur annuler, alors enteredNumber vaut NaN, et !NaN est vrai, donc on rentre dans la boucle
    }

    if (enteredNumber < game.searchedNumber) {
      enteredNumber = parseInt(prompt('C\'est plus'));
    } else {
      enteredNumber = parseInt(prompt('C\'est moins'));
    }

    game.attempts += 1;
  }

  if (enteredNumber) { // On regarde si enteredNumber est truthy (ex: 45) ou falsy (ex: NaN)
    alert('Bravo ! C\'était bien ' + game.searchedNumber + ' - Nombre d\'essais : ' + game.attempts);
    scores.push(game.attempts);


    // On demande à l'utilisateur s'il veut rejouer.
    // Si oui, on rejoue
    // Sinon, on ne fait rien.

    const wantsToReplay = confirm("Voulez-vous rejouer ?");
    if (wantsToReplay) {
      play(); // On relance le jeu après une victoire // La fonciton play s'appelle elle même, donc on parle de fonction recursive
    } else {
      displayScores(); // S'il ne veut pas rejouer, on va lui afficher les scores
    }

    console.log(scores); // On n'hésite pas à abuser des console.log pour vérifier notre code régulièrement
  } else {
    alert('Vous abandonnez ? Dommage...');
  }
}

function displayScores() {
  // scores = [1, 4, 5, 3, 1]; // par exemple ! pour nous aider à visualiser

  for (let index = 0; index < scores.length; index++) { // pour chaque valeur du tableau,
    // -> on affiche dans une alerte la chose suivante : `Partie X: Y essais`
    const gameIndex = index + 1;
    const gameScore = scores[index];
    alert(`Partie ${gameIndex} : ${gameScore} essai(s).`);
  }

  // Tours de boucle :
  // i = 0   ||  gameIndex = 1    || gameScore = scores[0] = 1
  // i = 1   ||  gameIndex = 2    || gameScore = scores[1] = 4
  // i = 2   ||  gameIndex = 3    || gameScore = scores[2] = 5
}

function displayScoresVersionBonus() {
  // Cumuler tous les textes dans la même chaine de caractère et afficher cette chaine de caractère 

  let result = ""; // Le resultat est vide avant la boucle

  for (let index = 0; index < scores.length; index++) { // pour chaque valeur du tableau,
    const gameIndex = index + 1;
    const gameScore = scores[index];
    result += `Partie ${gameIndex} : ${gameScore} essai(s).\n`;
  }

  alert(result);
}

function generateRandomNumber(min, max) { // On peut imaginer : min = 5 // max = 50
  // Générons un nombre entre min et max et on le retourne

  // Math.random() //                                         ===> [0, 1[
  // Math.random() * (max - min + 1) // [0, 1[ * (50 - 5 + 1) ===> [0, 46[
  // Math.random() * (max - min + 1) + min // [0, 46[ + 5     ===> [5, 51[
  // Math.floor(...) // Math.floor( [5, 51[ ) //              ===> [[5, 50]]
  return Math.floor(Math.random() * (max - min + 1) + min);

  // Solution alternative : return Math.round(Math.random() * (max - min) + min);
}

