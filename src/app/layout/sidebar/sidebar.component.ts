import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: '../sidebar/sidebar.component.html',
  styleUrl: '../sidebar/sidebar.component.scss'
})
export class SidebarComponent {

}
