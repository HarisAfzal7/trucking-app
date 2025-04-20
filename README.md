# React + Vite


# Trucking App

This is a trucking app built with **React**, allowing drivers to input their work details such as start and end times, kilometers traveled, break times, and more. It includes features like multilingual support, field validation, and integration with WhatsApp.

## Requirements
- **Node.js (v23.11.0 or later)**
- **npm (v10.9.2 or later)**

---

## Step-by-Step Setup and Running the App

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/HarisAfzal7/trucking-app.git
cd trucking-app
```

### Step 2: Install Dependencies

Install all the required dependencies using npm:

```bash
npm install
```

### Step 3: Install/Update Node.js and npm

If you're setting up Node.js and npm for the first time, or if your current version is outdated, follow these steps:

#### Install n (Node version manager):

```bash
sudo npm install -g n
```

#### Install the latest stable version of Node.js:

```bash
sudo n stable
```

#### Verify the installation of Node.js and npm:

```bash
node -v
npm -v
```

This should return the latest stable versions of Node.js and npm, such as:

```bash
node: v23.11.0
npm: 10.9.2
```

### Step 4: Run the Development Server

Start the development server using:

```bash
npm run dev
```

### Step 5: Open the App in Browser

Once the server is running, open your browser and navigate to:

```
http://localhost:5173/
```

---

## Build for Production (PWA Enabled)

To build the app for production:

```bash
npm run build
```

Then serve it locally using:

```bash
npx serve -s dist
```

You can now access it at:

```
http://localhost:3000
```

Or use `ngrok` to expose it publicly:

```bash
ngrok http 3000
```

---
## Push to GitHub

If you haven’t initialized Git yet:

```bash
git init
git add .
git commit -m "Initial commit"
```

Connect to your GitHub repo:

```bash
git remote add origin https://github.com/your-username/trucking-app.git
git push -u origin master
```

If you're using the `main` branch instead of `master`, use:

```bash
git push -u origin main
```

---

## Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com) and create an account.
2. Click on **Add New Project**.
3. Import your GitHub repository.
4. Set the project settings:
    - **Framework Preset**: Vite
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
5. Click **Deploy**.

Once deployed, Vercel will provide you with a live URL for your app.

---


## Troubleshooting

### 1. Missing `semver` Module Error

If you see the error: `Cannot find module 'semver'`:

```bash
sudo npm install -g npm
```

Check correct binaries:

```bash
which npm
which node
```

They should point to `/usr/local/bin/npm` and `/usr/local/bin/node`.

### 2. Command Not Found (npm run dev)

If you see an error like:

```
-bash: /usr/bin/npm: No such file or directory
```

Reset your shell’s command cache:

```bash
hash -r
npm run dev
```

Or use full path:

```bash
/usr/local/bin/npm run dev
```

---

## End of Guide
