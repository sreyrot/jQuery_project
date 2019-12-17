

// Start to user jquery
$(document).ready(() => {
    requestApi();

    $("#text").hide();
    $('#line').hide();
    $("#button").hide();

    $("#recipe").on("change", () => {

        $("#text").show();
        $('#line').show();
        $("#button").show();

        var recipeId = $("#recipe").val();
        selectRecipe(recipeId);
    });
    // calculate
    $('#add').on('click', function(){
        var input = $('#value').val();
        userInput(input);
        
    })
    $('#low').on('click', function(){
        var input = $('#value').val();
        lowInput(input);
    })

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
      
        <option value ="${element.id}">${element.name}</option>
    `;
    });
    $("#recipe").append(option);
}

// get quanlity
var quan = [];
var oldGuest = 0;

// select recipi
function selectRecipe(getID) {
    allData.recipes.forEach(item => {

        if (item.id == getID) {
            eachRecipe(item.name, item.iconUrl);
            inGredient(item.ingredients);
            getInstruction(item.instructions);
            // getNumberGest(item.nbGuests);
            getNumberGest(item.nbGuests);
            getQuantiy = item;
            oldGuest = item.nbGuests;
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
    var icons = "";
    icons += `
    <img src="${iconUrl}" width="200px">
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
            <td id="put">${item.quantity}</td>
            <td>${item.unit[0]}</td>
            <td>${item.name}</td>
            
        </tr>
    `;
    
    });
    $("#ing").html("Ingredient");
    $("#ingredient").html(result);
}

// introduction
function getInstruction(int) {
    var instruction = "";
    var splitInstruction = int.split("<step>");
    for (let i = 1; i < splitInstruction.length; i++) {
        instruction += `
           
            <h5 class="text-primary">Step: ${i}</h5>
            <p>${splitInstruction[i]}</p>
        `;
    }
    $("#ins").html("Instruction");
    $("#introduction").html(instruction);
}


// get number of gurest
function getNumberGest(nbGuests){
    
    var cal = "";
    cal +=`
    <input type="text" id="value" value="${nbGuests}" class="form-control text-center" disabled>
    `;
    $('#input').html(cal);

}

// calculate
function userInput(values){
    var getValue = parseInt(values) + 1;
    if(getValue <= 15){
       $('#value').val(getValue);    
       mal($("#value").val());
    }
}

function lowInput(values){
    var lowValue = parseInt(values) - 1;
    if(lowValue >= 1 ){

    $('#value').val(lowValue);
    mal($("#value").val());
    }  
}
 function mal(output){
    var quan;
    var newQuan;
    var result = "";
    getQuantiy.ingredients.forEach(el => {
    
        quan = el.quantity/oldGuest;
        newQuan = quan*output;
        result += `
      
        <tr>
       
        <td><img src="${el.iconUrl}" style="width:50px"></td>
        <td id='quantity'>${newQuan}</td>
        <td>${el.unit[0]}</td>
        <td>${el.name}</td>
        </tr>
    `;
    $("#ingredient").html(result);
    })
    
 }

 