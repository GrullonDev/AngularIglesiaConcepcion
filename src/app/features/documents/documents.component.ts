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
  displayedColumns: string[] = ['tipo', 'cui', 'nombre', 'parroquia', 'sacerdote', 'fecha', 'firma', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.getDocumentos().subscribe({
      next: documentos => {
        const mappedData = documentos.map(doc => ({
          tipo: 'Certificado',
          cui: doc.cui,
          nombre: doc.nombreNino,
          parroquia: doc.parroquia,
          sacerdote: doc.sacerdote?.nombreCompleto ?? 'No disponible',
          fecha: new Date(doc.createdAt).toLocaleDateString(),
          firma: doc.firmaSacerdote
        }));

        this.dataSource.data = mappedData;
      },
      error: err => {
        console.error('Error al obtener documentos', err);
      }
    });
  }

  applyFilterFromEvent(event: Event) {
    const value = (event.target as HTMLInputElement)?.value || '';
    this.applyFilter(value);
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  printDocument(element: any) {
    console.log('Imprimir documento', element);
    // Aquí puedes abrir un modal o generar PDF
  }

  editDocument(element: any) {
    console.log('Editar documento', element);
    // Aquí puedes navegar a otra ruta: this.router.navigate(['/editar', element.id])
  }
}