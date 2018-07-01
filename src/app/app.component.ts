import { Component } from '@angular/core';
import { Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { Observable } from 'rxjs/Observable';
import {  Payment,  SelectFormVal,  payTypeList } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  paymentForm: FormGroup;
  submitted = false;
  coursesObservable: Observable<any[]>;
  list: AngularFireList<any[]>;
  payment: AngularFireList<any[]>;
  getTypeList: any;
  payTypeList = payTypeList;

  constructor(
    private formBuilder: FormBuilder,
    private paymentStorage: AngularFireDatabase
  ) {
    this.list = paymentStorage.list('pay-list');
    this.payment = paymentStorage.list('payment');
  }

  ngOnInit() {
    this.setList(this.payTypeList);
    this.paymentForm = this.formBuilder.group({
      paymentName: ['', Validators.required],
      payment: ['', Validators.required],
      id: ['', Validators.required],
      key: ['', Validators.required],
      salt: ['', Validators.required],
      user: ['', Validators.required],
      pass: ['', Validators.required],
      del: [false],
      pickUp: [false],
      tableRes: [false]
    });
    // this.coursesObservable = this.getList('getTypeList');
    this.getTypeList = this.getList().valueChanges()
    console.log('payTypeList', this.payTypeList)
  }

  onCancel() {
    console.log('on cancel')
    this.paymentForm.reset();
  }

  onSubmit() {
    console.log('on submit')
    if (!this.submitted) {
      this.submitted = true;
      if (this.paymentForm.valid) {
        let tempForm = {
          id: Math.random().toString(36).substring(2),
          name: this.paymentForm.value.paymentName,
          gateway: {
            payment: this.paymentForm.value.payment,
            id: this.paymentForm.value.id,
            key: this.paymentForm.value.key,
            salt: this.paymentForm.value.salt,
            user: this.paymentForm.value.user,
            pass: this.paymentForm.value.pass
          },
          applyFor: {
            del: this.paymentForm.value.del,
            pickUp: this.paymentForm.value.pickUp,
            tableRes: this.paymentForm.value.tableRes
          }
        }
        this.storageFirebase(tempForm);
        this.submitted = false;
        this.paymentForm.reset();
      }
    }
  }

  storageFirebase(form) {
    console.log(form)
    this.paymentStorage.list('payment').push(form);
  }

  getList() {
    return this.list;
  }

  setList(list) {
    this.paymentStorage.object('pay-list').set(list)
  }
}
