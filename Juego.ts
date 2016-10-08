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
            this.interval = setInterval(() => {
              this.tiempoJuego++;
              document.getElementById('tiempo').innerHTML = this.tiempoJuego.toString();  
            }, 1000);
        }

         public dibujarTablero(elementId: string) {
            var div = document.getElementById(elementId);
            div.innerHTML = '';
            for (var fila: number = 0; fila < this.alto; fila++) {
                for (var columna: number = 0; columna < this.ancho; columna++) {
                    div.innerHTML += '<input type="button" name="btn" id="' + fila + '_' + columna + '" style="background-color:#9E9E9E; font-weight: bold;  font-size: 16px;  width:50px; height:50px" value=" "/>';                    
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

            for (let fila: number = 0; fila < this.alto; fila++) {
                matriz[fila] = new Array(this.ancho);// Las filas son arrays

                for (let columna: number = 0; columna < this.ancho; columna++) {
                    matriz[fila][columna] = 0;
                }
            }
            return matriz;
        }
        //DE AQUÍ HACIA ARRIBA SE PUEDE PASAR EL CÓDIGO PERFECTAMENTE



        public generarMinas():void {
            let _matriz: number[][] = this.iniciarMatriz();
            var minesCounter: number = 0;
            var minasAdyacentes: number;

            while (minesCounter < this.cantidadMinas) {                
                var minaAleatoria: number = this.numAleatorio(0, 1);        //Establece la variable en 0 ó 1           
                //Saca un vector con 2 valores, uno la fila ubicado en posición 0, y la columna en posicion 1                
                var posicionAleatoria: number[] = [this.numAleatorio(0, this.alto - 1), this.numAleatorio(0, this.ancho - 1)];                
                                

                if (!_matriz[posicionAleatoria[0]][posicionAleatoria[1]]) {//Siempre entra al if                                      
                    minesCounter += (minaAleatoria) ? 1 : 0;    //Si la variable minaAleatoria es 1, suma 1 sino 0                    
                    if (minaAleatoria) {//si es true O SEA 1, ENTRA                                                
                         var div = document.getElementById(posicionAleatoria[0] + '_' + posicionAleatoria[1]);
                         div.style.background = "red";
                        _matriz[posicionAleatoria[0]][posicionAleatoria[1]] = -1;
                       
                        for (var fila: number = posicionAleatoria[0] - 1; fila <= posicionAleatoria[0] + 1; fila++) {                                                        
                            for (var columna: number = posicionAleatoria[1] -1 ; columna <= posicionAleatoria[1]+1; columna++) {
                                try {
                                    minasAdyacentes = _matriz[fila][columna];

                                    if (_matriz[fila][columna] != -1 ) {
                                        minasAdyacentes += 1;                                        
                                        _matriz[fila][columna] = minasAdyacentes;
                                    }                                    
                                } catch (e) {                                    
                                }
                            }
                        }
                        
                    }
                }
            }
            this.matriz = _matriz;
        } 

        
        private expandir(fila: number, columna: number, matrix: any):boolean {
            
            var btn: any;
            btn = document.getElementById(fila + '_' + columna);
            var value = matrix[fila][columna];            
            
             if (btn.disabled) {                
                return false;
            }

            if (value!=0) {// si hay más de 0 minas  al boton                
                btn.value = value;
                btn.style.background = "#EEEEEE";
                btn.disabled = 'true';  
                return false;                            
            }

            if (value==false) { //Si no hay minas               
                btn.value = ' ';
                btn.disabled = 'true';
                btn.style.background = "#EEEEEE";
            }
            
            var limitesSeleccion = [[fila - 1, columna], [fila + 1, columna], [fila, columna - 1], [fila, columna + 1], [fila - 1, columna - 1], [fila + 1, columna - 1], [fila - 1, columna + 1], [fila + 1, columna + 1]];
            for (var i: number = 0; i < limitesSeleccion.length; i++) {
                try {                                                               
                    if (matrix[limitesSeleccion[i][0]][limitesSeleccion[i][1]] != '*') {                       
                        this.expandir(limitesSeleccion[i][0], limitesSeleccion[i][1], matrix);
                    }
                } catch (e) { }
            }
        } 

    public comprobarGanador(width: number, height: number, minesNumber: number):boolean {
            var botonesDisponibles = 0;
            var btn: any;

            for (var fila = 0; fila < height; fila++) {

                for (var columna = 0; columna < width; columna++) {
                    btn = document.getElementById(fila + '_' + columna);

                    if (!btn.disabled) {
                        botonesDisponibles++;
                    }
                }
            }
            return botonesDisponibles == minesNumber;
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
                        this.expandir(parseInt(idBotonPresionado[0]), parseInt(idBotonPresionado[1]), this.matriz);
                    }

                    if (this.comprobarGanador(this.ancho, this.alto, this.cantidadMinas)==true) {
                        alert('Felicidades, Has ganado el juego');
                        location.href = location.href;
                    }
                }
            }
        }

	}
}

window.onload = () => {
    var juego = new BuscaMinas.Juego(0,6, 6,5);
};
