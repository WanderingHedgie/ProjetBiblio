import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../model/collection';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private http = inject(HttpClient);
  private url = '/collection';

  findAll(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.url);
  }

  // Sans id : on a création (POST). Avec id : on a modification (PUT)
  save(collection: Collection): Observable<Collection> {
    if (collection.id) {
      return this.http.put<Collection>(`${this.url}/${collection.id}`, collection);
    }
    return this.http.post<Collection>(this.url, collection);
  }

  remove(collection: Collection): Observable<void> {
    return this.http.delete<void>(`${this.url}/${collection.id}`);
  }
}
