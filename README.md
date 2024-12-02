This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Installing Bun

#### On macOS or Linux:
```bash
curl -fsSL https://bun.sh/install | bash
```

#### On Windows:
1. First, install Windows Subsystem for Linux (WSL):
   ```powershell
   # Run in PowerShell as Administrator
   wsl --install
   ```
   After installation, restart your computer.

2. Install Bun in WSL:
   ```bash
   # Open WSL terminal and run:
   curl -fsSL https://bun.sh/install | bash
   ```

3. For the best experience on Windows:
   - Use VSCode with the "Remote - WSL" extension
   - Open your project folder in WSL: `code .`
   - Run all Bun commands in the WSL terminal

### Running the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using Node.js runtime
bun dev

# Using Bun runtime (recommended for better performance)
bun run dev:bun
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Runtime Options

This project supports both Node.js and Bun runtimes. Here are the available commands:

### Node.js Runtime (Default)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linting
```

### Bun Runtime
```bash
# On macOS/Linux:
bun run dev:bun    # Start development server with Bun
bun run build:bun  # Build for production with Bun
bun run start:bun  # Start production server with Bun
bun run lint:bun   # Run linting with Bun

# On Windows (via WSL):
wsl bun run dev:bun    # Start development server
wsl bun run build:bun  # Build for production
wsl bun run start:bun  # Start production server
wsl bun run lint:bun   # Run linting
```

### Installing Dependencies
```bash
# On macOS/Linux:
bun install

# On Windows (via WSL):
wsl bun install
```

### Troubleshooting on Windows

1. If WSL is not installed:
   ```powershell
   # Run in PowerShell as Administrator
   wsl --install
   ```

2. If you need to update WSL:
   ```powershell
   wsl --update
   ```

3. Common issues:
   - If Bun commands aren't working, make sure you're running them in a WSL terminal
   - If you can't access the development server, check that port forwarding is enabled in WSL
   - For VSCode integration, install the "Remote - WSL" extension

## Learn More

To learn more about Next.js and Bun, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Bun Documentation](https://bun.sh) - learn about Bun runtime.
- [WSL Documentation](https://learn.microsoft.com/en-us/windows/wsl/) - learn about Windows Subsystem for Linux.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
