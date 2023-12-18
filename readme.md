# 🔒 Archival Notice
This repository has been archived. However, the project is not dead! Instead, it lives on through [SimplyMC](https://www.simplymc.art/flags), where a team is able to maintain it, alongside many other useful Minecraft tools.

[Issues on this repository](https://github.com/encode42/flags.sh/issues) will still be worked on, and new features will be added to SimplyMC's rendition of the website.

> [!WARNING]  
> This means that the current domain, `flags.sh`, will eventually cease to function. It will redirect to `simplymc.art/flags` until expiry. It's strongly recommended to switch any `flags.sh` links over to `simplymc.art/flags` as soon as possible!

---

This project started as a dead simple alternative to [startmc.sh](https://github.com/startmc/startmc.sh), due to its frequent downtime, and *(personal opinion)* dated frontend. I had large ambitions for the project, and put hours of work into achieving them, yet was never able to finish anything. Years went by with no updates to the live website, causing it itself to fall behind.

I did a [thing you should never do](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/); rewrote the website multiple times, without touching the original. It never occurred to me that this is a project that's been *actively used by thousands*, and instead used this as a method to learn modern web technologies, such as [Blitz.js](https://blitzjs.com/), [Remix](https://remix.run/), and [qwik](https://qwik.builder.io/). Though I'm glad I'm now comfortable with these frameworks, I put myself to shame, neglecting the users I aimed to help.

Though this project started "as a dead simple alternative", feature creep rolled in *fast*. In one of said rewrites, I implemented an account system **before that version even had script generation**. In another, I focused on theming and internationalization, with a [Weblate](https://hosted.weblate.org/projects/flags-sh/) instance connected. These translations hopefully won't go to waste, and I greatly appreciate anyone who contributed! I shouldn't have opened the project to those who could not know where the future of their work would end up.

By joining [Luminescent](https://github.com/LuminescentDev), this should no longer be the case! Rather than one individual (me) making the decisions that end up harming the project, *every decision involves many*. Maintenance is no longer at the burden of me, who has often been busy with my career, higher education, or [other projects](https://erora.live). Ideas and implementations are done with the collective cognitive whole of a team. The aspirations I originally had for this project, may now be actually viable. 

Though I'm sad that this repository has come to a close, *it's undoubtedly great that this project has a proper home*. I treated this project like my baby, showing it to friends and colleagues, even including it on my resume. *(hello employers!)* However, I did not treat it like a baby, and am truly sorry. I know the future owners of this project will treat it right.

**If you have any questions or concerns, please [contact me](https://encode42.dev/discord)! I am always here to help.**

<details>
<summary>Original readme</summary>

[Website]: https://flags.sh
[Website Badge]: https://img.shields.io/badge/Website-202b38?labelColor=202b38&logo=html5&logoColor=white&style=flat-square
[Support]: https://encode42.dev/support
[Support Badge]: https://img.shields.io/discord/646517284453613578?color=7289da&labelColor=7289da&label=​&logo=discord&logoColor=white&style=flat-square
[Codacy]: https://app.codacy.com/gh/Encode42/flags.sh/dashboard
[Codacy Badge]: https://img.shields.io/codacy/grade/fcab733f761c4c09a0216f89feb95797?color=172B4D&labelColor=172B4D&label=​&logo=codacy&style=flat-square

<img src=".github/assets/badge.svg" align="left">

<div align="right">

# flags.sh
### A simple script generator to start your Minecraft servers with optimal flags.

[![][Website Badge]][Website] [![][Support Badge]][Support]  
[![][Codacy Badge]][Codacy]
</div>

Includes many configuration options such as Aikar's flags, automatic restarting, and Pterodactyl overhead calculation.

Inspired by [startmc.sh](https://startmc.sh), built with [Blitz.js](https://blitzjs.com) and [Mantine UI](https://mantine.dev).

### 🔨 Building
Ensure [Yarn](https://yarnpkg.com) and [Node.js](https://nodejs.org/en) are installed.

1. Enter the directory containing the flags.sh source code in your terminal.
2. Install the build dependencies via `yarn install`.
3. Either start a live development environment, or build for production.
   - `yarn run dev`: Start a live development environment
   - `yarn run export`: Build for production to `/out/`
</details>
