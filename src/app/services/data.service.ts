import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) {}

  getContacts(): Observable<Contact[]> {
    const contactsCollection = collection(this.firestore, 'contacts');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(contactsCollection, {idField: 'id'})
    .pipe(
      map(contacts => contacts as Contact[])
    );
  }

  getContactById(id: string): Observable<Contact> {
    const document = doc(this.firestore, `contacts/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Contact;
      })
    );
  }

  createContact(contact: Contact): Promise<void> {
    const document = doc(collection(this.firestore, 'contacts'));
    return setDoc(document, contact);
  }

  updateContact(contact: Contact): Promise<void> {
    const document = doc(this.firestore, 'contacts', contact?.id);
    const { id, ...data } = contact; // we don't want to save the id inside the document
    return setDoc(document, data);
  }

  deleteContact(id: string): Promise<void> {
    const document = doc(this.firestore, 'contacts', id);
    return deleteDoc(document);
  }
}
