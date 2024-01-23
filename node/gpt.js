let ChatGPTAPI;

async function example() {
  if (!ChatGPTAPI) {
    ChatGPTAPI = (await import('chatgpt')).ChatGPTAPI;
  }

  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}

module.exports = example;