# firstPass 🔐

A modern, full-stack password manager built with React and MongoDB. Securely store and manage all your passwords with a sleek dark mode interface.

![React](https://img.shields.io/badge/React-19.2.0-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green) ![Vite](https://img.shields.io/badge/Vite-7.1.12-purple)

## ✨ Features

- 🔑 **Store & Manage Passwords** - Add, edit, view, and delete password entries
- 🔍 **Real-time Search** - Instantly filter passwords by site or username
- 📋 **One-Click Copy** - Copy usernames and passwords to clipboard
- 👁️ **Show/Hide Toggle** - Securely view passwords when needed
- 🌓 **Dark Mode** - Easy on the eyes with beautiful dark theme
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile
- ⚡ **Live Status** - Monitor database connection and sync status
- 🎯 **Toast Notifications** - Instant feedback for all actions

## 🚀 Tech Stack

**Frontend:**
- ⚛️ React 19 + Vite
- 🎨 Tailwind CSS 4
- 🧭 React Router DOM

**Backend:**
- 🟢 Node.js + Express
- 🍃 MongoDB
- 🔄 CORS enabled

<details>
<summary>📦 <strong>Backend Repository</strong> (Click to expand)</summary>

The backend for this project is in a separate repository:

🔗 **[firstPass Backend Repository](https://github.com/StackFox/firstpass-backend)**

Clone the backend separately:
```bash
git clone https://github.com/StackFox/firstpass-backend.git
```

</details>

## 📋 Prerequisites

- ✅ Node.js (≥ 20.19.0)
- ✅ npm (≥ 8.0.0)
- ✅ MongoDB (local or Atlas)
- ✅ Git

## 🛠️ Local Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/StackFox/firstPass-frontend.git
cd firstPass-frontend
```

### 2️⃣ Frontend Setup
```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Start dev server
npm run dev
```
🌐 Frontend runs on: `http://localhost:5173`

### 3️⃣ Backend Setup
```bash
# Clone backend repository
git clone https://github.com/StackFox/firstPass-backend.git
cd firstpass-backend

# Install dependencies
npm install

# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# PORT=3000

# Start backend server
npm start
```
🌐 Backend runs on: `http://localhost:3000`

### 4️⃣ MongoDB Configuration

**Option A - MongoDB Atlas (Cloud):**
- 🌐 Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- ➕ Create new cluster
- 👤 Add database user
- 🔓 Whitelist your IP
- 📋 Copy connection string to `.env`

**Option B - Local MongoDB:**
```bash
MONGODB_URI=mongodb://localhost:27017/firstpass
```

## 📖 Usage

1. **Add Password** 🆕
   - Fill in site name, username, and password
   - Click "Save Password"

2. **Manage Passwords** 📝
   - ✏️ **Edit** - Click edit button to modify entries
   - 👁️ **Show/Hide** - Toggle password visibility
   - 📋 **Copy** - One-click copy to clipboard
   - 🗑️ **Delete** - Remove unwanted entries

3. **Search** 🔍
   - Use search bar to filter by site or username
   - Results appear in real-time

4. **Theme Toggle** 🌓
   - Click moon/sun icon to switch dark/light mode

5. **Mobile Navigation** 📱
   - Tap hamburger menu for search, theme, and status

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/passwords` | Get all passwords |
| POST | `/api/passwords` | Create new password |
| PUT | `/api/passwords/:id` | Update password |
| DELETE | `/api/passwords/:id` | Delete password |
| GET | `/api/status` | Get system status |

## 📁 Project Structure

```
firstpass/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.jsx      # 🧭 Navigation & theme
│   │   ├── FormContainer.jsx    # ➕ Add passwords
│   │   ├── SavedPasswords.jsx   # 📋 Password list
│   │   ├── SearchBar.jsx        # 🔍 Search functionality
│   │   ├── StatusContainer.jsx  # 📊 System status
│   │   └── Toast.jsx            # 🔔 Notifications
│   ├── api.js              # 🔌 API calls
│   └── App.jsx             # 🏠 Main app
├── backend/                # 🔧 Backend server (separate repo)
└── package.json           # 📦 Dependencies
```

## 🎯 Development Scripts

```bash
npm run dev      # 🚀 Start dev server
npm run build    # 📦 Build for production
npm run lint     # 🔍 Check code quality
npm run preview  # 👀 Preview production build
```

## ⚠️ Security Notice

**This is a learning/development project.** For production use:

- 🔒 Implement password encryption (bcrypt)
- 🔐 Add user authentication
- 🌐 Use HTTPS
- 🛡️ Add rate limiting
- ✅ Validate all inputs
- 🔑 Consider 2FA

## 🌐 Live Demo

🚀 **[View Live Demo](https://first-pass-frontend.vercel.app/)**

> Note: Demo uses shared database - please be respectful with test data!

## 🤝 Contributing

Contributions are welcome! 

1. 🍴 Fork the repository
2. 🌿 Create feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit changes (`git commit -m 'Add AmazingFeature'`)
4. 📤 Push to branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open Pull Request

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- ✅ Check MongoDB is running
- ✅ Verify `MONGODB_URI` in `.env`
- ✅ Ensure IP is whitelisted (Atlas)

**Port Conflicts:**
- 🔧 Change ports in `.env` files
- 🔄 Restart both servers

**Dependencies Issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

ISC License - Free to use and modify!

## 👨‍💻 Author

**Rakshit** - [GitHub](https://github.com/StackFox)

---

⭐ Star this repo if you find it helpful!

💬 Questions? Open an issue or reach out on GitHub!
