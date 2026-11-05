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
      comment: this.formAvisCommentControl,
      date: this.formAvisDateControl,
      livre: this.formAvisLivreControl
    });

    this.avis$ = this.refresh$.pipe(
      startWith(null),

      switchMap(() =>
        {return this.avisService.findAll();

      })
    );
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
    this.formAvisCommentControl.setValue(avis.comment);
    this.formAvisDateControl.setValue(avis.date);
    this.formAvisLivreControl.setValue(avis.livre);
  }

  protected annulerEdition() {
    this.editingAvisId = undefined;
    this.formAvisGroup.reset();
  }

   protected supprimer(avis: Avis) {
    this.avisService.delete(avis).subscribe(() => {
      // this.aviss$ = this.avisService.findAll();
      this.refresh$.next();
    });
  }

  protected compareLivres(
    livre1: Pick<Livre, 'auteur' | 'titre'> | undefined,
    livre2: Pick<Livre, 'auteur' | 'titre'> | undefined
  ): boolean {
    return livre1?.titre === livre2?.titre;
  }
}
