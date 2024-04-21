import { expect, it } from "bun:test";
import { compileUrlTemplate } from "./compileUrlTemplate";

const defaultOpts = { serialNumber: "01:23:45:67:89:ab:cd" };

it("returns the url in absence of placeholders", async () => {
  const template = await compileUrlTemplate("https://grtn.org", defaultOpts);
  expect(template.generateUrl()).toBe("https://grtn.org");
  expect(template.check("https://grtn.org")).toBe(true);
  expect(template.check("https://example.org")).toBe(false);
});

it("replaces serial numbers in {sn}", async () => {
  const template = await compileUrlTemplate(
    "https://grtn.org/inventory/nfc/{sn}",
    defaultOpts
  );
  expect(template.generateUrl()).toBe(
    "https://grtn.org/inventory/nfc/0123456789abcd"
  );
  expect(template.check("https://grtn.org/inventory/nfc/0123456789abcd")).toBe(
    true
  );
  expect(template.check("https://grtn.org/inventory/nfc/0123456789ABCD")).toBe(
    false
  );
});

it("supports {hmac:key} syntax", async () => {
  const template = await compileUrlTemplate(
    "https://grtn.org/inventory/nfc/{sn}/{hmac:secret}",
    defaultOpts
  );
  expect(template.generateUrl()).toBe(
    "https://grtn.org/inventory/nfc/0123456789abcd/c489dd5d5d389f7c71b8f65192298189fd058b5f9f5290d9817661747673626f"
  );
  expect(
    template.check(
      "https://grtn.org/inventory/nfc/0123456789abcd/c489dd5d5d389f7c71b8f65192298189fd058b5f9f5290d9817661747673626f"
    )
  ).toBe(true);
  expect(
    template.check(
      "https://grtn.org/inventory/nfc/0123456789abcd/c489dd5d5d389f7c71b8f65192298189fd058b5f9f5290d9817661747673626e"
    )
  ).toBe(false);
});
