let gameover_cena = document.getElementById('gameover');
let game_button = document.getElementById('game_button');
const canvas = document.getElementById("cnv");
const ctx = canvas.getContext("2d");
let sapo_img = new Image();
let pedra_img = new Image();
let fundo = new Image();
let gravidade = 6;
let forca = 12;
let sangue_img = new Image();
let pontuacao;
const max_heigth = canvas.height - 350;
let end_check = false;
let Sangue = {
    height: 0,
    width: 0

}

let Sapo = {
    x: 130,
    y: canvas.height - 124,
    height: 70,
    width: 100
};
let Pedra = {
    x: canvas.width - 80,
    y: canvas.height - 130,
    width: 80,
    height: 80,
    velocidade: 3
};
let posicFundo = {
    x: 0,
    y: 0
};

function desenhar() { // inicio da função desenhar
    if (!end_check) { //quando nao tiver acabado
        gameover_cena.style.display = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        Sapo.y += gravidade;
        if (Sapo.y > canvas.height - 124) {
            Sapo.y = canvas.height - 124;
        }

        Pedra.x -= Pedra.velocidade;
        //desenhar com, os atributos(imagem,posicaoX,posicaoY,largura,altura)

        //fundo
        ctx.drawImage(fundo, posicFundo.x, posicFundo.y, canvas.width + 5, canvas.height);

        //sapo

        ctx.drawImage(sapo_img, Sapo.x, Sapo.y, Sapo.width, Sapo.height);
        //pedra
        ctx.drawImage(pedra_img, Pedra.x, Pedra.y, Pedra.width, Pedra.height);
        //sangue
        ctx.drawImage(sangue_img, 0, 0, Sangue.width, Sangue.height);
        //pontos
        ctx.font = "30px Courier";
        ctx.fillStyle = "red";
        ctx.fillText("Pnts: " + pontuacao, 30, 30);
        //fim do desenho

        ctx.closePath();



        colisao();
    }


} // fim da função desenhar

function start() { // inicio da função start
    if(window.innerWidth > 1024){
        addEventListener('mousedown', impulso)
    }else{
        addEventListener('click', impulso)
    }
   


    //imagens
    sapo_img.src = "./img/sapo.png";
    pedra_img.src = "./img/pedra.png";
    fundo.src = "./img/fundo.jpg";
    sangue_img.src = "./img/sangue.png";
    pontuacao = 0;

    setInterval("desenhar()", 10);

} // fim da função start
function impulso() {
    if (Sapo.y <= canvas.height - 124 && Sapo.y >= canvas.height - 134 && Pedra.x > 45 && end_check == false) {
        gravidade = gravidade - forca
    }


}
/************************************* */
function gameover() {
    console.log('fim');
    ctx.beginPath();
    ctx.drawImage(sangue_img, 0, 0, canvas.width, canvas.height)
    ctx.closePath();
    end_check = true;
    setTimeout(() => {
        gameover_cena.style.display = 'flex';
    }, 1000)



    game_button.onclick = () => {
        end_check = false
        Sangue.width = 0;
        Sangue.height = 0;
        gameover_cena.style.display = 'none';
        pontuacao = 0;
    }
}
///////////////////////////
function reiniciar(){
    Pedra = {
        x: canvas.width - 80,
        y: canvas.height - 130,
        width: 80,
        height: 80,
        velocidade: 3
    };
    Sapo = {
        x: 130,
        y: canvas.height - 124,
        height: 70,
        width: 100
    };
    gravidade = 6;
    forca = 12;
    pontuacao = 0;
}
////////////////////////////////
function colisao() {
    if (Pedra.x < -71) {
        Pedra.x = canvas.width + 80
        if (Pedra.velocidade < 12) {
            Pedra.velocidade += 0.2;
            gravidade += 0.2;
            forca = gravidade * 2;
        }


    }
    //pedra sapo
    if ((Sapo.x + 50 > Pedra.x - 40 && Sapo.x - 30 < Pedra.x + 30) && (Sapo.y < Pedra.y + 35 && Sapo.y > Pedra.y - 35)) {
        gameover();
        reiniciar();
        desenhar();
    }
    //chao e altura maxima
    if (Sapo.y <= max_heigth) {
        gravidade = gravidade + forca;
    }
} // fim da função colisao()

//pontos
setInterval(function () {
    pontuacao += 2;
    if (pontuacao == 1000) {
        alert('Parabéns, o Sapo foi salvo!');
    }
}, 200)
