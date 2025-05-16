// login.component.ts
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginErrorDialogComponent } from './login-error-dialog.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        NgIf
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    email = '';
    password = '';
    emailError = false;
    hidePassword = true;
    passwordError = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog
    ) { }

    onLogin() {
        this.emailError = !this.email || !this.email.includes('@');
        this.passwordError = !this.password;

        if (this.emailError || this.passwordError) {
            return;
        }

        this.authService.login(this.email, this.password).subscribe({
            next: token => {
                if (!token) {
                    console.error('Token inválido o vacío');
                    this.dialog.open(LoginErrorDialogComponent);
                    return;
                }

                console.log('Token guardado:', token);
                localStorage.setItem('access_token', token);

                this.router.navigate(['/dashboard']).then(success => {
                    console.log('Navegación al dashboard:', success);
                });
            },
            error: () => {
                this.dialog.open(LoginErrorDialogComponent); // ← Mostramos diálogo de error
            }
        });
    }
}