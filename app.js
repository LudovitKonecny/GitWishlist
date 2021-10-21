//Selectors
const wishForm = document.querySelector("#wish-form");
const wishInput = document.querySelector(".wish-input");
const wishButton = document.querySelector(".wish-button");
const wishList = document.querySelector(".wish-list");
const filterOption = document.querySelector('.filter-wish')

//Event listeners
document.addEventListener('DOMContentLoaded', getWishes);
wishForm.addEventListener("submit", addWish);
wishList.addEventListener ("click", deleteCheck);
filterOption.addEventListener("click", filterWish);

//Functions

function addWish(event) {
    //Functions
    event.preventDefault();
    //Prevent form from submitting
    //Todo DIV
    const wishDiv = document.createElement("div");
    wishDiv.classList.add("wish");
    //Create LI
    const newWish = document.createElement("li");
    newWish.innerText = wishInput.value;
    newWish.classList.add("wish-item");
    wishDiv.appendChild(newWish);
    //Add wish to localstorage
    saveLocalWish(wishInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    wishDiv.appendChild(completedButton);
    //CHECK trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    wishDiv.appendChild(trashButton);
    //APPEND TO LIST
    wishList.appendChild(wishDiv);
    //Clear Wish input value
    wishInput.value = "";
  }


function deleteCheck(e) {
    const item = e.target;
    //Delete wish 
    if(item.classList[0] === "trash-btn"){
        const wish = item.parentElement;
        //Animation
        wish.classList.add("fall");
        remmoveLocalWishes(wish);
        wish.addEventListener('transitionend', function() {
            wish.remove();
        })
    }
    //Complete wish
    if(item.classList[0] === "complete-btn"){
        const wish = item.parentElement;
        wish.classList.toggle("completed");
    }
}

function filterWish(e) {
    const wishes = wishList.childNodes;
    wishes.forEach(function(wish){
        switch(e.target.value){
            case "all":
                wish.style.display = "flex";
                break;
            case "completed":
                if(wish.classList.contains("completed")){
                    wish.style.display = "flex";
                }else{
                    wish.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!wish.classList.contains("completed")){
                    wish.style.display = "flex";
                }else{
                    wish.style.display = "none";
                }
                break;
                
        }
    });
}

function saveLocalWish(wish){
    //Check
    let wishes;
    if(localStorage.getItem('wishes') === null){
        wishes = [];
    } else {
        wishes = JSON.parse(localStorage.getItem('wishes'));
    }

    wishes.push(wish);
    localStorage.setItem('wishes', JSON.stringify(wishes));
}

function getWishes(){
    
    //Check
    let wishes;
    if(localStorage.getItem('wishes') === null){
        wishes = [];
    } else {
        wishes = JSON.parse(localStorage.getItem('wishes'));
    }
    wishes.forEach(function(wish){
        //Todo DIV
        const wishDiv = document.createElement("div");
        wishDiv.classList.add("wish");
        //Create LI
        const newWish = document.createElement("li");
        newWish.innerText = wish;
        newWish.classList.add("wish-item");
        wishDiv.appendChild(newWish);
        //CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        wishDiv.appendChild(completedButton);
        //CHECK trash BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        wishDiv.appendChild(trashButton);
        //APPEND TO LIST
        wishList.appendChild(wishDiv);
    });
}

function remmoveLocalWishes(wish){
    //Check
    let wishes;
    if(localStorage.getItem('wishes') === null){
        wishes = [];
    } else {
        wishes = JSON.parse(localStorage.getItem('wishes'));
    }
    const wishIndex = wish.children[0].innerText;
    wishes.splice(wishes.indexOf(wishIndex), 1);
    localStorage.setItem('wishes', JSON.stringify(wishes));
}
