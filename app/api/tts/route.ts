import { NextResponse } from "next/server";
import { sendErrorEmbed, sendSuccessEmbed } from "./embeds";

export const runtime = "edge";

export async function POST(request: Request) {
  const { text, voice } = (await request.json()) as {
    text: string;
    voice: string;
  };

  const encoded = text
    .replaceAll("+", "plus")
    .replaceAll(" ", "+")
    .replaceAll("&", "and")
    .replaceAll("#", "");

  const ttsReq = await fetch(
    `https://api16-normal-c-useast1a.tiktokv.com/media/api/text/speech/invoke/?text_speaker=${voice}&req_text=${encoded}&speaker_map_type=0&aid=1233`,
    {
      headers: {
        "User-Agent":
          "com.zhiliaoapp.musically/2022600030 (Linux; U; Android 7.1.2; es_ES; SM-G988N; Build/NRD90M;tt-ok/3.12.13.1)",
        Cookie: `sessionid=${process.env.TIKTOK_SESSION_ID}`,
        "Accept-Encoding": "gzip,deflate,compress",
      },
      method: "POST",
    }
  );
  const tts = await ttsReq.json();

  if (tts.message === "Couldn't load speech. Try again.") {
    await sendErrorEmbed({
      error: "Session token might be expired",
      voice,
      text,
    });
    return NextResponse.json(
      {
        statusCode: 400,
        message:
          "Invalid text or voice. Please try again with a different text or voice.",
      },
      { status: 400 }
    );
  }

  if (tts.status_code !== 0) {
    await sendErrorEmbed({
      error: `${tts.message} (Error generating your speech) <@862719183447130122>`,
      voice,
      text,
    });

    return NextResponse.json(
      {
        statusCode: 500,
        message:
          "There was an error generating your speech. Please try again later.",
      },
      { status: 500 }
    );
  }

  const audio = `data:audio/mpeg;base64,${tts.data.v_str}`;

  await sendSuccessEmbed({ voice, text });

  return NextResponse.json({
    statusCode: 200,
    message: "Success",
    audio,
    text,
    voice,
  });
}
