import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { Livre } from '../../model/livre';
import { Title } from '@angular/platform-browser';
import { LivreService } from '../../service/livre-service';

@Component({
  imports: [AsyncPipe,
    ReactiveFormsModule
  ],
  selector: 'app-livre-page',
  styleUrl: './livre-page.css',
  templateUrl: './livre-page.html',
})
export class LivrePage implements OnInit {
  
  protected livres$!: Observable<Livre[]>;
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
    this.formLivreCollectionCtrl = this.formBuilder.control("", Validators.required);
    
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
        return this.livreService.findAll();
      })
    );
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
