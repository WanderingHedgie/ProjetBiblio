import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [],
  selector: 'app-home-page',
  styleUrl: '../pages.css',
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit {

  constructor(private title: Title){}

  ngOnInit(): void {
    this.title.setTitle("Accueil");
  }
}
