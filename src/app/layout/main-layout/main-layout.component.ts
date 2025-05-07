import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

// Responsiveness
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

// Angular Material
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

// Tus propios componentes
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { appVersion } from '../../../../src/enviroments/version';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    SidebarComponent,
    HeaderComponent,
    RouterModule,
  ],
  // templateUrl: '../main-layout.component.html',
  templateUrl: '../main-layout/main-layout.component.html',
  styleUrls: ['../main-layout/main-layout.component.scss']
})

export class MainLayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  isMobile = false;
  isDesktop = false;
  opened = true;
  version = appVersion;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.opened = !this.isMobile
          || !this.isDesktop;
      });
  }

  closeDrawer() {
    if (this.isMobile && this.drawer.opened) {
      this.drawer.close();
    }
  }
}