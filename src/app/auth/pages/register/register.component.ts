// register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    nombre = '';
    correo = '';
    password = '';
    error = '';

    constructor(private authService: AuthService, private router: Router) { }

    onRegister() {
        this.authService.register(this.nombre, this.correo, this.password).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: () => {
                this.error = 'Error al registrar el usuario.';
            }
        });
    }
}