interface Partida{
    PlayerA: string;
    PlayerB: string;
    Turn: string;
    Movements: string[];
    HuboGanador: boolean;
    Ganador: string;
    Jugadas : number;
}

export default Partida;