import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage implements OnInit {

  protected formAuthGroup!: FormGroup;
  protected formAuthUsernameControl!: FormControl;
  protected formAuthPasswordControl!: FormControl;
  protected errorMessage = signal<string>("");
  constructor(
    private title: Title,
    private authService: AuthService,
    private router : Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Connexion");

    // Initialisation du formulaire ReactiveForms
    this.formAuthUsernameControl = this.formBuilder.control("", Validators.required);
    this.formAuthPasswordControl = this.formBuilder.control("", Validators.required);


    this.formAuthGroup = this.formBuilder.group({
      username: this.formAuthUsernameControl,
      password: this.formAuthPasswordControl
    })
  }

  protected login() {
    this.errorMessage.set("");

    this.authService.login(this.formAuthGroup.getRawValue()).subscribe({
      next: (resp) => {
        // On affecte le jeton JWT reçu au service
        this.authService.token = resp.token;

        // Stockage du jeton dans la session du navigateur
        sessionStorage.setItem('token', resp.token);

        // On redirige vers la page de la liste des matières
        this.router.navigate([ 'home' ]);
      },

      error: (err:HttpErrorResponse) => {
        if (err.status === 401) {
          this.errorMessage.set("Identifiant ou mot de passe incorrect.");
        } else {
          this.errorMessage.set("Une erreur est survenue lors de la connexion.");
        }
      }
    });
  }
}
