import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { ActivitiesComponent } from './features/activities/activities.component';
import { DocumentsComponent } from './features/documents/documents.component';
import { CreateDocumentComponent } from './features/create-document/create-document.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { authGuard } from './auth/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { PerfilComponent } from './pages/perfil.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivateChild: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
            { path: 'reportes', component: ReportesComponent, canActivate: [authGuard] },
            { path: 'documentos', component: DocumentsComponent, canActivate: [authGuard] },
            { path: 'actividades', component: ActivitiesComponent, canActivate: [authGuard] },
            { path: 'crear-documento', component: CreateDocumentComponent, canActivate: [authGuard] },
            { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
        ],
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ],
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];