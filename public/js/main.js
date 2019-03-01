
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");

campo.on('input',function(){
    var valTexto = campo.val();

    var valTextoSemEspaco = valTexto.replace(/\s+/g,''); //remove os espaços da string

    var qtdCaracter = valTextoSemEspaco.length; //conta caracteres
    var qtdPalavras = valTexto.split(/\S+/).length - 1; //conta as palavras
   

    var contadorCaracter = $("#contador-caracter");
    contadorCaracter.text(qtdCaracter); //altera o valor do contador de caracter

    var contadorPalavra = $("#contador-palavra");
    contadorPalavra.text(qtdPalavras); //altera o valor do contador de palavras
});


var tempoRestante = $("#tempo-digitacao").text();
campo.one('focus',function(){
    var cronometroId = setInterval(function(){
        tempoRestante--;
        
        $("#tempo-digitacao").text(tempoRestante);

        if (tempoRestante == 0){
            clearInterval(cronometroId);

            campo.attr("disabled",true);
        }
        
    },1000);
});
