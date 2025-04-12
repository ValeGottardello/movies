// import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';


// export const createUser = async (query, setUser) => {

//     const { name, email, password } = query;

//     let queryGql = gql`
//         mutation addUser($name: String!, $email: String!, $password: String!) {
//         addUsers (
//             name: $name
//             email: $email
//             password: $password
//         ) {
//           _id
//           email
//           name
//           list {
//             _id
//             name
//             cast
//             img
//             plot
//           }
//         }
//       }`
    
//     try {
//         const client = new ApolloClient({
//             connectToDevTools: true,
//             cache: new InMemoryCache(), 
//             link: new HttpLink({
//                 uri: `${process.env.REACT_APP_SERVER}`
//             }),
//           })
          

//         const { data, error, loading } = await client.query({
//             query: queryGql,
//             variables: {
//                 name,
//                 email,
//                 password
//             }
//         });

//         console.log(data, error, loading);

//         if (response.status === 200) {
//             const user = await response.json();
//             setUser(user);
//         } else {
//             throw new Error("Error signing up");
//         }
//     } catch (e) {
//         console.error("Error:", e);
//         throw e;
//     }
// };
