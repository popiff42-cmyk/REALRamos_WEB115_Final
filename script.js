// Learn localStorage and JSON files
const saidYes = document.getElementById("take")
const saidNo = document.getElementById("decline")
const accepter = document.getElementById("Accept")
const rejecter = document.getElementById("Reject")
const beginner = document.getElementById("beginStory")
const dialoguer = document.getElementById("dialogueBox")
const namer = document.getElementById("names")
const inputter = document.getElementById("cmdInput")
const cmdBtn = document.getElementById("cmdButton")
const musicer = document.getElementById("gameMusic")



class conversation{}




const person = {
   name: "James Fisher Brandon",
   age: 23,
   ssn: 39603927,
   address: {
       city: "New York",
       zip: "10001"
   }
}
const person2 = {
   name: "Ryan McCool Schutte",
   age: 9,
   ssn: 59173792,
   address: {
       city: "Albequerque",
       zip: "87176"
   }
}

const person3 = {
    name: "Treyvon"
}





beginner.hidden = true
accepter.hidden = true
rejecter.hidden = true
cmdBtn.hidden = true




function takeOffer(){
   beginner.hidden == true
   saidYes.hidden = true
   saidNo.hidden = true
   dialoguer.innerHTML = "You accept the offer, hurryingly grabbing your coat and the keys to your <br> Lada and driving to the bus stop with your ticket to Yakutsk. <br> After about a week-long trip nearly 5000 miles long, you arrive.";
   beginner.hidden = false
}
function declineOffer(){
    // no is not an option
}


function startGame(){
    cmdBtn.hidden = false
    accepter.hidden = false
    rejecter.hidden = false
    musicer.play()
    musicer.loop = "true"
   console.log("Game Started")
   beginner.hidden = true
   dialoguer.innerHTML = person.name + " arrives at the window..."
}

function accept(){

}
function reject(){

}




function cmdExecute(){
   if (rejecter.hidden == true && accepter.hidden == true){
       if (inputter.value.toLowerCase() == "question name") {
           dialoguer.innerHTML = "My name is " + person.name + ".";
       }
       else if (inputter.value.toLowerCase() == "question age") {
           dialoguer.innerHTML = "I am " + person.age + " years old.";
       }
       else if (inputter.value.toLowerCase() == "question address") {
           dialoguer.innerHTML = "I live in " + person.address.city + ", zip code " + person.address.zip + ".";
       }
       else if (inputter.value.toLowerCase() == "question ssn") {
           dialoguer.innerHTML = "My social security number is " + person.ssn + ".";
       }
       else {
           dialoguer.innerHTML = "Invalid command, please try again.";
       }
   }
}





