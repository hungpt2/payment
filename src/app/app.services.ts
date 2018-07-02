import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class PaymentService {
  list: AngularFireList<any[]>;
  payment: AngularFireList<any[]>;
  
  constructor(
    private paymentDatabase: AngularFireDatabase
  ) {
    this.list = paymentDatabase.list('pay-list');
    this.payment = paymentDatabase.list('payment');
   }

  setList(list) {
    this.paymentDatabase.object('pay-list').set(list)
  }

  getList() {
    return this.list;
  }

  storageFirebase(form, callback_success, callback_error) {
    this.paymentDatabase.list('payment').push(form)
    .then(resolve => {
      callback_success(resolve);
    }, reject => {
      callback_error(reject);
    });
  }
}