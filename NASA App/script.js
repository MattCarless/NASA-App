console.log(moment());
console.log(moment().format("YYYY-MM-DD"));

const buttonClick = document.getElementById("submit-button");
const displayImage = document.getElementById("image");
const userDataInput = document.getElementById("user-data");
const imageTitle = document.getElementById("picture-title");
const errorDiv = document.getElementById("display-error");
const todaysDate=moment().format("YYYY-MM-DD");
userDataInput.value=todaysDate;
let selectedDate=todaysDate;


const getUserData = (event) => {
    event.preventDefault();
    const inputValue = userDataInput.value; 
    console.log(inputValue);
    selectedDate=inputValue;
    getImage();
};

const getImage = function() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=Ea8IR4UC6Xw98evizWD8OE7Y4hwRtS5WNW3EUIN8&date=${selectedDate}`) 
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw (response);
            }
        })
        .then(data => {             // works, console log showing data is the object being sent from the API
            onApiSuccess(data);
            //console.log(data);
        })
        .catch(error => {
            onApiError(error);
        });


    /**
     * Data passed from successful fetch call
     * Response populates html page
     */

    const onApiSuccess = (data) => { 
        console.log(data.hdurl,displayImage);
        displayImage.style.backgroundImage= `url("${data.hdurl}")`;
        // displayImage.style.backgroundImage= "url('" + data.hdurl +"')"
        imageTitle.innerHTML=data.title; 
    }



    /**
     * Data passed from unsuccessful fetch call
     * Adds error message to page **/

    const onApiError = (error) => {
        if (error.status === 404) {
            errorMessage = "Image not found";
            errorDiv.innerHTML= errorMessage;
        }
};
};

buttonClick.addEventListener('click', getUserData ); 
//fetchCurrentImage.addEventListener('click', getTodaysImage);


/* CHECKLIST

- Extract relevant information from object (COMPLETED)
- try to sort out null problem(COMPLETED)
- Create a function, connect it to button fetch today image, place fetch request in this (COMPLETED)
- Create a variable to contain user submitted date, program so it accepts data as eg 2019-12-08. craig recommends using moment.js
- Create a function so if user submits a new date it will replace the image and title with the relevant data
- Create a function that contains various error messages such as nothing entered in input, date format wrong etc
- Roughly style the page (create space between content etc)
*/

