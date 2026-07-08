import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';

import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);

  productos: Producto[] = [];
  categorias: Categoria[] = [];

  mostrarFormulario = false;
  modoEdicion = false;

  nuevoProducto: Producto = {
    id: 0,
    nombre: '',
    codigo: '',
    precio: 0,
    stock: 0,
    categoriaId: 0
  };

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => console.error(err)
    });
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => console.error(err)
    });
  }

  guardarProducto(): void {

    if (this.modoEdicion) {

      this.productoService.actualizarProducto(
        this.nuevoProducto.id,
        this.nuevoProducto
      ).subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Producto actualizado correctamente',
            timer: 1800,
            showConfirmButton: false
          });

          this.cancelar();
          this.cargarProductos();

        },

        error: err => console.error(err)

      });

      return;

    }

    this.productoService.crearProducto(this.nuevoProducto).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Producto creado correctamente',
          timer: 1800,
          showConfirmButton: false
        });

        this.cancelar();
        this.cargarProductos();

      },

      error: err => console.error(err)

    });

  }

  editarProducto(producto: Producto): void {

    this.mostrarFormulario = true;

    this.modoEdicion = true;

    this.nuevoProducto = {
      id: producto.id,
      nombre: producto.nombre,
      codigo: producto.codigo,
      precio: producto.precio,
      stock: producto.stock,
      categoriaId: producto.categoriaId
    };

  }

  eliminarProducto(id: number): void {

    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {

      if (result.isConfirmed) {

        this.productoService.eliminarProducto(id).subscribe({

          next: () => {

            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Producto eliminado correctamente',
              timer: 1800,
              showConfirmButton: false
            });

            this.cargarProductos();

          },

          error: err => console.error(err)

        });

      }

    });

  }

  cancelar(): void {

    this.mostrarFormulario = false;

    this.modoEdicion = false;

    this.nuevoProducto = {
      id: 0,
      nombre: '',
      codigo: '',
      precio: 0,
      stock: 0,
      categoriaId: 0
    };

  }

}