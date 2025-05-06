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
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, registerables, Chart } from 'chart.js';
import { DocumentScannerComponent } from '../../shared/document-scanner/document-scanner.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

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
  resumen = { bautizos: 25, confirmaciones: 25, matrimonios: 10, comuniones: 12 };
  fechaSeleccionada: Date | null = null;

  isMobileOrTablet = false;
  mostrarEscaner = false;

  agregarDocumento() {
    alert('Funcionalidad para agregar documento aquí');
  }

  agendarActividad() {
    alert('Funcionalidad para agendar una nueva actividad');
  }

  crearDocumento() {
    alert('Funcionalidad para crear documento nuevo');
  }

  constructor(private dialog: MatDialog) {
    this.isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
  }

  escanearDocumento() {
    this.dialog.open(DocumentScannerComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      panelClass: 'scanner-dialog-fullscreen'
    });
  }

  public lineChartData: ChartData<'line'> = {
    labels: ['2000', '2005', '2010', '2015', '2020'],
    datasets: [
      { data: [25, 30, 10, 20, 15], label: 'Bautizos', fill: true, borderColor: '#42a5f5', backgroundColor: 'rgba(66,165,245,0.2)' },
      { data: [8, 15, 5, 7, 12], label: 'Comuniones', fill: true, borderColor: '#ffa726', backgroundColor: 'rgba(255,167,38,0.2)' },
      { data: [4, 20, 6, 12, 18], label: 'Confirmaciones', fill: true, borderColor: '#64bb6a', backgroundColor: 'rgba(90, 39, 162, 0.6)' },
      { data: [5, 10, 8, 15, 10], label: 'Matrimonios', fill: true, borderColor: '#66bb6a', backgroundColor: 'rgba(102,187,106,0.2)' },
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  public lineChartType: 'line' = 'line';
}