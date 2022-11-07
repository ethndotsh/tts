# TikTok TTS

Web TTS app powered by NextJS. Has a JS fork of [this script](https://github.com/oscie57/tiktok-voice) for the backend.

Built with
- NextJS
- TypeScript
- TailwindCSS
- Tremor
- Upstash Ratelimit

## Deploying

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcursecodes%2Ftts.git&env=UPSTASH_REST_URL,UPSTASH_REST_TOKEN,TIKTOK_SESSION_ID&envDescription=Environment%20variables%20required%20for%20app&envLink=https%3A%2F%2Fgithub.com%2Fcursecodes%2Ftts&project-name=tts&repo-name=tiktok-tts&demo-title=TikTok%20TTS&demo-description=A%20hosted%20version%20of%20the%20app&demo-url=https%3A%2F%2Ftts.cursecode.me&demo-image=https%3A%2F%2Ftts.cursecode.me%2F_next%2Fimage%3Furl%3D%252Ftiktok-256.png)

To Deploy your own, you will need an [Upstash account](https://upstash.io) and a Redis database with them for the ratelimiting of the backend. 

Once you have a Upstash database, get the REST API Token and URL from the dashboard, then add it to your environment. For an example, look at [.env.example](.env.example).

You will also need a TikTok Session ID which you can learn how to find [here](https://github.com/oscie57/tiktok-voice/wiki/Obtaining-SessionID)

After adding those variables to Vercel/Netlify, you can deploy the app.

## Author
- curse ([@cursecodes](https://github.com/cursecodes))
