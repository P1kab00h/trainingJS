const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;
let timer = 90;
let timerId;

// définition de nos différentes touches
const keys = {
    // pour le playerOne
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },

    // pour le playerTwo
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

// Je remplis le rectangle de l'origine x à son max width, idem pour le y et le height
c.fillRect(0, 0, canvas.width, canvas.height)

const gameBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    height: 576,
    width: 1024,
    imgSrc: './gameAssets/img/background.png'})

const gameBackgroundShop = new Sprite({
    position: {
        x: 620,
        y: 148
    },
    height: 200,
    width: 400,
    imgSrc: './gameAssets/img/shop.png',
    scale: 2.60,
    // nous indiquons ici le nombre de frame sur notre image
    framesMax: 6,
    framesHold: 7
})

// Création de notre joueur 1 je vais créer une instance de Fighter, où on passe la position dudit joueur en x & y (création d'un objet), sa velocity
let playerOne = new Fighter({
    position: {
        x: 100,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    height: 150,
    width: 50,
    playerColor:
        'red',
    attackBoxColor:
        'darkRed',
    offset: {
        x: 215,
        y: 92
    },
    imgSrc: './gameAssets/img/SamuraiMack/Idle.png',
    scale: 2,
    framesMax: 8,
    framesHold: 10,
    sprites : {
        idle: {
            imgSrc: './gameAssets/img/SamuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imgSrc: './gameAssets/img/SamuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imgSrc: './gameAssets/img/SamuraiMack/Jump.png',
            framesMax: 2,
        }
    }
})
// Ici création du second joueur
let playerTwo = new Fighter({
    position: {
        x: 700,
        y: 20
    },
    velocity: {
        x: 0,
        y: 0
    },
    height: 150,
    width: 50,
    playerColor:
        'blue',
    attackBoxColor:
        'DarkSlateBlue',
    offset: {
        x: 215,
        y: 103
    },
    imgSrc: './gameAssets/img/Kenji/Idle.png',
    framesMax: 4,
    scale: 2,
    framesHold: 8,
    sprites : {
        idle: {
            imgSrc: './gameAssets/img/Kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imgSrc: './gameAssets/img/Kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imgSrc: './gameAssets/img/Kenji/Jump.png',
            framesMax: 2,
        }
    }
})

// appel de notre fonction decreaseTimer, permettant la gestion du temps
decreaseTimer();

// soit animate la fonction d'animation pour les personnages, celle-ci va fonctioner comme une boucle infini tant qu'on ne la stop pas
function animate() {
    // nous allons requérir une animation
    window.requestAnimationFrame(animate)
    // on pourra tester le côté infini avec le console.log suivant
    // console.log('test')
    // il faudra avant tout redéfinir le fillStyle
    c.fillStyle = 'black'
    // afin d'éviter le 'tracé' nous devons redessiner notre canvas pour chaque update
    // ainsi les personnages conserveront leurs 'tailles', et mettrons à jour leurs position
    c.fillRect(0, 0, canvas.width, canvas.height)

    // appel du gameBackground en utilisant la method update() (elle même utilisant draw())
    gameBackground.update();
    // appel de notre shop venant sur le fond et derrière les personnages
    gameBackgroundShop.update();
    // on appel pour les deux joueurs la method update
    // aura pour effet de 'dessiner' les player mais aussi de mettre à jour leurs positions
    playerOne.update();
    playerTwo.update();

    // définition de la velocity par défaut pour le playerOne
    playerOne.velocity.x = 0;
    // gestion des déplacements (via velocity) pour le playerOne
    if (keys.q.pressed && 'q' === playerOne.lastKeyPressed) {
        playerOne.velocity.x = -5;
        playerOne.image = playerOne.sprites.run.image;
    } else if (keys.d.pressed && 'd' === playerOne.lastKeyPressed) {
        playerOne.velocity.x = 5;
        playerOne.image = playerOne.sprites.run.image;
    } else {
        playerOne.image = playerOne.sprites.idle.image;
    }
    // il était possible mais peu intéressant de gérer les sauts de la manière suivante :
    // le saut sera géré grace à la velocity sur l'eventListener (pour faire monter le joueur)
    // la descente quand à elle sera gérée grâce à la gravity, qui s'applique dès que le joueuer n'est plus en contact avec le bas de notre canvas)
    //else if (keys.z.pressed && 'z' === lastKeyPressedPlayerOne) {
    //     playerOne.velocity.y = -4
    // }
    // définition de la velocity par défaut pour le playerTwo
    playerTwo.velocity.x = 0;
    // // gestion des déplacements (via velocity) pour le playerTwo
    if (keys.ArrowLeft.pressed && 'ArrowLeft' === playerTwo.lastKeyPressed) {
        playerTwo.velocity.x = -5;
        playerTwo.image = playerTwo.sprites.run.image;
    } else if (keys.ArrowRight.pressed && 'ArrowRight' === playerTwo.lastKeyPressed) {
        playerTwo.velocity.x = 5;
        playerTwo.image = playerTwo.sprites.run.image;
    } else {
        playerTwo.image = playerTwo.sprites.idle.image;
    }
    // gestion des collisions/attaques pour le playerOne
    if (attackCollision({player: playerOne, ennemy: playerTwo}) &&
        // && Pour finir notre playerOne est-il en train d'attaquer ? (nous ne voulons pas toucher sans avoir attaqué
        playerOne.isAttacking
    ) {
        // nous repassons la valeur de isAttacking à false immédiatement après l'attaque ayant touché afin d'éviter qu'un coup ne touche plusieurs fois
        playerOne.isAttacking = false;
        if (0 < timer) {
            if (0 < playerTwo.health && 0 < playerOne.health) {
                playerTwo.health -= 20;
                document.querySelector('#playerTwoHealth').style.width = playerTwo.health + '%';
                console.log('touché de playerOne');
            }
        }
    }
    // idem pour le playerTwo
    if (attackCollision({player: playerTwo, ennemy: playerOne}) &&
        playerTwo.isAttacking
    ) {
        playerTwo.isAttacking = false;
        if (0 < timer) {
            if (0 < playerOne.health && 0 < playerTwo.health) {
                playerOne.health -= 20;
                document.querySelector('#playerOneHealth').style.width = playerOne.health + '%';
                console.log('touché de playerTwo')
            }
        }
    }
    // Cas ou un des joueurs tombe à 0 PV avant la fin du Timer
    if (0 >= playerTwo.health || 0 >= playerOne.health) {
        winnerCondition({playerOne, playerTwo, timerId})
    }
}

animate()

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        // Pour le playerOne
        //vers la gauche
        case 'd':
            keys.d.pressed = true;
            playerOne.lastKeyPressed = 'd';
            // lastKeyPressedPlayerOne = 'd';
            break;
        //vers la droite
        case 'q':
            keys.q.pressed = true;
            playerOne.lastKeyPressed = 'q';
            break;
        //le saut
        case 'z':
            // Ici il n'est pas nécessaire ni même souhaitable de mettre à jour la dernière touche
            //Le joueur redescendra grace à notre condition utilisant la 'gravity'
            playerOne.velocity.y = -20;
            break;
        // l'attaque
        case 's':
            playerOne.attack();
            break
        // Pour le playerTwo
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            playerTwo.lastKeyPressed = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            // lastKeyPressedPlayerTwo = 'ArrowLeft';
            playerTwo.lastKeyPressed = 'ArrowLeft';
            break;
        case 'ArrowUp':
            playerTwo.velocity.y = -20;
            break;
        case 'ArrowDown':
            playerTwo.attack();
            break;
    }
    // console.log(e.key)
})

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        // Pour le playerOne
        case 'd':
            keys.d.pressed = false;
            break;
        case 'q':
            keys.q.pressed = false;
            break;
        // Pour le playerTwo
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})