import { Button } from "antd";
import { contact } from "./types";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import api from "../api/contacts";
import { useEffect, useState } from "react";
import { GET_CONTACT_DETAILS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export type contactDetailsProps = {
  contactId: string | undefined;
  deleteContact: (id: string) => void;
};

export default function ContactDetails({
  contactId,
  deleteContact,
}: contactDetailsProps) {
  const navigate = useNavigate();

  const [contactDetails, setContactDetails] = useState<contact | null>(null);

  /** Fetch data from json server by axios  */

  const getContactDetails = async (contactId: string) => {
    try {
      const response = await api.get(`/contacts/${contactId}`);

      if (response.data) {
        setContactDetails(response.data);
      } else {
        throw new Error("Contact not found");
      }
    } catch (error) {
      // Handle errors from the API call
      console.error("Error while making the API call:", error);
      throw error;
    }
  };

  /**Query by apollow grapql */

  const { loading, error, data } = useQuery(GET_CONTACT_DETAILS, {
    variables: { id: contactId },
  });

  console.log("contact details", data);

  useEffect(() => {
    //if (contactId) getContactDetails(contactId as string);
    //
  }, [contactId]);

  if (!contactDetails) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="details-wrap">
      <div className="contact-details">
        <h1 className="title">Contact Details</h1>
        <div className="username">Name : {data?.contact?.name} </div>
        <div className="phone"></div>
        <div className="email">Email : {data?.contact?.email}</div>
      </div>
      <div className="action-contact">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            navigate("/edit", {
              state: { contact: data?.contact },
            });
          }}
        >
          Edit
        </Button>
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          danger
          onClick={() => deleteContact(data?.contact?.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
