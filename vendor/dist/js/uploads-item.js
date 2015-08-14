

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
function showDiv(idOfDiv) {

   document.getElementById(idOfDiv).style.display = 'block';
}
function hideDiv(idOfDiv) {
   document.getElementById(idOfDiv).style.display = 'none';
}