
let kittens = [];

function addKitten(event) {
  event.preventDefault()

  let form = event.target
  let kittenName = form.name.value
  let kittenId = generateId()
  let kitten = kittens.find(kitten => kitten.name == kittenName)

  if (kitten) {
    alert("This kitten is already in existence!")
  }
  else {
    kitten = {
      id: kittenId,
      // @ts-ignore
      image: "https://robohash.org/" + kittenName + "?set=set4",
      name: kittenName,
      mood: "tolerant",
      affection: 5
    }
    kittens.push(kitten)
    saveKittens()
  }

  form.reset()
  drawKittens()

}


function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}


function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
  drawKittens()
}

function clearKittens() {
  if (kittens = []) {
    document.getElementById("clear-kittens").classList.add("hidden");
  }
  window.localStorage.clear()
}
/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensElement = document.getElementById("kittens")
  let kittenTemplate = ""

  kittens.forEach(kitten => {
    if (kitten.mood == "ran away") {
      kittenTemplate += `
      <div id="goneKitten" class="d-flex space-around kitten gone litter-box m-2">
        <img src= "${kitten.image}" class="kitten gone m-1" alt="kitten image" height="125">
        <div>
          <h1><span>${kitten.name}</span></h1>
       </div> 
      </div>`
    }
    //use this kitten mood when testing
    else if (kitten.mood == "tolerant") {

      kittenTemplate += `
      <div id="tolerantKitten" class="d-flex space-around kitten tolerant litter-box m-2">
        <img src= "${kitten.image}" class="kitten tolerant m-1" alt="kitten image" height="125">
        <div>
          <h1><span>${kitten.name}</span></h1>
          <p>Mood: <span>${kitten.mood}</span></p>
          <p>Affection: <span>${kitten.affection}</span></p>
          <button onclick="pet('${kitten.id}')">Pet</button>
          <button onclick="catnip('${kitten.id}')">CatNip</button>
       </div>
      </div>`
    }
    else if (kitten.mood == "purring") {
      kittenTemplate += `
      <div id="purringKitten" class="d-flex space-around kitten purring litter-box m-2">
        <img src= "${kitten.image}" class="kitten purring m-1" alt="kitten image" height="125">
        <div>
          <h1><span>${kitten.name}</span></h1>
          <p>Mood: <span>${kitten.mood}</span></p>
          <p>Affection: <span>${kitten.affection}</span></p>
          <button onclick="pet('${kitten.id}')">Pet</button>
          <button onclick="catnip('${kitten.id}')">CatNip</button>
       </div> 
      </div>`
    }
    else {
      kittenTemplate += `
      <div id="hissyKitten" class="d-flex space-around kitten hissy litter-box m-2">
        <img src= "${kitten.image}" class="kitten hissy m-1" alt="kitten image" height="125">
        <div>
          <h1><span>${kitten.name}</span></h1>
          <p>Mood: <span>${kitten.mood}</span></p>
          <p>Affection: <span>${kitten.affection}</span></p>
          <button onclick="pet('${kitten.id}')">Pet</button>
          <button onclick="catnip('${kitten.id}')">CatNip</button>
       </div> 
      </div>`
    }
  })

  kittensElement.innerHTML = kittenTemplate
}


function findKittenById(id) {
  return kittens.find(k => k.id == id);
}


function pet(id) {

  let currentKitten = findKittenById(id)
  let randomNum = Math.random()


  if (randomNum > .7) {
    currentKitten.affection++
  } else {
    currentKitten.affection--
  }

  currentKitten.mood = setKittenMood(currentKitten)

  saveKittens()
  drawKittens()
}


function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.affection = 6
  currentKitten.mood = "purring"

  saveKittens()
  drawKittens()
}


function setKittenMood(currentKitten) {
  if (currentKitten.affection == 0) {
    currentKitten.mood = "ran away"
  } else if (currentKitten.affection <= 3) {
    currentKitten.mood = "hissy"
  } else if (currentKitten.affection >= 6) {
    currentKitten.mood = "purring"
  } else {
    currentKitten.mood = "tolerant"
  }
  return currentKitten.mood
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("addKittenBar").classList.remove("hidden");
  loadKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
