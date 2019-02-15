$(document).on('focusout', 'input', procuraValoresVazios);

function procuraValoresVazios(){
	var algumVazioAutor = false;
	var algumVazioCurador = false;
	for (var i = 0; i < totalForms; i++){
		if (!$( '#nome' + i ).val() || !$( '#base' + i ).val() || !$( '#season' + i ).val() || !$( '#valor' + i ).val()){
			algumVazioAutor = true;
			$( '#nome' + i ).closest('div.krosmasters').css('border','dashed red');
			//$( '.nome' + i ).css('border','dashed red');
			$( '#msgsAutor' ).html('<li>Campo em branco tracejado!</li>').show();
			
		} else {
			$( '#nome' + i ).closest('div.krosmasters').css('border','');
			if(!$( '#autor' ).val() || !$( '#curador' ).val()){
				algumVazioCurador = true;
				$( '#autor' ).closest('div').css('border','dashed red');
				$( '#msgsCurador' ).html('<li>Campo em branco tracejado!</li>').show();
			} else {
				$( '#autor').closest('div').css('border','');
			}
		}
	}
	if(!algumVazioAutor){		
		$( '#msgsAutor' ).html('').hide();
	}
	if(!algumVazioCurador){		
		$( '#msgsCurador' ).html('').hide();
	}
	$( "#btn-formDownloadAutor" ).prop('disabled', algumVazioAutor)
	$( "#btn-formDownloadCurador" ).prop('disabled', algumVazioCurador)
}

$('.fa-arrow-circle-up').click(function ( e ){
	e.preventDefault();
	$(this).scrollTop();
});