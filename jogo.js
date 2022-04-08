const sprites = new Image();
sprites.src = 'sprite.png';

let frames = 0;

const som_HIT = new Audio();
som_HIT.src = 'Hit.mp3';

const canvas = document.getElementById('game-canvas')
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
        flappyBird.velocidade = - flappyBird.pulo
    },
    velocidade: 0,
    gravidade: 0.20,
    movimentos: [
        { spriteX: 0, spriteY: 0, },
        { spriteX: 0, spriteY: 26, },
        { spriteX: 0, spriteY: 52, },
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
        const intervaloDeFrames = 10;
        const passouOIntervalo = frames % intervaloDeFrames === 0;

        if(passouOIntervalo) {
            const baseDoIncremento = 1;
            const incremento = baseDoIncremento + flappyBird.frameAtual;
            const baseRepeticao = flappyBird.movimentos.length;
            flappyBird.frameAtual = incremento % baseRepeticao;

        }
    },
    desenha(){
        flappyBird.atualizaOFrameAtual();
        const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
    contexto.drawImage(
    sprites,
    spriteX, spriteY,
    flappyBird.largura, flappyBird.altura,
    flappyBird.x, flappyBird.y,
    flappyBird.largura, flappyBird.altura,
    

);

    },
    atualiza(){
        
        if (colisao(flappyBird,chao)){
            mudaParaTela(Telas.inicio);
            flappyBird.y = 50
            flappyBird.velocidade = 0
            

        }


        flappyBird.y += this.velocidade += this.gravidade
        
    },
    
}
const getReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: 75,
    y: 100,
    desenha(){
    contexto.drawImage(
    sprites,
    getReady.spriteX, getReady.spriteY,
    getReady.largura, getReady.altura,
    getReady.x, getReady.y,
    getReady.largura, getReady.altura,

);
    }
}

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza(){
        const movimentoDoChao = 1;
        const repeteEm = chao.largura / 2;
        const movimentacao = chao.x - movimentoDoChao;
        chao.x = movimentacao % repeteEm
    },
    desenha(){
    contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,

);
    contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x + chao.largura, chao.y,
        chao.largura, chao.altura,
);

    }

}
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
    contexto.fillStyle = '#70c5ce',
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,

);
    contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x + planoDeFundo.largura, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,

);

    }
}

    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            

            canos.pares.forEach(function(par){
            const yRandom = par.y;
            const espacamentoEntreCanos = 110
            const canoCeuX = par.x;
            const canoCeuY = yRandom;
                contexto.drawImage(
            sprites,
            canos.ceu.spriteX, canos.ceu.spriteY,
            canos.largura, canos.altura,
            canoCeuX, canoCeuY,
            canos.largura, canos.altura
            )

            const canoChaoX = par.x;
            const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura
            )

            par.canoCeu = {
                x: canoCeuX,
                y: canos.altura + canoCeuY,
            }
            par.canoChao = {
                x: canoChaoX,
                y: canoChaoY
            }

            })
        
        },
        temColisaoComOFlappyBird(par) {

            const cabecaDoFlappy = flappyBird.y;
            const peDoFlappy = flappyBird.y + flappyBird.altura;

            if(flappyBird.x >= par.x){
            
            console.log('true')
            
            if(cabecaDoFlappy <= par.canoCeu.y){

                return true;

            }

            if(peDoFlappy >= par.canoChao.y){

                return true;

            }

            };
            return false;
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 ===0;
            if(passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                   
                });
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappyBird(par)){
                    console.log('perdeu')
                    mudaParaTela(Telas.inicio)
                    canos.pares.shift();
                    som_HIT.play();

                };

                if(par.x + canos.largura <= 0) {
                    canos.pares.shift();
                };

            });

        }

    }
    

let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela
};


const Telas = {
    inicio: {
        desenha(){
            planoDeFundo.desenha(); 
            chao.desenha();
            flappyBird.desenha();
            getReady.desenha();
            

        
        },
        click(){
            mudaParaTela(Telas.jogo)
        },

    },
    jogo: {
        desenha(){
            
            planoDeFundo.desenha();
            canos.desenha();
            flappyBird.atualiza();    
            canos.atualiza();            
            chao.desenha();
            flappyBird.desenha();           
            chao.atualiza();

        },
        click(){
            flappyBird.pula();
            
        },

        


    }
    
};
function loop() {

    telaAtiva.desenha();

    frames = frames + 1;

    requestAnimationFrame(loop);
}




function colisao(flappyBirdY, chaoY ){
    flappyBirdY = flappyBird.y + flappyBird.altura
    chaoY = chao.y
    if(flappyBirdY >= chaoY){
        som_HIT.play();
        return true
       
    } else{
        return false
   
    }
};


window.addEventListener('click', function() {
    if(telaAtiva.click) {
    telaAtiva.click();
    }
});
mudaParaTela(Telas.inicio);
loop();