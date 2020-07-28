import Partida from './partida';
class Juego{
    partida :Partida

    dibujarTablero(){
        let tablero : HTMLElement = document.querySelector("#tablero");
        tablero.innerHTML = "";
       for (let index = 0; index < 9; index++) {
           let casilla: HTMLElement = document.createElement('div');
           casilla.setAttribute("class", "casilla");
           casilla.setAttribute("data-position", index.toString());
        //    casilla.innerHTML="-";
           tablero.appendChild(casilla);
       }
    }

    mostrarMensajes(){
        let lblplayer1:HTMLDivElement = document.querySelector("#lblPlayer1");
        let lblplayer2:HTMLDivElement = document.querySelector("#lblPlayer2");
        let lblTurno:HTMLDivElement = document.querySelector("#lblTurno");
        let divMensajes:HTMLDivElement = document.querySelector("#mensajes");
        divMensajes.hidden = false;
        lblplayer1.innerText = `${this.partida.PlayerA} juega con: X`;
        lblplayer2.innerText = `${this.partida.PlayerB} juega con: O`;
        if(this.partida.HuboGanador == false && this.partida.Jugadas<9){
            lblTurno.innerText = `Turno de ${this.partida.Turn}`;
        // if(this.partida.Turn === this.partida.PlayerA){
        //     lblplayer1.classList.add("turnoActual");
        //     lblplayer2.classList.remove("turnoActual")
        // }else{
        //     lblplayer2.classList.add("turnoActual");
        //     lblplayer1.classList.remove("turnoActual")
        // }
        }else{
            if(this.partida.HuboGanador){
                lblTurno.innerText = `Ganador: ${this.partida.Turn}`;
            }else if(this.partida.Jugadas ){
                lblTurno.innerText = `Partida finalizada, no hubo ganador`;
            }
            
        }
        
    }

    setTurno(inicial:boolean = false, casilla:HTMLElement = null){
        if(inicial === true){
            if(Math.floor(Math.random()* 2)===1){
                this.partida.Turn = this.partida.PlayerB
          }else{
            this.partida.Turn = this.partida.PlayerA;
          }
        }else{
            if(this.partida.HuboGanador == false && casilla.classList.contains("casilla") && this.partida.Jugadas < 9){
                casilla.classList.remove('casilla');
                this.partida.Jugadas++;
                this.partida.Movements[Number(casilla.dataset.position)] = this.partida.Turn;
                this.validarGanador();
                
                if(this.partida.Turn === this.partida.PlayerA)
                {
                    casilla.classList.add('blue');
                    casilla.innerText ="X";
                }else{
                    casilla.classList.add('green');
                    casilla.innerText ="0";
                }

                if(this.partida.HuboGanador == false){
                    if(this.partida.Jugadas < 9 ){
                        if(this.partida.Turn === this.partida.PlayerA){
                            this.partida.Turn = this.partida.PlayerB;
                            }else{
                                this.partida.Turn = this.partida.PlayerA;
                            }
                    }else{
                       // alert(`Tablero finalizado no hubo ganador`);
                    }
                    
                }else{
                  //  alert(`Ganador jugador: ${this.partida.Turn}`);
                }
            }else{
            }
           

        }
        this.mostrarMensajes();
    }

    validarGanador(){
        if(this.partida.HuboGanador === false 
            && ((this.partida.Movements[0] === this.partida.Turn && this.partida.Movements[0]=== this.partida.Movements[1] && this.partida.Movements[1]=== this.partida.Movements[2])
            || (this.partida.Movements[3] === this.partida.Turn && this.partida.Movements[3]=== this.partida.Movements[4] && this.partida.Movements[4]=== this.partida.Movements[5])
            || (this.partida.Movements[6] === this.partida.Turn && this.partida.Movements[6]=== this.partida.Movements[7] && this.partida.Movements[6]=== this.partida.Movements[8])
            || (this.partida.Movements[0] === this.partida.Turn && this.partida.Movements[0]=== this.partida.Movements[4] && this.partida.Movements[0]=== this.partida.Movements[8])
            || (this.partida.Movements[0] === this.partida.Turn && this.partida.Movements[0]=== this.partida.Movements[3] && this.partida.Movements[0]=== this.partida.Movements[6])
            || (this.partida.Movements[1] === this.partida.Turn && this.partida.Movements[1]=== this.partida.Movements[4] && this.partida.Movements[1]=== this.partida.Movements[7])
            || (this.partida.Movements[2] === this.partida.Turn && this.partida.Movements[2]=== this.partida.Movements[5] && this.partida.Movements[2]=== this.partida.Movements[8])
            || (this.partida.Movements[2] === this.partida.Turn && this.partida.Movements[2]=== this.partida.Movements[4] && this.partida.Movements[2]=== this.partida.Movements[6]))){
                    this.partida.HuboGanador = true;
                    this.partida.Ganador = this.partida.Turn;
                }
    }

     reiniciarPartida(playerA: string, playerB: string){
        this.partida= {} as Partida;
        this.partida.HuboGanador = false;
        this.partida.Jugadas= 0;
        this.partida.Movements = new Array<string>(9);
        this.partida.Ganador = "";
        this.partida.PlayerA = playerA;
        this.partida.PlayerB = playerB;
        this.dibujarTablero();
        let casillas = document.querySelectorAll(".casilla");

            for (let index = 0; index < casillas.length; index++) {
                let that = this;
                (casillas[index] as HTMLElement).addEventListener("click", function(){
                    that.setTurno(false, this);
                });
            }
        this.setTurno(true);
            
    }
}

(function(){
let game = new Juego();
let btnIniciar:HTMLButtonElement  = document.querySelector("#btnIniciar");
btnIniciar.onclick = function(){
    let player1:HTMLInputElement = document.querySelector("#jugadorUno");
    player1.value = player1.value.trim();
    let player2:HTMLInputElement = document.querySelector("#jugadorDos");
    player2.value = player2.value.trim();
    if(player1.value !== "" && player2.value !== ""){
        game.reiniciarPartida(player1.value, player2.value);
        player1.hidden = true;
        player2.hidden = true;
        btnIniciar.hidden = true;
    }
};

})();