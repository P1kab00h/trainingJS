const boxes = document.querySelectorAll('.box');

//nous ajoutons un event listener au scroll, qui va être lié à notre fonction checkBoxes
window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
//ici nous aurons besoin de trouver la valeur pour le point de déclenchement
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        // boxTop va nous permettre de connaitre les 'top' de chaque box (getBoundingClientRect() plus d'info sur developper.mozilla.org
        const boxTop = box.getBoundingClientRect().top

        // maintenant nous voulons ajouter ou retirer la class 'show' en fonction de la valeur de boxTop par rapport à triggerBottom
        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}