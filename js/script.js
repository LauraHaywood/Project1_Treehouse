// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);


var html;
var newContent = "";
var content;
var quotePosition;
var key;
var background;
var quoteNumber = [];
var quoteTimeInt;
var tagClass;
var timedQuote = setInterval(printQuote, 30000);

timedQuote;

//Functions to change the background color
//generate random color number
function randomColorNumber(){
	return Math.floor(Math.random()*256);
}
//create random color 
function getRandomColor(){
	var newColor = 'rgb(' + randomColorNumber() + ', ' + randomColorNumber() + ', ' +randomColorNumber() + ')';
	return newColor;
}

//change css code
// css code for background
function changeBackground(){
	var sameColor = getRandomColor();
	document.body.style.backgroundColor = sameColor;
	document.getElementById("loadQuote").style.backgroundColor = sameColor;
}



//Functions for new quote
//generate random number for position in quoteList object
function randomArrayPostion() {
	return Math.floor(Math.random()* quotes.length);
}

//new content string for p tags
function contentString(){
		content = '<p class="' + key + '">'; 
		content += quotes[quotePosition][key];
		if (key === "source"){
			resourceAddOn();
		};
		content += '</p>';
}

//content add on for cititation and year
function resourceAddOn(){
	for(key in quotes[quotePosition]){
		if (key === "year" || key === "citation"){
			if(quotes[quotePosition][key] === ""){
				break;
			}else{
			content += '<span class="' + key + '">';
			content += quotes[quotePosition][key];
			content += '</span>';
			};
		};
	}
}

//content string for primary/secondary tags
function tagString(){
	
	for(key in quotes[quotePosition]){
		if (key === "primaryTag"){
			if(quotes[quotePosition][key] === ""){
				break;
			}else{
				content = '<p style = "font-size: .75rem; letter-spacing: 0.05em; line-height: 1.1; text-align: right; margin-right: 4em;">';
				content += quotes[quotePosition][key];
				//checking for a secondary tag - will not have a secondary with out a primary tag
				for (key in quotes[quotePosition]){
					if (key === "secondaryTag" && quotes[quotePosition][key] !== ""){
							content += " | ";
							content += quotes[quotePosition][key];
						};
				};
				content += "</p>";	
			};
		};
	};
	
	}

//replacing Quote content
function replacingContent(){
	
	console.log("current quote position " + quotePosition);
	changeBackground();
	for(key in quotes[quotePosition]){
		if (key === "quote"){
		contentString();
		//applying code string to html element
		newContent = document.getElementById("quote-box");
		newContent.innerHTML = content;
	}else if (key === "source"){
		contentString();
		newContent.innerHTML += content;
	}else if (key === "primaryTag"){
		tagString();
		newContent.innerHTML += content;
		
	};
};
}


//complies all the different parts

function getRandomQuote(){
	//assigns a new random quoteArrayPosition to quotePosition
	quotePosition = randomArrayPostion();
	//This part of the function is so the quotes don't repeat
	//if curent quote is new - adds quotePostion to quoteNumber & creates new HTML
		// quoteNumber is used to keep track of what's been seen 
	if(quoteNumber.indexOf(quotePosition) === -1){
	quoteNumber.push(quotePosition);
	console.log("Position of seen quotes: " + quoteNumber);
	//function that creates new HTML code for the new quote and it's info pieces
	replacingContent();
	//if quote has been used
}else{
	//first will check if all the quotes have been used 
	//if all quotes have been used reset quoteNumber array
	do{
		quotePosition = randomArrayPostion();
		if(quotes.length === quoteNumber.length){
		quoteNumber = [];
		console.log("ALL QUOTES USED: refresh list");
	}
	}while(quoteNumber.indexOf(quotePosition) >= 0)
	//prints quote log for viewer to check work
	quoteNumber.push(quotePosition);
	console.log("Position of seen quotes: " + quoteNumber);
	replacingContent();
};
}



function printQuote(){
	clearTimeout(timedQuote);
	getRandomQuote();
	timedQuote = setInterval(printQuote, 30000);

}



