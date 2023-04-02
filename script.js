const app = {};

app.pokeID = '77';

app.getPokemon = () => {
   fetch(`https://pokeapi.co/api/v2/pokemon/${app.pokeID}`)
      .then((response) => {
         if (response.ok) {
            console.log(response);
            return response.json();
         } else {
            throw new Error(response.statusText);
         }
      })
      .then((jsonResult) => {
         app.pokeName.innerText = jsonResult.name;
         app.pokeHeight.innerText = `${Math.floor(jsonResult.height * 10)} cm`; //decimeter to cm;
         app.pokeWeight.innerText = `${Math.floor(jsonResult.weight * 0.1)} kg`; // hectogram to kg;
         app.pokeSprite.attributes.src.textContent = jsonResult.sprites.front_default;
         app.pokeSprite.attributes.alt.textContent = jsonResult.name;
         // store array of types (1 or 2)
         app.typeArray = jsonResult.types;
         // if there are 2 types, print both
         if (app.typeArray.length === 2) {
            app.pokeType.innerText = `${app.typeArray[0].type.name} ${app.typeArray[1].type.name}`;
            // if it's just one, print it
         } else if (app.typeArray.length === 1) {
            app.pokeType.innerText = `${app.typeArray[0].type.name}`;
         }
      })
      .catch((error) => {
         alert("Something went wrong, try again later");
      })
   };

// method - if button Right is pressed, add 1 from app.pokeID and fetch again;
app.clickNext = () => {
   app.pokeID++;
   app.pokeIndex.textContent = app.pokeID;
   if (app.pokeID === 1010) {
      app.pokeID = 1;
   }
   app.getPokemon();
};

// method - if button Left is pressed, subtract 1 from app.pokeID and fetch again;
app.clickPrevious = () => {
   app.pokeID--;
   app.pokeIndex.textContent = app.pokeID;
   if (app.pokeID === 1) {
      app.pokeID = 1010;
   }
   app.getPokemon();
};

// method - if button A or B is pressed, randomize app.pokeID and fetch again;
app.clickRandom = () => {
   app.pokeID = (Math.floor(Math.random() * 1010 + 1)); //1 to 1010;  maximum and  minimum are inclusive
   app.pokeIndex.textContent = app.pokeID;
   app.getPokemon();
};

app.clickPlayMusic = () => {
   // document.getElementById("player").play();
   // audio = new Audio('./assets/10 Battle! (Trainer Battle).mp3');
   app.audio.play();
   app.audio.volume = 0.3;
};

app.clickStopMusic = () => {
   // document.getElementById("player").play();
   app.audio.pause();
};

app.init = () => {
   app.pokeName = document.getElementById('name');
   app.pokeHeight = document.getElementById('height');
   app.pokeWeight = document.getElementById('weight');
   app.pokeType = document.getElementById('type'); // array
   app.pokeSprite = document.getElementById('sprite'); // png

   app.btnRight = document.getElementById('btnRight'); // next
   app.btnLeft = document.getElementById('btnLeft'); // previous
   app.btnA = document.getElementById('btnA'); // A button
   app.btnB = document.getElementById('btnB'); // B button
   app.playBtn = document.getElementById('volUp'); // play music up btn
   app.stopBtn = document.getElementById('volDown'); // pause music down Btn
   app.pokeIndex = document.getElementById('pokemonIndex'); // pokemon index number (app.pokeid)

   app.btnRight.addEventListener('click', app.clickNext);
   app.btnLeft.addEventListener('click', app.clickPrevious);
   app.btnA.addEventListener('click', app.clickRandom);
   app.btnB.addEventListener('click', app.clickRandom);
   app.playBtn.addEventListener('click', app.clickPlayMusic);
   app.stopBtn.addEventListener('click', app.clickStopMusic);

   app.audio = new Audio('./assets/10 Battle! (Trainer Battle).mp3');
   app.getPokemon();
}

app.init();


