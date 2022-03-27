window.onload = function () {

    // les dimmensions de notre canvas
    let canvasWidth = 600;
    let canvasHeight = 600;

    // et celle de nos blocks
    let blockSize = 30;

    // variable pour créer l'élement canvas sur le html
    let canvas = document.createElement('canvas');
    //pour définir le ctx de notre canvas
    let ctx;
    // delais pour lancer les animations (en ms), servira à définir la vitesse du jeu (du serpent)
    let delay = 100;

    // soit les coordonées en x & y de notre serpent
/*    let xCoord = 0;
    let yCoord = 0;*/

    let snake;

    let apple;

    //ceci va nous permettre de calculer le nombre de block dans la largeur et la hauteur (20*20)
    let widthInBlocks = canvasWidth / blockSize;
    let heightInBlocks = canvasHeight / blockSize;

    let timeOut;
    let score;

    let showScore = document.getElementById('score');

    // lancement de la fonction init permettant l'initialisation
    init();


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // création d'une fonction d'initialisation
    function init() {
        // définition de notre canvas et affichage ne html
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = '30px solid #aab42f';

        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#92c291";

        document.body.appendChild(canvas);
        //defini le context du canvas en 2d
        ctx = canvas.getContext('2d');

        // création du serpent (position, taille, et direction de déplacement initial)
        snake = new Snake([[6, 4], [5, 4], [4, 4]/*,[3,4], [2,4], [1,4]*/], 'right')
        apple = new Apple([10, 10]);
        score = 0;
        refreshCanvas();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //donnera l'impression que les élements bougent
    // Et définira les éléments de jeux (collisions, mouvement, manger la pomme, GAME OVER ...)
    function refreshCanvas() {

        //xCoord += 10;
        //yCoord += 10;
        // appel de notre fonction pour faire avancer le serpent
        snake.advance();
        // à partir du moment ou le serpent se déplace on doit controler les collisions potentielles
        if (snake.checkCollision()) {
            // GAME OVER
            gameOver();
        } else {
            if (snake.isAppleEat(apple)) {
                //le serpent à mangé la pomme
                // On augmente le score de 1 point
                score++;
                //puis création d'une nouvelle pomme
                // tant que la nouvelle pomme se trouve à un endroit ou il y a le serpent on relance une création de pomme
                snake.ateApple = true;
                do {
                    apple.setNewApplePosition()
                }
                while (apple.isAppleOnSnake(snake))
            }

            showScore.innerText = score;
            // à chaque appel de notre fonction nous allons "effacer" notre serpent
            ctx.clearRect(0, 0, canvas.height, canvas.height);
            // affichage du score sur le canvas en fond (l'ordre d'appel déterminera leurs 'hauteur')
            // displayScore();
            // nous allons dessiner la pomme
            apple.draw();
            // appel de la method draw de la class Snake (instancié dans snake)
            snake.draw();
            // nous permettra de relancer la fonction (ici refreshCanvas) tous les temps donnés (ici delay soit 100 ms)
            timeOut = setTimeout(refreshCanvas, delay);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Gestion du game Over avec la fonction gameOver ...
    function gameOver()
    {
        ctx.save();
        ctx.font = "bold 60px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;

        ctx.strokeText('GAME OVER DUDE !', canvasWidth/2, canvasHeight/2 );
        // filltext nous permttra d'afficher un text lors d'un cas de gameOver
        ctx.fillText('GAME OVER DUDE !', canvasWidth/2, canvasHeight/2);

        ctx.strokeText("Score final : " + score.toString(), canvasWidth/2, canvasHeight/2 - 100)
        ctx.fillText("Score final : " + score.toString(), canvasWidth/2, canvasHeight/2 - 100);

        ctx.font = "bold 25px sans-serif";
        ctx.strokeText("Relancer une partie avec la touche Espace" , canvasWidth/2, canvasHeight/2 + 150)
        ctx.fillText("Relancer une partie avec la touche Espace" , canvasWidth/2, canvasHeight/2 + 150)
        ctx.restore();

        return true;
    };

    function restartGame()
    {
        // On recréé le serpent (position, taille, et direction de déplacement initial)
        snake = new Snake([[6, 4], [5, 4], [4, 4]/*,[3,4], [2,4], [1,4]*/], 'right')
        // ainsi que la pomme
        apple = new Apple([10, 10]);
        score = 0;
        // ici nous vidons notre timeOut pour le redéfinir avec le timeout initial (snas cela on risque dans le cas de redémarrage répéter d'additionner les timeout et donc d'accélérer la vitesse du serpent
        clearTimeout(timeOut)
        refreshCanvas();
    };

/*    function displayScore()
    {
        ctx.save();
        // Stylisons notre résultat
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // filltext nous permettra d'afficher un text lors d'un cas de gameOver
        ctx.fillText(score.toString(), canvasHeight/2, canvasWidth/2, 100);

        ctx.restore();
    }*/

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Ici nous allons dessiner le bloc dans le context on dessine un block
    function drawBlock(context, position) {
        // soit la position du serpent (sur le canvas) multiplié par sa taille (afin de déterminer ou doit se situer notre serpent)
        let x = position[0] * blockSize;
        let y = position[1] * blockSize;

        // on utilise maintenant les positions calculé plus haut, et on dessine notre serpent selon la taille du block défini au départ.
        // la position (x,y,w,h),
        // nous en deux dimensions soit x & y en partant du coin supérieur gauche
        // puis la taille w & h
        ctx.fillRect(x, y, blockSize, blockSize)
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // définition de notre constructeur pour le serpent
    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function () {
            // va sauver notre canvas
            ctx.save();


            //Le style de remplissage ici en rouge
            ctx.fillStyle = "#303030";
            // ici la boucle for va parcourir l'array body correspondant au corps du serpent afin de le dessiner (le représenter à l'écran)
            for (let i = 0; i < this.body.length; i++) {
                // fonction drawBlock ou le premier argument correspond à notre context, et le second au corps du serpent (on utilise la boucle for et l'index i pour dessiner tout le corps du serpent)
                drawBlock(ctx, this.body[i]);
            }
            ;
            ctx.restore();
        };

        // création d'une method pour faire bouger le serpent
        // on veut que sa tête 'avance' et 'efface' sa queue (un block par un block)
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.advance = function () {
            // on copie la "tête" du seprent
            let nextPosition = this.body[0].slice();
            // les mouvements possible pour le serpent
            switch (this.direction) {
                case 'left':
                    // soit la position de x - 1
                    nextPosition[0]--;
                    break;
                case 'right':
                    // soit la position de x + 1
                    nextPosition[0]++;
                    break;
                case 'up':
                    // soit la position de y - 1
                    nextPosition[1]--;
                    break;
                case 'down':
                    // soit la position de y + 1
                    nextPosition[1]++;
                    break;
                // la bonne pratique veut que chaque switch case est une valeur default, ici on throw un message d'erreur
                default:
                    throw("Direction invalide");
            }
            // on va ajouter notre nextPosition (la 'nouvelle' tête)
            this.body.unshift(nextPosition);
            // Si le serpent n'a pas mangé de pomme alors
            if (!this.ateApple) {
                // supprimer la derniere positon (la queue du serpent)
                this.body.pop();
            } else {
                // sinon on ne fait pas de pop() sur le body
                // le serpent va "grandir"
                // afin d'arréter sa "croissance" on repasse le ateApple à false => retour à l'état initial
                this.ateApple = false;
            }
        };

        this.setDirection = function (newDirection) {
            let allowedDirection;
            // on régle les possibilitées de déplacement en fonciton du déplacement en cours
            switch (this.direction) {
                case 'left':
                case 'right':
                    allowedDirection = ['up', 'down'];
                    break;
                case 'up':
                case 'down':
                    allowedDirection = ['left', 'right'];
                    break;
                // la bonne pratique veut que chaque switch case est une valeur default, ici on throw un message d'erreur
                default:
                    throw("Direction invalide");
            }

            // si l'index de ma nouvelle direction est supérieur à -1 (newDirection est une array avec 2 valeurs soit 0 soit 1) alors on défini la nouvelle direction,
            // si la valeur n'est pas présente dans l'array alors le résulat sera égal à -1 donc le déplacement ne sera pas permis (impossible au serpent de revenir sur lui même)
            if (allowedDirection.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // method pour les test de collision
        // pour rappel les bords du canvas et le corps du seprent lui-même
        this.checkCollision = function () {
            // gestion de collision avec mur false par défaut
            let wallCollision = false;
            // gestion de collision avec corps (seprent) en false apr défaut également
            let snakeCollision = false;

            // on sépare la tête du serpent, c'est sur elle que l'on doit vérifier la collision
            let snakeHead = this.body[0];
            // si la tête correspond à l'index 0 alors le corps correspond au restant (utilisation de slice())
            let snakeBody = this.body.slice(1);
            // on récupére les coordonnées de la tête en X & Y
            // le snakeX devra être compris entre 0 & 19 => widthInBlocks (soit 20 blocks)
            let snakeHeadX = snakeHead[0];
            // le snakeY devra être compris entre 0 & 19 => widthInBlocks (soit 20 blocks)
            let snakeHeadY = snakeHead[1];

            // on défini donc nos limites
            let minX = 0; // début axe x
            let minY = 0; // début axe y
            // soit widthInBlocks la largeur diviser par la taille d'un block, cela nous permets de diviser notre canvas en block (20*20)
            let maxX = widthInBlocks - 1; // fin axe x
            // heightInBlocks => hautreur en nbr de blocks (20*20)
            let maxY = heightInBlocks - 1; // fin axe y

            //Donc notre snakeHeadX doit être compris en 0 et 19 (nos limites de blocks)
            let isNotBetweenWidth = snakeHeadX < minX || snakeHeadX > maxX;
            // idem pour le snakeHeadY qui lui aussi doit être compris entre 0 et 19 (sur l'axe y)
            let isNotBetweenHeight = snakeHeadY < minY || snakeHeadY > maxY;
            // Si l'on dépasse l'une ou l'autre des limites définis alors wallCollision passera à true
            if (isNotBetweenWidth || isNotBetweenHeight) {
                wallCollision = true;
            }

            // Gérons maintenant les collisions avec le corps du serpent lui même
            // Pour que la collision soit complête il faut que le X ET le Y de la tête soit égale avec l'un des éléments du corps
            for (let i = 0; i < snakeBody.length; i++) {
                // rappel nous avons une array d'array, la premiére (avec le i) représente la global (snakeBody) la seconde représente les axes X [0] et y [1]
                if (snakeBody[i][0] === snakeHeadX && snakeBody[i][1] === snakeHeadY)
                    snakeCollision = true;
            }
            // la fonction checkCollision nous fera donc un retour sur wallCollision et snakeCollision, dans le cas ou l'un OU l'autre passe à true alors GAME OVER
            return wallCollision || snakeCollision;
        };

        // La pomme a-t-elle était mangée ?
        // cette method sera appelée dans notre refreshCanvas
        this.isAppleEat = function (appleToEat) {
            //nous définissons la tête de notre serpent (déjà défini une premiere fois dans la methode checkCollision
            let snakeHead = this.body[0];
            // comme pour les collisions la pomme ne sera mangé que si la t^te en X & en Y est égale avec la posiotn de la pomme en X & en Y
            if (snakeHead[0] === appleToEat.position[0] && snakeHead[1] === appleToEat.position[1]) {
                return true;
            } else {
                return false;
            }

        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // définition de notre constructeur pour la pomme
    // celle-ci attendra un argument de position
    function Apple(position) {
        this.position = position;

        this.draw = function () {
            //on sauvegarde la valeur précédente du canvas
            ctx.save();
            ctx.fillStyle = "#DD1533";
            //afin d'éviter que la posiotn de la pomme ne soit conservée après avoir était mangé par le serpent on fait un beginPath() =>
            // method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
            ctx.beginPath();
            // soit radius le rayon de la pomme
            let radius = blockSize / 2;
            // Pour dessiner un cercle nous voulons les coordonnées x&y mais la ou pour le rectangle nous voulions les deux coins du carré ici nous voulons le centre du cercle
            let x = this.position[0] * blockSize + radius;
            let y = this.position[1] * blockSize + radius;
            //le calcul pour dessiner le cercle et le suivant =>
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            // puis comme pour le serpent on rempli le tracé
            ctx.fill();
            // on restaure le canvas ceci permettra d'éviter "d'écraser" la couleur du serpent par du vert (entre autre)
            ctx.restore();
        };
        // Dans le cas ou la pomme est mangé il faut en créer une nouvelle, cette méthode sera appelé dans notre fonction refreshCanvas
        this.setNewApplePosition = function () {
            // la nouvelle position devrait être généré de manière aléatoire
            // on veut un résultat arrondie : Math.round(), et généré aléatoirement : Math.random.
            // Ce nombre aléatoire dot être contenu en 0 et 19, or random donne un résultat entre 0 et 1, alors on multiplie ce résutat par le nombre de block (-1, soit de 0 à 19)
            let newX = Math.round(Math.random() * (widthInBlocks - 1));
            let newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };
        // La pomme aura donc une nouvelle position, le problème c'est que cette position peut être égale à une zone du serpent, nous ne voulons pas de cette éventualitée :
        // ici encore cette method sera appelé dans le refreshCanvas
        this.isAppleOnSnake = function (snakeToCheck) {
            let isAppleOnSnake = false;

            for (let i = 0; i < snakeToCheck.body.length; i++) {
                if (snakeToCheck.body[i][0] === this.position[0] && snakeToCheck.body[i][1] === this.position[1]) // on vérifie qu'aucune partire du serpent (à la fois en X & Y) n'est sur la pomme
                {
                    isAppleOnSnake = true;
                }
                ;
            }
            return isAppleOnSnake; // on retourne donc un booléen indiquant si la nouvelle pomme se trouve dans le corps du serpent
        };
    }

    document.addEventListener("keydown", function handleKeyDown(e) {
        let key = e.code;
        let newDirection;
        switch (key) {
            case 'ArrowLeft':
            case 'KeyA':
                newDirection = 'left';
                break;
            case 'ArrowRight':
            case 'KeyD':
                newDirection = 'right';
                break;
            case 'ArrowUp':
            case 'KeyW':
                newDirection = 'up';
                break;
            case 'ArrowDown':
            case 'KeyS':
                newDirection = 'down';
                break;

            case '32':
            case 'Space':
                restartGame();
                return;

            // si une autre touche est appuyé alors on return la fonction
            default:
                return;
        }
        snake.setDirection(newDirection);
    })
}