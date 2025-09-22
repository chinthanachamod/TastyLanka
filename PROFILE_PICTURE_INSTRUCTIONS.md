# Adding Developer Profile Picture

## Instructions

To add your profile picture to the About page:

1. **Add your profile picture to the assets folder:**
   - Place your profile picture in: `assets/images/`
   - Name it: `developer-profile.jpg` (or update the filename in the code)
   - Recommended size: 200x200 pixels or larger (square aspect ratio works best)
   - Supported formats: JPG, PNG

2. **Alternative filename:**
   If you want to use a different filename, update line 112 in `app/about/index.tsx`:
   ```tsx
   source={require('../../assets/images/YOUR_FILENAME_HERE.jpg')}
   ```

3. **Current behavior:**
   - If the profile image loads successfully: Shows your profile picture
   - If the profile image fails to load: Shows a person icon as fallback
   - The image will be automatically cropped to a circle with proper styling

## File Structure
```
assets/
  images/
    developer-profile.jpg  <- Add your profile picture here
    adaptive-icon.png
    favicon.png
    icon.png
    splash-icon.png
```

## Example profile picture specifications:
- Resolution: 200x200px to 500x500px
- Format: JPG or PNG
- Style: Professional headshot or profile photo
- Background: Any (will be cropped to circle)