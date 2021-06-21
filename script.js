function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function getPicture(responseObject) {
    return responseObject.sprites.other["official-artwork"].front_default;//Una url
}

function getTypes(responseObject)   {
    let types = responseObject.types;
    let len = types.length;
    let typeHtml = '<div class="info"><table><caption>Types</caption><tr></tr>';
    let i;
    for(i = 0; i<len; i++){
        typeHtml = typeHtml + '<td>' + capitalizeFirstLetter(types[i].type.name) + '</td>';
    }
    typeHtml = typeHtml + '</tr></table></div>';
    return typeHtml;
}

function getAbilities(responseObject)   {
    let abilities = responseObject.abilities;
    let len = abilities.length;
    let abilitiesHtml = '<div class="info"><table><caption>Abilities</caption><tr></tr>';
    let i;
    let hidden;
    for(i = 0; i<len; i++){
        hidden = abilities[i].is_hidden;
        if(hidden) {
            abilitiesHtml = abilitiesHtml + '<td>' + capitalizeFirstLetter(abilities[i].ability.name) + '<br>(hidden)</td>';
        } else {
            abilitiesHtml = abilitiesHtml + '<td>' + capitalizeFirstLetter(abilities[i].ability.name) + '</td>';
        }
    }
    abilitiesHtml = abilitiesHtml + '</tr></table></div>';
    return abilitiesHtml;
}

function getStats(responseObject)   {
    let stats = responseObject.stats;
    let statsHtml = '<div class="info"><table><caption>Stats</caption><tr><th>' + capitalizeFirstLetter(stats[0].stat.name) + '</th><th>' + capitalizeFirstLetter(stats[1].stat.name) + '</th><th>' + capitalizeFirstLetter(stats[2].stat.name) + '</th><th>' + capitalizeFirstLetter(stats[3].stat.name) + '</th><th>' + capitalizeFirstLetter(stats[4].stat.name) + '</th><th>' + capitalizeFirstLetter(stats[5].stat.name) + '</th></tr>';
    statsHtml = statsHtml + '<tr><td>' + stats[0].base_stat + '</td><td>' + stats[1].base_stat + '</td><td>' + stats[2].base_stat + '</td><td>' + stats[3].base_stat + '</td><td>' + stats[4].base_stat + '</td><td>' + stats[5].base_stat + '</td></tr></table></div>';
    return statsHtml;
}

function createHtml(responseObject) {
    let html = '<div id="result-container">';
    html = html + '<img alt="Official artwork of the pokemon" height=500px width=500px src=' + getPicture(responseObject) + '>';
    html = html + '<p id="poke-name">' + capitalizeFirstLetter(responseObject.name) + '</p>';
    html = html + getTypes(responseObject);
    html = html + getAbilities(responseObject);
    html = html + getStats(responseObject);
    html = html + '</div>'
    return html;
}

function getData(pokemon)  {
    pokemon_name = pokemon.toLowerCase();
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemon_name, true);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = function() {
        if (xhr.status != 200) {
            document.getElementById("main-container").innerHTML = 
            '<p>An error ocurred: ' + xhr.status + '</p><br><p>Make sure to spell the name of the pokemon correctly</p>';
        } else { //Mostrar resultado
            let responseObject = xhr.response;
            document.getElementById("main-container").innerHTML = createHtml(responseObject);
        }
    }
    xhr.onerror = function() {
        alert("Request failed");
    }
}

function showResults() {
    var x = document.getElementById("pokemon-search-form");
    getData(x.elements[0].value); //Contiene el nombre del pokemon
}


