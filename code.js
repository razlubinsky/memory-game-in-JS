isGameStarted = false;
isFirstFlip = true;
lastId = 0;
isBlock = false;
numSteps = 0;
function checkVictory()
{
	result = true;
	for(var i = 1; i<= 30 ; i++)
	{
		if(document.getElementById(i).classList.contains("card"))
			result = false;
	}
	return result;
}


function flip(id)
{
		document.getElementById(id).classList.remove("card");
		document.getElementById(id).classList.add("symbol");
}
function flipBack(id)
{
	document.getElementById(id).classList.remove("symbol");
	document.getElementById(id).classList.add("card");
	document.getElementById(lastId).classList.remove("symbol");
	document.getElementById(lastId).classList.add("card");
}
function switchCard(id) 
{
	if(isFirstFlip && !isBlock)
	{
		var pref = document.getElementById(id);
		if(pref.classList.contains("card"))
		{
			flip(id);
			lastId = id;
		}
		isFirstFlip = false;
	}
	else if(!isFirstFlip && lastId != id)
	{
		isBlock = true;
		flip(id);
		setTimeout(() => {
			if (!(document.getElementById(id).getAttribute("data-symbol") == document.getElementById(lastId).getAttribute("data-symbol")))
				flipBack(id);
			numSteps++;
			console.log(numSteps);
			if (checkVictory())
			{
				alert("YOU WON,it took you " + numSteps + " steps to finish the game, do you want another?");
				numSteps = 0;
				cleanBoard();
				isGameStarted = false;
				startGame();
			}
			isBlock = false;
		}, 1000);
		isFirstFlip = true;
	}
}
function startGame()
{
	if (!isGameStarted)
	{
		arrangeBoard(); 
	}
}
function cleanBoard()
{
	for(var i=1; i<= 30; i++)
	{
		document.getElementById(i).classList.remove("symbol");
		document.getElementById(i).removeAttribute("data-symbol");
		document.getElementById(i).classList.add("card");
	}
}
function arrangeBoard()
{
	isGameStarted = true;
	for (var i = 1; i <= 15 ; i++)
	{
		for (var j = 1 ; j <= 2 ; j++)
		{
			isPlaceFound = false;
			while(!isPlaceFound)
			{
				cardPlace = Math.floor(Math.random() * 30) + 1;
				var pref = document.getElementById(cardPlace);
				if (!pref.hasAttribute("data-symbol"))
				{
					pref.classList.add("card");
					pref.setAttribute("data-symbol",i);
					isPlaceFound = true;
				}
			}
		}
	}
}



