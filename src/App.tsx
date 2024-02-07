import { useEffect, useId, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import api from "./api/contacts";
import AddContactForm from "./components/AddContact";
import Contact from "./components/Contact";
import { contact } from "./components/types";
import "./index.css";
import EditContactForm from "./components/EditContact";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CONTACT, GET_CONTACTS } from "./graphql/queries";
import env from "react-dotenv";

function App() {
  const id = useId();
  const { loading, error, data } = useQuery(GET_CONTACTS);
  const [contacts, setContacts] = useState<contact[]>([]);
  const [filter, setFilter] = useState("");
  const [contactId, setContactId] = useState<string>();

  // Filter contact by name

  let filterContact = contacts?.filter((contact) => {
    return contact?.name?.toLowerCase().indexOf(filter?.toLowerCase()) >= 0;
  });

  useEffect(() => {
    setContacts((prevState) => data?.contacts);
  }, [data]);

  const [deleteContactFromList, {}] = useMutation(DELETE_CONTACT);

  // Delete contact
  const deleteContact = async (id: string) => {
    try {
      const result = await deleteContactFromList({
        variables: {
          id: id,
        },
      });

      if (result.data) {
        setContacts((prevState) => result.data.deleteContact);
        setContactId("");
      }
    } catch (error) {
      // Handle errors from the API call
      console.error("Error while making the API call:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="app-wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <Contact
              contacts={filterContact}
              setContactId={setContactId}
              contactId={contactId}
              filterContact={setFilter}
              deleteContact={deleteContact}
            />
          }
        />
        <Route
          path="/add"
          element={<AddContactForm setContacts={setContacts} />}
        />
        <Route
          path="/edit"
          element={
            <EditContactForm contacts={contacts} setContacts={setContacts} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
