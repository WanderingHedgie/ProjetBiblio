import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Avis } from '../../model/avis';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AvisService } from '../../service/avis-service';
import { Livre } from '../../model/livre';
import { LivreService } from '../../service/livre-service';

@Component({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AsyncPipe
  ],
  selector: 'app-avis-page',
  styleUrl: './avis-page.css',
  templateUrl: './avis-page.html',
})
export class AvisPage implements OnInit {

  protected avis$!: Observable<Avis[]>;
  protected livres$!: Observable<Livre[]>
  protected refresh$: Subject<void> = new Subject<void>();

  protected editingAvisId?: number;
  protected formAvisGroup!: FormGroup;
  protected formLivreGroup!: FormGroup;

  protected formAvisNoteControl!: FormControl;
  protected formAvisCommentControl!: FormControl;
  protected formAvisDateControl!: FormControl;
  protected formAvisLivreControl!: FormControl;

  constructor(
    private title: Title,
    private avisService: AvisService,
    private livreService: LivreService,
    private formBuilder: FormBuilder
  ){}


  ngOnInit(): void {
    this.title.setTitle("Avis")

    this.formAvisNoteControl = this.formBuilder.control("", Validators.required);
    this.formAvisCommentControl = this.formBuilder.control("");
    this.formAvisDateControl = this.formBuilder.control("", Validators.required);
    this.formAvisLivreControl = this.formBuilder.control("", Validators.required);

    this.formAvisGroup = this.formBuilder.group({
      note: this.formAvisNoteControl,
      commentaire: this.formAvisCommentControl,
      date: this.formAvisDateControl,
      livre: this.formAvisLivreControl
    });

    this.avis$ = this.refresh$.pipe(
      startWith(null),

      switchMap(() =>
        {
          this.livres$ = this.livreService.findAll();
          return this.avisService.findAll();

      })
    );

    this.editingAvisId = undefined;
    this.formAvisGroup.reset();
  }

  protected ajouterOuModifier() {
    if (this.formAvisGroup.invalid) {
      return;
    }

    const avis: Avis = {
      ...this.formAvisGroup.getRawValue(),
      id: this.editingAvisId
    };

    this.avisService.save(avis).subscribe(() => {

      this.refresh$.next();
    });

    this.formAvisGroup.reset();
  }

  protected editer(avis: Avis) {
    this.editingAvisId = avis.id;
    this.formAvisNoteControl.setValue(avis.note);
    this.formAvisCommentControl.setValue(avis.commentaire);
    this.formAvisDateControl.setValue(avis.date);
    this.formAvisLivreControl.setValue(avis.livre);
  }

  protected annulerEdition() {
    this.editingAvisId = undefined;
    this.formAvisGroup.reset();
  }

  protected supprimer(avis: Avis) {
    this.avisService.delete(avis).subscribe(() => {
      this.avis$ = this.avisService.findAll();
      this.refresh$.next();
    });
  }

  protected compareLivres(
    livre1: Pick<Livre, 'id' | 'auteur' | 'titre'> | undefined,
    livre2: Pick<Livre, 'id' | 'auteur' | 'titre'> | undefined
  ): boolean {
    return livre1?.id === livre2?.id;
  }
}
