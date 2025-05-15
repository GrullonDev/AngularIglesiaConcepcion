import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Import obligatorio

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule], // ✅ RouterModule debe estar aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'parroquia-inmaculada';
}