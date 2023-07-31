import voices from "../../../public/voices.json";

async function getHookUrl(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch correct webhook url");
  }

  interface Webhook {
    id: string;
    token: string;
  }

  const webhook = (await response.json()) as Webhook;

  return `https://discord.com/api/v10/webhooks/${webhook.id}/${webhook.token}`;
}

export async function sendSuccessEmbed({
  voice,
  text,
}: {
  voice: string;
  text: string;
}) {
  const voiceName = voices.find((v) => v.value === voice)?.name ?? "Unknown";
  const url = await getHookUrl(process.env.DISCORD_WEBHOOK_URL!);

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          title: "New Generation",
          //   description: text,
          color: 3900150,
          fields: [
            { name: "Voice Name", value: voiceName },
            { name: "Voice Value", value: "`" + voice + "`" },
          ],
        },
      ],
      attachments: [],
    }),
  });
}

export async function sendErrorEmbed({
  error,
  voice,
  text,
}: {
  error: string;
  voice: string;
  text: string;
}) {
  const voiceName = voices.find((v) => v.value === voice)?.name ?? "Unknown";
  const url = await getHookUrl(process.env.DISCORD_WEBHOOK_URL!);

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          title: "Error Generating Speech",
          // description: text,
          color: 15680580,
          fields: [
            { name: "Voice Name", value: voiceName },
            { name: "Voice Value", value: "`" + voice + "`" },
            { name: "Error", value: error },
          ],
        },
      ],
      attachments: [],
    }),
  });
}
