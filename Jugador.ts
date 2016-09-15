module BuscaMinas{
	export class Jugador{

		private nombre:string;//Nombre del jugador
		private estado:boolean;//False = perdida, True= siigue jugando
		private racha:number; // cantidad de veces que no ha perdido el jugador
		private vidas:number; // vidas del jugador antes de perder sus puntos
		private tiempoJuego:number; // un cronómetro con el tiempo de juego
		private puntaje:number; // puntaje del jugador


		public setNombre(_nombre:string){
			this.nombre=_nombre;
		}

		public setEstado(_estado:boolean){
			this.estado=_estado;
		}
		
		public setRacha(_racha:number){
			this.racha=_racha;
		}

		public setVidas(_vidas:number){
			this.vidas=_vidas;
		}
		
		public setTiempoDeJuego(_tiempo:number){
			this.tiempoJuego=_tiempo;
		}

		public setPuntaje(_puntaje:number){
			this.puntaje=_puntaje;
		}
		
		public getNombre():string{
			return this.nombre;
		}		

		public getEstado():boolean{
			return this.estado;
		}

		public getRacha():number{
			return this.racha;
		}

		public getVidas():number{
			return this.vidas;
		}

		public GetTiempoJuego(){
			return this.tiempoJuego;
		}

		public getPuntaje():number{
			return this.puntaje;
		}

	}
}