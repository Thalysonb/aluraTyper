$("#botao-placar").click(function(){
    mostraPlacar();
});

$("#botao-sync").click(sincronizaPlacar);

function salvaPlacar(){
    var tabPlacar = $('#placar').find('tbody');
    var numPalavras = $("#contador-palavra").text();
    var nome = $("#usuarios").val();
    var linha = novaLinha(nome,numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    tabPlacar.prepend(linha);
    $("#placar").slideDown(500);
    scrollPlacar();
}


function scrollPlacar() {
    var posicaoPlacar = $("#placar").offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar+"px"
    },1000)
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
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    },1000)
}

function mostraPlacar(){
    $("#placar").stop().slideToggle(600);
}

function sincronizaPlacar(params) {
    var placar = [];
    var linhas = $("tbody>tr"); //seleciona os tr´s presentes no corpo da tabela
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text(); //pega o valor do primeiro td com o seletor (td:nth-child()) avançado css.
        var palavras = $(this).find("td:nth-child(2)").text();  //pega o valor do segundo td com o seletor (td:nth-child()) avançado css.

        var score = {     //cria o objeto js com os dados encontrados
            usuario: usuario,
            pontos: palavras
        };
        placar.push(score); //adiciona o objeto recém criado, no vetor
    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar",dados,function(){
        $(".tooltip").tooltipster("open");

    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 

    }).always(function(){ 
        setTimeout(function() {
        $(".tooltip").tooltipster("close"); 
    }, 1200);

    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}