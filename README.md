[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<br />
<p align="center">  
  <br/>
  <h1 align="center">🛡️ Emoji Captcha Bot for Telegram</h1>
  <p align="center">
    Protect telegram groups from automated bots (spams, scams, adults, etc..)
    <br />
    <br />
    <a href="https://github.com/TibebeJS/emoji-captcha-bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/TibebeJS/emoji-captcha-bot/issues">Request Feature</a>
  </p>
  <br/>
  <br/>
</p>

## Motivation
With Telegram increasingly getting popular and popular social media option in recent years, it has become a target for s(p/c)ammers. Many groups and their members are bombarded by spam and unsolicited messages on daily basis, mostly attributed to the lack of built-in protections systems in place.

This project intends to mitigate these issues by forcing every new member to go through a captcha verification process thus making it harder for automated accounts/userbots to roam free in these groups.

## Getting Started

Git clone the repo:
```bash
git clone https://github.com/TibebeJS/emoji-captcha-bot.git
```

Change directory into the newly created repository ("emoji-captcha-bot")
```bash
cd emoji-captcha-bot.git
```

Install dependencies
```bash
npm i
```

Open up `config/development/general.json5` file and provide `botToken` and `challenge`
```json5
{
  botToken: "123456:bot token", // REPLACE with your token - from @BotFather
  challenge: "text", // options: ['text', 'audio', 'image']
}
```

### Then edit your challenge specific config file
E.g.  if we choose `'text'` as our challenge, then the config file would be `config/development/text-emoji-captcha.json5`

**Example** (`"text-emoji-captcha.json5"` file)

```json5
{
  challengeEmojisCount: 5, // how many emojis to present in the challenge
  answerEmojisColumns: 3, // number of columns in the answer's keypad
  answerEmojisRows: 3, // number of rows in the answer's keypad
  emojiSeparator: "-", // what's in between consecutive emojis
  numberOfAttempts: 3, // number of attempts before restriction
  numberOfAttempts: 3, // number of attempts before restriction
  emojiBlacklist: [ "🖕", "🍆", "🍑" ], // dont show these emojis
  showCountryFlags: true, // show/hide country emojis
}
```

After successful configuration, run the project:
```bash
npm start
```

## How it works

### **Version 1 (Current):**
- Whenever a new member joins a group they will automatically be muted/restricted by the bot.
- Bot then sends a message which contains emojis (presented as text).
- User is prompted with emoji buttons to click on.
- if user successfully manages to select all the emojis that are present in the challenge, his/her restrictions will be lifted automatically by the bot.
- if the user runs out of attempts left before completing the challenge, he/she will remain restricted. 

Sample challenge:

![Sample screenshot](docs/sample_captcha.png)


## Features:
- [x] Text emojis challenge
- [x] Attempts counter
- [ ] Restrict/Unrestrict after challenge
- [ ] Scrambled Image challenge (instead of just text)
- [ ] Audio challenge
- [ ] Timeouts

More details can be found over: [Project canban](https://github.com/TibebeJS/emoji-captcha-bot/projects/1)

## Contribution:

#### Pick a task from [Project canban](https://github.com/TibebeJS/emoji-captcha-bot/projects/1), Assign yourself/get assigned, Fork, code and send a PR.

[forks-shield]: https://img.shields.io/github/forks/TibebeJS/emoji-captcha-bot.svg?style=for-the-badge
[forks-url]: https://github.com/TibebeJS/emoji-captcha-bot/network/members

[stars-shield]: https://img.shields.io/github/stars/TibebeJS/emoji-captcha-bot.svg?style=for-the-badge
[stars-url]: https://github.com/TibebeJS/emoji-captcha-bot/stargazers

[issues-shield]: https://img.shields.io/github/issues/TibebeJS/emoji-captcha-bot.svg?style=for-the-badge
[issues-url]: https://github.com/TibebeJS/emoji-captcha-bot/issues

[license-shield]: https://img.shields.io/github/license/TibebeJS/emoji-captcha-bot.svg?style=for-the-badge
[license-url]: https://github.com/TibebeJS/emoji-captcha-bot/blob/main/LICENSE
