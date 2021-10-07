function affKeyCode(event) { // Lorsqu'une touche est enfoncée
	if (Date.now() - (duration * 1000) < beginTime) { // Si le jeu n'est pas encore fini
		switch (event.key) {
			case "ArrowUp": // Fait monter le vaisseau
			case "8":
			case "z":
			case "w":
			case "+":
				vaisseau.move(25);
				vaisseau.src = "./assets/imgspaceship45.svg";
				break;
			case "ArrowDown": // Fait descendre le vaisseau
			case "2":
			case "s":
			case "-":
				vaisseau.move(-25);
				break;
			case " ": // Fait tirer le vaisseau
			case "5":
			case "e":
			case "Enter":
				vaisseau.fire();
				break;
		}
	}
}