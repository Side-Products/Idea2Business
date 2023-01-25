import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const pitchDeckPromptPrefix = 
`SPME (Strategy, Positioning, Messaging, Experimentations): Marketing for solopreneurs.
Strategy: the way toward your first position, the way from position to the next position, like a staircase up and to the right.
Positioning: A position is a context, an environment in which your product appears. Your future customers put your product into such a mental position. This happens in their own minds.
Messaging: Messaging is about crafting successful messages that you can send to your audience. Messages should transport information and cause emotion. The information your audience needs to develop emotions that lead them to buy your product.
Experimentations:  It consists of a story you want to tell, a channel by which to reach your audience, a hypothesis of what will happen when they get the story, the materials you need to tell the story (text, images, video, audio...), the recipe about how you process and combine those materials, and the tools you need to execute the recipe.
Generate Strategy, Positioning, Messaging, and Experimentations for marketing of the following startup:
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


