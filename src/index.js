let addToy = false;

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    
    data.forEach(element => {
      // getting the div container
      const divContainer = document.getElementById('toy-collection');

      // creating the div container
      const loadedDiv = document.createElement('div');
      loadedDiv.classList.add('card');

      // creating the  toy header
      const loadedToyHeader = document.createElement('h2');
      loadedToyHeader.textContent = element.name;

      // creating the image
      const loadedImage = document.createElement('img');
      loadedImage.src = element.image;
      loadedImage.alt = element.name;
      loadedImage.classList.add('toy-avatar')

      // creating the like paragraph count
      const likeParagraph = document.createElement('p');
      likeParagraph.textContent = `${element.likes} Likes`;

      // creating the like button 
      const likeButton = document.createElement('button');
      likeButton.id = element.id;
      likeButton.classList.add('like-btn');
      likeButton.textContent = 'Like ❤️';

      // adding the elements to the div and adding div to body
      loadedDiv.appendChild(loadedToyHeader)
      loadedDiv.appendChild(loadedImage);
      loadedDiv.appendChild(likeParagraph);
      loadedDiv.appendChild(likeButton);

      divContainer.appendChild(loadedDiv);
      allowLiking();
    });
     
  }
  )
}

function addNewToy(){
    const form = document.querySelector('form.add-toy-form');
           
    form.addEventListener('submit', function(e){
      e.preventDefault();

      const newToyName = form.children[1].value;
      const newToyImageUrl = form.children[3].value;

      console.log(newToyName);
      console.log(newToyImageUrl);
      
      
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: newToyName,
          image: newToyImageUrl,
          likes: 0,
        })
      })
      .then(res => res.json())
      .then(data => fetchToys()
      )
    })
}

function allowLiking(){
  const button = document.getElementsByClassName('like-btn');
      for(let element of button){
        element.addEventListener('click', function(e){
        
        const currentID = e.target.id;
        let toyLikes = 0;
        const paragraph = e.target.previousSibling;
        let [a,b] = paragraph.textContent.split(' ');
        let newLikes = parseInt(a, 10);
                       
          fetch(`http://localhost:3000/toys/${currentID}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              "likes": newLikes + 1,
            }),
          })
          .then(res => res.json())
          .then(data => {
                                 
            const elementLikes = data.likes;
            paragraph.textContent = `${data.likes} Likes`         
                               
          }).catch(err => console.log(err.message)
          )
    
 })
}
}

function main(){
  fetchToys();
  addNewToy();
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  main();
});
