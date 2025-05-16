import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    template: `
    <div class="auth-container">
      <router-outlet></router-outlet>
    </div>
  `,
    styleUrls: ['./auth-layout.component.scss']
})

export class AuthLayoutComponent { }