import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { getClientesService } from './services/getClientes.services';
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
  templateUrl: './getClientes.component.html',
  styleUrls: ['./getClientes.component.scss']
})

export class getClientesComponent implements OnInit, AfterViewInit {
  selectedTipo: string = '';
  searchNombre = '';
  searchFecha = '';

displayedColumns: string[] = [
  'tipo',
  'nombre',
  'fechaBautismo',
  'fechaEmision',
  'observaciones',
  'acciones'
];

  dataSource = new MatTableDataSource<any>();
  clientesMapeados: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private documentsService: getClientesService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  isLoading = false;

  cargarClientes() {
    this.isLoading = true;

    this.documentsService.getClientes().subscribe({
      next: (clientes) => {
        if (!Array.isArray(clientes)) {
          console.error('❌ Respuesta inesperada:', clientes);
          this.isLoading = false;
          return;
        }

        // 🔄 Mapeo completo con toda la info
        this.clientesMapeados = clientes.map(cliente => {
          const fechaExtendida = new Date().toLocaleString('es-GT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })

          const doc = cliente.documentos?.[0]; // asumiendo uno por cliente

          return {
            tipo: doc?.tipo || 'N/A',
            nombre: cliente.nombreNino,
            fechaBautismo: cliente.fechaBautismo,
            fechaEmision: doc?.fechaEmision,
            observaciones: doc?.observaciones || 'Sin observaciones',
            _pdfData: {
              tipo: doc?.tipo,
              fechaEmision: doc?.fechaEmision,
              creadoEn: doc?.creadoEn,
              observaciones: doc?.observaciones,
              nombreNino: cliente.nombreNino,
              noFolioLibro: cliente.noFolioLibro,
              padre: cliente.padre,
              madre: cliente.madre,
              padrinos: cliente.padrino?.nombre,
              sacerdote: cliente.sacerdote?.nombreCompleto,
              parroquia: cliente.parroquia,
              partida: cliente.partida,
              celebrante: cliente.celebrante,
              campo34: cliente.campo34,
              campo35: cliente.campo35,
              campo36: cliente.campo36,
              fechaNacimiento: cliente.fechaNacimiento,
              fechaBautismo: cliente.fechaBautismo,
              firmaSacerdote: cliente.firmaSacerdote,
              fechaGeneracion: fechaExtendida
            }
          };
        });

        // 💡 Aplicar filtro inicial
        this.filtrarClientes();
        this.isLoading = false;
      },
      error: err => {
        console.error('Error al obtener clientes', err);
        this.isLoading = false;
      }
    });
  }

  filtrarClientes() {
    const filtered = this.clientesMapeados.filter(c =>
      (!this.selectedTipo || c.tipo === this.selectedTipo) &&
      (!this.searchNombre || c.nombre?.toLowerCase().includes(this.searchNombre.toLowerCase())) &&
      (!this.searchFecha || new Date(c.fechaBautismo).toLocaleDateString().includes(this.searchFecha))
    );

    this.dataSource.data = filtered;
  }

  filtrarPorTipo() {
    this.filtrarClientes();
  }

  applyFilterFromEvent(event: Event) {
    const value = (event.target as HTMLInputElement)?.value || '';
    this.searchNombre = value;
    this.filtrarClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  printDocument(element: any) {
    if (element._pdfData) {
      generarConstanciaPDF(element._pdfData);
    } else {
      console.error('❌ Datos del documento incompletos', element);
    }
  }

  editDocument(element: any) {
    console.log('Editar documento', element);
  }
}