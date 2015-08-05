

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#product-image')
				.attr('src', e.target.result)
				.width(120)
				.height(120);
		};

		reader.readAsDataURL(input.files[0]);
	}
}



function addRowWholeSale() {
	var div = document.createElement('div');

	div.className = 'form-inline mtop10 mbtm5';

	div.innerHTML = '<div class="form-group nopadding right-spacer bottom-spacer">\
  <input type="number" placeholder="price in rupiah" min="1" name="name" value="" class="form-control" />\
  </div>\
  <div class="form-group nopadding right-spacer bottom-spacer">\
  <input type="number" placeholder="minimum buying items" min="1" name="name" value="" class="form-control" />\
  </div>\
  <div class="form-group nopadding right-spacer bottom-spacer">\
  <input class="form-control btn btn-sell btn-size-regular nomargin pull-left" type="button" value="-" type="button" value="-" onclick="removeRowWhole(this)">\
  </div>\
  ';

	document.getElementById('contentwhole').appendChild(div);
}

function removeRowWhole(input) {
  var parent = input.parentNode.parentNode;
	document.getElementById('contentwhole').removeChild(parent);
}

function addRowTimedSale() {
	var div = document.createElement('div');

	div.className = 'form-inline mtop10 mbtm5';

	div.innerHTML = '<div class="form-group">\
  <input type="date" class="text-center form-control">\
  <label >to</label>\
  <input type="date" class="text-center form-control">\
  <input class="btn btn-sell btn-size-regular nomargin form-control" type="button" value="-" onclick="removeRowTimed(this)">\
  </div>';

	document.getElementById('contenttimed').appendChild(div);
}

function removeRowTimed(input) {
    var parent = input.parentNode.parentNode;
  document.getElementById('contenttimed').removeChild(parent);
}

window.onload = function(){
  /*
    //Check File API support
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("filesx");
        filesInput.addEventListener("change", function(event){
            
            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            
            for(var i = 0; i< files.length; i++)
            {
                var file = files[i];
                
                //Only pics
                if(!file.type.match('image'))
                  continue;
                
                var picReader = new FileReader();
                
                picReader.addEventListener("load",function(event){
                    
                    var picFile = event.target;
                    
                    var div = document.createElement("span");
                      div.className = 'frame-thumbnail';
                    div.innerHTML = "<img class='thumbnail-upload' src='" + picFile.result + "'" + "title='" + picFile.name + "'/><input type='hidden' name='images' value='" + picFile.result +"'/>";
                    
                    output.insertBefore(div,null);  
                    document.getElementById('product-image').remove(this);          
                
                });
                
                 //Read the image
                picReader.readAsDataURL(file);
            }                               
           
        });
    }
    else
    {
        console.log("Your browser does not support File API");
    }
    */
}
    





