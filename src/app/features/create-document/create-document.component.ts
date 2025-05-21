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
    nombreNino: '',
    padrinos: '',
    sacerdote: '',
    parroquia: '',
    direccion: '',
    firma: ''
  };

  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  nombreNinoError = false;
  padrinosError = false;
  fechaError = false;
  error = '';

  @ViewChild('signaturePad') signaturePad!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngAfterViewInit() {
    const canvas = this.signaturePad.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#1e3a8a'; // Marian blue for signature

    // Adjust canvas resolution for high-DPI displays
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    this.ctx.scale(ratio, ratio);
  }

  startDrawing(event: MouseEvent | TouchEvent) {
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
    // Update the firma field with the canvas data URL
    this.form.firma = this.signaturePad.nativeElement.toDataURL('image/png');
  }

  getCoordinates(event: MouseEvent | TouchEvent) {
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
    this.ctx.clearRect(0, 0, this.signaturePad.nativeElement.width, this.signaturePad.nativeElement.height);
    this.form.firma = '';
  }

  onSubmit() {
    // Reset error flags
    this.nombreNinoError = false;
    this.padrinosError = false;
    this.fechaError = false;
    this.error = '';

    // Client-side validation
    this.fechaError = !this.fechaInicio || !this.fechaFin;

    if (this.form.nombreNino != undefined && this.form.padrinos != undefined && this.fechaError && this.form.sacerdote != undefined) {
      this.error = 'Por favor, complete todos los campos requeridos.';
      alert(this.error);
      return;
    }

    const payload = {
      cui: crypto.randomUUID(),
      nombre: this.form.nombreNino,
      padrinos: this.form.padrinos,
      fecha: `${this?.fechaInicio?.toISOString().split('T')[0]} al ${this?.fechaFin?.toISOString().split('T')[0]}`,
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