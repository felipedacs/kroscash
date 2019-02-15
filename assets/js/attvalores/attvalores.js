var totalForms = 0;

var krosmasters = {}
$( document ).ready(function ( ){
	$.getJSON("../assets/data/listaUpdates.json")
	.done(function(dataupdate){
		$.getJSON("../assets/data/" + JSON.stringify(dataupdate[0].id) + ".json")
		.done(function(krosmasters){
			$( ".div-inputs" ).append("<div class='krosmasters'><div class='div-nome'><small>Nome</small></div><div class='div-base'><small>Base</small></div><div class='div-season'><small>Season</small></div><div class='div-valor'><small>R$</small></div><div class='div-del'></div></div>");
			$.each(krosmasters, function (i, krosmaster) {
				totalForms = addCampos(totalForms, krosmaster, 'white');
			});
		})
		.always(function(){
			$("#loading").toggle();
		})
		.fail(function(){
			alert('Não foi possível encontrar o banco de dados!')
		});
	})
	.always(function(){
		$("#loading").toggle();
	})
	.fail(function(){
		alert('Não foi possível encontrar o banco de dados!')
	});

});

$(document).on('click', '.btn-formDel', function ( e ) {
	e.preventDefault();
	$(this).parents("div.krosmasters").css("color","white");
	$(this).val('delUser');
	$(this).html("<span class='icon-thumbs-up'></span>");
	$(this).parents("div.krosmasters").children( ".div-nome" ).children( ".input-nome" ).css('background-color','rgb(202, 60, 60)');
	$(this).parents("div.krosmasters").children( ".div-base" ).children( ".input-base" ).css('background-color','rgb(202, 60, 60)');
	$(this).parents("div.krosmasters").children( ".div-season" ).children( ".input-season" ).css('background-color','rgb(202, 60, 60)');
	$(this).parents("div.krosmasters").children( ".div-valor" ).children( ".input-valor" ).css('background-color','rgb(202, 60, 60)');
	$(this).parents("div.krosmasters").children( ".div-del" ).children( ".pure-button" ).removeClass('button-error');
	$(this).parents("div.krosmasters").children( ".div-del" ).children( ".pure-button" ).addClass('button-success btn-formReup');

});

$(document).on('click', '.btn-formReup', function ( e ) {
	e.preventDefault();
	$(this).val('');
	$(this).html("<span class='icon-thumbs-down'></span>");
	$(this).parents("div.krosmasters").children( ".div-nome" ).children( ".input-nome" ).css( 'background-color','rgb(28, 184, 65)' );
	$(this).parents("div.krosmasters").children( ".div-base" ).children( ".input-base" ).css('background-color','rgb(28, 184, 65)');
	$(this).parents("div.krosmasters").children( ".div-season" ).children( ".input-season" ).css('background-color','rgb(28, 184, 65)');
	$(this).parents("div.krosmasters").children( ".div-valor" ).children( ".input-valor" ).css('background-color','rgb(28, 184, 65)');
	$(this).parents("div.krosmasters").children( ".div-del" ).children( ".pure-button" ).addClass('button-error');
	$(this).parents("div.krosmasters").children( ".div-del" ).children( ".pure-button" ).removeClass('button-success btn-formReup');
});

$(document).on('click', '.btn-formAdd', function ( e ) {
	e.preventDefault();
	var templateJson = {"nome":"","base":"","season":"","valor":""};
	totalForms = addCampos(totalForms, templateJson, '#43CD80');
	procuraValoresVazios();
});


$("#btn-formDownloadAutor").click( function( e ){
	e.preventDefault();
	var krosmastersObj  = geraJSONKrosmasters(totalForms);
	$.getJSON("../assets/data/listaUpdates.json")
	.done(function(listaObj){
		geraDownload(krosmastersObj, listaObj[0]['id']+1, "downloadKrosmasters");
	})
	.always(function(){
		$("#loading").toggle();
	})
	.fail(function(){
		alert('Não foi possível encontrar o banco de dados!')
	});
})

$("#btn-formDownloadCurador").click( function( e ){
	e.preventDefault();

	var krosmastersObj  = geraJSONKrosmasters(totalForms);

	autor = $( '#autor' ).val();
	curador = $( '#curador' ).val();

	if( autor == '' || curador == '' ){
		return false;
	}

	var listaObj  = geraJSONLista(autor, curador);

	geraDownload(krosmastersObj, listaObj[0]['id'], "downloadKrosmasters");
	geraDownload(listaObj, 'listaUpdates', "downloadLista");
})

function geraDownload(obj, nomeArquivo, classe){
	var dataObj = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj,null, "\t"));
	var divdownloadBtn = ( '.' + classe );
	$( divdownloadBtn ).show();
	var downloadBtn = $('.btn-' + classe);

	downloadBtn.attr("href",dataObj);
	downloadBtn.attr("download", nomeArquivo + ".json");

	downloadBtn[0].click();
}

function geraJSONKrosmasters(totalForms){
	arrayJson = [];
	for (var i = 0; i < totalForms; i++) {
		if(!$( '#del' + i ).val()){
			var templateJson = {"nome":"","base":"","season":"","valor":""};
			templateJson['nome'] = $( '#nome' + i ).val();
			templateJson['base'] = $( '#base' + i ).val();
			templateJson['season'] = $( '#season' + i ).val();
			templateJson['valor'] = $( '#valor' + i ).val();
			arrayJson.push(templateJson);
		}
	}
	return arrayJson;
}

function geraJSONLista(autor, curador){
	var d = new Date();
	var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
	var mes = month[d.getMonth()];
	ano = d.getFullYear();
	var listaJson = {};
	var arrayJson = [];
	$.ajax({
		url: "data/listaUpdates.json",
		async: false,
		dataType: 'json',
		success: function(data) {
			arrayJson = data;
		}
	});
	listaJson['mes'] = mes;
	listaJson['ano'] = ano;
	listaJson['id'] = parseInt(arrayJson[0]['id']) + 1;
	listaJson['autor'] = autor;
	listaJson['curador'] = curador;
	arrayJson.unshift(listaJson);
	return arrayJson;
}
