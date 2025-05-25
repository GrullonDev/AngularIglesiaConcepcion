import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
    MatIconModule, // ✅ Agregado aquí
    MatButtonModule // ✅ Necesario para los botones icono
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'tipo',
    'noFolioLibro',
    'nombre',
    'parroquia',
    'sacerdote',
    'fecha',
    'firma',
    'acciones'
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.getDocumentos().subscribe({
      next: documentos => {
        const mappedData = documentos.map(doc => {
          return {
            tipo: 'Certificado',
            noFolioLibro: doc.noFolioLibro || 'N/A',
            cui: doc.id,
            nombre: doc.nombreNino || 'Desconocido',  // 👈 usado en tabla
            fecha: new Date(doc.createdAt).toLocaleDateString(),  // 👈 usado en tabla
            parroquia: doc.parroquia || 'Parroquia Inmaculada',
            sacerdote: doc.sacerdote?.nombreCompleto || 'No disponible',
            firma: doc.firmaSacerdote === 'sin_firma' ? 'No' : 'Sí',

            // 👇 Datos completos para imprimir
            _pdfData: {
              noFolioLibro: doc.noFolioLibro,
              nombreNino: doc.nombreNino,
              fechaNacimiento: doc.fechaNacimiento,
              fechaBautismo: doc.fechaBautismo,
              padre: doc.padre,
              madre: doc.madre,
              padrinos: doc.padrino?.nombre || '',
              observaciones: doc.observaciones,
              createdAt: new Date(doc.createdAt).toLocaleDateString()
            }
          };
        });

        this.dataSource.data = mappedData;
      },
      error: err => {
        console.error('Error al obtener documentos', err);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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