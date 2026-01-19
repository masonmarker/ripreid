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

## File Naming

Use descriptive names:
- `reid-fishing-2023.jpg`
- `reid-graduation-2023.jpg`
- `reid-fort-drum-2024.mp4`
