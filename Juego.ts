module BuscaMinas{
	export class Juego{
		private ancho:number;
		private alto:number;
		private cantidadMinas:number;
		private tiempoJuego:number;		
		private interval:number;
        private matriz: number[][];
        private buttons: any;

		constructor(_tiempoInicial:number,_ancho:number, _alto:number, _cantidadMinas:number){
			this.ancho=_ancho;
			this.alto=_alto;
			this.tiempoJuego=_tiempoInicial;
            this.cantidadMinas=_cantidadMinas;


			this.iniciarCronometro();
			this.dibujarTablero("panelJuego");
            this.generarMinas();


            this.buttons = document.getElementsByName('btn');
            this.initializeGame();                       
		}

		 public iniciarCronometro() {
            var self = this;
            this.interval = setInterval(() => {
              self.tiempoJuego++;
              document.getElementById('tiempo').innerHTML = self.tiempoJuego.toString();  
            }, 1000);
        }

         public dibujarTablero(elementId: string) {
            var div = document.getElementById(elementId);
            div.innerHTML = '';
            for (var i: number = 0; i < this.alto; i++) {
                for (var j: number = 0; j < this.ancho; j++) {
                    div.innerHTML += '<input type="button" name="btn" id="' + i + '_' + j + '" style="background-color:#9E9E9E; font-weight: bold;  font-size: 16px;  width:50px; height:50px" value=" "/>';                    
                }
                div.innerHTML += '<br/>';
            } 
        }

        private numAleatorio(minimo: number, maximo: number) {
            return Math.floor(Math.random() * (maximo - minimo + 1));
        }

        private iniciarMatriz() {
            let matriz: number[][];//se usaba var
            matriz = new Array(this.alto);// Las columnas son arrays

            for (let i: number = 0; i < this.alto; i++) {
                matriz[i] = new Array(this.ancho);// Las filas son arrays

                for (let j: number = 0; j < this.ancho; j++) {
                    matriz[i][j] = 0;
                }
            }
            return matriz;
        }

        public generarMinas() {
            let _matriz: number[][] = this.iniciarMatriz();
            var minesCounter: number = 0;
            var minasAdyacentes: number;

            while (minesCounter < this.cantidadMinas) {                
                var minaAleatoria: number = this.numAleatorio(0, 1);        //Establece la variable en 0 ó 1           
                //Saca un vector con 2 valores, uno la fila ubicado en posición 0, y la columna en posicion 1                
                var posicionAleatoria: number[] = [this.numAleatorio(0, this.alto - 1), this.numAleatorio(0, this.ancho - 1)];                
                
                //console.log("Matriz " +_matriz[posicionAleatoria[0]][posicionAleatoria[1]])
                if (!_matriz[posicionAleatoria[0]][posicionAleatoria[1]]) {//Siempre entra al if                                      
                    minesCounter += (minaAleatoria) ? 1 : 0;    //Si la variable minaAleatoria es 1, suma 1 sino 0                    
                    if (minaAleatoria) {//si es true O SEA 1, ENTRA                                                
                        //console.log("Fila: " +posicionAleatoria[0]+ " Columna:" +  posicionAleatoria[1] );
                         var div = document.getElementById(posicionAleatoria[0] + '_' + posicionAleatoria[1]);
                         div.style.background = "red";
                        _matriz[posicionAleatoria[0]][posicionAleatoria[1]] = -1;

                        //console.log("-1 en  " + posicionAleatoria[0] + " y " +  posicionAleatoria[1]);
                        for (var fila: number = posicionAleatoria[0] - 1; fila <= posicionAleatoria[0] + 1; fila++) {                                                        
                            for (var columna: number = posicionAleatoria[1] -1 ; columna <= posicionAleatoria[1]+1; columna++) {
                                try {
                                    minasAdyacentes = _matriz[fila][columna];

                                    if (_matriz[fila][columna] != -1 ) {
                                        minasAdyacentes += 1;                                        
                                        _matriz[fila][columna] = minasAdyacentes;
                                    }                                    
                                } catch (e) {                                    
                                }//TypeError probablemente 
                            }
                        }
                        
                    }
                }
            }
            this.matriz = _matriz;
        } 

        
        private expand(fila: number, columna: number, matrix: any) {
           var btn: any;
            btn = document.getElementById(fila + '_' + columna);
            var value = matrix[fila][columna];            

            if (btn.disabled) {
                return false;
            }

            if (value != '*') {
                btn.value = value;
                btn.style.background = "#EEEEEE";
                btn.disabled = 'true';               
                return false;
            }
        } 



        private initializeGame() {            
            for (var i: number = 0; i < this.buttons.length; i++) {
                document.getElementById(this.buttons[i].id).onclick = (evento: any) => {                    
                    var idBotonPresionado = evento.target.id.split('_');// Obtiene el id del evento que lo dispara
                                                                        //Eliminando el _                                        
                    var value = this.matriz[parseInt(idBotonPresionado[0])][parseInt(idBotonPresionado[1])];

                    if (this.matriz[parseInt(idBotonPresionado[0])][parseInt(idBotonPresionado[1])] == -1) {
                        evento.target.value = '*';
                        alert('Has perdido!');
                        location.href = location.href;
                    } else {                        
                        this.expand(parseInt(idBotonPresionado[0]), parseInt(idBotonPresionado[1]), this.matriz);
                    }

                    /*if (this.comprobarGanador(this.ancho, this.alto, this.cantidadMinas)) {
                        alert('You win!');
                        location.href = location.href;
                    }*/
                }
            }
        }

	}


}

window.onload = () => {
    var juego = new BuscaMinas.Juego(0,3, 7,4);
};