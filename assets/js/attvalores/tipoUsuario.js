$(function() {
	$( "#ident" ).dialog({ 
		dialogClass: 'identModal',
		resizable: false,
		modal: true
	});
});

$("#tipoUsuario").change(function (event, ui){
	$( ".ui-dialog-content" ).dialog("close");
	if($( this ).val() == 'visitante'){
		$("#curadoria").remove();
	}
})