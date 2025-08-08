import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
import { delay, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TextStreamService {

  constructor() { }

  streamText(text: string): Observable<string> { 
    const characters = text.split(''); 
    return of(...characters).pipe(concatMap(char => of(char).pipe(delay(3))));
  }
}
