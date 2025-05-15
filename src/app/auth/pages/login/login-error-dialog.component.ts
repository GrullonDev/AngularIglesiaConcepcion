// login-error-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-login-error-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    template: `
    <h2 mat-dialog-title>Error</h2>
    <mat-dialog-content>Credenciales incorrectas. Inténtalo nuevamente.</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Aceptar</button>
    </mat-dialog-actions>
  `,
})

export class LoginErrorDialogComponent { }