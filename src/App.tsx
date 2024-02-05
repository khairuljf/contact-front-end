import { useEffect, useId, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import api from "./api/contacts";
import AddContactForm from "./components/AddContact";
import Contact from "./components/Contact";
import { contact } from "./components/types";
import "./index.css";
import EditContactForm from "./components/EditContact";
import { useQuery } from "@apollo/client";
import { GET_CONTACTS } from "./graphql/queries";

function App() {
  const id = useId();
  const { loading, error, data } = useQuery(GET_CONTACTS);
  const [contacts, setContacts] = useState<contact[]>([]);
  const [filter, setFilter] = useState("");
  const [contactId, setContactId] = useState<string>();

  console.log("loading", loading);
  console.log("data", data?.contacts);

  // Filter contact by name

  let filterContact = contacts?.filter((contact) => {
    return contact?.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
  });

  // Retrieve contacts
  // const retriveContacts = async () => {
  //   const response = await api.get("/contacts");
  //   return response.data;
  // };

  // if (data) {
  //   setContacts((prevState) => data?.contacts);
  // }

  useEffect(() => {
    /*
    const getAllContact = async () => {
      const allContact = await retriveContacts();

      if (allContact) {
        setContacts((prevState) => allContact);
      }
    };

    getAllContact();
*/
    setContacts((prevState) => data?.contacts);
  }, [data]);

  // Delete contact
  const deleteContact = async (id: string) => {
    const newContact = contacts?.filter((contact) => contact?.id !== id);
    try {
      const response: { data: contact } = await api.delete(`/contacts/${id}`);
      console.log("res", response);
      if (response.data) {
        setContacts(newContact);
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
