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
  animals.json
  styles.css
  main.tsx
public/
  *.webp
  thumbnails/
    *.webp
```

## Converting JPEG images to WebP

Install the WebP command-line tools, then run `cwebp` from the project root. For example, to create a smaller WebP while preserving the JPEG's ICC color profile:

```powershell
cwebp -q 85 -metadata icc public/tern_whiskered.jpg -o public/tern_whiskered.webp
```

Adjust the input and output filenames for other images. The `-q 85` setting uses lossy compression; higher values preserve more detail but generally produce larger files.

### Generate gallery thumbnails

From the project root, run this PowerShell command to create 640px-wide WebP thumbnails for every animal image listed in `src/animals.json`. It preserves ICC profiles and saves the results in `public/thumbnails/`:

```powershell
New-Item -ItemType Directory -Force public/thumbnails | Out-Null
$animals = Get-Content src/animals.json -Raw | ConvertFrom-Json
foreach ($animal in $animals) {
  $filename = [System.IO.Path]::GetFileName($animal.image)
  $output = [System.IO.Path]::ChangeExtension($filename, ".webp")
  cwebp -resize 640 0 -q 80 -metadata icc "public/$filename" -o "public/thumbnails/$output"
  if ($LASTEXITCODE -ne 0) { throw "Thumbnail conversion failed: $filename" }
}
```

Each animal record should include an `image_thumb` path pointing to its generated thumbnail, for example `/thumbnails/tern_whiskered.webp`.

## License

This project is for educational/demo purposes.
