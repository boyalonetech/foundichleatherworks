export default async function handler(
  req: { method: string; body: { message: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error?: string; response?: any }): void; new (): any };
    };
  }
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  // Replace these with your actual values
  const CHATBASE_API_KEY = "YOUR_API_KEY";
  const CHATBASE_AGENT_ID = "YOUR_AGENT_ID";

  try {
    const response = await fetch("https://www.chatbase.co/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHATBASE_API_KEY}`,
      },
      body: JSON.stringify({
        message,
        chatbotId: CHATBASE_AGENT_ID,
      }),
    });

    const data = await response.json();
    res.status(200).json({ response: data.response });
  } catch (error) {
    res.status(500).json({ error: "Error communicating with Chatbase" });
  }
}
