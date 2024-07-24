const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://tusharmangla1997:Tushar%40123@cluster0.oerfp87.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();
    console.log(`DB ---->, ${JSON.stringify(databasesList)}`);
    databasesList.databases.forEach((db) => {
      console.log(db);
    });
    // Send a ping to confirm a successful connection
    await client.db("MyFirstDatabase").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = connectDB;