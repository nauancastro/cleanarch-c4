import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FreightResult {
    zipCode: string;
    value: number;
    days: number;
}

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FreightService {
    private apiUrl = `${environment.apiUrl}/api/public/freight`;

    constructor(private http: HttpClient) { }

    calculate(zip: string): Observable<FreightResult> {
        return this.http.get<FreightResult>(`${this.apiUrl}?zip=${zip}`);
    }
}
