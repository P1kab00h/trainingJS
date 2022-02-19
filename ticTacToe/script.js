// On va cahrger nos infos utiles

const status = document.querySelector("h3");
let isGameActive = true;
let joueurActif = 'X';

// nous permettra d'enregistrer le statut du jeu => soit le nombre de coup joué, sa nature, sa position dans la grille
// L'information sera de type suivant ==>
// ["", "X", "O", "", "X", "", "X", "", "O"] par exemple ou les cases une fois remplie ne devront plus être jouable
let gameStatus = ["", "", "", "", "", "", "", "", ""];

//Ici nous listons nos conditions de victoire
// Soit une ligne, soit une colonne, soit une diagonale, en tout 8 possibilités
const winingConditions = [
    // cas possible pour les lignes
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // les colonnes
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // les diagonales
    [0, 4, 8],
    [2, 4, 6],
]

// Nos différents messages
const winner = () => `Le joueur ${joueurActif} a gagné`;
const draw = () => `C'est une égalité !!`;
const playerTurn = () => `${joueurActif} c'est ton tour !!`;


// Cette ligne va nous permettre de display dans notre balise h3 (le querySelector est positionné sur h3) le joueur dont c'est le tour de jeu
status.innerHTML = playerTurn();


// Nous allons sélectionner toutes nos 'cell', et pour chacunes d'elles nous aurons un eventListener au click qui appelera la fonction clickCellManagement
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener("click", clickCellManagement))

// Ici nous récupérons l'élement dont l'id est 'restart' soit notre bouton pour redémarrer un jeu, au click nous appelerons la fonction restartGame
document.getElementById('restart').addEventListener("click", restartGame)

// création de la fonction 'clickCellManagement'
function clickCellManagement() {
    // un console.log sur this nous permettra de détecter lors des tests sur quel case nous cliquons, ici avec l'ajout de dataset.cellIndex nous aurons l'index de la case sur laquelle nous cliquons, attention dans le console.log la donnée récupérée n'est pas un integer
    //console.log(this.dataset.cellIndex);
    let cellIndex = parseInt(this.dataset.cellIndex);

    // ici nous allons faire une verification de gameStatus sur un index de case donnée, si il n'est pas vide OU si le jeu n'est pas actif
    if(gameStatus[cellIndex] != "" || !isGameActive) {
        // alors on ne fait rien on sort du if
        return
    }
    // Sinon nous allons remplir le tableau gameStatus avec l'information figurant le joueur actif (soit X ou O)
    gameStatus[cellIndex] = joueurActif;
    // Dans le même temps nous allons ajouter à this (la case cliqué) le joueurActif
    this.innerHTML = joueurActif;


    // Appel de la fonction winCheck
    winCheck()

}

// création d'un fonction pour verifier si le jeu a été gagné, ou en égalité ou que des tours reste à jouer
function winCheck(){
    let winningTurn = false;
        //ici une des parties les plus complexes on fait une boucle for ou l'on vérifie chacunes des conditions de vicoires possible (donc pour une condition de victoire il faut que les 3 cases soit coché par le même joueur)
    for(let winingCondition of winingConditions){
        let val1 = gameStatus[winingCondition[0]];
        let val2 = gameStatus[winingCondition[1]];
        let val3 = gameStatus[winingCondition[2]];

        // si l'une des trois valeurs n'est pas remplie alors on continue (conditon de victoire non remplis pour ce cas
        if(val1 === "" || val2 === "" || val3 === ""){
            continue;
        }
        // cependant, si la donnée dans val1 est égale à val2 qui est lui-même égale à val3 alors cela veut dire que c'est le même joueur qui a coché ces cases donc nous sommes dans un tour gagnant, modification de winningTurn
        if(val1 === val2 && val2 === val3) {
            winningTurn = true;
            break;
        }
    }
    // Somme-nous sur un tour gangant ? si oui alors => Victoire pour le joueur courant (c'est le dernier coup qui détermine la victoire donc le dernier joueur courant est forcément celui victorieux)
    if(winningTurn){
        status.innerHTML = winner();
        // On arrête alors la partie
        isGameActive = false;
        return;
    }
    // Si nous ne sommes pas sur un tour gagnant, mais que la grille est pleine (!gameStatus.includes("") donc pas vide ^^)
    if(!gameStatus.includes("")){
        status.innerHTML = draw();
        isGameActive = false;
        return;
    }
    // enfin si nous ne sommes dans aucuns des cas ci-dessus la partie est toujours en cours il nous faut donc changer de joueur, utilisation d'un ternaire
    // si
    joueurActif = joueurActif === "X" ? "O" : "X";
    // nous allons modifier notre affichage afin que le tour du joueur soit indiqué correctement
    status.innerHTML = playerTurn();
};

// création de la fonction restartGame, ici la fonction consistera à "restaurer" les valeurs par défaut (soit les valeurs au début d'une partie
function restartGame(){
    // le joueur Actif repasse à "X"
    joueurActif = "X";
    // la jeu sera actif à nouveau
    isGameActive = true;
    // on réinitialise le statut du jeu (un des éléments le plus important!!) si on l'oublie les mouvements avant reinisiallisation seront toujours enregistré
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    // On affiche le joueur dont c'est le tour
    status.innerHTML = playerTurn();
    //et on vide les cases déjà remplis
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");

}



//TODO: prévoir un mode de jeu vs computer