//Création de nos constantes, avec les element Id 'open' et 'close', ainsi qu'un query selector sur la class 'container'
const open = document.getElementById('open');
const close = document.getElementById('close');
const container = document.querySelector('.container');

//ajout d'un event listener sur au click sur 'open', auquel on ajoutera la class 'show-nav'
open.addEventListener('click', () => container.classList.add
('show-nav'))

//ajout d'un event listener sur au click sur 'close', auquel on retirera donc la class 'show-nav'
close.addEventListener('click', () => container.classList.remove
('show-nav'))