export interface productoInterface{
  id?:string
  nombre?:string
  imagen?:string
  descripcion?:string
  precio?:number
  cantidad?:number
  disponibilidad?:boolean
  oferta?:boolean
}
export interface CartItem {
  product: productoInterface;
  quantity: number;
}
