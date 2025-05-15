import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ClienteService } from './services/cliente.service';
import { start } from 'repl';

@Component({
  selector: 'app-create-document',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})

export class CreateDocumentComponent {
  form = {
    nombreNino: '',
    padrinos: '',
    sacerdote: '',
    parroquia: '',
    direccion: '',
    firma: ''
  };

  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;

  constructor(private clienteService: ClienteService) { }

  onSubmit() {
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Por favor selecciona el rango de fechas');
      return;
    }

    const payload = {
      cui: crypto.randomUUID(),
      nombre: this.form.nombreNino,
      padrinos: this.form.padrinos,
      fecha: `${this.fechaInicio.toISOString().split('T')[0]} al ${this.fechaFin.toISOString().split('T')[0]}`,
      sacerdote: this.form.sacerdote,
      parroquia: this.form.parroquia,
      direccion: this.form.direccion,
      firma: this.form.firma || 'sin_firma',
    };

    this.clienteService.crearCliente(payload).subscribe({
      next: (res) => {
        alert('Constancia creada con éxito ✅');
      },
      error: (err) => {
        console.error('Error en GraphQL:', err);
        alert('Ocurrió un error al crear el documento');
      }
    });
  }
}
