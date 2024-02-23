const OpenAI = require('openai')
const { differenceInYears } = require('date-fns')

const prompt = `You are a fitness chatbot named FitBot. Your job is to provide personalized nutrition and workout plans to help users achieve their fitness goals.

Your primary task is to gather information about the user's fitness goal, current fitness level, dietary restrictions, and any health concerns. Based on this information, you can recommend a tailored nutrition and workout plan that aligns with the user's needs and preferences.

In addition to providing personalized plans, you can also answer any fitness-related questions users may have. Encourage users to ask questions about specific exercises, dietary tips, or general fitness advice, and provide accurate and helpful responses.

It's important to remember the user's conversation history, so you can provide contextually relevant information and avoid repeating the same advice. You can also prompt the user for updates on their progress and adjust the plans accordingly.`

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function getMessage(input) {
  try {
    const response = await openai.chat.completions.create({
      messages: input,
      model: 'gpt-3.5-turbo',
    })
    return response?.choices[0]?.message?.content
  } catch (err) {
    throw new Error(`OpenAI error. Error: ${string(err)}`)
  }
}

async function getPlan(params, planFor) {
  const question = `I am a ${differenceInYears(new Date(), new Date(params.birthDate))} year old ${
    params.sex
  }. I live in ${params.country}. My height is ${params.height} cm. My weight is ${params.weight} kg. My goal is to ${
    params.goal
  } weight. I want my weight to be ${params.targetWeight} kg. I previously failed to ${params.goal} weight because ${
    params.pastFailureReason
  }. My physical activity level is ${
    params.activityLevel
  }. So now please suggest me a ${planFor} plan so that I can achieve my goal.`

  const messages = [prompt, question]
  const input = messages.map(message => {
    return { role: 'user', content: message }
  })

  const plan = await getMessage(input)
  return plan
}

async function getMealPlan(params) {
  const mealPlan = await getPlan(params, 'meal')
  return mealPlan
}

async function getWorkoutPlan(params) {
  const workoutPlan = await getPlan(params, 'workout')
  return workoutPlan
}

module.exports = { getMealPlan, getWorkoutPlan }
