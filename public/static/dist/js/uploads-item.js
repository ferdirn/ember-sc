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

var categories = []; // Option Text|Option Value; 

//1st
categories['Beauty'] = ['Makeup|Makeup', 'Nails|Nails', 'Skincare|SkinCare', 'Tools|Tools', 'Bath & Body|BathBody', 'Fragrance|Fragrance'];
categories['Fashion'] = ['Jewelry|Jewelry', 'Bags|Bags', 'Eyeware|Eyeware', 'Lingerie|Lingerie', 'Other Accessories|OtherAccessories'];
categories['MomBaby'] = ['Diapers|Diapers', 'Toys|Toys', 'Bath & Babycare|BathBabycare', 'Formula & Food|FormulaFood', 'Baby Gear|BabyGear', 'Feeding & Nursing|FeedingNursing', 'Health & Safety|HealthSafety'];
categories['Living'] = ['Bathing|Bathing', 'Home Decor|HomeDecor', 'Bedding|Bedding', 'Stationary|Stationary', 'Dining & Kitchen|DiningKitchen'];
categories['Gadgets'] = ['Cameras|Cameras', 'Batteries & Power|BatteriesPower', 'Audio & Video|AudioVideo', 'Phone Gear|PhoneGear', 'Other Gadgets|Othergadgets'];
categories['Muslim'] = ['Muslim Dress|MuslimDress', 'Hijab|Hijab', 'Tops|Tops', 'Bottoms|Bottoms', 'Outwear|Outwear', 'Prayer|Prayer'];

//2nd
categories['Makeup'] = ['Face|Face', 'Eyes|Eyes', 'Lips|Lips'];
categories['Nails'] = ['Nail Polish|NailPolish', 'Nail Care|NailCare'];
categories['Skincare'] = ['Cleanser|Cleanser', 'Moisturizers|Moisturizers', 'Sunscreen|Sunscreen'];
categories['BathBody'] = ['Bath & Shower|BathShower', 'Lotion & Creams|LotionCreams', 'Hair Care|HairCare', 'Personal Pleasure|Personalpleasure'];
categories['Fragrance'] = ['Perfume|Perume', 'Eau de Toilette|Eau', 'Body Mist|BodyMist'];

categories['Jewelry'] = ['Necklaces|Necklaces', 'Earrings|Earrings', 'Bracelets|Bracelets'];
categories['Lingerie'] = ['Lingerie|Lingerie-2nd'];
categories['Bags'] = ['Handbag|Handbag', 'Messenger Bag|MessengerBag', 'Shoulder Bag|ShoulderBag', 'Wallet|Wallet', 'Clutch|Clutch', 'Pouch|Pouch', 'Backpack|Backpack'];
categories['Eyeware'] = ['Sunglasses|Sunglasses'];
categories['OtherAccessories'] = ['Watch|Watch', 'Scarf|Scarf', 'Others|Others'];

categories['Toys'] = ['Action Figure|ActionFigure', 'Mainan Edukasi|MainanEdukasi', 'Die Cast|DieCast', 'Baby Toys|BabyToys', 'Board Games & Cards|BoardGamesCards', 'Dolls|Dolls'];
categories['BabyGear'] = ['On the Go|OntheGo', 'Baby & Kids Gear|BabyKidsGear', 'Decor & Bedding|DecorBedding', 'Kids Party Wear|KidsPartyWear'];
categories['FeedingNursing'] = ['Bottle & Nipples|BottleNipples', 'Breast Feeding|BreastFeeding', 'Teether|Teether'];
categories['HealthSafety'] = ['Baby Health Care|BabyHealthCare', 'Moms & Personal Care|MomsPersonalCare'];
categories['Diapers'] = ['Diapers|Diapers', 'Baby Diapers|BabyDiapers'];
categories['FormulaFood'] = ['Formula|Formula', 'Baby Foor & Organic|BabyFoorOrganic'];
categories['Bath&Babycare'] = ['Lotion, Powder Oil|LotionPowderOil', 'Bath Equipment|BathEquipment', 'Baby Gift Set|BabyGiftSet'];

categories['DiningKitchen'] = ['Tableware|Tableware', 'Kitchen Ware|KitchenWare', 'Food Storage|FoodStorage', 'Home Appliance|HomeAppliance'];
categories['HomeDecor'] = ['Home Decoration|HomeDecoration', 'Storage & Organizer|StorageOrganizer', 'Home Fragrance|HomeFragrance'];
categories['Bedding'] = ['Bed Linens|BedLinens', 'Pillows|Pillows'];
categories['Stationary'] = ['Paper Product|PaperProduct', 'Other Stationary|OtherStationary'];
categories['Bathing'] = ['Bathing|Bathing-2nd'];


