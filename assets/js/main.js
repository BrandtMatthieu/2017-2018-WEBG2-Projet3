var vaisseau; // Le vaisseau
var tirs = []; // Tous les tirs
var soucoupes = []; // Toutes les soucoupes volantes
var chronoDOM; // L'affichage du chronomètre
var scoreDOM; // L'affichage du score
var time = 50; // Intervalle pour fluidité;
var duration = 30; // La durée d'unpartie en secondes
var beginTime = Date.now(); // e moment où le jeu a commencé
var score = 0; // Le score
var captain_name; // Le nom du capitaine

window.onload = function () { // Quand la page est chargée
    vaisseau = new Vaisseau("./assets/img/spaceship.svg"); // Nouveau vaisseau quand fenêtre est chargée
    chronoDOM = document.getElementById("chrono"); // Trouver l'affichage du chronomètre
	scoreDOM = document.getElementById('score'); // Trouver l'affichage du score
	if(localStorage.getItem('high_score')!=null) { // Si il y a déjà un high_score
		document.getElementById('best-score').innerText = localStorage.getItem('high_score'); // Afficher le high-score
	} else {
		document.getElementById('best-score').innerText = "No high score"; // Afficher aucun high score
	}
    var refreshId = setInterval(function () {
        if(soucoupes.length<10) { // Si pas assez de soucoupes
            if(Math.round(Math.random()*time)==time/2) { // Faire apparaitre une soucoupe aléatoirement
                soucoupes.push(new Soucoupe(1000-83, Math.random()*(400-soucoupeHeight))); // Ajouter une nouvele soucoupe
            }
        }

        for (var i = 0; i < tirs.length; i++) { // Pour tous les tirs
            tirs[i].move(20); // Faire avancer tous les tirs
        }

        for (var i = 0; i < soucoupes.length; i++) { // Pour toutes les soucoupes
            soucoupes[i].move(-10, (Math.round(Math.random() * 2) - 1) * 5); // Faire avancer toutes les soucoupes
        }

        for(var i = soucoupes.length-1; i >= 0; i--) { // Pour toutes les soucoupes
            soucoupes[i].isHit(i); // Vérifier si les soucoupes sont touchées
        }

        if (Date.now() - (duration * 1000) >= beginTime) { // Si temps épuisé
            clearInterval(refreshId); // Finir le jeu
            clearScreen(); // Suprimmer les éléments restants
            chronoDOM.innerHTML = "0"; // Afficher 0 au chrono
            highScore(); // Gérer le high_score
        } else {
            chronoDOM.innerHTML = ((beginTime + (duration * 1000)) - Date.now()) / 1000; // Mise à jour de l'affichage
			scoreDOM.innerText = score; // mise à jours l'affichage du score
		}
    }, time); // Répéter tous les "time" milisecondes
}

window.onresize = function () { // Quand la page est redimentionnée
    vaisseau.display(); // Recalculer la position du vaisseau
    for (var i = 0; i < tirs.length; i++) { // Pour tous les tirs
        tirs[i].display(tirs[i].id); // Recalculer la position des tirs
    }
    for (var i = 0; i < soucoupes.length; i++) { // Pour toutes les soucoupes
        soucoupes[i].display(soucoupes[i].id); // Recalculer la position des soucoupes
    }
}

function highScore() { // Sauvegarde du score
	if(localStorage.getItem('high_score')==null) { // Si pas encore de high_score enregistré
		localStorage.setItem('high_score', score); // Mettre le high_score au score actuel
	} else {
		if(localStorage.getItem('high_score')<score) { // Si le score local est meilleur que high score
			localStorage.setItem('high_score', score); // mettre le high_score au score actuel
			while(captain_name==null||captain_name==undefined||captain_name=='') { // Tant que le nom entré n'est pas valide
				captain_name = prompt("Game Over\nWell done captain, you got the highest score.\nPlease enter your name, captain, so that we can save your score."); // Demander au capitaine son nom
			}
			localStorage.setItem('captain', captain_name ); // Enregistrer localement le nom du capitaine
		}
	}
}

function clearScreen() { // Suprimme les éléments restants si il y en a encore
    while(document.getElementById("game").children.length>1) { // Tant qu'il y a d'autres éléments dans le jeu autres que le vaisseau
        document.getElementById("game").removeChild(document.getElementById("game").lastChild); // Suprimmer cet élément
        soucoupes = []; // Remet la liste des soucoupes à zéro
        tirs = []; // Remet la liste des tirs à zéro
    }
}