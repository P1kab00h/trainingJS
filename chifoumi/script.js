
// Soit player le choix du joueur 'physique'
let player;

/*const playerChoice = document.querySelectorAll('button');

for (let i = 0; i < playerChoice.length; i++) {
    playerChoice[i].addEventListener('click', function () {
        player = playerChoice[i].innerHTML;
        console.log(player)
    })
}*/


console.log(player);






/!*let computer;*!/
// random nous servira pour la décision de la machine
let random;
// computer sera la variable du 'choix' du joueur ordinateur
const computerChoice = document.getElementById('computerChoice');

const resultat = document.getElementById('resultat');

// demandez à l'utilisateur son choix (pierre, feuille ou ciseaux)
//TODO : modifier avec un choix cliquable eventListener
player = window.prompt('Choisissez pierre feuille ou ciseaux');
// modifier la casse en minusule
player = player.toLowerCase();

// Math.random() retournera une valeur aleatoire entre 0 et 1 à la variable random
random = Math.random(); // nous allons séparer le résultat en 3 tiers
// si 1/3 affectez pierre à la variable computer et le display dans le doc
if(random < 1 / 3)
{
    computerChoice.innerHTML = 'pierre';
}
// sinon si 2/3 affectez feuille à la variable computer et le display dans le doc
else if(random < 2 / 3)
{
    computerChoice.innerHTML = 'feuille';
}
// sinon affectez ciseaux à la variable computer et le display dans le doc
else
{
    computerChoice.innerHTML = 'ciseaux';
 }

// Vérifiez si il y a une égalité
// affichez l'égalité
if(computerChoice.innerHTML === player) {
    resultat.innerHTML = "c'est une égalité";
} else {
    // Nous allons faire nos vérification par rapport au computerChoice
    switch (computerChoice.innerHTML) {
        // Cas de la pierre
        case 'pierre':
            // Si le player a choisi 'feuille' alors il gagne
            if (player == 'feuille') {
                resultat.innerHTML = "Le joueur gagne, " + player + " remporte face à " + computerChoice.innerHTML;
            // sinon il ne reste que le cas ciseaux, alors le joueur perd
            } else {
                resultat.innerHTML = "L'ordinateur gagne, " + computerChoice.innerHTML + " remporte face à " + player;
            }
            break;
            // Cas feuille similaire pierre avec adaptation selon les régles
        case 'feuille':
            if (player == 'ciseaux') {
                resultat.innerHTML = "Le joueur gagne, " + player + " remporte face à " + computerChoice.innerHTML;
            } else {
                resultat.innerHTML = "L'ordinateur gagne, " + computerChoice.innerHTML + " remporte face à " + player;
            }
            break;
        // Cas ciseaux similaire pierre avec adaptation selon les régles
        case 'ciseaux':
            if (player == 'pierre') {
                resultat.innerHTML = "Le joueur gagne, " + player + " remporte face à " + computerChoice.innerHTML;
            } else {
                resultat.innerHTML = "L'ordinateur gagne, " + computerChoice.innerHTML + " remporte face à " + player;
            }
            break;
    }
}



