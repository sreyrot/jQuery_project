

// Start to user jquery
$(document).ready(() => {
    requestApi();
    $('#line').hide();
    $("#button").hide();
    $("#recipe").on("change", () => {
        $('#line').show();
        $("#button").show();
        var recipeId = $("#recipe").val();
        selectRecipe(recipeId);
    });

   

});
// function to request api
var requestApi = () => {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getRecipe(data),
        error: () => console.log("error"),
    });
}
// fuction request url

function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

// fuction getRcipe
var allData = [];
function getRecipe(data) {
    allData = data;
    var option = "";
    data.recipes.forEach(element => {
      
        option += `
    <option value ="${element.id}">${ element.name}</option>
    `;
    });
    $("#recipe").append(option);
}



// select recipi
function selectRecipe(getID) {
    allData.recipes.forEach(item => {
      
        if (item.id == getID) {
            eachRecipe(item.name, item.iconUrl);
            inGredient(item.ingredients);
            getInstruction(item.instructions);
            // getNumberGest(item.nbGuests);
            getNumberGest(item.nbGuests);
        }
    });
}
// function each recipe

function eachRecipe(name, iconUrl) {
    // for name
    var names = "";
    names += `
            <h1>${name}</h1>
    `;
    $("#name").html(names);
    // for iconUrl
    var icons ="";
    icons += `
    <img src="${iconUrl}" width="150px">
    `;
    $('#icon').html(icons);
}

// ingredient
function inGredient(ing) {
    var result = "";
    ing.forEach(item => {
        
        result += `
        <tr>
            <td><img src="${item.iconUrl}" width="50px"></td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
            <td>${item.name}</td>
            

        </tr>
    `;
    });
    $("#ing").html("Ingredient");
    $("#ingredient").html(result);
}

// introduction
function getInstruction(int){
    var instruction = "";
    var splitInstruction = int.split("<step>");
    for(let i = 1; i < splitInstruction.length; i++){
        instruction += `
           
            <h5 class="text-primary">Step: ${i}</h5>
            <p>${splitInstruction[i]}</p>
        `;
    }
    $("#ins").html("Instruction");
    $("#introduction").html(instruction);
}

