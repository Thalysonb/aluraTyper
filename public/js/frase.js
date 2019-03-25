$("#botao-frase-id").click(buscaFrase);
$("#botao-frase").click(function(){
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases",trocaFraseAleatoria)

    .fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").toggle();
        }, 1500)
    })
    .always(function(){
        $("#spinner").toggle();
    })
});
function trocaFraseAleatoria(data) {
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    $(".frase").text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    var parametro = {id:fraseId};
    $.get("http://localhost:3000/frases",parametro,trocaFrase)

    .fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").toggle();
        }, 1500)
    })
    .always(function(){
        $("#spinner").toggle();
    })
}
function trocaFrase(data) {
    $(".frase").text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}