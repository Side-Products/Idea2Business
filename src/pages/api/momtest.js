import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const pitchDeckPromptPrefix = 
`The Mom Test: The Mom Test is a set of simple rules for crafting good questions that even your mom can't lie to you about.
They are collectively called The Mom Test:
1. Talk about their life instead of your idea.
2. Ask about specifics in the past instead of generics or opinions about the future.
3. Talk less and listen more.

Write the comprehensive content for the Mom test for the following startup:
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


