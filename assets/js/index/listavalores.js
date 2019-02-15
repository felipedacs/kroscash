$(function() {
	$(".fullscreenDivLoad").toggle();
	$.getJSON("/assets/data/listaUpdates.json")
	.done(function(lista){
		$.each(lista, function (i, data) {
			$( '#tbodyKrosmasters' )
			.append($('<tr>')
				.append($('<td class="align-middle">')
					.append(data['id']))
				.append($('<td class="align-middle">')
					.append(data['mes']))
				.append($('<td class="align-middle">')
					.append(data['ano']))
				.append($('<td class="align-middle">')
					.append(data['autor']))
				.append($('<td class="align-middle">')
					.append(data['curador']))
				);
		});
	})
	.always(function(){
		$(".fullscreenDivLoad").toggle();
	})
	.fail(function(){
		alert('Não foi possível encontrar o banco de dados!')
	});
});
