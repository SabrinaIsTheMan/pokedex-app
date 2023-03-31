const app = {};

app.pokeID = 77; // 1 to 1010

app.randomNum = Math.floor(Math.random() * 1010 + 1); // The maximum and  minimum are inclusive;

app.pokeURL = `https://pokeapi.co/api/v2/pokemon/${app.randomNum}`;

app.getPokemon = () => {
   fetch(app.pokeURL)
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

app.init = () => {
   app.randomNum;
   app.getPokemon();
   app.pokeName = document.getElementById('name');
   app.pokeHeight = document.getElementById('height');
   app.pokeWeight = document.getElementById('weight');
   app.pokeType = document.getElementById('type'); //array
   app.pokeSprite = document.getElementById('sprite'); //png
}

app.init();
