function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function getPicture(responseObject) {
    return responseObject.sprites.other["official-artwork"].front_default;//Una url
}

function getTypes2(responseObject)   {
    let types = responseObject.types;
    let len = types.length;
    let typeHtml = 
    '<table><tr><th>Types</th></tr><tr>';
    let i;
    for(i = 0; i<len; i++){
        typeHtml = typeHtml + '<td>' + types[i].type.name + '</td>';
    }
    typeHtml = typeHtml + '</tr></table>';
    return typeHtml;
}

function getTypes(responseObject)   {
    let types = responseObject.types;
    let len = types.length;
    let typeHtml = '<div id="types"><p>Tipos</p><table><tr></tr>';
    let i;
    for(i = 0; i<len; i++){
        typeHtml = typeHtml + '<td>' + types[i].type.name + '</td>';
    }
    typeHtml = typeHtml + '</tr></table></div>';
    return typeHtml;
}

function getAbilities(responseObject)   {
    return responseObject.abilities;//Array de abilidades, ability.name para obtener nombre y isHidden para ver si es oculta
}

function createHtml(responseObject) {
    let html = '<div id="result-container">';
    html = html + '<img height=500px width=500px src=' + getPicture(responseObject) + '>';
    html = html + '<p>' + capitalizeFirstLetter(responseObject.name) + '</p>';
    html = html + getTypes(responseObject);
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
            '<p>Se produjo un error: ' + xhr.status + '</p>';
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


