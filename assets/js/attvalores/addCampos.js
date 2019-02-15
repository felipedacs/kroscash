function criaSelectBase(krosmaster, valor, arrayaceito){
	var string = "";
	$.each(arrayaceito, function (i, atributoi) {
		if(atributoi == valor){
			string += "<option selected value='"+atributoi+"'>"+atributoi+"</option>";
		} else {
			string += "<option value='"+atributoi+"'>"+atributoi+"</option>";
		}
	});
	return string;
}

function addCampos(totalForms, krosmaster, cor){

	var basesAceitas = ['preta', 'dourada'];

	var stringBase = criaSelectBase(krosmaster, krosmaster['base'], basesAceitas)

	var seasonsAceitas = [1, 2, 3, 4, 5];
	var stringSeason = criaSelectBase(krosmaster, parseInt(krosmaster['season']), seasonsAceitas)
	
	$( ".div-inputs" ).append(""+
		"<div class='krosmasters'>"+
		"<div class='div-nome'>"+
		"<input type='text' id='nome" + totalForms + "' class='input-nome' value='" + krosmaster['nome'] + "' style='background-color:" + cor + "'>"+
		"</div>"+
		"<div class='div-base'>"+
		"<select id='base" + totalForms + "' class='input-base' style='background-color:" + cor + "'>"+
		stringBase+
		"</select>"+
		"</div>"+
		"<div class='div-season'>"+

		"<select id='season" + totalForms + "' class='input-season' style='background-color:" + cor + "'>"+
		stringSeason+
		"</select>"+
		
		"</div>"+
		"<div class='div-valor'>"+
		"<input type='number' id='valor" + totalForms + "' class='input-valor' value='" + krosmaster['valor'] + "' style='background-color:" + cor + "'>"+
		"</div>"+
		"<div class='div-del'>"+
		"<button type='button' id='del" + totalForms + "' class='button-error pure-button btn-formDel'>"+
		"<span class='icon-thumbs-down'></span>"+
		"</button>"+
		"</div>"+
		"</div>");
	totalForms++;
	return totalForms
}