import mongoose from 'mongoose';

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(process.env.DB_CONNECT, dbOptions);

mongoose.connection.once('open', () => {
    console.log('Database Connection stablished');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
    process.exit(0);
});