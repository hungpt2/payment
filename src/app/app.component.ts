import { Component } from '@angular/core';
import { Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
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
    this.getTypeList = this.paymentService.getList().valueChanges()
  }

  onCancel() {
    this.paymentForm.reset();
  }

  onSubmit() {
    console.log('submit')
    this.submitted = true;
    console.log(this.submitted)
    if (this.paymentForm.valid) {
      const formValue = this.paymentForm.value;
      let tempForm = {
        id: Math.random().toString(36).substring(2),
        name: formValue.paymentName,
        gateway: {
          payment: formValue.payment,
          id: formValue.id,
          key: formValue.key,
          salt: formValue.salt,
          user: formValue.user,
          pass: formValue.pass
        },
        applyFor: {
          del: formValue.del,
          pickUp: formValue.pickUp,
          tableRes: formValue.tableRes
        }
      }
      this.paymentService.storageFirebase(tempForm, (resolve) => {
        console.log('all good', resolve);
        this.submitted = false;
      }, (reject) => {
        console.log('error', reject);
        this.submitted = false;
      });
      this.paymentForm.reset();
    }
  }
}
