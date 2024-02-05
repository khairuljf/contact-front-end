import React from "react";
import ContactDetails from "./ContactDetails";
import ContactList from "./ContactList";
import { contact } from "./types";

export type contactProps = {
  contacts: contact[];
  setContactId: React.Dispatch<React.SetStateAction<string | undefined>>;
  contactId: string | undefined;
  filterContact: (name: string) => void;
  deleteContact: (id: string) => void;
};

export default function Contact({
  contacts,
  contactId,
  setContactId,
  filterContact,
  deleteContact,
}: contactProps) {
  return (
    <>
      <ContactList
        contacts={contacts}
        setContactId={setContactId}
        filterContact={filterContact}
      />
      <ContactDetails
        contactId={contactId}
        deleteContact={deleteContact}
      />
    </>
  );
}
