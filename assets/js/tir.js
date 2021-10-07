var tirHeight = 5; // Hauteur du sprite de tir

class Tir { // Regroupe toutes les méthodes de tir

    constructor(posX, posY) { // Crée un nouveau tir
        this.posX = posX; // Initialise la position X grâce au paramètre donné
        this.posY = posY; // Initialise le position Y grâce au paramètre donné
        this.img = "./assets/img/tir.png"; // Initialise l'image utilisée pour le tir
        this.id = "tir" + Math.round(Math.random() * 1000); // Donne un id de façon pseudo-aléatoire
        this.initHtml(this.id); // Initialise le tir dans l'html
    }

    get posX() { // Récupère la position X du tir
        return this._posX; // Récupère la position X du tir
    }

    set posX(value) { // Spécifie une position X pour le tir
        this._posX = value; // Spécifie une position X pour le tir
    }

    get posY() { // Récupère la position Y du tir
        return this._posY; // Récupère la position Y du tir
    }

    set posY(value) { // Spécifie une position Y pour le tir
        this._posY = value; // Spécifie une position Y pour le tir
    }

    get img() { // Récupère l'image du tir
        return this._img; // Récupère l'image du tir
    }

    set img(value) { // Spécifie une image pour le tir
        this._img = value; // Spécifie une image pour le tir
    }

    initHtml(id) { // Crée un tir
        var game = document.getElementById("game"); // Trouve l'écran de jeu
        var tirDOMinit = document.createElement("img"); // Crée un DOM img
        tirDOMinit.id = id; // Donne son id au DOM
        tirDOMinit.src = this.img; // Donne son img au DOM
        tirDOMinit.style.zIndex = 1; // Donne un zindex au DOM
        tirDOMinit.style.height = tirHeight + "px"; // Donne une hauteur au DOM
        tirDOMinit.style.position = "absolute"; // Définit le type de position pour le DOM
        tirDOMinit.style.top = document.getElementById("stars").getBoundingClientRect().top + this.posY + "px"; // Définit la position y pour le DOM
        tirDOMinit.style.left = document.getElementById("stars").getBoundingClientRect().left + this.posX + "px"; // Définit la position x pour le DOM
        game.appendChild(tirDOMinit); // Ajoute le DOM à l'écran de jeu
    }

    display(id) { // Affiche le tir
        var tirDOMDisplay = document.getElementById(id); // Sélectionne le tir
        tirDOMDisplay.style.top = document.getElementById("stars").getBoundingClientRect().top + this.posY + "px"; // Donne la bonne position X au tir
        tirDOMDisplay.style.left = document.getElementById("stars").getBoundingClientRect().left + this.posX + "px"; // Donne la bonne position Y au tir
    }

    move(distance) { // Déplace le tir de la distance spécifiée
        this.posX = this.posX + distance; // Ajoute la distance spécifiée à la position actuelle
        if (this.posX < 0) { // Si le tir est en dehors de l'écran
            this.posX = 0; // Mettre le tir aux limites de l'écran
        }
        if (this.posX > 1000) { // Si le tir est à la fin de la zone de jeu
            for (var i = 0; i < tirs.length; i++) { // Pour chaque tir
                if (tirs[i].id == this.id) { // On parcours les tirs
                    tirs.splice(i, 1); // On retire le tir en dehors des limites de la zone de jeu
                    break;
                }
            }
            document.getElementById("game").removeChild(document.getElementById(this.id)); // On retire le tir du html
        } else {
            this.display(this.id); // On affiche le tir à sa position
        }
    }
}