import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './composant/navigation/navigation';
import { AuthService } from './service/auth-service';

@Component({
  imports: [RouterOutlet, Navigation ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
constructor(protected authService: AuthService) {}
}
