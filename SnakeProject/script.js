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
        }
        ;
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