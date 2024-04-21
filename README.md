# nfc-onboarder

This web application prepares an NFC tag by writing a URL to it. You can configure which URL to write to the tag by setting the `?url=` query parameter in the URL of the page.

> [!NOTE]
> Currently, only Android Chrome is supported. See <https://caniuse.com/webnfc>.

![screenshot](https://github.com/creatorsgarten/nfc-onboarder/assets/193136/184448af-0cd6-4fb5-a188-a0f4e99622fb)

## Usage

Construct a URL like this:

```
https://creatorsgarten.github.io/nfc-onboarder/?url=https://grtn.org/inventory/nfc/{sn}
```

Replace `https://grtn.org/inventory/nfc_{sn}` with the URL you want to write to the NFC tag. The `{sn}` part will be replaced with the serial number of the NFC tag. Note that the serial number will not have `:` characters in it.
