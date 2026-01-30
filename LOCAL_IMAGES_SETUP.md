# Local Project Images Setup

Your portfolio is configured to use local images stored in the `client/public/assets/` folder.

## Required Images

Add these three image files to `client/public/assets/`:

1. **drone.png** - Screenshot/mockup of your Drone Detect project
2. **ems.png** - Screenshot/mockup of your Employee Management System
3. **int.png** - Screenshot/mockup of your Interview Creation Portal

## Folder Structure

```
portfolio/
├── client/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── drone.png      (Add this)
│   │   │   ├── ems.png        (Add this)
│   │   │   └── int.png        (Add this)
│   │   └── ...
│   └── ...
└── ...
```

## Image Requirements

- **Format**: PNG, JPG, or WebP
- **Size**: 600x400px recommended (will be auto-sized)
- **File Size**: Keep under 500KB each for optimal performance
- **Content**: Screenshots, mockups, or project previews

## How to Add Images

1. Take screenshots of your projects or create mockups
2. Save them as:
   - `drone.png` for Drone Detect project
   - `ems.png` for Employee Management System
   - `int.png` for Interview Creation Portal
3. Place them in `client/public/assets/` folder
4. Images will automatically load in your portfolio

## Image Optimization Tips

- Compress images using TinyPNG or ImageOptim
- Use descriptive file names
- Keep aspect ratio close to 1.5:1 (600x400px)
- Test on mobile to ensure they display well

## After Adding Images

Restart your development server:
```bash
cd client
npm run dev
```

The images should now appear in your project cards with the hover zoom effect!
