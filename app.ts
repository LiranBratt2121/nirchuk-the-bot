import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { getRandomTime, sendMessage } from './utils';

const client = new Client({});
let dayCount = 1;
const phoneNumber = '+972549887803'; // Maromchuk's number.

client.on('ready', () => {
    console.log("WhatsApp client is ready");
    scheduleNextMessage();
});

client.on('qr', (qr) => {
    console.log('Generating QR');
    qrcode.generate(qr, { small: true });
});

client.initialize();

const scheduleNextMessage = () => {
    const randomTime = getRandomTime();
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(randomTime.hour, randomTime.minute, 0, 0);

    if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const msUntilTarget = targetTime.getTime() - now.getTime();
    console.log(`Message will be sent at ${randomTime.hour}:${randomTime.minute}`);

    setTimeout(() => {
        sendDailyMessage();
        scheduleNextMessage();
    }, msUntilTarget);
};

const sendDailyMessage = () => {
    const message = `יום ${dayCount} שלא העברת את המסגרת שלי לאופקים`;
    sendMessage(client, message, phoneNumber);
    console.log(`Message sent: ${message}`);
    dayCount++; 
};

