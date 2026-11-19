import { describe, expect, it } from "vitest";
import { encodeOgImageUrl, ogImageMimeType } from "../src/emitter";

describe("encodeOgImageUrl", () => {
  it("percent-encodes Unicode in the path", () => {
    expect(
      encodeOgImageUrl("https://www.example.com/notes/ada\u2019s-field-guide-og-image.jpg"),
    ).toBe("https://www.example.com/notes/ada%E2%80%99s-field-guide-og-image.jpg");
  });

  it("leaves an ASCII URL unchanged", () => {
    const url = "https://www.example.com/static/og-image.png";
    expect(encodeOgImageUrl(url)).toBe(url);
  });

  it("does not encode an already-encoded URL a second time", () => {
    const url = "https://www.example.com/notes/ada%E2%80%99s-field-guide-og-image.jpg";
    expect(encodeOgImageUrl(url)).toBe(url);
  });

  it("keeps the file extension readable for the MIME lookup", () => {
    const url = encodeOgImageUrl(
      "https://www.example.com/notes/ada\u2019s-field-guide-og-image.jpg",
    );
    expect(ogImageMimeType(url)).toBe("image/jpeg");
  });
});
