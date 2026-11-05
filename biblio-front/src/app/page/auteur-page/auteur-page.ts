import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Auteur } from '../../model/auteur';
import { AuteurService } from '../../service/auteur-service';

@Component({
  selector: 'app-auteur-page',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './auteur-page.html',
  styleUrl: './auteur-page.css',
})
export class AuteurPage implements OnInit {
  protected auteurs$!: Observable<Auteur[]>;
  private refresh$: Subject<void> = new Subject<void>();

  protected editingAuteurId?: number;
  protected formAuteurGroup!: FormGroup;
  protected formAuteurNomCtrl!: FormControl;
  protected formAuteurPrenomCtrl!: FormControl;
  protected formAuteurNationaliteCtrl!: FormControl;

  constructor(
    private title: Title,
    private auteurService: AuteurService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Liste des auteurs");

    // Création du formulaire ReactiveForms (un contrôle par champ)
    this.formAuteurNomCtrl = this.formBuilder.control("", Validators.required);
    this.formAuteurPrenomCtrl = this.formBuilder.control("", Validators.required);
    this.formAuteurNationaliteCtrl = this.formBuilder.control("", Validators.required);

    this.formAuteurGroup = this.formBuilder.group({
      nom: this.formAuteurNomCtrl,
      prenom: this.formAuteurPrenomCtrl,
      nationalite: this.formAuteurNationaliteCtrl
    });

    this.auteurs$ = this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.auteurService.findAll();
      })
    );
  }

  protected ajouterOuModifier() {
    if (this.formAuteurGroup.invalid) {
      return;
    }

    const auteur: Auteur = {
      ...this.formAuteurGroup.getRawValue(),
      id: this.editingAuteurId
    };

    this.auteurService.save(auteur).subscribe(() => {
      this.refresh$.next();
    });

    this.annulerEdition();
  }

  protected editer(auteur: Auteur) {
    this.editingAuteurId = auteur.id;
    this.formAuteurNomCtrl.setValue(auteur.nom);
    this.formAuteurPrenomCtrl.setValue(auteur.prenom);
    this.formAuteurNationaliteCtrl.setValue(auteur.nationalite);
  }

  protected supprimer(auteur: Auteur) {
    this.auteurService.remove(auteur).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingAuteurId = undefined;
    this.formAuteurGroup.reset();
  }
}