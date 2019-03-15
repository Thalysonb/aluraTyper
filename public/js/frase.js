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