categories['DiningKitchen'] = ['Tableware|Tableware', 'Kitchen Ware|KitchenWare', 'Food Storage|FoodStorage', 'Home Appliance|HomeAppliance'];
categories['HomeDecor'] = ['Home Decoration|HomeDecoration', 'Storage & Organizer|StorageOrganizer', 'Home Fragrance|HomeFragrance'];
categories['Bedding'] = ['Bed Linens|BedLinens', 'Pillows|Pillows'];
categories['Stationary'] = ['Paper Product|PaperProduct', 'Other Stationary|OtherStationary'];

categories['Cameras'] = ['Polaroid|Polaroid'];
categories['BatteriesPower'] = ['Power Solution|PowerSolution', 'Portable Battery|PortableBattery'];
categories['AudioVideo'] = ['Speaker|Speaker', 'Earphone|Earphone', 'Headphones|Headphones'];
categories['PhoneGear'] = ['Phone Accessories|PhoneAccessories', 'Phone Casing|PhoneCasing', 'Tablet Casing|TabletCasing'];
categories['Othergadgets'] = ['Other Gadget Accessories|OtherGadgetAccessories', 'Wire, Cable, & USB|WireCableUSB'];

categories['MuslimDress'] = ['Gamis|Gamis', 'Kaftan|Kaftan', 'Suit Dress|SuitDress'];
categories['Hijab'] = ['Bergo|Bergo', 'Inner|Inner', 'Scarf|Scarf', 'Pashmina|Pashmina', 'Jilbab Instan|JilbabInstan'];
categories['Bottoms'] = ['Pants|Pants', 'Skirts|Skirts'];
categories['Outwear'] = ['Jackets|Jackets', 'Cardigan|Cardigan'];
categories['Tops'] = ['Blouse|Blouse', 'Tunic|Tunic'];
categories['Prayer'] = ['Mukena|Mukena'];



var dynList = ['subcat1', 'subcat2']; // the "names" of the dynamic lists, as they occur in the form;

function fillSelect(currCat, currList, step) {

	for (i = step; i < dynList.length; i++) {
		document.forms[0][dynList[i]].length = 1;
		document.forms[0][dynList[i]].selectedIndex = 0;
	}
	var nCategory = categories[currCat];
	for (each in nCategory) {
		var nOption = document.createElement('option');
		var nInfo = nCategory[each].split("|");
		nOption.setAttribute('value', nInfo[1]);
		nOption.appendChild(document.createTextNode(nInfo[0]));
		currList.appendChild(nOption);
	}
}


function addRowWholeSale() {
	var div = document.createElement('div');

	div.className = 'col-lg-12 col-sm-1 col-xs-12 nopadding texting-mid-form bottom-spacer';

	div.innerHTML = '<div class="col-lg-5 col-sm-10 col-xs-10 col-md-10 nopadding right-spacer bottom-spacer">\
	<input type="number" min="1" name="name" placeholder="price in rupiah" value="" class="form-control"/>\
	</div>\
	<div class="col-lg-5 col-sm-10 col-xs-6 col-md-10 nopadding right-spacer bottom-spacer">\
	<input type="number" min="1" name="name" value="" placeholder="minimum buying items" class="form-control"/>\
	</div>\
	<input class="texting-mid-form" type="button" value="-" onclick="removeRowWhole(this)">';

	document.getElementById('contentwhole').appendChild(div);
}

function removeRowWhole(input) {
	document.getElementById('contentwhole').removeChild(input.parentNode);
}

function addRowTimedSale() {
	var div = document.createElement('div');

	div.className = 'col-lg-12 col-sm-1 col-xs-12 nopadding texting-mid-form bottom-spacer';

	div.innerHTML = '<div class="col-lg-8 col-sm-10 col-xs-10 col-md-10 nopadding right-spacer bottom-spacer">\
	<input type="number" placeholder="price in rupiah" min="1" name="name" value="" class="form-control"/>\
	</div>\
	<div class="clearfix">\
	</div>\
	<div class="col-sm-12 nopadding bottom-spacer">\
	<input type="date" class="text-center">\
	to\
	<input type="date" class="text-center">\
	<input class="texting-mid-form" type="button" value="-" onclick="removeRowTimed(this)">\
	</div>';

	document.getElementById('contenttimed').appendChild(div);
}

function removeRowTimed(input) {
	document.getElementById('contenttimed').removeChild(input.parentNode);
}