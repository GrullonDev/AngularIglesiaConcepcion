import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';

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

export class CreateDocumentComponent implements AfterViewInit {
  form = {
    noFolioLibro: '',
    nombreNino: '',
    padre: '',
    madre: '',
    padrinos: '',
    sacerdote: '',
    parroquia: '',
    firma: ''
  };

  fechaNacimiento: Date | null = null;
  minDate = new Date(1940, 0, 1);
  maxDate = new Date();

  noFolioLibroError = false;
  nombreNinoError = false;
  padreError = false;
  madreError = false;
  padrinosError = false;
  fechaNacimientoError = false;
  error = '';

  @ViewChild('signaturePad') signaturePad!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngAfterViewInit() {
    const canvas = this.signaturePad?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#1e3a8a';

    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    this.ctx.scale(ratio, ratio);
  }

  /*   startDrawing(event: MouseEvent | TouchEvent) {
      this.isDrawing = true;
      const { x, y } = this.getCoordinates(event);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    }
  
    draw(event: MouseEvent | TouchEvent) {
      if (!this.isDrawing) return;
      const { x, y } = this.getCoordinates(event);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  
    stopDrawing() {
      this.isDrawing = false;
      this.ctx.closePath();
      this.form.firma = this.signaturePad?.nativeElement.toDataURL('image/png') || '';
    } */

  /*   getCoordinates(event: MouseEvent | TouchEvent) {
      const canvas = this.signaturePad.nativeElement;
      const rect = canvas.getBoundingClientRect();
      let x: number, y: number;
  
      if (event instanceof MouseEvent) {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      } else {
        const touch = event.touches[0];
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
      }
  
      return { x, y };
    }
  
    clearSignature() {
      const canvas = this.signaturePad?.nativeElement;
      if (!canvas) return;
  
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.form.firma = '';
    } */

  onSubmit() {
    this.nombreNinoError = !this.form.nombreNino;
    this.padreError = !this.form.padre;
    this.madreError = !this.form.madre;
    this.padrinosError = !this.form.padrinos;
    this.fechaNacimientoError = !this.fechaNacimiento;
    this.error = '';

    if (
      this.nombreNinoError ||
      this.padreError ||
      this.madreError ||
      this.padrinosError ||
      this.fechaNacimientoError
    ) {
      this.error = 'Por favor, complete todos los campos requeridos.';
      return;
    }

    const payload = {
      noFolioLibro: this.form.noFolioLibro,
      nombre: this.form.nombreNino,
      fechaNacimiento: this.fechaNacimiento?.toISOString().split('T')[0] || '',
      padre: this.form.padre,
      madre: this.form.madre,
      padrinos: this.form.padrinos,
      sacerdote: this.form.sacerdote,
      parroquia: this.form.parroquia,
      firma: this.form.firma || 'sin_firma'
    };

    this.clienteService.crearCliente(payload).subscribe({
      next: () => {
        alert('Constancia creada con éxito ✅');
        this.router.navigate(['/documentos']);
      },
      error: (err) => {
        console.error('Error en GraphQL:', err);
        alert('Ocurrió un error al crear el documento');
      }
    });
  }
}