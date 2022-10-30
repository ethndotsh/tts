import type { NextApiRequest, NextApiResponse } from "next";
import { withAxiom, log } from "next-axiom"

import type { AxiomAPIRequest } from "next-axiom/dist/withAxiom"

async function handler(
    req: AxiomAPIRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ statusCode: 405, message: "Method Not Allowed" });
    }

    const { text, voice } = req.body;

    const encoded = text.replaceAll("+", "plus").replaceAll(" ", "+").replaceAll("&", "and");

    const headers = {
        'User-Agent': 'com.zhiliaoapp.musically/2022600030 (Linux; U; Android 7.1.2; es_ES; SM-G988N; Build/NRD90M;tt-ok/3.12.13.1)',
        'Cookie': `sessionid=${process.env.TIKTOK_SESSION_ID}`
    }

    const fetchTTS = await fetch(`https://api16-normal-c-useast1a.tiktokv.com/media/api/text/speech/invoke/?text_speaker=${voice}&req_text=${encoded}&speaker_map_type=0&aid=1233`, { headers, method: "POST" });
    const tts = await fetchTTS.json();

    if (tts.message === "Couldn't load speech. Try again.") {
        return res.status(400).json({ statusCode: 400, message: "Invalid voice." });
    }

    if (tts.status_code !== 0) {
        return res.status(500).json({ statusCode: 500, message: "There was an internal error." });
    }

    req.log.info("Audio generated", { text, voice, tts })

    const audio = `data:audio/mpeg;base64,${tts.data.v_str}`;

    return res.status(200).json({ statusCode: 200, message: "Success", audio, text, voice });


}

export default withAxiom(handler)