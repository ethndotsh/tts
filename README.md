# TikTok TTS

Web TTS app powered by NextJS. Has a JS fork of [this script](https://github.com/oscie57/tiktok-voice) for the backend.

Built with
- NextJS
- TypeScript
- TailwindCSS
- Tremor
- Upstash Ratelimit

## Deploying

To Deploy your own, you will need an [Upstash account](https://upstash.io) and a Redis database with them for the ratelimiting of the backend. 

Once you have a Upstash database, get the REST API Token and URL from the dashboard, then add it to your environment. For an example, look at [.env.example](.env.example).

You will also need a TikTok Session ID which you can learn how to find [here](https://github.com/oscie57/tiktok-voice/wiki/Obtaining-SessionID)

After adding those variables to Vercel/Netlify, you can deploy the app.

## Author
- curse ([@cursecodes](https://github.com/cursecodes))