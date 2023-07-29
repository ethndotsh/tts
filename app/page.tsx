"use client";

import Image from "next/image";
import voices from "../public/voices.json";
import { Dropdown, DropdownItem, Button, Flex, Col, Card } from "@tremor/react";
import { useState, useRef } from "react";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";

function getAudioName(value: string | null): string {
  if (value === null) {
    return "No voice selected";
  }

  return voices.filter((voice) => voice.value === value)[0].name;
}

async function getAudio(voice: string, text: string): Promise<any> {
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ voice, text }),
  });

  return res.json();
}

export default function Home() {
  const [voice, setVoice] = useState<string | null>("en_us_ghostface");
  const [text, setText] = useState<string | null>(null);
  const [audio, setAudio] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>(
    "There was an error. Please try again later."
  );
  const [btnText, setBtnText] = useState<string>("Generate");

  const download = useRef<HTMLAnchorElement | null>(null);

  async function generateAudio() {
    setBtnText("Generating...");

    if (!voice) {
      setBtnText("Select a voice");

      setTimeout(() => {
        setBtnText("Generate");
      }, 1000);

      return;
    }

    if (!text) {
      setBtnText("Insert text");

      setTimeout(() => {
        setBtnText("Generate");
      }, 1000);

      return;
    }

    const data = await getAudio(voice, text);

    if (data.statusCode !== 200) {
      setBtnText("Generate");
      setErrorText(data.message);
      return setError(true);
    }

    setBtnText("Generate");
    return setAudio(data);
  }

  return (
    <div className="flex min-h-screen justify-center mx-2 md:mx-0">
      <div className="w-full max-w-2xl text-center">
        <div className="flex justify-center mt-24">
          <Image
            src="/tiktok-256.png"
            height="80"
            width="80"
            alt="TikTok logo"
          />
        </div>

        <h1 className="text-6xl font-bold mt-4 text-gray-900">TikTok TTS</h1>
        <p className="text-gray-600 mt-2">
          Built by{" "}
          <a
            target="_blank"
            className="text-blue-700 font-medium"
            href="https://ethn.sh"
            rel="noreferrer"
          >
            ethn
          </a>
        </p>
        <div className="w-full grid-cols-1 gap-2">
          <Col>
            <textarea
              placeholder="Type your message here (max 300 characters). Remember to comply with TikTok's community guidelines."
              maxLength={300}
              className="h-20 px-4 pt-2 w-full border-gray-200 border rounded-md mt-5 focus:ring-blue-300 resize-none shadow-sm focus:ring-2 focus:outline-none text-gray-700 text-sm"
              onChange={(event) => setText(event.target.value)}
            />
          </Col>
          <Col>
            <Flex justifyContent="center" className="space-x-2">
              <Dropdown
                placeholder="Select a voice"
                defaultValue={"en_us_ghostface"}
                onValueChange={(value) => setVoice(value)}
              >
                {voices.map((voice) => (
                  <DropdownItem
                    key={voice.value}
                    value={voice.value}
                    text={voice.name}
                  />
                ))}
              </Dropdown>
              <Button onClick={generateAudio}>{btnText}</Button>
            </Flex>
          </Col>
        </div>
        {audio ? (
          <Card className="mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{getAudioName(audio.voice)}</p>
              <p className="text-gray-600 font-medium">
                &quot;{audio.text}&quot;
              </p>

              <Button
                variant="light"
                iconPosition="right"
                className="my-2"
                icon={ArrowDownOnSquareIcon}
                onClick={() => {
                  download.current ? download.current.click() : null;
                }}
              >
                Download
              </Button>

              <a
                ref={download}
                className="display-none"
                download={`${getAudioName(audio.voice).toLowerCase()}.mp3`}
                href={audio.audio}
              />

              <audio controls className="mx-auto mt-4" src={audio.audio}>
                Browser too outdated to use audio. You can download above.
              </audio>
            </div>
          </Card>
        ) : error ? (
          <Card decoration="top" decorationColor="red" className="mt-4">
            <div className="text-center">
              <p className="font-medium">{errorText}</p>
            </div>
          </Card>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
