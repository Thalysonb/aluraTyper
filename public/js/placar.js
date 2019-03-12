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