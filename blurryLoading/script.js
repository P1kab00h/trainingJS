const loadText = document.querySelector('.loading-text');
const  bg = document.querySelector('.bg');

let load = 0;

//Ici le but de 'int' est de modifier la valeur de blurring toutes les 30ms, en répétant la fonction blurring toutes les 30ms...
let int = setInterval(blurring, 40);


function blurring() {
    load++

        //on créé une condition afin de stoper le décompte dès que la valeur de load dépasse 99 (soit 100),
        //Pour se faire on utilise clearInterval(int) => plus d'interval quand on rentre dans le if.
    if(load > 99) {
        clearInterval(int)
    }
        //Ici nous allons remplacer le text correspondant à la class .loading-text par le biais de notre const loadText
    loadText.innerText = `${load}%`


        //Utilisation de notre scale() sur notre stylesheet pour opacity
    loadText.style.opacity = scale(load, 0, 100, 1, 0)

        //ici encore utilisation de scale cette fois pour l'image
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`

}

//Nous devons mapper l'opacité de l'image et le fadding du text avec le compteur de pourcentage
//La difficultée ici est que nous ne pouvons utiliser la valeur de load (de 0 à 100) pour l'appliquer à l'opacity (de 1 à 0, dans le cas présent)
//Nous allons donc mapper les valeurs de 0 à 100 avec 1 à 0
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}