import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  imports: [],
  selector: 'app-logout-page',
  styleUrl: './logout-page.css',
  templateUrl: './logout-page.html',
})
export class LogoutPage implements OnInit {
  constructor (private title: Title, private router: Router, private authService: AuthService){};

  ngOnInit(): void {
    this.title.setTitle("Déconnexion")
    this.authService.logout();
  }

  public toLoginPage(){
    this.router.navigate([ 'login' ]);
  }
}
