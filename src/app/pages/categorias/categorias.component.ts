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

    // EDITAR
    if (this.modoEdicion) {

      this.categoriaService.actualizarCategoria(
        this.nuevaCategoria.id,
        this.nuevaCategoria
      ).subscribe({

        next: () => {

          alert("Categoría actualizada correctamente");

          this.cancelar();

          this.cargarCategorias();

        },

        error: err => console.error(err)

      });

      return;
    }

    // CREAR
    this.categoriaService.crearCategoria(this.nuevaCategoria).subscribe({

      next: () => {

        alert("Categoría creada correctamente");

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

    const confirmar = confirm('¿Está seguro de eliminar esta categoría?');

    if (!confirmar) return;

    this.categoriaService.eliminarCategoria(id).subscribe({

      next: () => {

        alert("Categoría eliminada correctamente");

        this.cargarCategorias();

      },

      error: err => console.error(err)

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