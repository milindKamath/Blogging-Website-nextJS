import {MongoClient} from 'mongodb';

async function handler(req, res){
    if (req.method === "POST"){
        const blog = req.body;

        const client = await MongoClient.connect("mongodb://localhost:27017/nextblog")
        const db = client.db();

        const blogC = db.collection("blogs");

        const result = await blogC.insertOne(blog);

        client.close();

        res.status(201).json({message: "Status successful"})
    }
}

export default handler;