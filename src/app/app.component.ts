import { Component } from '@angular/core';
import { Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from "angularfire2/database"; 
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  paymentForm: FormGroup;
  submitted = false;
  coursesObservable: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private paymentStorage: AngularFireDatabase
  ) { 
  }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      paymentName: ['', Validators.required],
      payment: ['', Validators.required],
      id: ['', Validators.required],
      key: ['', Validators.required],
      salt: ['', Validators.required],
      user: ['', Validators.required],
      pass: ['', Validators.required],
      del:[false],
      pickUp:[false],
      tableRes:[false]
    });
    this.coursesObservable = this.getList('/payment/pay-list');
    console.log('item', this.coursesObservable)
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
    const id = Math.random().toString(36).substring(2);
  }

  getList(listPath): Observable<any[]> {
    return this.paymentStorage.list(listPath).valueChanges();
  }
}
