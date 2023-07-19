import { gql, ApolloServer } from 'apollo-server';
import './db.js'
import User from './models/User.js';
import Movie from './models/Movie.js';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import createUser from './helpers/signup.js';

const typeDefinitions = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        list: [Movie] 
    }
    type Movie {
        _id: ID!
        userId: ID!
        name: String!
        plot: String!
        img: String!
        cast: [String!]!
    }
    input MovieInput {
        name: String
        plot: String
        img: String
        cast: [String]
    }      
    type Query {
        userCount: Int!
        allUsers: [User]!
        findUser(id: ID!): User
        allMovies: [Movie]!
    }
    type Mutation {
        addUser(name: String!, email: String!, password: String! ): User
        addMovie(movie: MovieInput!, userId: ID!): Movie
        editMovie(movieID: ID!, newMovie: MovieInput!): Movie
        login(email: String!, password: String!): User
    }
`;

const resolvers = {
  Query: {
    userCount: () => User.collection.countDocuments(),
    allUsers: async () => {
      const users = await User.find({}).exec();
      return users;
    },
    findUser: (root, args) => {
      const { id } = args;
      return User.findById(id);
    },
    allMovies: () => Movie.find().exec(),
  },
  Mutation: {
    addUser: async (root, args) => {

      const { name, email, password } = args;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Someone already has this email address. Try another name.');
      }

      const hashPassword = await createUser(password)

      const newUser = new User({ name, email, password: hashPassword });

      if (!newUser) {
        throw new Error('Something went wrong!');
      }

      await newUser.save()
      return newUser
    },
    addMovie: async (root, args) => {
      const { movie, userId } = args;

      const user = await User.findOne({ _id: userId });

      if (!user) {
        throw new Error('User not found.');
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid userId. It should be a valid ObjectId.');
      }

      const newMovie = new Movie({ ...movie, userId: userId }); 
      await newMovie.save();

      user.list.push(newMovie._id);
      await user.save();

      return newMovie.toObject();
    },
    editMovie: async (root, args) => {
      const { movieID, newMovie } = args;
      const movie = await Movie.findOne({ _id: movieID });
      if (movie) {
        movie.name = newMovie.name;
        movie.plot = newMovie.plot;
        movie.img = newMovie.img;
        movie.cast = newMovie.cast;
        await movie.save();
        return movie;
      }
      throw new Error('Movie not found.');
    },
    login: async (root, args) => {
      console.log(args)
      const { email, password } = args;
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new Error('No user found.');
      }

      
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Wrong password.');
      }

      return user;
    }
  },
  User: {
    _id: (user) => user._id.toString(), 
    name: (user) => user.name,
    email: (user) => user.email,
    password: (user) => user.password,
    list: (user) => Movie.find({ userId: user._id }).exec(),
  },
  Movie: {
    _id: (movie) => movie._id.toString(),
    userId: (movie) => movie.userId.toString(),
  },
};


const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

  

//root es el objeto que contiene la query actual
//args son los argumentos de la query
//context es un objeto compartido entre todas las resolvers

//allUsers necesitamos una seleccion de subcampos para que funcione, hay que describir los subcampos que queremos extraer. EJEMPLO
// query { 
//     allUsers {
//         name
//         email
//     }
// }

//cuando no tengo un campo y NO es requerido (!) me devuelve null
//cuando no tengo un campo y SI es requerido (!) me devuelve un error

// typedefs es la definicion de los datos que tenemos, los tipos de datos que tenemos
// query es para pedir datos, hay que describir las peticiones que se pueden hacer

//  type Query {
//    (pedimos) -> userCount: Int!  <-  (devuelve un entero)
//     allUsers: [User]!
//     findUser(name: String!): User
// }

// mutation es para modificar datos
// type es para definir un tipo de dato
// input es para definir un tipo de dato que se va a usar como argumento en una mutation

// userCount: Int!    me devuelve cuantos usuarios hay. numero int. query userCount
// allUsers: [User!]! me devuelve todos los usuarios
// findUser(name: String!): User  



// query {
// Campos que deseas solicitar, pueden ser muchos, todos, algunos, o uno solo
// }
// query {
//     allUsers {
//       email
//       name
//       id
//       list {
//         cast
//         img
//         name
//         plot
//       }
//     }
//   }
//   query {
//     findUser(id: "1") {
//       name
//       email
//     }
//   }
//   query {
//     findUser(id: "1") {
//       name
//       email
//       list {
//         name
//         plot
//         img
//         cast
//       }
//     }
//   }
  


// mutation {
//     addUser(name: "Valentina", email: "vale@hotmail.com", list: []) {
//      name
//      email
//      list {
//        name
//        plot
//        img
//        id
//        cast
//      }
//      id
//    }
//  }

// mutation {
//     addMovie(
//       movie: {
//         name: "Harry Potter"
//         plot: "Descripción de la película"
//         img: "URL de la imagen"
//         cast: ["Actor 1", "Actor 2", "Actor 3"]
//       }, userId: "64b0eb4a8c5a97c0c3bb415e"
//     ) {
//       name
//       plot
//       img
//       id
//       cast
//     }
//   }
  
  