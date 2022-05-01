class Sprite {
    constructor({
                    position,
                    height,
                    width,
                    imgSrc,
                    scale = 1,
                    framesMax = 1,
                    framesHold,
                    framesElapsed = 0,
                    frameCurrent = 0,
                    offset = {x: 0, y: 0}
                }) {
        // position de départ en X & Y
        this.position = position;
        // taille du sprite
        this.height = height;
        this.width = width;
        // création d'un type image pour le html en JS
        this.image = new Image();
        // précision de la source de l'image
        this.image.src = imgSrc;
        // notion d'échelle pour nos élements de décors
        this.scale = scale;
        // définition du max de frame sur une image (par défaut 1)
        this.framesMax = framesMax;
        // définition de la frame actuelle, par défaut 0, cette valeur sera augmenté pour les annimations à mesure que l'on veut 'avancer' dans l'illustration
        this.frameCurrent = frameCurrent;
        // nmbr de frame passées
        this.framesElapsed = framesElapsed;
        // le nombre de frame 'retenue' avant de passer à l'image suivante (en fonction du modulo 0 de framesElapsed % framesHold)
        this.framesHold = framesHold;
        // soit le offset les dimmensiosn en x & y devant être retiré de nos images (par défaut tout à 0)
        this.offset = offset;
    }

    // draw va correspondre à notre arrière plan (pour le moment)
    draw() {
        c.drawImage(
            this.image,
            // position du crop
            this.frameCurrent * (this.image.width / this.framesMax), // en X
            0, // en Y
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++;
        // Si le modulo de framesElapsed par framesHold est égale à 0 alors on passe à la boucle du dessous, va nous permettre de ralentir le rythme avec lequel nous changeons de frame.
        if (0 === this.framesElapsed % this.framesHold) {
            // après avoir dessiné nous allons vérifier la valeur de frameCurrent par rapport à frameMax (-1 pour gérer les cas ou il n'y a qu'une image)
            if (this.frameCurrent < this.framesMax - 1) {
                // le résultat sera indenté de 1
                this.frameCurrent++
            } else {
                // arriver au bout de la boucle nous resetons la valeur de frameCurrent à 0
                this.frameCurrent = 0;
            }
        }
    }

    // update sera notre method qui permettra la mise à jour de notre Sprite, et donc permettre el 'mouvement' des personnages
    update() {
        this.draw();
        this.animateFrames();
    }
}

// la class Fighter est une extension de la classe Sprite
class Fighter extends Sprite {
    constructor({
                    position,
                    velocity,
                    height,
                    width,
                    playerColor,
                    attackBoxColor,
                    imgSrc,
                    scale = 1,
                    framesMax = 1,
                    framesElapsed,
                    framesHold,
                    frameCurrent,
                    offset = {x: 0, y: 0},
                    sprites
                }) {
        // le super défini qu'elle sont les propriétés à récupérer de Sprite
        super({
            position,
            imgSrc,
            scale,
            framesMax,
            framesElapsed,
            framesHold,
            frameCurrent,
            offset
        });

        // velocitée
        this.velocity = velocity;
        // taille du sprite
        this.height = height;
        this.width = width;
        // couleur du sprite (bleu playerOne, rouge playerTwo)
        this.playerColor = playerColor;
        // servira à l'enregistrement de la dernière touche appuyée, afin de gérer la succession de déplacements gauche/droite
        this.lastKeyPressed;
        // création de la box d'attaque définissant la zone d'attaque du joueur
        this.attackBox = {
            // on souhaite que la position de l'attaque parte depuis le joueur l'ayant lancé
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.attackBoxColor = attackBoxColor
        this.isAttacking;
        this.health = 100;
        //
        this.sprites = sprites;
        // passons à travers les sprites de personnages
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imgSrc
        }
        console.log(this.sprites)
    }

    /*    // draw va correspondre aux infos initial pour les player
        draw() {
            // définition de la couleur du joueur
            c.fillStyle = this.playerColor
            // je vais dessiner un rectangle dont l'origine correspondra à la position passé dans le constructeur (en x & y)
            // ici ce rectangle correspondra aux joueurs
            c.fillRect(this.position.x,
                this.position.y,
                this.width,
                this.height)
            // Si une attaque 'est en cours', alors on dessine l'attaque
            if (this.isAttacking) {
                // définition de la couleur de l'attaque de chaque joueur
                c.fillStyle = this.attackBoxColor
                // ce nouveau rectangle correspondra à l'attaque du joueur
                c.fillRect(this.attackBox.position.x,
                    this.attackBox.position.y,
                    this.attackBox.width,
                    this.attackBox.height)
            }
        }*/

    // update sera notre method qui permettra la mise à jour de notre Sprite, et donc permettre el 'mouvement' des personnages
    update() {
        this.draw();
        this.animateFrames();
        // La box d'attaque est lié au joueur qui la réalise, en x && en y
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        // pour l'axe y on ajoute la velocity en y
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        // afin d'éviter que les personnages 'chutent' en dehors de l'écran on vérifie que l'addition de la position + la taille + la velocity est supérieur ou égale à la taille totale du canvas - 96 pixel (pour donner l'impression que les personnages sont au niveau du sol et pas en dessous ou au dessus
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
        } else {
            // pour rendre les mouvements (chutes) plus réalistes j'ajoutes la notion de gravité sur l'axe y
            this.velocity.y += gravity;
        }
    }

    // methode attack qui va nous permettre de gérer l'attaque
    attack() {
        // nous passons isAttacking à true
        this.isAttacking = true;
        // cependant nous voulons une attaque avec un début mais aussi une fin
        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }
}