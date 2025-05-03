import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WebcamModule } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import Tesseract from 'tesseract.js';
import { jsPDF } from 'jspdf';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-document-scanner',
  standalone: true,
  imports: [
    CommonModule,
    WebcamModule,
    MatIconModule,
  ],
  templateUrl: './document-scanner.component.html',
  styleUrls: ['./document-scanner.component.scss']
})
export class DocumentScannerComponent {
  isMobileOrTablet = false;

  constructor(
    private dialogRef: MatDialogRef<DocumentScannerComponent>
  ) {
    this.isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  showWebcam = true;
  capturedImage: string | null = null;
  cargando = false;

  private trigger: Subject<void> = new Subject<void>();

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  captureImage(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: any): void {
    this.capturedImage = webcamImage.imageAsDataUrl;
    this.showWebcam = false;
    console.log('📸 Imagen capturada');
  }

  retakePhoto(): void {
    this.capturedImage = null;
    this.showWebcam = true;
  }

  procesarImagen() {
    if (!this.capturedImage) return;

    this.cargando = true;

    Tesseract.recognize(
      this.capturedImage,
      'spa',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log('Texto detectado:', text);

      const doc = new jsPDF();

      // 🔽 Formato tipo formulario
      doc.setFontSize(14);
      doc.text('📝 Resultado del Escaneo de Documento', 20, 30);
      doc.setLineWidth(0.5);
      doc.line(20, 35, 570, 35);

      const textoFormateado = doc.splitTextToSize(text, 560);
      doc.text(textoFormateado, 20, 50);

      doc.save('documento-escaner.pdf');
      this.cargando = false;
    }).catch(err => {
      console.error('Error en OCR:', err);
      this.cargando = false;
    });
  }
}