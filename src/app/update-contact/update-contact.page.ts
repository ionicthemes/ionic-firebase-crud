import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss'],
})
export class UpdateContactPage implements OnInit, OnDestroy {
  public contact: Contact;
  updateContactForm: FormGroup;
  formIsEdited: boolean = false;

  sub1: Subscription;
  sub2: Subscription;

  @ViewChild('updateForm') updateForm: FormGroupDirective;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sub1 = this.dataService.getContactById(id)
    .subscribe(contact => {
      // if the contact doesn't exists, return to home page
      if (!contact) {
        this.router.navigate(['/home']);
      } else {
        this.contact = contact;

        this.updateContactForm = new FormGroup({
          'firstName': new FormControl(this.contact.firstName, Validators.required),
          'lastName': new FormControl(this.contact.lastName, Validators.required),
          'email': new FormControl(this.contact.email),
          'phone': new FormControl(this.contact.phone, Validators.required),
          'category': new FormControl(this.contact.category, Validators.required)
        });

        this.sub2 = this.updateContactForm.valueChanges.subscribe(values => {
          this.formIsEdited = true;
        })
      }
    });
  }

  submitForm() {
    this.updateForm.onSubmit(undefined);
  }

  updateContact(values: any) {
    // copy all the form values into the contact to be updated
    let updatedContact: Contact = { id: this.contact.id, ...values };

    this.dataService.updateContact(updatedContact)
    .then(
      res => this.router.navigate(['/home'])
    );
  }

  deleteContact(contactId: string) {
    this.dataService.deleteContact(contactId)
    .then(
      res => this.router.navigate(['/home'])
    );
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
