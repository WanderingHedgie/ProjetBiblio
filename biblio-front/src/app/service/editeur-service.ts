import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Editeur } from '../model/editeur';

@Injectable({ providedIn: 'root' })
export class EditeurService {
  private http = inject(HttpClient);
  private url = '/editeur';

  findAll(): Observable<Editeur[]> {
    return this.http.get<Editeur[]>(this.url);
  }

  // Sans id : on a création (POST). Avec id : on a modification (PUT)
  save(editeur: Editeur): Observable<Editeur> {
    if (editeur.id) {
      return this.http.put<Editeur>(`${this.url}/${editeur.id}`, editeur);
    }
    return this.http.post<Editeur>(this.url, editeur);
  }

  remove(editeur: Editeur): Observable<void> {
    return this.http.delete<void>(`${this.url}/${editeur.id}`);
  }
}