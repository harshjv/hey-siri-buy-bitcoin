# 🌟 Ask Siri to buy some bitcoin for you

This application lets you instruct your own Zebpay account to buy bitcoin in it via Siri 🐉

> :warning: This application uses your own Zebpay account to perform the purchase. You are responsible to safe guard your own instance.
>
> :warning: Remember to safely withdraw your bitcoin back to your own wallet.


## Preview

[![Hey siri, buy some bitcoin for me](./preview.gif)](https://twitter.com/harshjv/status/1320007969459691521)


## Prerequisites

1. [Vercel](https://vercel.com) account
2. [Zebpay Developer](https://build.zebpay.com/) account
3. [Shortcuts](https://apps.apple.com/us/app/shortcuts/id915249334) app


## Environment variables

```
API_PASSCODE=
APP_MAX_AMOUNT=
ZEBPAY_CLIENT_ID=
ZEBPAY_ACCESS_TOKEN=
```


## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fharshjv%2Fsiri-buy-bitcoin&env=APP_PASSCODE,APP_MAX_AMOUNT,ZEBPAY_CLIENT_ID,ZEBPAY_ACCESS_TOKEN)


## Create you shortcut manually

1. Open Shortcuts app
2. Tap on **+** icon on top right corner
3. Tap on **+** icon on the screen to add actions
4. Search for **Ask for Input** action & add it
  1. Change **input type** from `Text` to `Number`
  2. Edit **prompt** to `For how much?`
5. Search for **Get Contents of URL** action & add it
  1. Set your **buy** function URL
  2. Click on **Show More**
  3. Change method to `POST`
  4. Click on **Headers** & then **Add new header**
  5. Set **Key** to `X-Passcode` & value to your `API_PASSCODE`
6. Change **Request Body** to `Form`
7. Click on **Add new field** & select `Text`
7. Set **Key** to `amount`
8. Click on the **value field**, and select `Provided Input`
9. Search for **Show Result** action & add it


## Create your shortcut using link

1. Open Settings app
2. Open Shortcuts settings
3. Toggle on **Allow Untrusted Shortcuts**
4. Open https://www.icloud.com/shortcuts/d79b8d1b83444b88acce11bb74b2d1bd on your device


## License

[MIT](./LICENSE.md)
