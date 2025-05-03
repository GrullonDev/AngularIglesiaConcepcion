import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Import obligatorio
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule, MainLayoutComponent], // ✅ RouterModule debe estar aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'parroquia-inmaculada';
}