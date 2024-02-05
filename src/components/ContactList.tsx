import { FolderViewOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { contact } from "./types";

export type contacts = {
  contacts: contact[];
  setContactId: React.Dispatch<React.SetStateAction<string | undefined>>;
  filterContact: (name: string) => void;
};

export default function ContactList({
  contacts,
  setContactId,
  filterContact,
}: contacts) {
  return (
    <div className="contact-list">
      <div className="search">
        <input
          type="text"
          placeholder="Search contact"
          onChange={(e) => {
            filterContact(e.target.value);
          }}
        />
        <Link to={"/add/"}>Add Contact</Link>
      </div>
      <div className="contacts">
        <ul>
          {contacts?.map((contact: contact, index) => {
            return (
              <li key={index} className="single-contact">
                <span>{contact?.name}</span>
                <Button
                  type="primary"
                  icon={<FolderViewOutlined />}
                  onClick={(e) => {
                    console.log(e.target);
                    setContactId((prevState) => contact?.id);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
