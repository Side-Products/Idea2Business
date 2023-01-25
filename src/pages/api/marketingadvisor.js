import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const pitchDeckPromptPrefix = 
`Write me a pitch to a potential future advisor if they would be interested in joining my startup to advise us on the marketing and strategy front. Write a comprehensive answer to convince them. Following is my startup:
`;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${pitchDeckPromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${pitchDeckPromptPrefix}${req.body.userInput}\n`,
    temperature: 0.9,
    max_tokens: 3000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;


