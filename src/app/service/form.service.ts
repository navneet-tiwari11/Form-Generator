import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private _http: HttpClient) {   }

  public getFormJSON(): Observable<any> {
    return this._http.get('../../assets/schema.json');
  }

  public getFormGroupJSON(): Observable<any> {
    return this._http.get('../../assets/formGroup.json');
  }

  public getFormTextBoxJSON(): Observable<any> {
    return this._http.get('../../assets/textBox.json');
  }

  public getFormPassTextBoxJSON(): Observable<any> {
    return this._http.get('../../assets/passTextBox.json');
  }

  public getFormCheckBoxJSON(): Observable<any> {
    return this._http.get('../../assets/checkbox.json');
  }

  public getFormRadioButtonJSON(): Observable<any> {
    return this._http.get('../../assets/radio.json');
  }

  public getFormDateJSON(): Observable<any> {
    return this._http.get('../../assets/date.json');
  }

  public getformDropDownJSON(): Observable<any> {
    return this._http.get('../../assets/dropdown.json');
  }

}
