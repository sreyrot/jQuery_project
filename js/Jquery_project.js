$(document).ready(function () {
    $('#recipe').on('change', function () {
        var fruit = $('#recipe').val();
    // console.log(fruit);
        choose(fruit);
    });
});
function choose(data) {
    switch (parseInt(data)) {
        case 1:
        avokado();
            break;
        
         case 2:
         frence();
             break;
   
    }
}
    function avokado(){
        var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
        $.ajax({
            dataType: 'json',
            url: url,
            success: function(data){
                var result = "";
                data.recipes.forEach(el =>{
                   if(el.id == 0){

                    result += `
                        <div class="card-body">
                            ${el.name}
                            <img src= "${el.iconUrl}" width="100px">
                        </div>
                    `;
                
                }
                })
                $('#card').html(result);
                var ingredient = "";
                data.recipes.forEach(ing =>{
                    ing.ingredients.forEach(item =>{
                       if(ing.id == 0){
                        ingredient += `
                        <tr>
                        <td><img src="${item.iconUrl}" width="50px"></td>
                         <td>${item.name}</td>
                         <td>${item.quantity}</td>
                         <td>${item.unit[0]}</td>
                        </tr>
                     `;
                       }
                    })
                    $('#table').html(ingredient);
                })
              
            }
        })
    }

    // frence crip

    function frence(){
        var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
        $.ajax({
            dataType: 'json',
            url: url,
            success: function(creps){
                var results = "";
                creps.recipes.forEach(crep =>{
                   if(crep.id == 1){
                    results += `
                        <div class="card-body">
                            ${crep.name}
                            <img src= "${crep.iconUrl}" width="100px">
                        </div>
                    `;
                
                }
                })
                $('#card').append(results);

                var gredient = "";
                var instruction ="";
                creps.recipes.forEach(element =>{
                    element.ingredients.forEach(items =>{
                       if(element.id == 1){
                          
                        gredient += `
                        <tr>
                        <td><img src="${items.iconUrl}" width="50px"></td>
                         <td>${items.name}</td>
                         <td>${items.quantity}</td>
                         <td>${items.unit[0].toLowerCase()}</td>
                        </tr>
                     `;
                     instruction +=`
                        <div class="card-body">
                            ${items.instructions}
                        </div>
                     `;
                       }
                    })
                    $('#ingredient').html("Ingredient");
                    $('#instruction').html("Instruction");
                    $('#table').append(gredient);
                    $('#ins').html(instruction);
                })
              
            }
        })
    }