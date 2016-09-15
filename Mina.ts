module BuscaMinas{
	export class Mina{
		private estadoMina:boolean;
		private imagen:ImageData;

		public getEstado():boolean{
			return this.estadoMina;
		}

		public getImagen():ImageData{
			return this.imagen;
		}
	}
}