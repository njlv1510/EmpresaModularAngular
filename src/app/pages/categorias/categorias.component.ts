import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {

  private categoriaService = inject(CategoriaService);

  categorias: Categoria[] = [];

  mostrarFormulario = false;

  modoEdicion = false;

  nuevaCategoria: Categoria = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => console.error(err)
    });
  }

  guardarCategoria(): void {

    if (this.modoEdicion) {

      this.categoriaService.actualizarCategoria(
        this.nuevaCategoria.id,
        this.nuevaCategoria
      ).subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Categoría actualizada correctamente',
            timer: 1800,
            showConfirmButton: false
          });

          this.cancelar();

          this.cargarCategorias();

        },

        error: err => console.error(err)

      });

      return;

    }

    this.categoriaService.crearCategoria(this.nuevaCategoria).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Categoría creada correctamente',
          timer: 1800,
          showConfirmButton: false
        });

        this.cancelar();

        this.cargarCategorias();

      },

      error: err => console.error(err)

    });

  }

  editarCategoria(categoria: Categoria): void {

    this.mostrarFormulario = true;

    this.modoEdicion = true;

    this.nuevaCategoria = {
      id: categoria.id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    };

  }

  eliminarCategoria(id: number): void {

    Swal.fire({
      title: '¿Eliminar categoría?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {

      if (result.isConfirmed) {

        this.categoriaService.eliminarCategoria(id).subscribe({

          next: () => {

            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Categoría eliminada correctamente',
              timer: 1800,
              showConfirmButton: false
            });

            this.cargarCategorias();

          },

          error: err => console.error(err)

        });

      }

    });

  }

  cancelar(): void {

    this.mostrarFormulario = false;

    this.modoEdicion = false;

    this.nuevaCategoria = {
      id: 0,
      nombre: '',
      descripcion: ''
    };

  }

}