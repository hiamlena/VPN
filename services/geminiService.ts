
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateVpnPlan = async (): Promise<string> => {
  const prompt = `
Act as a senior network and cybersecurity architect. Your task is to create a comprehensive plan for deploying a corporate VPN for a transport company based in Krasnodar Krai, Russia. The plan should be detailed, practical, and easy to follow for a technical administrator. Format the entire response in structured Markdown with Russian language.

**Client's Requirements:**
- **Users:** ~40 truck drivers and one office.
- **Connectivity:** Drivers often use mobile internet in various regions.
- **Purpose:** Secure remote access to company resources (maps, tracking, corporate services).
- **User Experience:** Connection must be simple for non-technical users (e.g., config file/QR code, one-click connect).
- **Client Devices:** Mix of Android and iOS smartphones.
- **Server:** A single central server located outside the region/country with a stable connection.
- **Access Control:** Need to separate users into "drivers" and "office" groups with the ability to disable individual users.
- **Compliance:** Must adhere to information security best practices and local legislation.

**Generate a detailed plan with the following sections using "###" Markdown headings:**

### 1. Общая архитектура и выбор технологии
   - Justify the choice of VPN protocol (strongly recommend WireGuard and explain why it's a good fit for mobile users: performance, simplicity, roaming).
   - Describe the network topology (Client-to-Site).
   - Explain the user grouping and access control strategy using separate WireGuard interfaces or firewall rules.

### 2. Требования к VPS-серверу
   - Specify minimum and recommended vCPU, RAM, Storage, and Bandwidth for 40-50 concurrent users.
   - Recommend a few reputable international VPS providers (e.g., DigitalOcean, Hetzner, Vultr).

### 3. План развёртывания на сервере
   - Provide a step-by-step guide for setting up a Ubuntu 22.04 server.
   - List necessary software (e.g., wireguard-tools, a management UI like WireGuard-UI or wg-easy, UFW firewall).
   - Provide example commands for installation and basic configuration.
   - Explain how to configure the firewall (UFW) to allow WireGuard traffic and SSH, while denying everything else.
   - Describe a secure method for storing user keys and configurations, emphasizing the benefits of a management UI.

### 4. Управление пользователями и выдача доступов
   - Detail the process for generating configurations for 40+ users efficiently using a web UI.
   - Explain how to provide access via downloading configuration files and scanning QR codes directly from the UI.

### 5. Документация для администратора
   - **Добавление нового сотрудника:** Step-by-step instructions using the web UI.
   - **Отзыв доступа у сотрудника:** How to immediately disable or delete a user's access.
   - **Мониторинг и статистика:** Simple ways to check connected users, their last handshake time, and data transfer stats through the web UI.

### 6. Инструкция для водителей (Android и iOS)
   - Write a very simple, non-technical, step-by-step guide for a driver.
   - Use clear, numbered steps.
   - Provide separate, mirrored instructions for Android and iOS, including app store links, and how to import the configuration (via QR code as the primary method, and file as a backup).

### 7. Предложение по веб-панели администратора
   - Recommend using a ready-made open-source solution like **WireGuard-UI** or **wg-easy** deployed via Docker for simplicity and reliability.
   - Briefly describe the key features of such a panel: User list (with status), Add User button, Generate Config/QR button, Revoke Access button.
   - Explain that this panel directly modifies the WireGuard configuration files on the server, providing a safe and user-friendly abstraction layer.

Ensure all technical commands and code snippets are enclosed in Markdown code blocks. The language of the response must be Russian.
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to fetch plan from Gemini API.");
  }
};
