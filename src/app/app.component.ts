import { Component } from '@angular/core';
import { Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { payTypeList } from './app.model';
import { PaymentService } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  paymentForm: FormGroup;
  submitted = false;
  coursesObservable: Observable<any[]>;
  getTypeList: any;
  payTypeList = payTypeList;

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.paymentService.setList(this.payTypeList);
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
    this.getTypeList = this.paymentService.getList().valueChanges()
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
        this.paymentService.storageFirebase(tempForm);
        this.submitted = false;
        this.paymentForm.reset();
      }
    }
  }
}
