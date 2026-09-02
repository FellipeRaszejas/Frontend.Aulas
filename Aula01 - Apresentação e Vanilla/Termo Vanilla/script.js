const resposta = "TERMO";
const tabuleiro = document.getElementById("tabuleiro");

function jogar(){

    const input = document.getElementById("palavra");
    const tentativa = input.value.toUpperCase();

    if(tentativa.length !== 5){
        alert("Digite uma palavra com 5 letras.");
        return;
    }

    const linha = document.createElement("div");
    linha.className = "linha";

    for(let i=0;i<5;i++){

        const letra = document.createElement("div");
        letra.className = "letra";
        letra.textContent = tentativa[i];

        if(tentativa[i] === resposta[i]){
            letra.classList.add("verde");
        }else if(resposta.includes(tentativa[i])){
            letra.classList.add("amarelo");
        }else{
            letra.classList.add("cinza");
        }

        linha.appendChild(letra);
    }

    tabuleiro.appendChild(linha);

   if (tentativa === resposta) {

    const mensagem = document.getElementById("mensagem");

    mensagem.classList.remove("oculto");

    mensagem.animate([
        {opacity:0, transform:"translateY(20px)"},
        {opacity:1, transform:"translateY(0)"}
    ],{
        duration:500
    });

    input.disabled = true;
    document.querySelector("button").disabled = true;
}
}