import {gql} from '@apollo/client';

//Get Queries 

export const GET_CONTACTS = gql`

  query contacts{
    contacts {
        id
        name
        email
    }
}
`;


export const GET_CONTACT_DETAILS = gql`

  query contact($id:ID!){
    contact(id:$id) {
        id
        name
        email
    }
}
`;

// Mutations or add, update, delete


export const ADD_CONTACT = gql`
  mutation addContact($name: String!, $email: String!) {
    addContact(contact: { name: $name, email: $email }) {
      name
      email
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
     id
    }
  }
`;





