import {gql} from '@apollo/client';


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