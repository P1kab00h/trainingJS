// Soit player le choix du joueur 'physique'
let player;

const playerChoice = document.querySelectorAll('button');

// random nous servira pour la décision de la machine
let random;
// computer sera la variable du 'choix' du joueur ordinateur
const computerChoice = document.getElementById('computerChoice');

const resultat = document.getElementById('resultat');

const scorePlayer = document.getElementById('scorePlayer');

const scoreComputer = document.getElementById('scoreComputer');

const final = document.getElementById('main');

/*const finalContainer = document.createElement("p");*/

const refresh = document.createElement("button");
refresh.textContent = "Rafraîchir";
refresh.classList.add('btn');
refresh.classList.add('btn-primary');
refresh.classList.add('btn-x1');
refresh.classList.add('px-lg-5')
refresh.classList.add('text-center')
refresh.classList.add('px-4')

// demandez à l'utilisateur son choix (pierre, feuille ou ciseaux)
for (let i = 0; i < playerChoice.length; i++) {
    playerChoice[i].addEventListener('click', function () {
        player = playerChoice[i].innerHTML;
        // console.log(player);
/*

player = window.prompt('Choisissez pierre feuille ou ciseaux');
// modifier la casse en minuscule
*/
player = player.toLowerCase();
// Math.random() retournera une valeur aléatoire entre 0 et 1 à la variable random
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

        // Vérifier si il y a une égalité
        if(computerChoice.innerHTML === player) {
            // et l'afficher
            resultat.innerHTML = "c'est une égalité";
        } else {
            // Nous allons faire nos vérification en nous basant sur le 'computerChoice'
            switch (computerChoice.innerHTML) {
                // Cas de la pierre
                case 'pierre':
                    // Si le player a choisi 'feuille' alors il gagne
                    if (player == 'feuille') {
                        resultat.innerHTML = "Le joueur gagne, " + player + " remporte face à " + computerChoice.innerHTML;
                        scorePlayer.innerHTML++

                        // sinon il ne reste que le cas ciseaux, alors le joueur perd
                    } else {
                        resultat.innerHTML = "L'ordinateur gagne, " + computerChoice.innerHTML + " remporte face à " + player;
                        scoreComputer.innerHTML++
                    }
                    break;
                // Cas feuille similaire pierre avec adaptation selon les régles
                case 'feuille':
                    if (player == 'ciseaux') {
                        resultat.innerHTML = "Le joueur gagne, " + player + " remporte face à " + computerChoice.innerHTML;
                        scorePlayer.innerHTML++
                    } else {
                        resultat.innerHTML = "L'ordinateur gagne, " + computerChoice.innerHTML + " remporte face à " + player;
                        scoreComputer.innerHTML++
                    }
                    break;
                // Cas ciseaux similaire pierre avec adaptation selon les régles
                case 'ciseaux':
                    if (player == 'pierre') {
                        resultat.innerHTML = "Le joueur gagne, " + player + " remporte face à " + computerChoice.innerHTML;
                        scorePlayer.innerHTML++
                    } else {
                        resultat.innerHTML = "L'ordinateur gagne, " + computerChoice.innerHTML + " remporte face à " + player;
                        scoreComputer.innerHTML++
                    }
                    break;
            }
            if (3 == scoreComputer.innerHTML) {

                final.classList.add('px-lg-5')
                final.classList.add('text-center')
                final.classList.add('px-4')


                final.innerHTML = "Victoire de la machine sur l'homme, quel humiliation !! <br>"

                /*document.body.appendChild(refresh);*/

                final.append(refresh);
                refresh.addEventListener('click', () => history.go(0));
/*                final.innerHTML = "<input type="button" value="Rafraîchir" onClick="history.go(0)"/>"*/

            } else if (3 == scorePlayer.innerHTML) {

                final.classList.add('px-lg-5')
                final.classList.add('text-center')
                final.classList.add('px-4')

                final.innerHTML = "Victoire de l'homme sur la machine, appelez-moi Neo !! <br>"

final.append(refresh);
                // document.body.appendChild(refresh);
                refresh.addEventListener('click', () => history.go(0));
            }
        }



    })
}







