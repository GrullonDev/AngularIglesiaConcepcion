import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  displayedColumns: string[] = ['actividad', 'responsable', 'fecha'];
  dataSource = [
    { actividad: 'Primera Comunión', responsable: 'Padre Juan', fecha: '2024-05-12' },
    { actividad: 'Confirmación', responsable: 'Hermana María', fecha: '2024-06-20' },
  ];
}