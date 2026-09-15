# ripreid — project notes

Memorial site for SPC Reid Wesley Marker. Next.js 16 (App Router, Turbopack),
React 19, Tailwind CSS v4, framer-motion.

## Commands

```
npm run dev            # dev server
npm run build          # runs prebuild dedupe check, then next build
npx tsc --noEmit       # typecheck
npx next start -H 0.0.0.0 -p 3000   # serve prod build on the LAN for phone testing
```

## Verifying mobile changes

Chrome DevTools device emulation is **not** a valid test for this site. It uses
the desktop CPU, RAM, and localhost network, so it hides the exact failures that
show up on real hardware. Always test on a physical phone against a production
build (`npm run build && npx next start -H 0.0.0.0`), reachable on the LAN.

Two regressions to watch for, both previously caused a blank page on phones:

1. **Never let framer-motion serialise `opacity: 0` into the server HTML.**
   `initial={{ opacity: 0 }}` renders as an inline `opacity:0` style, so the
   content stays invisible until the JS bundle downloads and hydrates. On
   cellular that bundle queues behind the media and the page looks empty. Use
   `initial={false}` (see `AnimatedSection`, and the `mounted` gate on the
   gallery grids), or plain CSS animations as in `HeroSection` / the `.reveal`
   class. Quick check:

   ```
   # must print 0 for every route
   (Invoke-WebRequest http://127.0.0.1:3000/ -UseBasicParsing).Content |
     Select-String -Pattern 'opacity:\s*0(?![.\d])' -AllMatches
   ```

2. **Always render images through `next/image`.** `public/` holds full-resolution
   phone photos (up to 3024x4032, ~4 MB each; ~558 MB of decoded RAM if every
   asset were in the DOM at once). Mobile Safari caps renderer image memory and
   simply refuses to decode past it, which shows up as blank tiles or a tab
   reload. `next/image` + a correct `sizes` gets a 4 MB PNG down to ~35 KB AVIF
   at phone widths. Go through `MediaPlaceholder`, which handles this plus lazy
   loading.

Videos are also heavy (30 files, ~52 MB). `MediaPlaceholder` deliberately
attaches no `src` until the element is within 300px of the viewport and only
plays while >=50% visible — iOS allows only a handful of concurrent decoders and
silently fails the rest.

## Layout conventions

- `html, body` use `overflow-x: clip` so a single overflowing element can never
  shift the whole page sideways.
- Use `.min-h-screen-dvh`, not `min-h-screen`, for full-height sections. `100vh`
  on iOS Safari excludes the address bar.
- Fixed overlays should use `.safe-inset` to clear the notch/home indicator.

## Media

`src/lib/media.ts` is the single server-side source of truth (`getAllMedia`,
`getMediaStats`, `getFriendMedia`), wrapped in React `cache`. Pages read it
server-side and pass results down as props. Do not reintroduce client-side
`fetch('/api/media')` — that route still exists for external consumers but is
`force-static`.

Media lives in `public/pictures/<category>/` and `public/videos/<category>/`
where category is one of `family`, `friends`, `service`, `adventures`.
`npm run dedupe:media` checks for duplicates and runs automatically on build.

## Fonts

Self-hosted via `next/font/google` in `layout.tsx`, exposed as `--font-cormorant`
and `--font-inter` and wired to Tailwind's `--font-serif` / `--font-sans` in
`globals.css`. Use the `font-serif` class — do **not** add
`style={{ fontFamily: 'Cormorant Garamond, serif' }}`, which no longer matches
the generated family name.
