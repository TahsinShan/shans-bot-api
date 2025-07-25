// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { messages } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openrouter/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant chatbot on Tahsin Hasan Shan’s website. Answer questions about Shan, his projects (like Pangolin), achievements, and contact details."
        },
        ...messages
      ]
    })
  });

  const data = await response.json();

  if (!data.choices || !data.choices[0]) {
    return res.status(500).json({ reply: "Error: No response from AI." });
  }

  res.status(200).json({ reply: data.choices[0].message.content });
}
