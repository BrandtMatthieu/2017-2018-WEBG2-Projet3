var soucoupeHeight = 40; // La heuteur d'un vaisseau sur l'écran
var sonTouche = new Audio('./assets/sounds/Hit_Hurt.wav');

class Soucoupe { // Regroupe toutes les méthodes des soucoupes
    constructor(posX, posY) { // Crée une nouvelle soucoupe
        this.posX = posX; // Donne une position X à la soucoupe passée en paramètre
        this.posY = posY; // Donne une position Y à la soucoupe passée en paramètres
        this.img = "./assets/img/soucoupe.svg"; // Donne une image à la soucoupe
        this.id = "soucoupe" + Math.round(Math.random()*1000); // Donne un id pseudo-aléatoire à la soucoupe
        this.initHtml(this.id); // Initialise la soucoupe dans le html
    }

    get posX() { // Retourne la position X de la soucoupe
        return this._posX; // Retourne la position X de la soucoupe
    }

    set posX(value) { // Définit la position X de la soucoupe
        this._posX = value; // Définit la position X de la soucoupe
    }

    get posY() { // Retourne la position Y de la soucoupe
        return this._posY; // Retourne la position Y de la soucoupe
    }

    set posY(value) { // Définit la position Y de la soucoupe
        this._posY = value; // Définit la position Y de la soucoupe
    }

    get img() { // Retourne l'image utilisée pour la soucoupe
        return this._img; // Retourne l'image utilisée pour la soucoupe
    }

    set img(value) { // Définit l'image utilisée pour la soucoupe
        this._img = value; // Définit l'image utilisée pour al soucoupe
    }

    initHtml(id) { // Initialise la soucoupe dans le html
        var game = document.getElementById("game"); // Trouve l'élément "game" dans le html
        var soucoupeDOMInit = document.createElement("img"); // Crée un élément image pour la soucoupe
        soucoupeDOMInit.id = id; // Donne à l'élément son id
        soucoupeDOMInit.src = this.img; // Donen une iamge à l'élément
        soucoupeDOMInit.style.zIndex = 1; // Définit un z-index pour l'élément
        soucoupeDOMInit.style.height = soucoupeHeight + "px"; // Done une hauteur à l'élément
        soucoupeDOMInit.style.position = "absolute"; // Définit le type de position pour l'élément
        soucoupeDOMInit.style.top = document.getElementById("stars").getBoundingClientRect().top + this.posY + "px"; // Définit la position X de l'élément
        soucoupeDOMInit.style.left = document.getElementById("stars").getBoundingClientRect().left + this.posX + "px"; // Définit la position Y de l'élémet
        game.appendChild(soucoupeDOMInit); // Ajoute l'élément à l'élément eju
        this.display(this.id); // Affiche l'élément à la bonne position
    }

    display() { // Affiche l'élément à la bonne position
        var soucoupeDOMDisplay = document.getElementById(this.id); // Sélectionne l'élément
        soucoupeDOMDisplay.style.top = document.getElementById("stars").getBoundingClientRect().top + this.posY + "px"; // Affiche l'élément à sa position X
        soucoupeDOMDisplay.style.left = document.getElementById("stars").getBoundingClientRect().left + this.posX + "px"; // Affiche l'élément à sa position Y
    }

    move(distanceX, distanceY) { // Modifie la position de l'élément
        this.posX = this.posX + distanceX; // Définit la nouvelle position X
        this.posY = this.posY - distanceY; // Définit la nouvelle position Y
        if(this.posY>400-soucoupeHeight) { // Si la soucoupe est trop en bas
            this.posY = 400 - soucoupeHeight; // Garder la soucoupe dans les limites de la zone de jeu
        }
        if (this.posY<0) { // Si la soucoupe est trop en haut
            this.posY = 0; // Garder la soucoupe dans les limites de la zone de jeu
        }
        if(this.posX<0) { // Si la soucoupe est arrivé au baord gauche de l'écran
			score--; // Retirer un point au score
			if(score<0) { // Si le score est négatif
				score = 0; // Mettre le score à 0
			}
            soucoupes.splice(soucoupes.indexOf(this), 1); // Suprimmer cette soucoupe de la liste des soucoupes
            document.getElementById("game").removeChild(document.getElementById(this.id)); // Retirer cette soucoupe du html
        } else {
            this.display(); // Afficher cete soucoupe
        }
    }


    isHit(j) { // Vérifier si la soucoupe est touchée
        for(var i=0;i<tirs.length;i++) { // Pour tous les tirs
            var tir = document.getElementById(tirs[i].id); // Sélectionner un tir
            var soucoupe = document.getElementById(this.id); // Sélectionner une soucoupe
            if( // Si la soucoupe touche la lazer
                Number.parseInt(tir.style.left) + Number.parseInt(tir.offsetWidth) > Number.parseInt(soucoupe.style.left) &&
                Number.parseInt(tir.style.left) < Number.parseInt(soucoupe.style.left) + Number.parseInt(soucoupe.offsetWidth) &&
                Number.parseInt(tir.style.top) + Number.parseInt(tir.offsetHeight) > Number.parseInt(soucoupe.style.top) &&
                Number.parseInt(tir.style.top) < Number.parseInt(soucoupe.style.top) + Number.parseInt(soucoupe.offsetHeight)
            ) {
                sonTouche.play(); // Joue un son
                document.getElementById("game").removeChild(tir); // Retirer le tir de l'html
                tirs.splice(i, 1); // Retirer le tir de la liste des tirs
                document.getElementById("game").removeChild(soucoupe); // Retirer la soucupe de l'html
                soucoupes.splice(j, 1); // Retirer la soucoupe de la liste des soucoupes
                console.clear(); // Effacer la console (pour cacher les message d'erreur liés à la supression d'une soucoupe)
                score++; // Augmenter le score de 1
            }
        }
    }
}