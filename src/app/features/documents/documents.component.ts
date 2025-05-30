import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { getDocumentsService } from './services/documents.services';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,    // ✅ Faltaba
    MatFormFieldModule,    // ✅ Faltaba
    MatInputModule,        // ✅ Faltaba
    MatIconModule,         // ✅ Faltaba
    MatSortModule,          // ✅ Faltaba si usas sorting
    MatSelectModule,      // ✅ NECESARIO para <mat-select>
    MatOptionModule       // ✅ NECESARIO para <mat-option>
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit {
  selectedTipo: string = '';
  isLoading = false;

  displayedColumns: string[] = [
    'tipo', 
    'nombre', 
    'fechaEmision', 
    'observaciones',
  ];

  dataSource = new MatTableDataSource<any>();
  documentosMapeados: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private documentsService: getDocumentsService) { }

  ngOnInit() {
    this.buscarDocumentos(); // ← carga inicial
  }

  buscarDocumentos() {
    this.isLoading = true;

    this.documentsService.getDocuments(this.selectedTipo).subscribe({
      next: (documentos: any[]) => {
        this.documentosMapeados = documentos.map((documento: any) => {
          return {
            tipo: documento.tipo || 'N/A',
            nombre: documento.cliente?.noFolioLibro || 'Desconocido',
            fechaEmision: new Date(documento.fechaEmision || documento.creadoEn).toLocaleDateString(),
            observaciones: documento.observaciones || 'Sin observaciones',
          };
        });
      },
      error: (err) => {
        console.error('Error al obtener documentos', err);
        this.isLoading = false;
      }
    });
  }

  onTipoChange() {
    this.buscarDocumentos();
  }
}