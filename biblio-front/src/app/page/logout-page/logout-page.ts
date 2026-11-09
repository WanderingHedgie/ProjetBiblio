import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-logout-page',
  styleUrl: './logout-page.css',
  templateUrl: './logout-page.html',
})
export class LogoutPage implements OnInit {
  constructor (private title: Title, private router: Router){};

  ngOnInit(): void {
    this.title.setTitle("Déconnexion")
    sessionStorage.clear();
  }

  public toLoginPage(){
    this.router.navigate([ 'login' ]);
  }
}
