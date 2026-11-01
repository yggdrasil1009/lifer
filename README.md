# Lifer Animal Discovery

A small React + Vite wildlife gallery app showcasing a collection of animal profiles, habitat notes, and a field-journal style layout.

## Features

- Responsive wildlife landing page
- Photo gallery and discovery section
- Search by animal name or habitat
- Language toggle for English and Japanese
- Social links and back-to-top footer action

## Tech Stack

- React
- Vite
- TypeScript
- lucide-react

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```bash
src/
  App.tsx
  styles.css
  main.tsx
public/
  *.jpg
  *.png
```

## Converting JPEG images to WebP

Install the WebP command-line tools, then run `cwebp` from the project root. For example, to create a smaller WebP while preserving the JPEG's ICC color profile:

```powershell
cwebp -q 85 -metadata icc public/tern_whiskered.jpg -o public/tern_whiskered.webp
```

Adjust the input and output filenames for other images. The `-q 85` setting uses lossy compression; higher values preserve more detail but generally produce larger files.

## License

This project is for educational/demo purposes.
