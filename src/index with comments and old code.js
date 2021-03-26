let dbUrl = "http://localhost:3000/pups/";
let dogBarDiv = document.querySelector("div#dog-bar");
let dogInfoDiv = document.querySelector("div#dog-info");

let dogImageImg = document.createElement("img")
let dogNameH2 = document.createElement("h2")
let dogIsGoodDogButton = document.createElement("button")

let displayedDog = {}


fetch(dbUrl)
.then(res => res.json())
.then(function(dogArr){
    dogArr.forEach(function(dogObj){
        // addPupsToDogBar(dogObj)
    // })
// })

// function addPupsToDogBar(dog){
        let dogSpan = document.createElement("span");
        dogSpan.innerText = dogObj.name

    //  let dogImageImg = document.createElement("img")
    //     dogImageImg.src = dogObj.image
    //     dogImageImg.alt = dogObj.name

    //  let dogNameH2 = document.createElement("h2")
    //     dogNameH2.name = dogObj.name

    //  let dogIsGoodDogButton = document.createElement("button")
    //  if (dog.isGoodDog){
    //         dogIsGoodDogButton.innerText = "Good Dog!"
    //   } else {
    //   dogIsGoodDogButton.innerText = "Bad Bog!"
    //    }
    
        dogBarDiv.append(dogSpan)

        dogSpan.addEventListener("click", function(evt) {
        
            // fetch(dbUrl + dogObj.id)
            // .then(res => res.json())
            // .then(function(dogObjClick){
        
                dogImageImg.src = dogObj.image
                dogImageImg.alt = dogObj.name
        
                dogNameH2.name = dogObj.name
            
                if (dogObj.isGoodDog){
                    dogIsGoodDogButton.innerText = "Good Dog!"
                } else {
                    dogIsGoodDogButton.innerText = "Bad Bog!"
                }
            //  let dogChild
            //  dogChild.append(dogImageImg, dogNameH2, dogIsGoodDogButton)
            //  dogInfoDiv.append(dogChild)

                dogInfoDiv.appendChild(dogImageImg)
                dogInfoDiv.appendChild(dogNameH2)
                dogInfoDiv.appendChild(dogIsGoodDogButton)

                displayedDog = dogObj
            // })
        }) // closes the click event listener        
    
    }) // closes the forEach

}) // closes the fetch

dogIsGoodDogButton.addEventListener("click", function(e){
    let dogID = displayedDog.id
    let dogIsGood = !displayedDog.isGoodDog
    console.log (dogID, dogIsGood)

    fetch(dbUrl + dogID, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dogIsGood
        })
    })
        .then(res => res.json())
        .then(updatedDog => {
            displayedDog.isGoodDog = updatedDog.isGoodDog
            if (updatedDog.isGoodDog){
                dogIsGoodDogButton.innerText = "Good Dog!"
            } else {
                dogIsGoodDogButton.innerText = "Bad Bog!"
            }
        })
})