module BuscaMinas{
    export class Juego{
        private ancho:number;
        private alto:number;
        private cantidadMinas:number;
        private tiempoJuego:number;        
        private interval:number;
        private matriz: Array<Array<number>>;
        private botones: any;

        constructor(_tiempoInicial:number,_ancho:number, _alto:number, _cantidadMinas:number){
            this.ancho=_ancho;
            this.alto=_alto;
            this.tiempoJuego=_tiempoInicial;
            this.cantidadMinas=_cantidadMinas;

            this.iniciarCronometro();
            this.dibujarTablero("panelJuego");
            this.generarMinas();
            this.botones = document.getElementsByName('btn');
            this.iniciarJuego();        

        }
        public iniciarCronometro() {            
            this.interval = setInterval(() => {
              this.tiempoJuego++;

              document.getElementById('tiempo').innerHTML = this.tiempoJuego.toString() + " segundos";  
            }, 1000);
        }

         public dibujarTablero(elementId: string) {
            var div = document.getElementById(elementId);
            div.innerHTML = '';
            for (var fila: number = 0; fila < this.alto; fila++) {
                for (var columna: number = 0; columna < this.ancho; columna++) {
                    div.innerHTML += '<input type="button" name="btn" id="' + fila + '_' + columna + '" style="background-color:#9E9E9E; font-weight: bold;  font-size: 14px;  width:50px; height:50px" value=" "/>';                    
                }
                div.innerHTML += '<br/>';
            } 
        }

        private numAleatorio(minimo: number, maximo: number) {
            return Math.floor(Math.random() * (maximo - minimo + 1));
        }

        private iniciarMatriz() {                
            this.matriz = new Array(this.alto);// Las columnas son arrays
            for (let fila: number = 0; fila < this.matriz.length; fila++) {
                this.matriz[fila] = new Array(this.ancho);// Las filas son arrays
                for (let columna: number = 0; columna < this.ancho; columna++) {
                    this.matriz[fila][columna] = 0;
                }
            }
            return this.matriz;
        }       


        
        
        public iniciarJuego():void{
            for (let contador:number = 0; contador < this.botones.length; contador++) {
                document.getElementById(this.botones[contador].id).onclick=(evento:any)=>{                    
                    let idBotonPresionado=evento.target.id.split("_");
                    let valorMatriz:number=this.matriz[idBotonPresionado[0]][idBotonPresionado[1]];

                    if(valorMatriz==-1){                        
                        alert("Has perdido el juego");
                        location.href = location.href;
                    }else{
                        this.expandir(parseInt(idBotonPresionado[0]),parseInt(idBotonPresionado[1]),this.matriz);
                    }

                    if(this.comprobarGanador(this.ancho,this.alto,this.cantidadMinas)){
                        alert("Felicidades, has ganado el juego");
                        location.href = location.href;
                    }
                }
            }
        }

        private comprobarGanador(ancho:number,alto:number,minas:number):boolean{
            let botonesDisponibles:number=0;
            let boton:any;

            for (let fila:number = 0; fila < alto; fila++) {
                for (let columna:number = 0; columna < ancho; columna++) {
                    boton=document.getElementById( fila+ "_" + columna);
                    
                    if(!boton.disabled){
                        botonesDisponibles++;
                    }               
                }                
                
            }
            console.log("Botones disponibles " + botonesDisponibles);
            if(botonesDisponibles==minas){
                return true;
            }else{
                return false;
            }            
        }

        private expandir(fila: number, columna: number, matrix: any):boolean {
            
            var btn: any;
            btn = document.getElementById(fila + '_' + columna);
            var value = matrix[fila][columna];            
            
             if (btn.disabled) {                
                return false;
            }

            if (value!=0) {
                btn.value = value;
                btn.style.background = "#EEEEEE";
                btn.disabled = 'true';  
                return false;                            
            }

            if (value==0) {              
                btn.value = ' ';
                btn.disabled = 'true';
                btn.style.background = "#EEEEEE";
            }
            
            var limitesSeleccion = [[fila - 1, columna], [fila + 1, columna], [fila, columna - 1], [fila, columna + 1], [fila - 1, columna - 1], [fila + 1, columna - 1], [fila - 1, columna + 1], [fila + 1, columna + 1]];
            for (var i: number = 0; i < limitesSeleccion.length; i++) {
                try {                                                               
                    if (matrix[limitesSeleccion[i][0]][limitesSeleccion[i][1]] != '-1') {                       
                        this.expandir(limitesSeleccion[i][0], limitesSeleccion[i][1], matrix);
                    }
                } catch (e) { }
            }
        }   

        private generarMinas():void{
            let nuevaMatriz:number[][]=this.iniciarMatriz();
            let contadorDeMinas: number=0;
            let minasCerca:number;            
            let minaAleatoria:number;
            let posicionAleatoria:number[];    

            while(contadorDeMinas <this.cantidadMinas){                                                        
                minaAleatoria=this.numAleatorio(0,1);                    
                posicionAleatoria=[this.numAleatorio(0,this.alto-1),this.numAleatorio(0,this.ancho-1)];                                                            
                if(nuevaMatriz[posicionAleatoria[0]][posicionAleatoria[1]]!=-1){                                   
                    if(minaAleatoria!=0){
                        contadorDeMinas++;                                                  
                        let div = document.getElementById(posicionAleatoria[0]+"_"+posicionAleatoria[1]);
                        div.style.background="red";
                        nuevaMatriz[posicionAleatoria[0]][posicionAleatoria[1]]=-1;                        
                        
                         for (let fila:number=posicionAleatoria[0]-1; fila <=posicionAleatoria[0]+1; fila++) {                             
                            for (let columna:number = posicionAleatoria[1]-1; columna <=posicionAleatoria[1]+1; columna++) {                               
                                try{                                                                                                           
                                       minasCerca=nuevaMatriz[fila][columna];                                       
                                       if(nuevaMatriz[fila][columna] != -1){                                       
                                       minasCerca++;                                                                          
                                       nuevaMatriz[fila][columna]=minasCerca;                                                                     
                                    } 

                                }catch(e){}                                
                            }
                        }

                    }
                    
                }               
            }
            this.matriz=nuevaMatriz;
        }          
    }
}

window.onload = () => {
    var juego = new BuscaMinas.Juego(0,6, 6,10);
};
