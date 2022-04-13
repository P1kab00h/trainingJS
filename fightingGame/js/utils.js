function attackCollision({player, ennemy}) {
    return (
        // on veut détecter si la box d'attaque du player touche (est égale ou supérieur à) ennemy
        // on prend donc la position du player à laquelle on ajoute la width de attackBox (la portée de l'attaque par rapport à sa position)
        // On vérifie que ce résultat est supérieur au égale à la position du ennemy en x (nous posons la question y-a-t-il une touche)
        player.attackBox.position.x + player.attackBox.width >= ennemy.position.x &&
        // && Nous vérifions également si le player n'a pas dépassé le ennemy (afin d'éviter de toucher sans contact dans le cas ou player passe à droite du ennemy)
        player.attackBox.position.x <= ennemy.position.x + ennemy.width &&
        // && Nous devons également vérifier si la zone d'attaque en y touche le ennemy (le résultat peut être faux dans le cas d'un saut par exe)
        player.attackBox.position.y + player.attackBox.height >= ennemy.position.y &&
        // && Il faudra aussi gérer le cas ou le ennemy saute par dessus l'attaque du player (en ce cas il ne doit pas être touché)
        player.attackBox.position.y <= ennemy.position.y + ennemy.height
    )
}

// fonction gérant les cas de victoires
function winnerCondition({playerOne, playerTwo, timerId}) {
    // clearTimeOut va nous permettre d'arréter notre timer au moment de la défaite de l'un des joueurs
    clearTimeout(timerId)
    // les deux joueurs ont le même nombres de PV
    if (0 === playerTwo.health && 0 === playerOne.health) {
        document.getElementById('displayText').innerText = 'Double KO !!!'
        // playerOne à plus de vie que playerTwo
    } else if (playerOne.health > playerTwo.health) {
        document.getElementById('displayText').innerText = `Player One Win !`;
        // playerTwo à plus de vie que playerOne
    } else if (playerOne.health < playerTwo.health) {
        document.getElementById('displayText').innerText = `Player Two Win !`;
        // Enfin si le temps arrive à zéro et que la vie des joueurs est à égalité
    } else if (playerOne.health === playerTwo.health) {
        document.getElementById('displayText').innerText = `It's a tie ...`;
    }
}

// fonction permettant de faire un timer (compte à rebours)
function decreaseTimer() {
    // fonction potentiellement infinie (cf ci-dessus), sera cependant limité grace à la condition ci-dessous
    if (timer > 0) {
        // appel de decreaseTimer toutes les 1000 ms, soit toutes les secondes, stocké dans timerId
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        // modification dynamique du temps restant
        document.getElementById('timer').innerText = timer;
    }
    // gestion des cas possible de victoires en cas de timeOut
    if (0 === timer) {
        winnerCondition({playerOne, playerTwo, timerId})
    }
}