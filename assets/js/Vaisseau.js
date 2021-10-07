var vaisseauHeight = 50; // Hauteur du vaisseau en pixels
var lazerOutput = 13; // Séparation entre les différentes sorties pour les lazers
var sonTir = new Audio('./assets/sounds/Laser_Shoot.wav');

class Vaisseau { // Regroupes toutes les méthodes pour le vaisseau

    constructor(img) { // Crée un nouveau vaisseau
        this.posX = 40; // Initialisation à 40px du bord gauche
        this.posY = 200 - (vaisseauHeight / 2); // Initialisation centrée sur le canvas
        this.img = img; // Initialisation avec l'image passée en paramètres
        this.initHtml(); // Initialisation du vaisseau dans le html
    }

    get posX() { // Retourne la position x du vaisseau
        return this._posX; // Retourne la position X du vaisseau
    }

    set posX(value) { // Définit la position X du vaisseau
        this._posX = value; // définit la position X du vaisseau
    }

    get posY() { // Retourne la position Y du vaisseau
        return this._posY; // Retourne la position Y du vaisseau
    }

    set posY(value) { // Définit la position Y du vaisseau
        this._posY = value; // Définit la position Y du vaisseau
    }

    get img() { // Retourne l'image utilisée pour le vaisseau
        return this._img; // Retourne l'image utilisée pour le vaisseau
    }

    set img(value) { // Définit l'image à utiliser pour le vaisseau
        this._img = value; // Définit l'image à utiliser pour le vaisseau
    }

    initHtml() { // Initialise le vaisseau dans le html
        var vaisseauDOMInit = document.getElementById("vaisseauId"); // Sélectionne le vaisseau dans le html
        vaisseauDOMInit.src = this.img; // Définit l'image à utiliser pour le vaisseau
        vaisseauDOMInit.style.height = vaisseauHeight + "px"; // Définit la taille du vaisseau
        vaisseauDOMInit.style.position = "absolute"; // Définit le type de position
        vaisseauDOMInit.style.top = document.getElementById("stars").getBoundingClientRect().top + this.posY + "px"; // Définit la position x du vaisseau
        vaisseauDOMInit.style.left = document.getElementById("stars").getBoundingClientRect().left + this.posX + "px"; // définit la position Y du vaisseau
        vaisseauDOMInit.style.zIndex = 2; // Définit le z-index du vaisseau
        this.display(); // Affiche le vaisseau à sa position
    }

    display(id) { // Affiche le vaisseau à sa position
        var vaisseauDOMDisplay = document.getElementById("vaisseauId"); // Sélectionne le vaisseau dans le html
        vaisseauDOMDisplay.style.top = document.getElementById("stars").getBoundingClientRect().top + this.posY + "px"; // Affiche le vaisseau à sa position x
        vaisseauDOMDisplay.style.left = document.getElementById("stars").getBoundingClientRect().left + this.posX + "px"; // Affiche le vaisseau à sa position Y
    }

    move(distance) { // Déplace le vaisseau de la distance spécifiée
        this.posY = this.posY - distance; // ajoute la distance spécifiée à la position actuelle
        if (this.posY > 400 - vaisseauHeight) { // Si le vaisseau est trop bas
            this.posY = 400 - vaisseauHeight; // Remettre le vaisseau à sa position la plus basse
        }
        if (this.posY < 0) { // Si le vaisseau est trop haut
            this.posY = 0; // Remettre le vaisseau à sa position la plus haute
        }
        this.display(); // Afficher le vaisseau à sa position
    }

    fire() { // Fait feu
        tirs.push(new Tir(vaisseau.posX + 25, vaisseau.posY + (vaisseauHeight / 2) - 3 + lazerOutput)); // Crée un nouveau lazer et l'ajoute à la liste des tirs
        sonTir.play(); // Joue un son
        lazerOutput = 0 - lazerOutput; // Inverse la position de sortie du lazer suivant
    }
}