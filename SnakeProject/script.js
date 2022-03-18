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
    // delais pour lancer les animations (en ms)
    let delay = 100;

    // soit les coordonées en x & y de notre serpent
    let xCoord = 0;
    let yCoord = 0;

    let snake;

    let apple;

    //ceci va nous permettre de calculer le nombre de block dans la largeur et la hauteur (20*20)
    let widthInBlocks = canvasWidth/blockSize;
    let heightInBlocks = canvasHeight/blockSize;


    // lancement de la fonction init permettant l'initialisation
    init();


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // création d'une fonction d'initialisation
    function init() {
        // définition de notre canvas et affichage ne html
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = '1px solid';
        document.body.appendChild(canvas);
        //defini le context du canvas en 2d
        ctx = canvas.getContext('2d');

        // création du serpent (position, taille, et direction de déplacement initial)
        snake = new Snake([[6, 4], [5, 4], [4, 4]], 'right')

        apple = new Apple([10,10]);

        refreshCanvas();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //donnera l'impression que les élements bougent
    function refreshCanvas() {

        //xCoord += 10;
        //yCoord += 10;

        // à chaque appel de notre fonction nous allons "effacer" notre serpent
        ctx.clearRect(0, 0, canvas.height, canvas.height);

        snake.advance();
        // appel de la method draw de la class Snake (instancié dans snake)
        snake.draw();
        // nous allons dessiner la pomme
        apple.draw();
        // nous permettra de relancer la fonction (ici refreshCanvas) tous les temps donnés (ici delay soit 1000 ms)
        setTimeout(refreshCanvas, delay);
    }

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
        this.draw = function () {
            // va sauver notre canvas
            ctx.save();
            //Le style de remplissage ici en rouge
            ctx.fillStyle = "#ff0000";
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
            // supprimer la derniere positon (la queue du serpent)
            this.body.pop();
        };

        this.setDirection = function(newDirection)
        {
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
            if(allowedDirection.indexOf(newDirection) > -1)
            {
                this.direction = newDirection;
            }
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // method pour les test de collision
        // pour rappel les bords du canvas et le corps du seprent lui-même
        this.checkCollision = function ()
        {
            let wallCollision = false;
            let snakeCollision = false;

            // on sépare la tête du serpent, c'est sur elle que l'on doit vérifier la collision
            let snakeHead = this.body[0];
            // si la tête correspond à l'index 0 alors le corps correspond au restant (utilisation de slice())
            let snakeBody = this.body.slice(1);
            // on récupére les coordonnées de la tête en X & Y
            // le snakeX devra être compris entre 0 & 19 => widthInBlocks (soit 20 blocks)
            let snakeX = snakeHead[0];
            // le snakeY devra être compris entre 0 & 19 => widthInBlocks (soit 20 blocks)
            let snakeY = snakeHead[1];

            // on défini donc nos limites
            let minX = 0;
            let minY = 0;
            let maxX = widthInBlocks - 1;
            let maxY = heightInBlocks - 1;

            let isNotBetweenWidth = snakeX < minX || snakeX > maxX;
            let isNotBetweenHeight = snakeY < minY || snakeY > maxY;
        };
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // définition de notre constructeur pour la pomme
    // celle-ci attendra un argument de position
    function Apple(position) {
        this.position = position;


        this.draw = function ()
        {
            //on sauvegarde la valeur précédente du canvas
            ctx.save();
            ctx.fillStyle = "#33cc33";

            // soit radius le rayon de la pomme
            let radius = blockSize/2;
            // Pour dessiner un cercle nous voulons les coordonnées x&y mais la ou pour le rectangle nous voulions les deux coins du carré ici nous voulons le centre du cercle
            let x = position[0]*blockSize + radius;
            let y = position[1]*blockSize + radius;
            //le calcul pour dessiner le cercle et le suivant =>
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            // puis comme pour le serpent on rempli le tracé
            ctx.fill();
            // on restaure le canvas ceci permettra d'éviter "d'écraser" la couleur du serpent par du vert (entre autre)
            ctx.restore();
        }
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
                // si une autre touche est appuyer alors on return la fonction
            default:
                return;
        }
        snake.setDirection(newDirection);
    })
}