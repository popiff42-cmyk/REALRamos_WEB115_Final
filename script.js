// Learn localStorage and JSON files
const accepter = document.getElementById("Accept")
const rejecter = document.getElementById("Reject")
const beginner = document.getElementById("beginStory")
const dialoguer = document.getElementById("dialogueBox")
const namer = document.getElementById("names")
const musicer = document.getElementById("gameMusic")
const sounder = document.getElementById("soundEffect")

document.getElementById("gongSound").addEventListener("click", playSound)
sounder.volume = 1
musicer.volume = 0.5

function playSound() {
    sounder.play()
}

let correctCount = 0
let mistakesCount = 0
let currentPerson = null
let currentInfo = null
let isRealInfo = false
let timerInterval = null
let timeElapsed = 0
let currentPersonIndex = 0
let totalRounds = 5 // must match number of classes

//real
class Person {
   constructor(name, age, ssn, address) {
       this.name = name
       this.age = age
       this.ssn = ssn
       this.address = address
   }
}

// fake
class FakePerson extends Person {
   constructor(realPerson) {
       super(realPerson.name, realPerson.age, realPerson.ssn, realPerson.address)
       this.generateFakeInfo()
   }

   generateFakeInfo() {
    console.log("Generated Fake Information.")
       const fakeTypes = ['name', 'age', 'ssn', 'address']
       const typeToFake = fakeTypes[Math.floor(Math.random() * fakeTypes.length)]

       if (typeToFake === 'name') {
           this.name = "not real" + this.name
       } else if (typeToFake === 'age') {
           this.age = Math.floor(Math.random() * 50) + 18
       } else if (typeToFake === 'ssn') {
           this.ssn = Math.floor(Math.random() * 100000000)
       } else if (typeToFake === 'address') {
           this.address = {
               city: "Fake City",
               zip: String(Math.floor(Math.random() * 90000) + 10000)
           }
       }
   }
}

// json
const person = new Person(
    "James Fisher Brandon", 
    30, 
    39603927, 
    { city: "New York", zip: "10001" })
const person2 = new Person("Ryan McCool Schutte", 
    32, 
    45782193, 
    { city: "Boston", zip: "02101" })
const person3 = new Person("Chandler Thompson", 
    28, 
    67829145, 
    { city: "San Francisco", zip: "94102" })
const person4 = new Person("Yuno Miles", 
    35, 
    52941837, 
    { city: "Chicago", zip: "60601" })
const person5 = new Person("2002 Nissan R34 Skyline BNR34 V-Spec II Nur Edition 2.6L RB26DETT Twin-Turbo Inline-6 AWD Manual 6-speed",
    24,
    29628106,
    { city: "Tokyo", zip:"10001" })

const people = [person, person2, person3, person4, person5]


beginner.hidden = true


function acceptPerson(){
   accepter.hidden = true
   rejecter.hidden = true
   dialoguer.innerHTML = "You accept the offer, hurryingly grabbing your coat and the keys to your <br> Lada and driving to the bus stop with your ticket to Yakutsk. <br> After about a week-long trip nearly 5000 miles long, you arrive."
   beginner.hidden = false
}

function rejectPerson(){
    // NO is not an option. You MUST go.
}


function startTimer() {
   timeElapsed = 0
   const timerDisplay = document.getElementById("timerDisplay")
   const timerValue = document.getElementById("timerValue")
   timerDisplay.style.display = "block"
   
   timerInterval = setInterval(() => {
       timeElapsed++
       timerValue.innerHTML = timeElapsed
   }, 1000)
}



function stopTimer() {
   if (timerInterval) {
       clearInterval(timerInterval)
   }
}


function displayRealInfo(person) {
   document.getElementById("realName").innerHTML = person.name
   document.getElementById("realAge").innerHTML = person.age
   document.getElementById("realSSN").innerHTML = person.ssn
   document.getElementById("realAddress").innerHTML = person.address.city + ", " + person.address.zip
}


function createClaimsDisplay(personInfo) {
   const claimsBox = document.getElementById("claimsBox")
   claimsBox.innerHTML = ""
   
   const nameDiv = document.createElement("div")
   nameDiv.className = "claimItem"
   nameDiv.innerHTML = "<strong>Name:</strong> " + personInfo.name
   claimsBox.appendChild(nameDiv)
   
   const ageDiv = document.createElement("div")
   ageDiv.className = "claimItem"
   ageDiv.innerHTML = "<strong>Age:</strong> " + personInfo.age
   claimsBox.appendChild(ageDiv)
   
   const ssnDiv = document.createElement("div")
   ssnDiv.className = "claimItem"
   ssnDiv.innerHTML = "<strong>SSN:</strong> " + personInfo.ssn
   claimsBox.appendChild(ssnDiv)
   
   const addressDiv = document.createElement("div")
   addressDiv.className = "claimItem"
   addressDiv.innerHTML = "<strong>Address:</strong> " + personInfo.address.city + ", " + personInfo.address.zip
   claimsBox.appendChild(addressDiv)
}


