import { API_URL } from "../env-vars";

export const askBot = async (userId, messageToSend, selectedLanguage) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        message: messageToSend,
        language: selectedLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const botReply = await response.json();
    return botReply;
  } catch (error) {
    console.error("Error communicating with Bot:", error);
    throw error;
  }
};

export const getChatHistory = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/chat/history/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const botReply = await response.json();

    return botReply;
  } catch (error) {
    console.error("Error communicating with Bot:", error);
  }
};
