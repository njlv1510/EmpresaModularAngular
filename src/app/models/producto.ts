export interface Producto {

  id: number;

  nombre: string;

  codigo: string;

  precio: number;

  stock: number;

  categoriaId: number;

  categoria?: {
    id: number;
    nombre: string;
    descripcion: string;
  };

}