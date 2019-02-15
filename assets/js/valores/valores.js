var selectRecente;
var arraySeasons = [];
$(function() {
	$("#loading").toggle();
	$.getJSON("../assets/data/listaUpdates.json")
	.done(function(lista){
		$.each(lista, function (i, data) {
			$( '#listaUpdates' ).append($('<option>', {
				value: data['id'],
				text : data['mes'] + ", Att: " + data['id']
			}));
		});
		$( '#listaUpdates' ).val(lista[0]['id']);
		$('table').tablesorter({widgets: ['zebra','columns'],sortReset:true});
		atualizaKrosmaster(parseInt(lista[0]['id']));
	})
	.always(function(){
		$("#loading").toggle();
	})
	.fail(function(){
		alert('Não foi possível encontrar o banco de dados!');
	});
	inicializaChecks();
});



$( "#listaUpdates" ).change(function ( e ){
	inicializaChecks();
	atualizaKrosmaster($(this).val());
});



function atualizaKrosmaster(dataSelect){
	$( '#tbodyKrosmasters' ).html('');
	$("#loading").toggle();
	$.getJSON("../assets/data/" + dataSelect +".json")
	.done(function(krosmastersAtuais){
		$.each(krosmastersAtuais, function (i, krosmasterAtual) {
			if(arraySeasons.indexOf(krosmasterAtual['season'])>-1){
				adcionaNaTable(krosmasterAtual, pricing());
			}
		});
		$("table").trigger("update");
	})
	.always(function(){
		$("#loading").toggle();
	})
	.fail(function(){
		alert('Não foi possível encontrar o banco de dados!')
	});
}

$(".ckseason").change(function(e){
	atualizaArraySeason();
	atualizaKrosmaster($("#listaUpdates").val());
});

function atualizaArraySeason(){
	arraySeasons = [];
	for (var i = 1; i <= 6; i++) {
		if($('#ckseason'+i).is(':checked')){
			arraySeasons.push($('#ckseason'+i).val());
		}
	}
}

function pricing(dataSelect){
	if(dataSelect>1){
		$.getJSON("../assets/data/" + (dataSelect-1) +".json")
		.done(function(krosmastersAnteriores){
			$.each(krosmastersAnteriores, function (i, krosmasterAnterior) {
				if (krosmasterAnterior['nome'] == krosmasterAtual['nome'] && krosmasterAnterior['base'] == krosmasterAtual['base']){
					krosmasterAnterior['valor'] = parseInt(krosmasterAnterior['valor']);
					krosmasterAtual['valor'] = parseInt(krosmasterAtual['valor']);
					if (krosmasterAnterior['valor'] < krosmasterAtual['valor']){
						return 'text-success'
					} else if (krosmasterAnterior['valor'] > krosmasterAtual['valor']){
						return 'text-danger'
					} else {
						return 'text-warning';
					}
				}
			});
		})
	} else {
		return 'text-warning';
	}
}
function adcionaNaTable(krosmasterAtual, cssValor){
	$( '#tbodyKrosmasters' )
	.append($('<tr>')
		.append($('<td style="height:70px">')
			.append('<img src="assets/img/miniaturas/' + krosmasterAtual['nome'] + '.svg" height="70px">'))
		.append($('<td>')
			.append(krosmasterAtual['nome'] + "<br><span class='legenda-season'>" + krosmasterAtual['season'] + "ª Season"))
		.append($('<td>')
			.append(krosmasterAtual['base']))
		.append($('<td>')
			.append(krosmasterAtual['valor'] + ",00"))).addClass(cssValor);
}

//<svg class="svg_svg1"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://pampakros.github.io/assets/img/miniaturas.svg#Atcham"></use></svg>

function inicializaChecks(){
	$("#ckseason1").prop('checked',true);
	$("#ckseason2").prop('checked',true);
	$("#ckseason3").prop('checked',true);
	$("#ckseason4").prop('checked',true);
	$("#ckseason5").prop('checked',true);
	$("#ckseason6").prop('checked',true);

	atualizaArraySeason();
}
