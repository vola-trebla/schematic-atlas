# Fonts — Schematic

All three faces are **loaded from Google Fonts** via the `@import` at the top of
`colors_and_type.css`. No local `.woff2` files are needed.

| Role           | Family              | Google Fonts URL                                      | Substitution?                                        |
| -------------- | ------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| Display (hand) | Caveat              | https://fonts.google.com/specimen/Caveat              | Yes — placeholder for true neat-print gel-pen hand   |
| Body (hand)    | Architects Daughter | https://fonts.google.com/specimen/Architects+Daughter | Yes — placeholder for engineer's careful print       |
| Mono           | JetBrains Mono      | https://fonts.google.com/specimen/JetBrains+Mono      | Acceptable for technical labels; could be tightened  |
| Stamp          | Special Elite       | https://fonts.google.com/specimen/Special+Elite       | Yes — placeholder for inked rubber-stamp letterforms |

**Substitution flag.** Every face above is a free-tier proxy. If the brand has
a real, hand-lettered wordmark or a paid hand-print typeface (Mark Simonson's
_Felt Tip Roman_, House Industries' _Studio Lettering_, etc.), drop the file in
this folder and update `colors_and_type.css` to prefer it.
