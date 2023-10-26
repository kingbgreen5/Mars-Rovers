// api_key=0kRnAVYNc2gsCR3nOYw7LjB2uBvKsB75RLIkT25q
var searchFieldEl = document.querySelector('#searchField');
var searchFieldInput = document.querySelector('#searchFieldInput');
var displayEl = document.querySelector("#display")
var muteButton= document.querySelector('#muteBtn')
var playPauseButton= document.querySelector('#playPause')
var restartMusicButton= document.querySelector('#restartButton')
var volumeUpBtn= document.querySelector('#volumeUp')
var volumeDwnBtn= document.querySelector('#volumeDown')
//----------------Local Storage-----------------------
var saveSearchBtn= document.querySelector('#saveSearch')
var displaySaved = document.querySelector('#displaySaved')
var clearSaved = document.querySelector('#clearSaved')

var errorMessage =document.querySelector('#error-modal')


//---------------------Search Function-------------
var formSubmitHandler = function (event) {             // when clicked, this is run
  event.preventDefault();
  var usersSearchInput = searchFieldInput.value       // sets a variable from the info typed in the field
console.log(usersSearchInput)
getSearch(usersSearchInput)                         // runs the search function with users search input
play()                                              // Plays music when search begins
};

var getSearch = function (usersSearchInput) {
// Useable Api Urls
var apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + usersSearchInput +  '&z&api_key=0kRnAVYNc2gsCR3nOYw7LjB2uBvKsB75RLIkT25q' 
console.log(usersSearchInput)

function displayPhotos(imgURL){
  if(cameraName == "Mast Camera" ){   //  prevents Mast camera photos from loading, because they dont look very good
    return;
  }else{
  var img = document.createElement("img");
  img.src = imgURL;
  img.title = cameraName;
  // document.body.appendChild(img);        //  adds it to the <body> tag
  displayEl.appendChild(img);                    
}
}

fetch(apiUrl)                                         // FETCH Request
.then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      console.log(data);
      if (data.photos.length === 0) {
        displayError();
        return;
      }

  displayEl.innerHTML=''                                        // Clears Images when a search is made to prepare for a new image.
  for (var i = 0; i < data.photos.length; i++) {          // for the length of the string returned, go through each one
        imgURL=(data.photos[i].img_src);                       // set the image source to imgURL
        cameraName=(data.photos[i].camera.full_name);          // Set the name of the Camera that took the photo to cameraName
        displayPhotos(imgURL);
  }});
  } else {
    displayError();
  }
})
.catch(function (error) {
  // alert('Unable to connect to Library');
});
};

//-------------------------------------------------------------Local Storage------------------------


searchArray =[]                                                           // creates search array as an empty array
if (JSON.parse(localStorage.getItem("search")) != null){                  // if theres stuff in local storage, update the search array with that stuff
  searchArray = JSON.parse(localStorage.getItem("search"));               // this is neaded because each time the page reloads it empties search array on the above line.
}

var clearSearchHandler = function (event) {                               // Erases local storage and the array that saves to local storage. Then rerenders the empty list
  searchArray =[]   
  localStorage.clear("search", JSON.stringify(searchArray));
  renderSearch()
}

function saveSearch (event){                                                // Saves Search in local
  event.preventDefault();
  if(searchFieldInput.value==''){
    return
  }
  var usersSearchInput = searchFieldInput.value       // sets a variable from the info typed in the field
  console.log(usersSearchInput)
  storeSearch()
  renderSearch()
  }
  
var historyButtonHandler = function (event) {                        // When Search History Buttons are clicked, runs this function listening for any clicks in the search history Div
  var element = event.target;                                           // Selects the Clicked BUtton
  var usersSearchInput = element.id
  if (element.matches("button") === true) {
    console.log("Search Input: " + usersSearchInput)
    getSearch(usersSearchInput) 
      searchFieldInput.value = ''                                         // Clears Search Field
    }}

function storeSearch(){                                                        // Stores Searches in local Storage
  console.log(usersSearchInput)
  var usersSearchInput = searchFieldInput.value 
  console.log(usersSearchInput)
  searchArray.push(usersSearchInput)
  localStorage.setItem("search", JSON.stringify(searchArray));        
  console.log(searchArray)
  renderSearch()
};

function renderSearch(){       
  displaySaved.textContent=''                                                                   //Clears info From the Displayed elements  
  // searchHistory.textContent=''
  var storedSearches = JSON.parse(localStorage.getItem("search")); 
  console.log(storedSearches)
  // searchArray = JSON.parse(localStorage.getItem("search"));    
  // Renders Stored searches
if (storedSearches != null){                                                                    // iF theres stuff in stored searches, render the stuff
  for (var i = 0; i < storedSearches.length; i++) {
    var search = storedSearches[i];
    // searchArray =[]
    var button = document.createElement("button");
    button.textContent = search
    button.class = "button is-primary is-small"
    button.id = search
    displaySaved.appendChild(button);
    console.log(button)
}}
}
// ----------------------------------------------------------MODAL----------------------
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function displayError() {
  errorMessage.style.display = "block";
}

span.onclick = function() {         // When the user clicks on <span> (x), close the modal
  errorMessage.style.display = "none";
}

window.onclick = function(event) {       // When the user clicksoutside of the modal, close 
  if (event.target == errorMessage) {
    errorMessage.style.display = "none";
  }
}


//-------------------------------------------------------------Youtube-----------------------------------
 var tag = document.createElement('script'); //  loads the IFrame Player API code asynchronously.         Youtube Player Section             
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     height: '0',
     width: '0',
     videoId: 'tI6jkImHqRg',                // video ID, THis is what determines what video is played.
     playerVars: {
       'playsinline': 1,
     },
     events: {
     }
   })};
 

// Youtube functions
 function stopVideo() {         // STOPS PLAYBACK
   player.stopVideo();
 };

function play(){
  player.seekTo(1,true)    //sets the player to 0 second mark
player.setVolume(2)
player.playVideo()
};

function muteMusic(){
if (player.isMuted()){
  muteButton.innerHTML="&#128360"
  player.unMute()
}else{player.mute()
muteButton.innerHTML="&#128361"
}};

function playPause(){
if (player.getPlayerState()!=1){          // if player isnt playing, play. Otherwise pause video
  player.playVideo()
  playPauseButton.innerHTML="&#9208"
}else{
    player.pauseVideo()
 playPauseButton.innerHTML="&#9205"
}};

function restartMusic(){
  player.seekTo(1,true)    //sets the player to 0 second mark
  player.setVolume(2)
  player.playVideo()
};

function volumeUp(){
  var volume = player.getVolume()
  player.setVolume(volume+1)
};

function volumeDown(){
  var volume = player.getVolume()
  player.setVolume(volume-1)
};



//---Event Listeners
clearSaved.addEventListener('click', clearSearchHandler )       // Saving to local storage
saveSearchBtn.addEventListener('click', saveSearch)
displaySaved.addEventListener('click',historyButtonHandler)



volumeUpBtn.addEventListener('click',volumeUp );                  // Youtube Controls
volumeDwnBtn.addEventListener('click', volumeDown);
restartMusicButton.addEventListener('click', restartMusic);
playPauseButton.addEventListener('click', playPause);                 // when playpauseButton is clicked, runs playPause Function
muteButton.addEventListener('click', muteMusic);                    // Mutes/unmutes when Mute button is clicked

searchFieldEl.addEventListener('submit', formSubmitHandler);        // Search

renderSearch()                                                      // Renders saved searches on page load
