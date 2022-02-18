//création des variables nécessaire pour le fonctionnement, on va récupérer les éléments par leurs ids :
const progress = document.getElementById(('progress'));
const prev = document.getElementById(('prev'));
const next = document.getElementById(('next'));
//exception faite ici pour la class 'circle' récupéré avec le querySelectorAll (ici 'circles' au pluriel pour plus de lisibilité afin de faire une boucle forEach dessus :
const circles = document.querySelectorAll(('.circle'));

//On défini que notre active actuel est le point 1
let currentActive = 1;

//On créé l'event listener au click pour le 'next'
next.addEventListener('click', () => {
    //au click on incrémente de un le currentActive
    currentActive++
    //il faut garder currentActive dans la limite du nombre de circle => circle.length
    if (currentActive > circles.length) {
        currentActive = circles.length
    }

    update();
})

//On créé l'event listener au click pour le 'previous'
prev.addEventListener('click', () => {
    //au click on décremente de un le currentActive
    currentActive--
    //il faut garder currentActive supérieur ou égale à 1 (nombre min de cercle)
    if (currentActive < 1) {
        currentActive = 1
    }

    update();
})


//création d'une function 'update' nous permettant de metttre à jour le DOM
function update() {
    circles.forEach((circle, idx) => {
        if (idx < currentActive) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

//on veut que la barre entre les cercles change de couleur au fur et à mesure de l'avancé
    const actives = document.querySelectorAll('.active')
//pn définit donc la progression en fonction du nombres de circles et de combien sont actifs
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) *
        100 + '%';

//  Permettre la navigation compléte avec les bouttons
// Dans un premier temps on redéfini l'apsect 'disabled' du boutton Précédent si le currentActive est strictement égale à 1 (utile dans le cas d'un retour arrière)
    if (currentActive === 1) {
        prev.disabled = true
        //rendre inactif le boutton Suivant si le currentActive est strictement égale aux nombres de 'circles'
    } else if (currentActive === circles.length) {
        next.disabled = true
        //Afin de rendre actif le boutton Précédent (à partir du cercle (2)) & Suivant (entre 1 et 3)
    } else {
        prev.disabled = false
        next.disabled = false
    }
}

