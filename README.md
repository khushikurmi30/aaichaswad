# 🍱 Aai Cha Swad – Gmail Notification Setup

When a customer submits the tiffin booking form, **an email notification is automatically sent to your Gmail**.

---

## ✅ Step 1 – Generate a Gmail App Password

Gmail requires an **App Password** (not your regular password) for third-party apps.

1. Go to your Google Account → **Security**
2. Enable **2-Step Verification** (required)
3. Go to: https://myaccount.google.com/apppasswords
4. Select App: **Mail** → Device: **Other** → type "Tiffin Server" → click **Generate**
5. Copy the **16-character password** shown (e.g. `abcd efgh ijkl mnop`)

---

## ✅ Step 2 – Edit server.js

Open `server.js` and fill in your details at the top:

```js
const GMAIL_USER     = 'your_gmail@gmail.com';   // Your Gmail address
const GMAIL_APP_PASS = 'abcd efgh ijkl mnop';    // 16-char App Password from Step 1
const NOTIFY_EMAIL   = 'your_gmail@gmail.com';   // Where booking alerts are sent
```

---

## ✅ Step 3 – Install & Run the Server

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

## ✅ Step 4 – Open the Website

Open `index.html` in your browser. When a customer fills the booking form and clicks **"Book My Tiffin"**, you will receive an email like this:

```
Subject: 🍱 New Tiffin Booking – Ramesh Patil

Customer Name:   Ramesh Patil
Phone Number:    +91 9876543210
Plan Selected:   Monthly Plan
Delivery Address: 12 Shivaji Nagar, Pune, Maharashtra – 411005
Booking Time:    02/03/2026, 3:45:22 PM
```

---

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
