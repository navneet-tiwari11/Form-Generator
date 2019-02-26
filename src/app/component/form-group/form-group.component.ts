import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  @Input() nestedFormGroup;
  @Input() form: FormGroup
  constructor() { }

  ngOnInit() {
    console.log(this.nestedFormGroup);
    console.log(this.form)
  }

}
