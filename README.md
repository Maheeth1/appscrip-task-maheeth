# 🛍️ Appscrip Task — Product Listing Page

This project is a **React-based product listing page** built as part of the **Appscrip Frontend Assignment**.  
It replicates the **Figma design** provided in the task, using data from the **FakeStore API**.

---

## 🚀 Live Demo

🔗 [View Deployed App on Netlify](https://69063910f3d908976f06fb82--symphonious-froyo-0106cf.netlify.app/)

---

## 📸 Features

- 🎨 **Pixel-perfect layout** based on provided Figma design  
- 🧩 **Dynamic filters** for category, price, and other product attributes  
- 🔍 **Search and sorting functionality**  
- 🛒 **Modern UI components**: clean grid layout, hover effects, and smooth transitions  
- 🌐 **Responsive** for desktop and mobile  
- 🧠 **Data fetched live** from [FakeStore API](https://fakestoreapi.com/)  
- 💎 **Custom font (Simplon Norm)** for authentic design consistency  

---

## 🧰 Tech Stack

| Tech | Purpose |
|------|----------|
| **React.js (CRA)** | Frontend framework |
| **CSS Modules** | Component-scoped styling (no Tailwind) |
| **FakeStore API** | Product data |
| **Netlify** | Hosting |

---

## 🛠️ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/appscrip-task.git

# 2️⃣ Enter the project folder
cd appscrip-task

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run locally
npm start
```
The app runs at http://localhost:3000

## 🌍 Deployment (Netlify)

1. Create a Netlify account → https://netlify.com

2. Connect your GitHub repo

3. Set build command: npm run build

4. Set publish directory: build

5. Click Deploy 🚀

## 🧩 API Used

**FakeStore API**
Base URL → https://fakestoreapi.com/

Endpoints used:

- /products

- /products/categories

Example:
```
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => setProducts(data))
```

### 🎯 Assignment Guidelines Followed

- ✅ No TailwindCSS used

- ✅ Used CSS Modules for styling

- ✅ Font: Simplon Norm (Regular & SemiBold)

- ✅ Deployed to Netlify

- ✅ Data fetched from FakeStore API

- ✅ Matches provided Figma layout

## 👨‍💻 Author

Maheeth T
📧 thotakuramaheerth@gmail.com

🔗 [GitHub](https://github.com/Maheeth1)
 | LinkedIn

📝 “Designed with attention to detail and built with React — clean, modern, and responsive.”