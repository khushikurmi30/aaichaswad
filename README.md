# 🍱 Aai Cha Swad – Gmail Notification Setup

When a customer submits the tiffin booking form with opening whatsapp, 
---


## ✅ Step 1 – Install & Run the Server

Make sure **Node.js** is installed (https://nodejs.org), then:

```bash
# Install dependencies
npm install

# Start the server
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
```

---

## ✅ Step 2 – Open the Website

Open `index.html` in your browser. When a customer fills the booking form and clicks **"order on whatsapp"**, you will receive an open with whatsapp number :
     
```


## 📁 File Structure

```
├── index.html      ← Your tiffin website (no changes needed)
├── server.js       ← Backend that sends Gmail notification
├── package.json    ← Node.js dependencies
└── README.md       ← This guide
```

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---|---|
| "Invalid login" error | Make sure App Password is correct and 2-Step Verification is ON |
| "Could not connect to server" on form | Make sure `npm start` is running |
| Email goes to Spam | Mark it as "Not Spam" once and Gmail will learn |