function startGame(){
   musicer.play()
   console.log("Game Started")
   beginner.hidden = true
   currentPersonIndex = 0
   correctCount = 0
   mistakesCount = 0
   
   document.getElementById("correctCounter").innerHTML = "Correct: 0"
   document.getElementById("mistakesCounter").innerHTML = "Mistakes: 0"
   
   loadNextPerson()
}


function loadNextPerson(){
   if (currentPersonIndex >= totalRounds) {
       endGame()
       return
   }
   

   // select by indexing
   currentPerson = people[currentPersonIndex]
   
   // 50/50 chance of real or fake info
   isRealInfo = Math.random() < 0.5
   

   if (isRealInfo) {
       currentInfo = currentPerson
       dialoguer.innerHTML = "Person " + (currentPersonIndex + 1) + " of " + totalRounds + ": " + currentPerson.name + " arrives at the window with valid documents..."
   } else {
       currentInfo = new FakePerson(currentPerson)
       dialoguer.innerHTML = "Person " + (currentPersonIndex + 1) + " of " + totalRounds + ": A person claiming to be " + currentInfo.name + " arrives at the window..."
   }
   
   // ui
   document.querySelector(".gameContainer").style.display = "block"

   // real info
   displayRealInfo(currentPerson)
   
   // display claim/documents
   createClaimsDisplay(currentInfo)
   
   // start timer
   startTimer()
}


function endGame() {
   document.querySelector(".gameContainer").style.display = "none"
   dialoguer.innerHTML = "<strong>GAME OVER!</strong><br><br>Final Results:<br>Correct Decisions: " + correctCount + "<br>Mistakes: " + mistakesCount + "<br>Accuracy: " + Math.round((correctCount / totalRounds) * 100) + "%"
   

   const acceptBtn = document.getElementById("AcceptGame")
   const rejectBtn = document.getElementById("RejectGame")
   if (acceptBtn) acceptBtn.style.display = "none"
   if (rejectBtn) rejectBtn.style.display = "none"
}


function makeDecision(shouldAccept) {
   stopTimer()
   
   // is user correct decision
   let isCorrectDecision = false
   

   if (shouldAccept) {
       // player accpeted but is it real info
       if (currentInfo.name === currentPerson.name &&
           currentInfo.age === currentPerson.age &&
           currentInfo.ssn === currentPerson.ssn &&
           currentInfo.address.city === currentPerson.address.city &&
           currentInfo.address.zip === currentPerson.address.zip){
           isCorrectDecision = true
           dialoguer.innerHTML = currentPerson.name + " has been accepted. Their information was valid."
       } else {
           isCorrectDecision = false
           dialoguer.innerHTML = "ALERT: " + currentPerson.name + " was accepted but had false information!"
       }
   } else {
       // player rejected but is it real info
       if (currentInfo.name !== currentPerson.name ||
           currentInfo.age !== currentPerson.age ||
           currentInfo.ssn !== currentPerson.ssn ||
           currentInfo.address.city !== currentPerson.address.city ||
           currentInfo.address.zip !== currentPerson.address.zip){
           isCorrectDecision = true
           dialoguer.innerHTML = "Correct! " + currentInfo.name + " had false documents and was denied entry."
       } else {
           isCorrectDecision = false
           dialoguer.innerHTML = "ERROR: You denied " + currentPerson.name + " but their documents were authentic!"
       }
   }
   
   // update the correct/mistake count
   if (isCorrectDecision) {
       correctCount++
   } else {
       mistakesCount++
   }
   

   document.getElementById("correctCounter").innerHTML = "Correct: " + correctCount
   document.getElementById("mistakesCounter").innerHTML = "Mistakes: " + mistakesCount
   
   // disable button
   document.getElementById("AcceptGame").disabled = true
   document.getElementById("RejectGame").disabled = true
   
   setTimeout(() => {
   // 3 second intermeison
   currentPersonIndex++
       loadNextPerson()
       console.log("next person loaded!" + currentPersonIndex)
       document.getElementById("AcceptGame").disabled = false
       document.getElementById("RejectGame").disabled = false
   }, 3000)
}

