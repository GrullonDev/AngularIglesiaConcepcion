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
  @ViewChild('signaturePad', { static: false }) signaturePad!: ElementRef<HTMLCanvasElement>;
  form = {
    nombreNino: '',
    padrinos: '',
    rangoFechas: {
      start: null as Date | null,
      end: null as Date | null
    },
    sacerdote: '',
    parroquia: '',
    direccion: '',
    firma: ''
  };

  onFirmaUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Leer la imagen como base64
    }
  }

  clearSignature() {
    const ctx = this.signaturePad.nativeElement.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, this.signaturePad.nativeElement.width, this.signaturePad.nativeElement.height);
  }

  onSubmit() {
    // Aquí podrías guardar en Firebase, enviar al backend o generar un PDF
    console.log(this.form);
  }
}