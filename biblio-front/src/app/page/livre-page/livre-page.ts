import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { Livre } from '../../model/livre';
import { Title } from '@angular/platform-browser';
import { LivreService } from '../../service/livre-service';
import { Auteur } from '../../model/auteur';
import { AuteurService } from '../../service/auteur-service';
import { Editeur } from '../../model/editeur';
import { EditeurService } from '../../service/editeur-service';
import { Collection } from '../../model/collection';
import { CollectionService } from '../../service/collection';

@Component({
  imports: [AsyncPipe,
    ReactiveFormsModule,
    DatePipe
  ],
  selector: 'app-livre-page',
  styleUrl: './livre-page.css',
  templateUrl: './livre-page.html',
})
export class LivrePage implements OnInit {

  protected livres$!: Observable<Livre[]>;
  protected auteurs$!: Observable<Auteur[]>;
  protected editeurs$!: Observable<Editeur[]>;
  protected collections$!: Observable<Collection[]>;
  protected compareById = (a: { id?: number } | null, b: { id?: number } | null) =>
    a && b ? a.id === b.id : a === b;

  private refresh$: Subject<void> = new Subject<void>();

  protected editingLivreId?: number;
  protected formLivreGroup!: FormGroup;
  protected formLivreTitreCtrl!: FormControl;
  protected formLivreResumeCtrl!: FormControl;
  protected formLivreAnneeCtrl!: FormControl;
  protected formLivreAuteurCtrl!: FormControl;
  protected formLivreEditeurCtrl!: FormControl;
  protected formLivreCollectionCtrl!: FormControl;

  constructor(
    private title: Title,
    private livreService: LivreService,
    private auteurSerivce: AuteurService,
    private editeurService: EditeurService,
    private collectionService: CollectionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Liste des livres");

    // Création du formulaire ReactiveForms (un contrôle par champ)
    this.formLivreTitreCtrl = this.formBuilder.control("", Validators.required);
    this.formLivreResumeCtrl = this.formBuilder.control("", Validators.required);
    this.formLivreAnneeCtrl = this.formBuilder.control("", Validators.required);
    this.formLivreAuteurCtrl = this.formBuilder.control("", Validators.required);
    this.formLivreEditeurCtrl = this.formBuilder.control("", Validators.required);
    this.formLivreCollectionCtrl = this.formBuilder.control("");

    this.formLivreGroup = this.formBuilder.group({
      titre: this.formLivreTitreCtrl,
      resume: this.formLivreResumeCtrl,
      date: this.formLivreAnneeCtrl,
      auteur: this.formLivreAuteurCtrl,
      editeur: this.formLivreEditeurCtrl,
      collection: this.formLivreCollectionCtrl
    });

    this.livres$ = this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        this.auteurs$ = this.auteurSerivce.findAll();
        this.editeurs$ = this.editeurService.findAll();
        this.collections$ = this.collectionService.findAll();
        return this.livreService.findAll();
      })
    );

    this.editingLivreId = undefined;
    this.formLivreGroup.reset();
  }

  protected ajouterOuModifier(){
    if (this.formLivreGroup.invalid) {
      return;
    }

    const livre: Livre = {
      ...this.formLivreGroup.getRawValue(),
      id: this.editingLivreId
    };

    this.livreService.save(livre).subscribe(() => {
      this.refresh$.next();
    });

    this.annulerEdition();
  }

  protected editer(livre: Livre) {
    this.editingLivreId = livre.id;
    this.formLivreTitreCtrl.setValue(livre.titre);
    this.formLivreResumeCtrl.setValue(livre.resume);
    this.formLivreAnneeCtrl.setValue(livre.date);
    this.formLivreAuteurCtrl.setValue(livre.auteur);
    this.formLivreEditeurCtrl.setValue(livre.editeur);
    this.formLivreCollectionCtrl.setValue(livre.collection)
  }

  protected supprimer(livre: Livre) {
    this.livreService.remove(livre).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingLivreId = undefined;
    this.formLivreGroup.reset();
  }
}
