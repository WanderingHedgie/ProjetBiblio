import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Compte } from '../../model/compte';
import { CompteService } from '../../service/compte-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-compte-page',
  styleUrl: './compte-page.css',
  templateUrl: './compte-page.html',
})
export class ComptePage implements OnInit {

  private refresh$: Subject<void> = new Subject<void>();

  protected formCompteGroup!: FormGroup;
  protected formCompteUsernameCtrl!: FormControl;
  protected formComptePasswordCtrl!: FormControl;


  constructor(
    private title: Title,
    private compteService: CompteService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Inscription utilisateur");

    this.formCompteUsernameCtrl = this.formBuilder.control("", Validators.required);
    this.formComptePasswordCtrl = this.formBuilder.control("", Validators.required);

    this.formCompteGroup = this.formBuilder.group({
      username: this.formCompteUsernameCtrl,
      password: this.formComptePasswordCtrl
    });

    this.formCompteUsernameCtrl.valueChanges.subscribe(() => {
      if (this.formCompteUsernameCtrl.hasError('usernameTaken')) {
        const errors = { ...this.formCompteUsernameCtrl.errors };

        delete errors['usernameTaken'];

        this.formCompteUsernameCtrl.setErrors(
          Object.keys(errors).length ? errors : null
        );
      }
    });
  }

  protected inscrire() {
    if (this.formCompteGroup.invalid) {
      return;
    }

    const compte: Compte = {
      ...this.formCompteGroup.getRawValue()
    };

    this.compteService.save(compte).subscribe({
      next: () => {
        this.router.navigate(['/login']),
        this.formCompteGroup.reset();
      },

      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.formCompteUsernameCtrl.setErrors({
            ...this.formCompteUsernameCtrl.errors,
            usernameTaken: true
          });
        }
      }
    });
  }

  protected annulerEdition() {
    this.formCompteGroup.reset();
  }

}
