import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { ActivitiesComponent } from './features/activities/activities.component';
import { DocumentsComponent } from './features/documents/documents.component';
import { CreateDocumentComponent } from './features/create-document/create-document.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'documentos', component: DocumentsComponent },
    { path: 'actividades', component: ActivitiesComponent },
    { path: 'crear-documento', component: CreateDocumentComponent },
];