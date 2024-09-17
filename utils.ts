import { Client } from "whatsapp-web.js";

export const sendMessage = (client: Client, message: string, number: string) => {
    const chatId = number.substring(1) + "@c.us";
    client.sendMessage(chatId, message);
}

export const getRandomTime = () => {
    const startHour = 9;  // 9 AM
    const endHour = 21;   // 9 PM
    const randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
    const randomMinute = Math.floor(Math.random() * 60);  // Random minute between 0-59
    return { hour: randomHour, minute: randomMinute };
};
