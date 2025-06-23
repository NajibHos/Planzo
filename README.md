# Planzo

**Planzo** is a personal project management and transaction tracking app - built entirely for my personal usage. It's a lightweight, self-managed system to help me organize clients, track projects, and monitor income.

It reflects my journey from learning to code to building real tools that support my workflow — a mini SaaS, just for me.

---

## ✨ Features

- 🔹 Add, view, update, and delete **Clients**
- 🔹 Track **Projects** with status, deadline, and client association
- 🔹 Log **Transactions** with type current and due pay, and amount
- 🔹 Smart filtering: View records from the last 7 or 30 days
- 🔹 Responsive UI with clean components and pagination
- 🔹 Soft color theme for eye comfort and focus

## ⚙️ Tech Stack

- **Front-end:** React, Tailwind CSS, Daisy UI, Lucide React
- **Back-end:** Appwrite(authentication and database)

---

## 🚀 Running Locally

> Make sure you have a Vite-compatible environment (Node.js 18+, npm)

1. Clone the repo:
```bash
git clone https://github.com/NajibHos/planzo.git
cd planzo

2. Install dependencies:
npm install

3. Create a .env file and add the following:
VITE_APPWRITE_ENDPOINT=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_PROJECTS_COLLECTION_ID=projects_collection_id
VITE_APPWRITE_CLIENTS_COLLECTION_ID=clients_collection_id
VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID=transactions_collection_id
VITE_APPWRITE_CLIENTSSTATUS_COLLECTION_ID=status_collection_id
VITE_APPWRITE_PROJECTSSTATUS_COLLECTION_ID=status_collection_id
VITE_APPWRITE_CLIENTSOURCE_COLLECTION_ID=source_collection_id

4. run the app
npm run dev

## 🧪 Demo Data

The project includes 9 demo:

- Clients

- Projects

- Transactions

You can use the JSON file planzo_demo_data.json to seed your Appwrite database.

## 💡 Future Plans

This is a personal-use app, but I may improve or open-source it further.
Feel free to suggest features or ideas in the issues tab or message me directly!

## 📄 License

This project is for personal use. Not licensed for redistribution or commercial use.

---

Let me know if you want:
- A Bengali version 🇧🇩
- GitHub-style badges
- Or screenshot section with placeholders

I can add that too.
