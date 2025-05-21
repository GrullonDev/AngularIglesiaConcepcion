import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Tesseract from 'tesseract.js';

@Component({
  selector: 'app-scan-document',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-scanner.component.html',
  styleUrls: ['./document-scanner.component.scss'],
})
export class DocumentScannerComponent {
  scannedText: string = '';
  processing = false;

  // Datos del formulario (rellenados automáticamente o por el usuario)
  formData = {
    nombreNino: '',
    cui: '',
    direccion: '',
    parroquia: '',
    fechasPlaticas: '',
    firmaSacerdote: '',
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.processing = true;

    Tesseract.recognize(file, 'spa', {
      logger: (m) => console.log(m), // opcional: muestra progreso
    }).then(({ data: { text } }) => {
      this.scannedText = text;
      this.autocompletarFormulario(text);
      this.processing = false;
    });
  }

  autocompletarFormulario(text: string) {
    const getField = (key: string) => {
      const match = text.match(new RegExp(`${key}:\\s*(.*)`, 'i'));
      return match ? match[1].trim() : '';
    };

    this.formData.nombreNino = getField('Nombre del Niño');
    this.formData.cui = getField('CUI');
    this.formData.direccion = getField('Dirección');
    this.formData.parroquia = getField('Parroquia');
    this.formData.fechasPlaticas = getField('Fechas Pláticas');
    this.formData.firmaSacerdote = getField('Firma');
  }

  guardar() {
    // Aquí puedes llamar al service para guardar el formulario
    console.log('Guardando datos:', this.formData);
  }
}

// M-534MJZ