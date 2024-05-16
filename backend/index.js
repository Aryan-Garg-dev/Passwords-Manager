import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import rootRouter from "./routes/index.js"

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", rootRouter);

app.all('*', (req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(PORT, (req, res)=>{
    console.log(`App is listening to the PORT ${PORT}`)
})