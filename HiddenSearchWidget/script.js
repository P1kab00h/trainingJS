const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')


//ajout d'un event listener au click sur la class 'btn'
btn.addEventListener('click', () => {
    //on jongelra entre l'ajout ou le retrait de 'active' comme class pour 'search'
    search.classList.toggle('active')
    //permet de mettre le focus sur l'input (dans le champ de recherche,sélection automatique du champ)
    input.focus()
})