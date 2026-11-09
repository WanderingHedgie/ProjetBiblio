import { Component, OnInit } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Compte } from '../../model/compte';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CompteService } from '../../service/compte-service';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe],
  selector: 'app-compte-page',
  styleUrl: './compte-page.css',
  templateUrl: './compte-page.html',
})
export class ComptePage {
  
  private refresh$: Subject<void> = new Subject<void>();
  
  protected formCompteGroup!: FormGroup;
  protected formCompteUsernameCtrl!: FormControl;
  protected formComptePasswordCtrl!: FormControl;
  
  
  constructor(
    private title: Title,
    private compteService: CompteService,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.title.setTitle("Inscription utilisateur");
    
    this.formCompteUsernameCtrl = this.formBuilder.control("", Validators.required);
    this.formComptePasswordCtrl = this.formBuilder.control("", Validators.required);
    
    this.formCompteGroup = this.formBuilder.group({
      username: this.formCompteUsernameCtrl,
      password: this.formComptePasswordCtrl
    });
  }
  
 protected inscrire() {
    if (this.formCompteGroup.invalid) {
      return;
    }
    
    const compte: Compte = {
      ...this.formCompteGroup.getRawValue()
    };
    
    this.compteService.save(compte).subscribe(() => {
      this.formCompteGroup.reset();
    });
  }
  
  protected annulerEdition() {
    this.formCompteGroup.reset();
  }
}
