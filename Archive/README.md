# Code White — Emergency Alerts & Missing Persons

A simple college project built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. It lets users:

- Submit distress/emergency reports
- Submit missing person reports (with optional photo upload)
- View a feed of recent distress alerts

Data and file storage are powered by Supabase.

## Local development

Requirements: Node.js (recommend using nvm) and npm or bun.

```sh
# install dependencies
npm install

# start dev server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

## Environment variables

Create a `.env` file in the project root with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Notes

- This project is intended for demonstration purposes only.
- No personal attribution or authorship is displayed in the app UI.
