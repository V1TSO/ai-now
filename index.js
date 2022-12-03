import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config()


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express();
app.use(cors())

app.get('/api/quiz', async (req, res) => {
    const { input } = req.query;
    if (!input) return res.status(400).send({ error: 'Missing input' });
    try {
        console.log("A request is being processed");
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Write the perfect home for a person that likes:\n\n${input}\nDetailed Sentence:`,
            temperature: 0,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        res.send(response.data.choices[0].text);
        console.log(`Generated!`);
    }
    catch (error) {
        res.status(400).send(error);
        console.log("An error occurred");
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});