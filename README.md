# Identity Generator

A lightweight, single-file web application for generating secure passwords and memorable usernames. This tool runs entirely in your browser with no installation or servers required.

## 📋 Features

### 1. Password Generator
- **8 Characters**: Fully random alphanumeric and symbol string.
- **12 & 15 Characters**: Passphrase-style security.
  - Combines 2 recognizable words from an internal dictionary.
  - Appends exactly **1 Number** and **1 Symbol**.
  - **Allowed Symbols**: ! @ $ ? * + - =

### 2. Username Generator
- Generates a random **2-word combination** in CamelCase (e.g., "SilverFalcon").
- Uses an internal library of over 100 themed words (Nature, Space, Tech).

## 🛠 Tech Stack
- **HTML5 / JavaScript**: Core logic and functionality.
- **Tailwind CSS**: Modern UI styling (via CDN).
- **Google Fonts**: Inter and JetBrains Mono for a clean, technical look.

## 💻 Git & Deployment
To push this to your GitHub repository:

1. **Save Files**: Ensure both `index.html` and `README.md` are in your `identity_generator` folder.
2. **Update Remote**:
   `git remote set-url origin https://github.com/the3rddoctorny/identity_generator.git`
3. **Push Changes**:
   `git add .`
   `git commit -m "Initial commit with README"`
   `git push -u origin main`
