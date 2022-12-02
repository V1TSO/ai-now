const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();

app.get('/api/quiz', async (req, res) => {
    const { input } = req.query;
    if (!input) return res.status(400).send({ error: 'Missing input' });
    try {
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
    }
    catch (err) {
        res.status(400).send(error);
    }

});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});