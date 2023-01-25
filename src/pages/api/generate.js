import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const basePromptPrefix = 
// `Generate the Executive Summary, Problem Statement, Solution, Market Opportunity, Business Model, Unique Selling Point, Target Audience, Competitive Landscape, Financial Model, and Traction for the following product:
// `;

const pitchDeckPromptPrefix = 
`Reference: https://www.ycombinator.com/library/4T-how-to-design-a-better-pitch-deck
Write 1 comprehensive paragraph for each of the following topics, following the guidelines provided by YCombinator (see above reference): Problem, Solution, Market Opportunity, Product, Business Model, Competition, Traction, Financials, Team, Ask, Unique Selling Point, and Target Audience for the following product:
`;

// const basePromptPrefix = 
// `Write me a detailed explanation of the following like I'm a 10-year-old kid:
// `;
// const basePromptPrefix = 
// `Simplify the following problem so that any weak student can also understand the problem properly. Also, provide and explain the solution comprehensively:
// `;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${pitchDeckPromptPrefix}${req.body.userInput}`)
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${pitchDeckPromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 3000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;

// const basePromptPrefix =
// `
// Write me a detailed table of contents for a blog post with the title below.

// Title:
// `

// const generateAction = async (req, res) => {
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${basePromptPrefix}${req.body.userInput}`,
//     temperature: 0.8,
//     max_tokens: 250,
//   });
  
//   const basePromptOutput = baseCompletion.data.choices.pop();

//   // I build Prompt #2.
//   const secondPrompt = 
//   `
//   Take the table of contents and title of the blog post below and generate a blog post written in thwe style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

//   Title: ${req.body.userInput}

//   Table of Contents: ${basePromptOutput.text}

//   Blog Post:
//   `
  
//   // I call the OpenAI API a second time with Prompt #2
//   const secondPromptCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${secondPrompt}`,
//     // I set a higher temperature for this one. Up to you!
//     temperature: 0.85,
// 		// I also increase max_tokens.
//     max_tokens: 1250,
//   });
  
//   // Get the output
//   const secondPromptOutput = secondPromptCompletion.data.choices.pop();

//   // Send over the Prompt #2's output to our UI instead of Prompt #1's.
//   res.status(200).json({ output: secondPromptOutput });
// };

// export default generateAction;


