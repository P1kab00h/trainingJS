
class Sprite {
    constructor({position, height, width, imgSrc}) {
        // position de départ en X & Y
        this.position = position;
        // taille du sprite
        this.height = height;
        this.width = width;
        // création d'un type image pour le html en JS
        this.image = new Image();
        // précision de la source de l'image
        this.image.src = imgSrc;
    }
    // draw va correspondre à notre arrière plan (pour le moemnt)
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    // update sera notre method qui permettra la mise à jour de notre Sprite, et donc permettre el 'mouvement' des personnages
    update() {
        this.draw();
    }
}

class Fighter {
    constructor({position, velocity, height, width, playerColor, attackBoxColor, offset}) {
        // position de départ en X & Y
        this.position = position;
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
    }
    // draw va correspondre aux infos initial pour les player
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
    }
    // update sera notre method qui permettra la mise à jour de notre Sprite, et donc permettre el 'mouvement' des personnages
    update() {
        this.draw();
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