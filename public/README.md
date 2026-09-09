# Public Assets Folder

This folder contains static assets that are served directly from the root URL.

## Structure

```
public/
├── pictures/          # Photos and videos of Reid
│   ├── family/       # Family photos
│   ├── service/      # Military service photos
│   ├── adventures/   # Outdoor activities
│   └── friends/      # Photos with friends
└── videos/           # MP4 videos
```

## How to Use

1. **Upload files**: Place photos (.jpg, .png) and videos (.mp4) in the appropriate subfolder
2. **Reference in code**: Use `/pictures/filename.jpg` or `/videos/filename.mp4`
3. **Update MediaPlaceholder**: Add the `src` prop to display actual media

## Example

```tsx
<MediaPlaceholder 
  type="photo"
  src="/pictures/reid-fishing.jpg"
  label="Fishing Trip"
/>

<MediaPlaceholder 
  type="video"
  src="/videos/reid-dirtbike.mp4"
  label="Dirt Bike Adventure"
/>
```

## Deduplication

Media in this folder must never contain duplicates. `scripts/dedupe-media.mjs` enforces that:

```bash
npm run dedupe:media              # report duplicates (dry run)
npm run dedupe:media:apply        # delete duplicates and fix src/ references
node scripts/dedupe-media.mjs --apply --exact-only   # skip the near-duplicate matches
node scripts/dedupe-media.mjs --check --strict       # also fail on near duplicates
```

- **Exact duplicates** are matched by SHA-256 of the file bytes (images and videos).
- **Near-duplicate images** are matched by a 64-bit dHash, so resized/re-encoded copies
  (e.g. the same photo as both `.png` and `.jpg`) are flagged. Tune with `--threshold N`
  (default 5; higher is more aggressive).
- The copy that is kept is the one referenced in `src/`, otherwise the one without a
  copy-style filename (`img_8715.png` over `img_8715_1_.png`), then the highest resolution.
- When a removed file was referenced in `src/`, the reference is rewritten to the kept file.
- `npm run build` runs `--check` first and fails the build if exact duplicates exist.

## File Naming

Use descriptive names:
- `reid-fishing-2023.jpg`
- `reid-graduation-2023.jpg`
- `reid-fort-drum-2024.mp4`
