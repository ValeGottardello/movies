import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function createUser(password) {

    const hashedPassword = await bcrypt.hash(password, 10);

    if (hashedPassword) {
        return hashedPassword;
    } else {
        throw new Error('Something went wrong!');
    }
  
}


function createJsonWebToken(data) {
    console.log(data._id)
    const user = {
        _id: data._id.split("(")[1].split(")")[0], 
        name: data.name,
        email: data.email,
        list: data.list,
    };

    const token = jwt.sign(user, process.env.REACT_APP_SECRET, { expiresIn: "24h" });
    return token;
}

export {
    createUser,
    createJsonWebToken
}
