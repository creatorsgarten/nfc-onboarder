# nfc-onboarder

This application prepares an NFC tag by writing a URL to it. You can configure which URL to write to the tag by setting the `?url=` query parameter in the URL of the page.

## Usage

Construct a URL like this:

```
https://creatorsgarten.github.io/nfc-onboarder/?url=https://grtn.org/inventory/nfc_{sn}
```

Replace `https://grtn.org/inventory/nfc_{sn}` with the URL you want to write to the NFC tag. The `{sn}` part will be replaced with the serial number of the NFC tag. Note that the serial number will not have `:` characters in it.
