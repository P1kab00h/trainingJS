// Si on n'utilise pas defer (sur le html) alors on peut charger nos fonctions comme ceci (afin d'avoir l'éxecution après le chargement du DOM) :
document.addEventListener('DOMContentLoaded', function () {
    changeList();
})


function changeList() {

const ulListOne = document.getElementById('ulListOne');
const liListOne = document.querySelectorAll('li');

const alertLiListeOne = document.getElementById('test');

// Boucle pour passer sur tous les éléments de liste =>
for (let i =0; i < liListOne.length; i++) {
    // On peut agir soit en injectant une valeur de class ici circle, lié au CSS (l'ajout de la classe fait que nous allons utiliser une prez CSS déjà créé pour celle-ci ou les point sont remplacé par des cercles)
//ulListOne.addEventListener('click', () => liListOne[i].classList.add('circle'))
    // On pourra également agir directement sur le style par ce biais :
    ulListOne.addEventListener('click', () => ulListOne.style.listStyleType = 'circle')

    // On remplacera également notre texte initial par 'Blabla [i+1]' ou [i+1] correspond à l'index plus 1 (soit la valeur dans la liste numéroté
    ulListOne.addEventListener('click', () => liListOne[i].innerHTML = 'Blabla ' + (i+1))

    //pour chaque élément du tableauliListOne on ajoute un event listener au click, dans ce cas on affichera le résultat de showAlert

//    liListOne[i].addEventListener('click', alert("Evènement de click détecté sur : " + liListOne[i].textContent));


    liListOne[i].addEventListener('click', showAlert)
    function showAlert()
    {
        alert("Evènement de click détecté sur : " + liListOne[i].textContent);
    };

};

    // alertLiListeOne.addEventListener('click', showAlert);
    // let text = document.querySelectorAll('.liListOne');

    // console.log(text[1].textContent)
};

changeList();
