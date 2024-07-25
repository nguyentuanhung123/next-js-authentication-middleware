import mongoose from "mongoose";

const connectToDB = async () => {
    const connectionUrl = 'mongodb+srv://nguyentuanhung4529871036:nguyentuanhung123@next-auth.dpgreq6.mongodb.net/?retryWrites=true&w=majority&appName=next-auth';

    mongoose 
        .connect(connectionUrl)
        .then(() => console.log('Auth database connected successfully.'))
        .catch((e) => console.log(e))
}

export default connectToDB;