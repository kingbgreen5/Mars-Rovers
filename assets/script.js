var searchFieldEl = document.querySelector('#searchField');

console.log(searchFieldEl)



var searchFieldInput = document.querySelector('#searchFieldInput');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');






var formSubmitHandler = function (event) {             // when clicked, this is run
  event.preventDefault();
  var usersSearchInput = searchFieldInput.value       // sets a variable from the info typed in the field
console.log(usersSearchInput)
getSearch(usersSearchInput)                         // runs the search function with users search input

};





// grab search 
// insert into api string





var getSearch = function (usersSearchInput) {
  // var apiUrl = 'https://api.github.com/users/' + usersSearchInput + '/repos';
  // var apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=0kRnAVYNc2gsCR3nOYw7LjB2uBvKsB75RLIkT25q&count=1'

 
// USeable Api Urls
//                                                                                          2020-6-8  
var apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + usersSearchInput +  '&z&api_key=0kRnAVYNc2gsCR3nOYw7LjB2uBvKsB75RLIkT25q' //2020-6-3 date of 20206-3
console.log(usersSearchInput)


// Nasa Random IMage of the day , this works dont delete it!
// var apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=0kRnAVYNc2gsCR3nOYw7LjB2uBvKsB75RLIkT25q&count=1'


  // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY
//   https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=0kRnAVYNc2gsCR3nOYw7LjB2uBvKsB75RLIkT25q
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY



  // var apiUrl = 'https://www.loc.gov/search/?q=' + usersSearchInput  + '&fo=json';


function displayPhotos(imgURL){
  var img = document.createElement("img");
  img.src = imgURL;
  img.title = cameraName;
//                      This next line will just add it to the <body> tag
  document.body.appendChild(img);
}

// //IMage of the day
//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//           console.log(data[0].hdurl);
//           imgIndex =0
//           imgURL=(data[imgIndex].hdurl)
//           displayPhotos(imgURL)
//           console.log(imgURL)
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to Library');
//     });
// };



// Mars Rover
fetch(apiUrl)
.then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      console.log(data);




      if (data.photos.length === 0) {
        repoContainerEl.textContent = 'No Photos found. Please select another date';
        return;
      }
   
      for (var i = 0; i < data.photos.length; i++) {

        imgURL=(data.photos[i].img_src);
        cameraName=(data.photos[i].camera.full_name);
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


// if (data.photos.length === 0) {
//   repoContainerEl.textContent = 'No Photos found. Please select another date';
//   return;

// }









// function displayPhotos(imgURL){
//     var img = document.createElement("img");
//     img.src = imgURL;
//     img.width = 200;
//     img.height = 200;
//     img.alt = alt;

//     // This next line will just add it to the <body> tag
//     document.body.appendChild(img);
// }






// 
var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-language');

  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = '';
  }
};

// var getSearch = function (user) {
//   var apiUrl = 'https://api.github.com/users/' + user + '/repos';

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//           displayRepos(data, user);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to GitHub');
//     });
// };

// var getFeaturedRepos = function (language) {
//   var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         displayRepos(data.items, language);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };

var displayResults = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    return;
  
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

searchFieldEl.addEventListener('submit', formSubmitHandler);
// languageButtonsEl.addEventListener('click', buttonClickHandler);
