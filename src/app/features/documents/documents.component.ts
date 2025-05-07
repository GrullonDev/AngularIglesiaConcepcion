import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent {
  displayedColumns: string[] = ['tipo', 'nombre', 'fecha'];
  dataSource = [
    { tipo: 'Certificado', nombre: 'Juan Pérez', fecha: '2024-01-10' },
    { tipo: 'Acta', nombre: 'María López', fecha: '2024-03-22' },
  ];
}