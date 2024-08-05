/*TODO:
- Ajouter les sources des images téléchargées dans le dossier img
- Améliorer les styles
- Auteurs et licence
*/

/***********************************************************************************************************************************/
// Déclaration et initialisation des variables globales
/***********************************************************************************************************************************/

var clics; //Compte le nombre de clics
var choix1; //Contient l'indice de la première carte sélectionnée
var choix2; //Contient l'indice de la seconde carte sélectionnée
var paires; //Compte le nombre de paires trouvées
var dos = "img/dos.png"; //Image du dos des cartes
var n_images;

//ENH : Read image folder and select randomly 
var faces = []; //Tableau pour stocker les noms des images
faces[0] = "img/Android.png";
faces[1] = "img/apple.png";
faces[2] = "img/asus.jpg";
faces[3] = "img/CSS.jpg";
faces[4] = "img/dell.png";
faces[5] = "img/firefox.jpg";
faces[6] = "img/hp.png";
faces[7] = "img/html.png";
faces[8] = "img/IBM.png";
faces[9] = "img/internet explorer.jpg";
faces[10] = "img/Linux.jpg";
faces[11] = "img/Mac os.jpg";
faces[12] = "img/pdf adobe.jpg";
faces[13] = "img/php.jpg";
faces[14] = "img/Python.jpg";
faces[15] = "img/safari.jpg";
faces[16] = "img/samsung.jpg";
faces[17] = "img/Windows.jpg";


var cartes = []; //Tableau pour stocker les noms des cartes
var deface = []; // Tableau pour connaitre l'état des cartes (i.e. de face ou de dos)


/***********************************************************************************************************************************/
// Définition des fonctions
/***********************************************************************************************************************************/

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Fonction qui permet de commencer à jouer
/*---------------------------------------------------------------------------------------------------------------------------------*/
function commencer()
	{
	alert("Salut l'ami ! Choisis un niveau pour commencer le jeu.");
	}

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Fonction qui permet d'initialiser le jeu
/*---------------------------------------------------------------------------------------------------------------------------------*/

function initialiser(n)
	{
	clics = 0;
	paires = 0;
	n_images = n;
	
    document.getElementById("paires").innerHTML = paires; //Initialise le nombre de paires du fichier html
	if ( (n == 3) ||  (n == 4) ||  (n == 6) )
		{
		cartes = faces.slice(0,n); //Copier les images
		cartes = cartes.concat(faces.slice(0,n)); //Dupliquer les images
		deface.length = cartes.length;
		deface.fill(false);
		creer_plateau(n);
		melanger(cartes); //Melanger les cartes (déjà en double)
		}
	else 
		{
		alert("Oups ! Nombre d'images erronées pour initialiser le jeu !")
		}
		
	}

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Fonction qui créer un plateau de cartes
/*---------------------------------------------------------------------------------------------------------------------------------*/
function creer_plateau(n)
	{
	m = 2*n; //Nombre de cartes = 2 * nombre d'images
	
	var plateau = document.getElementById("plateau");

	//ENH: Avoid using test
	if (n == 3)
		{
		plateau.style.gridTemplateColumns= "1fr 1fr 1fr";
		plateau.style.gridTemplateRows= "1fr 1fr";
		}
	else if (n == 4)
		{
		plateau.style.gridTemplateColumns= "1fr 1fr 1fr 1fr";
		plateau.style.gridTemplateRows= "1fr 1fr";
		}
	else if (n == 6)
		{
		plateau.style.gridTemplateColumns= "1fr 1fr 1fr 1fr";
		plateau.style.gridTemplateRows= "1fr 1fr 1fr";		
		}
	else
		{
		alert("Oups ! Nombre d'images erronées pour créer le plateau !")
		}
	
	while (plateau.hasChildNodes()) { plateau.removeChild(plateau.firstChild); } //Réinitialise le plateau
	
    for (var i = 0; i < m; i++)
		{
    	var div = document.createElement("div");
        div.id="div"+i;
        plateau.appendChild(div);
    	
    	var imgElement = '<div id="div'+i+'" ><img onclick="selectionner('+i+');" src='+dos+'></div>';
    	document.getElementById(div.id).innerHTML = imgElement;
    	
		}
	}

/*---------------------------------------------------------------------------------------------------------------------------------*/
// Fonction qui permet de mélanger aléatoirement les éléments d'un tableau
// Algorithme de mélange de Fisher–Yates, version de  Durstenfeld
//ENH: Changer d'algorithme (l'algo précédent était bien) 
/*---------------------------------------------------------------------------------------------------------------------------------*/
function melanger(tableau)
	{
    for (var i = tableau.length - 1; i > 0; i--)
    	{
        var j = Math.floor(Math.random() * (i + 1));
        var temp = tableau[i];
        tableau[i] = tableau[j];
        tableau[j] = temp;
    	}
	}

/*---------------------------------------------------------------------------------------------------------------------------------*/
// Fonction qui permet de sélectionner deux cartes 
/*---------------------------------------------------------------------------------------------------------------------------------*/
function selectionner(id)
	{
	//ENH: Utiliser le système d'indice de HTML et non deface.
	if (deface[id]) 
		{
		alert("Carte déjà sélectionnée !")
		}
	else
		{
		clics++; //Incrémente le nombre de clics après appel de la fonction
		//ENH: Possibilité de fusionner if et elseif pour synthétiser (cf. généricité)
		if (clics == 1) //Si une carte est sélectionnée
			{
	        choix1 = id; //Stocke l'indice de la 1ère carte sélectionnée
	        deface[choix1] = true; //Marquer cette carte comme étant de face
	        document.images[id].src = cartes[id]; //Affiche la face de la 1ère carte
			} 
		else if (clics == 2) //Si deux cartes sont sélectionnées
			{
	        choix2 = id; //Stocke l'indice de la 2nde carte sélectionnée
	        deface[choix2] = true; //Marquer cette carte comme étant de face
	        document.images[id].src = cartes[id]; //Affiche la face de la 2nde carte
	        tempo = setInterval("verifier()", 500); //Execute la fonction vérifier() après une seconde
	        }
		else //Si plus de deux cartes sont sélectionnées
			{
			alert("Ne t'excite pas ! Deux clics suffisent ! ")
			}
		}
	}

/*---------------------------------------------------------------------------------------------------------------------------------*/
// Fonction qui permet de vérifier si deux cartes sont identiques
/*---------------------------------------------------------------------------------------------------------------------------------*/
function verifier()
	{
    clearInterval(tempo); //Remet à zéro la temporisation
    clics = 0; //Initialise le nombre de clics
    if (cartes[choix1] == cartes[choix2]) //Si une paire est trouvée
		{
        paires++; //Incrémente le nombre de paires
        document.getElementById("paires").innerHTML = paires; //Renvoie le nombre de paires au fichier html
        if (paires == n_images )
        	{
        	alert("Bonne mémoire ! Tu peux passer au niveau supérieur !");
        	initialiser(n_images);
        	}
        } 
	else //Si ce n'est pas une paire
		{
        document.images[choix1].src = dos; //Affiche le dos des deux cartes
        document.images[choix2].src = dos;
        deface[choix1] = false; //Les deux cartes sont à présent de dos
        deface[choix2] = false;        
        }
    }

/***********************************************************************************************************************************/
// Programme principal
/***********************************************************************************************************************************/

commencer();



