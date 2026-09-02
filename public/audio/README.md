# Demo audio

Add your real Virelli demo recording here as:

```
public/audio/demo-plumbing.mp3
```

Until a file exists at that path, the audio player on the site will show a
"Demo audio coming soon" message instead of failing silently.

The filename is referenced in `components/DemoSection.tsx` — update the
`src` prop there if you want to use a different filename.
