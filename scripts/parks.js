let weatherButton = document.getElementById("weatherButton"); /* returns the element with id weatherButton*/
weatherButton.addEventListener("click", function(){   /* taking element and on click runs the function getParkInfo */
     getParkInfo()
});

const parksContainer = document.querySelector(".parks_container"); /* returns the element of park_container - refers to line 48 & 65*/

function getParkInfo() {   /*function start to get wanted info */

fetch(
    "https://raw.githubusercontent.com/nss-day-cohort-31/national-parks/master/database.json"  /* API fetch command for national parks*/
)
.then(results => results.json())  /*part of fetch command */
.then(parsedResults => {          /*part of fetch command */


    
    const allParks = parsedResults.parks;   /*assigns var allParks and brings back or calls results (bulk results) */

    allParks.forEach(park => {     /* for each command - loop over every park to bring back specific data (breaks down bulk data one at a time*/
        
        console.log(park.name, park.latitude, park.longitude); /* console log info you are looking for */

        fetch(`https://api.darksky.net/forecast/82d1ff6d2efed15d0a48a66f10a76b95/${park.latitude},${park.longitude}`)  /* fetch command park latitude & lonitude */

        .then(results => results.json())   /*part of fetch command */
        .then(parsedResults => {          /*part of fetch command */


        console.log(parsedResults.currently.summary)   /* console log data from fetch command - .currently & .summary */
        console.log(parsedResults.daily.summary)
        
        

        if (park.visited === true) {    /* if statement with boolean if visiting park is true*/

/* set var parkHTML for html that will go to the DOM */
/*  sets class for visited park */
/* html to go to DOM */
/* pulls each park name that was visited */
/* Weather will be printed to DOM */

            const parkHTML = `        
        <article class= "visited">    
            <h3>Park Name</h3>       
            <p>${park.name}</p>      
            <p>Weather:</p>         
            <ul>
                <li>Currently: ${parsedResults.currently.summary}</li>  
                 <li>Today: ${parsedResults.daily.summary}</li>
                <li>Week: N/A </li>
            </ul>
            </article>`;
            parksContainer.innerHTML += parkHTML;
    }
        
    else {          /* else statement with boolean if visiting park is not true*/

        const parkHTML = `
        <article class="not_visited">
            <h3>Park Name</h3>  
            <p>${park.name}</p>
            <p>Weather:</p>
            <ul>
               <li>Currently: ${parsedResults.currently.summary}</li>
              <li>Today: ${parsedResults.daily.summary}</li>
              <li>Week: N/A </li>
            </ul>
        </article>`;
      
            parksContainer.innerHTML += parkHTML;
    
    }

        }); 
    });
});
}