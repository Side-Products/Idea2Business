import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const pitchDeckPromptPrefix = `Reference: https://www.ycombinator.com/library/4T-how-to-design-a-better-pitch-deck
Write 1 comprehensive paragraph for each of the following topics, following the guidelines provided by YCombinator (see above reference): Problem, Solution, Market Opportunity, Product, Business Model, Competition, Traction, Financials, Team, Ask, Unique Selling Point, and Target Audience for the following product:
`;

const generateAction = async (req, res) => {
	// Run first prompt
	const baseCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${pitchDeckPromptPrefix}${req.body.userInput}\n`,
		temperature: 0.7,
		max_tokens: 3000,
	});

	const basePromptOutput = baseCompletion.data.choices.pop();

	res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
