// constante panels qui récupérera la totalitée des éléments avec la classe 'panel'
const panels = document.querySelectorAll('.panel');


//création d'une fonction permettant de retirer pour tous les panels la classe active, afin de pouvoir par la suite donner la classe 'active' au click
function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}


//Création d'une boucle passant sur chaque éléments avec la class 'panel',
//ajout d'un event listener qui réagira au click
//suppression d'un élément de class avec la fonction précédement créé
//ajout de la classe 'active' sur l'élément cliqué
panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
    })
})

