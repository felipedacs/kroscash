$(".jsonNovo").focusout(function( ){
	var jsonGuest = JSON.parse($(this).val());
	for (var i = 0; i < totalForms; i++){
		if($( '#del' + i ).val() != 'delUser'){
			$( '#nome' + i ).css('background-color','red');
			$( '#base' + i ).css('background-color','red');
			$( '#season' + i ).css('background-color','red');
			$( '#valor' + i ).css('background-color','red');
			$( '#del' + i ).parents("div.krosmasters").children( ".div-del" ).children( ".btn" ).removeClass('btn-danger');
			$( '#del' + i ).parents("div.krosmasters").children( ".div-del" ).children( ".btn" ).addClass('btn-success btn-formReup');
			$( '#del' + i ).html("<small><i class='far fa-thumbs-up'></i></small>");
			$( '#del' + i ).val('delForm');
		}
	}
	var encontrouKros = false;
	$(jsonGuest).each(function(k, krosmaster){
		encontrouKros = false;
		for (var i = 0; i < totalForms; i++) {
			//CASO ENCONTRE KROSMASTER
			if(krosmaster['nome'] == $( '#nome' + i ).val() && krosmaster['base'] == $( '#base' + i ).val() && $( '#del' + i ).val() != 'delUser'){
				$( '#nome' + i ).css('background-color','white');
				$( '#base' + i ).css('background-color','white');
				comparaForm(krosmaster,'season', i);
				comparaForm(krosmaster,'valor', i);
				encontrouKros = true;
				$( '#del' + i ).html("<small><i class='far fa-thumbs-down'></i></small>");
				$( '#del' + i ).parents("div.krosmasters").children( ".div-del" ).children( ".btn" ).addClass('btn-danger');
				$( '#del' + i ).parents("div.krosmasters").children( ".div-del" ).children( ".btn" ).removeClass('btn-success btn-formReup');
				$( '#del' + i ).val('');
			}
		}

		if(!encontrouKros){
			totalForms = addCampos(totalForms, krosmaster, '#43CD80');
		}
	});
	$(this).hide();
});

function comparaForm(krosmaster, atributo, i){
	if(krosmaster[atributo] != $( '#' + atributo + i ).val()){
		$( '#' + atributo + i ).css('background-color','#FFC125');
	} else {		
		$( '#' + atributo + i ).css('background-color','white');
	}
	$( '#' + atributo + i ).val(krosmaster[atributo]);
}