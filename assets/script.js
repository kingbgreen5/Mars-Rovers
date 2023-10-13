
console.log(searchFieldEl)


var searchFieldEl = document.querySelector('#searchField');
var searchFieldInput = document.querySelector('#searchFieldInput');
var displayEl = document.querySelector("#display")


var formSubmitHandler = function (event) {             // when clicked, this is run
  event.preventDefault();
  var usersSearchInput = searchFieldInput.value       // sets a variable from the info typed in the field
console.log(usersSearchInput)
getSearch(usersSearchInput)                         // runs the search function with users search input
};


var getSearch = function (usersSearchInput) {
// Useable Api Urls

var apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + usersSearchInput +  '&z&api_key=0kRnAVYNc2gsCR3nOYw7LjB2uBvKsB75RLIkT25q' 
console.log(usersSearchInput)

function displayPhotos(imgURL){
  var img = document.createElement("img");
  img.src = imgURL;
  img.title = cameraName;
  // document.body.appendChild(img);        //  adds it to the <body> tag
  displayEl.appendChild(img);                    
}


fetch(apiUrl)                                         // FETCH
.then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      console.log(data);

      if (data.photos.length === 0) {
        displayEl.textContent = 'No Photos found. Please select another date';
        return;
      }
  
      for (var i = 0; i < data.photos.length; i++) {          // for the length of the string returned, go through each one
        imgURL=(data.photos[i].img_src);                       // set the image source to imgURL
        cameraName=(data.photos[i].camera.full_name);          // Set the name of the Camera that took the photo to cameraName
        displayPhotos(imgURL);
  }});
  } else {
    alert('Error: ' + response.statusText);
  }
})
.catch(function (error) {
  alert('Unable to connect to Library');
});
};


searchFieldEl.addEventListener('submit', formSubmitHandler);

