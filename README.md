# Modern Split-Flap Display Animation

A modern, interactive recreation of classic split-flap display boards using HTML, CSS, and JavaScript.

![Split-Flap Animation](https://split-flap-text.vercel.app/)

## Overview

This project recreates the nostalgic mechanical split-flap displays (also known as "flip boards" or "flap displays") that were commonly used in airports, train stations, and other transportation hubs before digital displays became widespread.

The original mechanical devices were sometimes called "Solari boards" after Solari di Udine, the Italian company that pioneered this technology in the 1950s. These displays featured individual modules with characters printed on flaps or cards that would rotate to reveal different letters, numbers, or symbols.

Our digital recreation captures the distinctive mechanical feel and characteristic animation, complete with realistic physics and visual details.

## Features

- Realistic split-flap animation with proper physics
- Interactive elements:
  - Pre-set phrases
  - Custom text input
  - Hover effects on individual flaps
  - Two-row display toggle
  - "Animate" button to replay animation
- Center-out animation pattern (like many real displays)
- Responsive design

## Demo

You can see a live demo here: [Split-Flap Animation Demo](https://split-flap-text.vercel.app/)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/split-flap-animation.git
   ```

2. Navigate to the project directory:
   ```
   cd split-flap-animation
   ```

3. Open `index.html` in your browser.

No build process required - this is pure HTML, CSS, and JavaScript!

## Structure

The project consists of three main files:

- `index.html`: The HTML structure
- `styles.css`: All CSS styling and animations
- `script.js`: JavaScript functionality and interactions

## Technical Details

### Animation Process

The split-flap animation works by:

1. Splitting each character position into three elements:
   - Top half (displays current character)
   - Bottom half (displays next character)
   - Flipping element (rotates to create animation)

2. Using CSS 3D transforms for the flipping motion
   - Uses a custom cubic-bezier timing function for realistic motion
   - Includes subtle shadows for enhanced 3D effect

3. JavaScript shuffles through random characters before landing on the target
   - Characters near the end of the shuffle are selected to be closer to the target
   - Variable timing adds to realism
   - Center-out animation pattern mimics many real displays

## Customization

You can easily customize various aspects:

- Colors: Modify the CSS variables in the `:root` selector
- Timing: Adjust the `ANIMATION_DURATION` constant in JavaScript
- Animation curve: Modify the `FLIP_TIMING` constant
- Available characters: Change the `CHARSET` constant
- Number of flaps: Adjust the count parameter in `initializeRow()`

## Credits

- Font: [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts
- Inspired by the classic Solari split-flap boards

## License

MIT License - feel free to use and modify for your own projects!

## Contact

If you have any questions or suggestions, feel free to reach out:
- GitHub: [Your GitHub Profile](https://github.com/yourusername)
- Twitter: [Your Twitter](https://twitter.com/yourtwitterhandle)
- Email: your.email@example.com