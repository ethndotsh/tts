"use client";

import Image from "next/image";
import voices from "../public/voices.json";
import {
  Dropdown,
  DropdownItem,
  Button,
  ButtonInline,
  Flex,
  Col,
  ColGrid,
  Block,
  Card,
} from "@tremor/react";
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
  const [voice, setVoice] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [audio, setAudio] = useState<any>();
  const [error, setError] = useState<boolean>(false);
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
      return setError(true);
    }

    setBtnText("Generate");
    return setAudio(data);
  }

  return (
    <div className="flex min-h-screen justify-center mx-2 md:mx-0">
      <Block maxWidth="max-w-3xl" textAlignment="text-center">
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
            href="https://cursecode.me"
          >
            curse
          </a>
        </p>
        <ColGrid numCols={1} gapX="gap-x-2" gapY="gap-y-2">
          <Col>
            <textarea
              placeholder="Type your message here..."
              maxLength={300}
              className="h-20 px-4 pt-2 w-full border-gray-200 border rounded-md mt-5 focus:ring-blue-300 resize-none shadow-sm focus:ring-2 focus:outline-none text-gray-700 text-sm"
              onChange={(event) => setText(event.target.value)}
            ></textarea>
          </Col>
          <Col>
            <Flex justifyContent="justify-center" spaceX="space-x-2">
              <Dropdown
                placeholder="Select a voice"
                defaultValue={undefined}
                handleSelect={(value) => setVoice(value)}
              >
                {voices.map((voice) => (
                  <DropdownItem
                    key={voice.value}
                    value={voice.value}
                    text={voice.name}
                  />
                ))}
              </Dropdown>
              <Button text={btnText} handleClick={() => generateAudio()} />
            </Flex>
          </Col>
        </ColGrid>
        {audio ? (
          <Card marginTop="mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{getAudioName(audio.voice)}</p>
              <p className="text-gray-600 font-medium">"{audio.text}"</p>

              <ButtonInline
                text="Download"
                iconPosition="right"
                marginTop="mt-6"
                icon={ArrowDownOnSquareIcon}
                handleClick={() => {
                  download.current ? download.current.click() : null;
                }}
              />

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
          <Card decoration="top" decorationColor="red" marginTop="mt-4">
            <div className="text-center">
              <p className="font-medium">
                There was an error. Please try again later.
              </p>
            </div>
          </Card>
        ) : (
          <></>
        )}
      </Block>
    </div>
  );
}
