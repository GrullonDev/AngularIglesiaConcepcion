import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DocumentsService } from './services/documents.services';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { generarConstanciaPDF } from '../../shared/utils/pdf-utils';

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,       // ✅ Agregado aquí
    MatButtonModule,     // ✅ Necesario para los botones icono
    MatSelectModule,     // ✅ Necesario para <mat-select>
    MatOptionModule      // ✅ Necesario para <mat-option>
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit, AfterViewInit {
  selectedTipo: string = '';
  displayedColumns: string[] = [
    'tipo',
    'fechaEmision',
    'observaciones',
    'acciones'
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.cargarDocumentos();
  }

  isLoading = false;

  cargarDocumentos() {
    this.isLoading = true;
    this.documentsService.getDocumentos(this.selectedTipo).subscribe({
      next: documentos => {
        this.dataSource.data = documentos.map(doc => ({
          tipo: doc.tipo,
          noFolioLibro: doc.cliente?.noFolioLibro || 'N/A',
          nombre: doc.cliente?.nombreNino || 'Desconocido',
          fecha: new Date(doc.fechaEmision || doc.creadoEn).toLocaleDateString(),
          sacerdote: doc.sacerdote?.nombreCompleto || 'No disponible',
          firma: doc.cliente?.firmaSacerdote === 'sin_firma' ? 'No' : 'Sí',
          observaciones: doc.observaciones || 'Sin observaciones',
          _pdfData: {
            ...doc,
            createdAt: new Date(doc.creadoEn).toLocaleDateString(),
          },
        }));
        this.isLoading = false;
      },
      error: err => {
        console.error('Error al obtener documentos', err);
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrarPorTipo() {
    this.cargarDocumentos();
  }

  applyFilterFromEvent(event: Event) {
    const value = (event.target as HTMLInputElement)?.value || '';
    this.applyFilter(value);
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  printDocument(element: any) {
    if (element._pdfData) {
      generarConstanciaPDF(element._pdfData);
    } else {
      console.error('Datos del documento incompletos');
    }
  }

  editDocument(element: any) {
    console.log('Editar documento', element);
    // Aquí podrías navegar a una ruta de edición con this.router.navigate(['/editar', element.id])
  }
}