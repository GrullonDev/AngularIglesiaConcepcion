import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, registerables, Chart } from 'chart.js';
import { DocumentScannerComponent } from '../../shared/document-scanner/document-scanner.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    BaseChartDirective,
    DocumentScannerComponent,
    MatDialogModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  resumen = {
    bautizos: 0,
    comuniones: 0,
    confirmaciones: 0,
    matrimonios: 0
  };
  fechaSeleccionada: Date | null = null;

  isMobileOrTablet = false;
  mostrarEscaner = false;


  constructor(private dialog: MatDialog, private router: Router, private dashboardService: DashboardService) {
    this.isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
    this.cargarResumen();
  }

  agregarDocumento() {
    this.dialog.open(DocumentScannerComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      panelClass: 'scanner-dialog-fullscreen'
    });
  }

  agendarActividad() {
    alert('Funcionalidad para agendar una nueva actividad');
  }

  crearDocumento() {
    this.router.navigate(['/crear-documento']);
  }

  cargarResumen() {
    this.dashboardService.getCountDocumentsByType().subscribe({
      next: (data) => {
        console.log('📊 Resumen recibido:', data);  // ✅ Este log es importante
        this.resumen = data;
      },
      error: (error) => {
        console.error('Error al cargar el resumen de documentos', error);
      },
    });
  }
}