import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportes',
  imports: [
    CommonModule,
    BaseChartDirective,
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {

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
