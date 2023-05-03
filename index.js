console.log("This is my index js file");

// Initialize the news api parameters
let source = "the-times-of-india";
//let apiKey = "c2be1c60b08d41d1ace5893df0986f81";
let apiKey = "e72d0950215b44858ad2d993613608fb"

//Initialising Buttons
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const queryBtn = document.getElementById("search");

let discity = "Mumbai";

//News heading section
const newsType = document.getElementById("topic");

// Grab the news container
let newsAccordion = document.getElementById("cardContainer");


//Function for changing Cards
function changeC(category,t){
  newsType.innerHTML = `<h4>${category} News</h4>`;
    const xhr = new XMLHttpRequest();
    if(t==1){
    xhr.open(
      "GET",
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`,
      true
    );
    }else{
      xhr.open(
        "GET",
        `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`,
        true
      );
    }
    xhr.onload = function () {
      if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        let newsHtml = "";
        console.log(articles);
        articles.forEach(function (element) {
          let img =`${element["urlToImage"]}`
          if(element["urlToImage"]==null){
            img = "img/logo.svg"
          }
          let news = `<div class="card">
                                  <img src="${img}" alt="omg">
                                  <h1>${element["title"]}</h1>
                                  <p>${element["description"]}</p>
                                  <button OnClick=" location.href='${element["url"]}' ">Read More</button>
                              </div>`;
          newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
      } else {
        console.log("Some error occured");
      }
    };
  
    xhr.send();
}

function capitalize(input) {  
  var words = input.split(' ');  
  var CapitalizedWords = [];  
  words.forEach(element => {  
      CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
  });  
  return CapitalizedWords.join(' ');  
}  


//Current City
function getCoordintes() {
  var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
  };
  function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      getCity(coordinates);
      return;

  }
  function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function getCity(coordinates) {
  var xhr = new XMLHttpRequest();
  var lat = coordinates[0];
  var lng = coordinates[1];
  xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.b21ebdfe1fdeeffdcfb75914a9bff3ff&lat=" +
  lat + "&lon=" + lng + "&format=json", true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          var city = response.address.city;
          console.log(response.address.city);
          document.getElementById("weather").append(discity);
          return;
      }
  }
}



//weather data
const xhr = new XMLHttpRequest();
xhr.open('GET',`https://api.openweathermap.org/data/2.5/weather?q=${discity}&units=metric&appid=2037cf48ee3f6f209164cd6a23bf849a`);
xhr.send();
xhr.onload = () =>{
    // we can change the data type to json also by
    const data = JSON.parse(xhr.response);
    console.log(data);
    //document.getElementById("weather").append(data.main.temp);
};





// Get the container element
var btnContainer = document.getElementById("navCont");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("navmar");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("currPage");
    current[0].className = current[0].className.replace(" currPage", "");
    this.className += " currPage";
  });
}





window.onload = function (){
  changeC("General",1);
}
queryBtn.addEventListener("click", function () {
  let q = document.getElementById("qinput").value;
  let q2 = capitalize(q);
  changeC(q2,0);
});
generalBtn.addEventListener("click", function () {
  changeC("General",1);
});

businessBtn.addEventListener("click", function () {
    changeC("Business",1);
  });

  
sportsBtn.addEventListener("click", function () {
  changeC("Sports",1);
});

  
entertainmentBtn.addEventListener("click", function () {
  changeC("Entertainment",1);
  });

  
technologyBtn.addEventListener("click", function () {
    changeC("Technology",1);
});

var timeDisplay = document.getElementById("time");


//Live Clock Navbar
function refreshTime() {
  var dateString = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
  var formattedString = dateString.replace(", ", "<br>");
  timeDisplay.innerHTML = formattedString;
}

setInterval(refreshTime, 1000);
getCoordintes();
