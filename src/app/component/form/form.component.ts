import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, NgForm, FormGroupName } from '@angular/forms'

import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  public formView;
  public form;
  public formGroupName;
  public formTextBoxName;
  public formPassTextBoxName;
  public formCheckBoxName;
  public formRadioButtonName;
  public formDateName;
  public formDropDownName;

  public formGroupSelected;
  public formGroupArray = []

  public formJsonData;
  public formGroupJsonData;
  public formTextBoxJsonData;
  public formPassTextBoxJsonData;
  public formCheckBoxJsonData;
  public formRadioButtonJsonData;
  public formDateJsonData;
  public formDropDownJsonData;


  public clickedButton = [];
  public formClicked;
  public formGroupClicked;
  public formTextBoxClicked;
  public formPassTextBoxClicked;
  public formCheckBoxClicked;
  public formRadioButtonClicked;
  public formDateClicked;
  public formDropDownClicked;

  public display;


  constructor(private _formService: FormService) { }

  ngOnInit() {
    this._formService.getFormJSON().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.formJsonData = data;
        this.form = this.formJsonData.formName[0];
      }
    );
  }

  /*
      @desc "Recursive Approach for inserting field Data at particular Position"
      @author : Parag Badala
      @params : {Object}, {object}
  */
  public searchObject(mainData, data) {
    for (var i = 0; i < mainData.length; i++) {
      if (mainData[i].name == this.formGroupSelected) {
        mainData[i].fields.push(data)
        return;
      }
      else {
        if (mainData[i].hasOwnProperty('fields') && mainData[i].fields.length) {
          this.searchObject(mainData[i].fields, data)
        }
      }
    }
  }

  /*
      @desc "Recursive Approach for inserting FormControl to Particular FormGroup"
      @author : Parag Badala
      @params : {NgForm} form Object, {string} formControl, {formGroup | formControl} 
  */
  public searchFormControl(form, name, controlType) {
    for (var items in form) {
      if (form.hasOwnProperty(this.formGroupSelected)) {
        form[this.formGroupSelected].addControl(name, controlType)
        return;
      }
      else {
        if (form[items].hasOwnProperty('controls') && Object.getOwnPropertyNames(form[items].controls).length) {
          this.searchFormControl(form[items].controls, name, controlType);
        }
      }
    }
  }

  /*
      @desc "Initializing the form"
      @author : Parag Badala
  */
  public generateForm() {
    this.formView = true;
    this.formClicked = "Form Initialized";
    this.clickedButton.push(this.formClicked);
    this.form = new FormGroup({});
    this.formGroupArray.push(this.form);
  }

  /*
      @desc "Creates the FormGroup"
      @author : Parag Badala
  */
  public generateFormGroup() {
    this._formService.getFormGroupJSON().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.formGroupJsonData = data;
        this.formGroupJsonData.name = Math.random().toString().replace('0.', '');
        this.formGroupName = this.formGroupJsonData.name;
        this.formGroupJsonData.formGroupName = this.formGroupSelected;
        this.formJsonData.formGroup.push(this.formGroupName);
        if (this.formGroupSelected == 'form') {
          this.formJsonData.container.myForm.formData.fields.push(this.formGroupJsonData)
          this.form.addControl(this.formGroupName, new FormGroup({}))
        }
        else {
          this.searchObject(this.formJsonData.container.myForm.formData.fields, this.formGroupJsonData);
          var controlType = new FormGroup({})
          this.searchFormControl(this.form.controls, this.formGroupName, controlType);
        }
        this.formGroupArray.push(this.formGroupName);
      }
    );
    this.formGroupClicked = "FormGroupAdded";
    this.clickedButton.push(this.formGroupClicked);
  }

  /*
      @desc "Creates TextBox"
      @author : Parag Badala
  */
  public generateTextBox() {
    this._formService.getFormTextBoxJSON().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.formTextBoxJsonData = data;
        this.formTextBoxJsonData.name = Math.random().toString().replace('0.', '');
        this.formTextBoxJsonData.formGroupName = this.formGroupSelected;
        this.formTextBoxName = this.formTextBoxJsonData.name;
        if (this.formGroupSelected == 'form') {
          this.formJsonData.container.myForm.formData.fields.push(this.formTextBoxJsonData);
          this.form.addControl(this.formTextBoxName, new FormControl('', Validators.required));
        }
        else {
          this.searchObject(this.formJsonData.container.myForm.formData.fields, this.formTextBoxJsonData);
          var controlType = new FormControl('', Validators.required)
          this.searchFormControl(this.form.controls, this.formTextBoxName, controlType);
        }
      }
    );
    this.formTextBoxClicked = "TextBox Added";
    this.clickedButton.push(this.formTextBoxClicked);
  }

  /*
      @desc "Creates Password Field"
      @author : Parag Badala
  */
  public generatePassTextBox() {
    this._formService.getFormPassTextBoxJSON().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.formPassTextBoxJsonData = data;
        this.formPassTextBoxJsonData.name = Math.random().toString().replace('0.', '');
        this.formPassTextBoxJsonData.formGroupName = this.formGroupSelected;
        this.formPassTextBoxName = this.formPassTextBoxJsonData.name;
        if (this.formGroupSelected == 'form') {
          this.formJsonData.container.myForm.formData.fields.push(this.formPassTextBoxJsonData);
          this.form.addControl(this.formPassTextBoxName, new FormControl('', Validators.required));
        }
        else {
          this.searchObject(this.formJsonData.container.myForm.formData.fields, this.formPassTextBoxJsonData);
          var controlType = new FormControl('', Validators.required)
          this.searchFormControl(this.form.controls, this.formPassTextBoxName, controlType);
        }
      }
    );
    this.formPassTextBoxClicked = "Password Field Added";
    this.clickedButton.push(this.formPassTextBoxClicked);
  }

  /*
      @desc "Creates CheckBox"
      @author : Parag Badala
  */
  public generateCheckBox() {
    this._formService.getFormCheckBoxJSON().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.formCheckBoxJsonData = data;
        this.formCheckBoxJsonData.name = Math.random().toString().replace('0.', '');
        this.formCheckBoxJsonData.formGroupName = this.formGroupSelected;
        this.formCheckBoxName = this.formCheckBoxJsonData.name;
        if (this.formGroupSelected == 'form') {
          this.formJsonData.container.myForm.formData.fields.push(this.formCheckBoxJsonData);
          this.form.addControl(this.formCheckBoxName, new FormControl('', Validators.required));
        }
        else {
          this.searchObject(this.formJsonData.container.myForm.formData.fields, this.formCheckBoxJsonData);
          var controlType = new FormControl('', Validators.required)
          this.searchFormControl(this.form.controls, this.formCheckBoxName, controlType);
        }
      }
    );
    this.formCheckBoxClicked = "CheckBox Added";
    this.clickedButton.push(this.formCheckBoxClicked);
  }

  /*
      @desc "Creates RadioButton"
      @author : Parag Badala
  */
  public generateRadioButton() {
    this._formService.getFormRadioButtonJSON().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.formRadioButtonJsonData = data;
        this.formRadioButtonJsonData.name = Math.random().toString().replace('0.', '');
        this.formRadioButtonJsonData.formGroupName = this.formGroupSelected;
        this.formRadioButtonName = this.formRadioButtonJsonData.name;
        if (this.formGroupSelected == 'form') {
          this.formJsonData.container.myForm.formData.fields.push(this.formRadioButtonJsonData);
          this.form.addControl(this.formRadioButtonName, new FormControl('', Validators.required));
        }
        else {
          this.searchObject(this.formJsonData.container.myForm.formData.fields, this.formRadioButtonJsonData);
          var controlType = new FormControl('', Validators.required)
          this.searchFormControl(this.form.controls, this.formRadioButtonName, controlType);
        }

      }
    );
    this.formRadioButtonClicked = "RadioButton Added";
    this.clickedButton.push(this.formRadioButtonClicked);
  }

  /*
      @desc "Creates DatePicker Field"
      @author : Parag Badala
  */
  public generateDate() {
    this._formService.getFormDateJSON().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.formDateJsonData = data;
        this.formDateJsonData.name = Math.random().toString().replace('0.', '');
        this.formDateJsonData.formGroupName = this.formGroupSelected;
        this.formDateName = this.formDateJsonData.name;
        if (this.formGroupSelected == 'form') {
          this.formJsonData.container.myForm.formData.fields.push(this.formDateJsonData);
          this.form.addControl(this.formDateName, new FormControl('', Validators.required));
        }
        else {
          this.searchObject(this.formJsonData.container.myForm.formData.fields, this.formDateJsonData);
          var controlType = new FormControl('', Validators.required)
          this.searchFormControl(this.form.controls, this.formDateName, controlType);
        }
      }
    );
    this.formDateClicked = "Date Field Added";
    this.clickedButton.push(this.formDateClicked);
  }

  /*
      @desc "Creates DropDown List"
      @author : Parag Badala
  */
  public generateDropDown() {
    this._formService.getformDropDownJSON().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.formDropDownJsonData = data;
        this.formDropDownJsonData.name = Math.random().toString().replace('0.', '');
        this.formDropDownJsonData.formGroupName = this.formGroupSelected;
        this.formDropDownName = this.formDropDownJsonData.name;
        if (this.formGroupSelected == 'form') {
          this.formJsonData.container.myForm.formData.fields.push(this.formDropDownJsonData);
          this.form.addControl(this.formDropDownName, new FormControl('', Validators.required));
        }
        else {
          this.searchObject(this.formJsonData.container.myForm.formData.fields, this.formDropDownJsonData);
          var controlType = new FormControl('', Validators.required)
          this.searchFormControl(this.form.controls, this.formDropDownName, controlType);
        }
      }
    );
    this.formDropDownClicked = "DropDown Added";
    this.clickedButton.push(this.formDropDownClicked);
  }

  /*
      @desc "Sends selected dropDown value"
      @author : Parag Badala
  */
  public selectChangeHandler(event: any) {
    this.formGroupSelected = event.target.value;
  }

  /*
      @desc "Display Form on Browser"
      @author : Parag Badala
  */
  public displayForm() {
    this.display = true;
  }

  /*
      @desc "Saves Form Data"
      @author : Parag Badala
  */
  public save(form: NgForm) {
    alert("Saved")
  }

}