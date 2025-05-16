import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('access_token'); // ✅ clave correcta

    if (token) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};