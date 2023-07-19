import bcrypt from 'bcrypt';

export default async function createUser(password) {

    const hashedPassword = await bcrypt.hash(password, 10);

    if (hashedPassword) {
        return hashedPassword;
    } else {
        throw new Error('Something went wrong!');
    }
  
}