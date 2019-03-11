
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializacronometro();
    $("#botao-reiniciar").click(function(){
        reiniciaJogo();
    });
    inicializaMarcadores();
})


function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(/\S+/).length -1;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}


function inicializaContadores() {
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
}


function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input",function(){
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length);
        // if (digitado == comparavel){
        //     campo.addClass("borda-verde");
        //     campo.removeClass("borda-vermelha");
        // }else{
        //     campo.addClass("borda-vermelha");
        //     campo.removeClass("borda-verde");
        // }
        
        if (frase.startsWith(digitado)){
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }else{
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }

    })
}

function inicializacronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one('focus',function(){
        var cronometroId = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante == 0){
                clearInterval(cronometroId);
                campo.attr("disabled",true);
                campo.toggleClass("campo-desativado");
                salvaPlacar();
            }
        },1000);
    });
}

function reiniciaJogo() {
    $("#tempo-digitacao").text(tempoInicial);
    $("#contador-palavra").text("0");
    $("#contador-caracter").text("0");
    campo.attr("disabled",false);
    campo.val("");
    campo.toggleClass("campo-desativado");
    inicializacronometro();
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}

function salvaPlacar(){
    var tabPlacar = $('#placar').find('tbody');
    var numPalavras = $("#contador-palavra").text();
    var nome = "Thalyson";
    var linha = novaLinha(nome,numPalavras);

    linha.find(".botao-remover").click(removeLinha);

    tabPlacar.prepend(linha);    
}


function novaLinha(usuario,palavras) {    
    var linha = $("<tr>");
    var colNome = $("<td>").text(usuario);
    var colNumPalavras = $("<td>").text(palavras);
    var colRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete").attr("id","teste");

    link.append(icone);
    colRemover.append(link);

    linha.append(colNome);
    linha.append(colNumPalavras);
    linha.append(colRemover);

    return linha
}


function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}

