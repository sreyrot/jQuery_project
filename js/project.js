$(document).ready(function(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $.ajax({    
        dataType: 'json',
        url: url,
        success: function(data ){
            var result = "";
            data.recipes.forEach(el =>{
               
              
                result += `
                    <div class="card">
                     <div class="card-header text-center">
                 ${el.name}
                       
                     </div>

                     <div class="card-body ">
                     <div class="row">
                     <div class="column" style="">
                       <h2>  ${el.name}</h2>

                      <p>Number of person</p>
                      <h3>${el.ingredients.name}</h3>
                     </div>
                     <div class="column " >
                       <img src="${el.iconUrl}" widht="40px" height="40px" >
                     </div>
                   </div>
                   
                    </div>
                   
                `;
            })  
            $('#result').append(result);
        }
      
    })
  
})