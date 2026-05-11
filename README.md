# Technical Portfolio - Satish R. Marathe

A futuristic, high-performance technical portfolio built with React, Vite, Tailwind CSS, and Framer Motion. This application showcases over 20 years of architectural leadership in enterprise communications, cloud-native SaaS, and AI-driven systems.

## 🚀 Project Overview

This portfolio leverages a "Technical Dashboard" aesthetic, reflecting the expertise of a Software Architect specializing in GenAI, Cloud Computing, and Microservices. 

## 🌐 Deployment to GitHub Pages

This project is configured to be deployed via **GitHub Actions**.

### Steps to Deploy:
1. **Push your code** to the `main` (or `master`) branch of your GitHub repository.
2. Go to your repository settings on GitHub.
3. Click on **Pages** in the left sidebar.
4. Under **Build and deployment > Source**, select **GitHub Actions**.
5. The included workflow in `.github/workflows/deploy.yml` will automatically build and deploy your site whenever you push.

### Troubleshooting:
- **Blank Page?** Ensure the `base` name in `vite.config.ts` matches your repository name. If your repo is named something other than `portfolio`, update line 9 in `vite.config.ts`: `base: process.env.GITHUB_ACTIONS ? '/YOUR_REPO_NAME/' : '/'`.
- **Action not running?** Check the **Actions** tab in your GitHub repository to see if there are any error logs.
- **Permission denied?** Make sure you've selected "GitHub Actions" as the source in the Pages settings.

**Note:** The site will be available at `https://smaratheengg.github.io/portfolio/`.

### Key Features:
- **Architecture Log Viewer:** Dynamic content loading from Markdown files.
- **Agentic Skill Visualization:** Animated competency bars highlighting expertise in LangGraph, RAG, and AKS.
- **Experience Timeline:** Collapsible professional history node with markdown support.
- **Project Grid:** Interactive links to open-source contributions and major projects.
- **Performance Optimized:** Built with Vite for instant loading and motion for smooth transitions.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Content:** [React Markdown](https://github.com/remarkjs/react-markdown) & [Gray Matter](https://github.com/jonschlinkert/gray-matter)

## 📊 Status

**Status:** `Active / Maintained`
- **Current Site:** [Live Preview](https://ais-dev-5nynqctfccdabxbbidlsmf-908440826396.asia-southeast1.run.app)
- **Latest Update:** Integration of full professional history and enhanced skill animations.

## 📄 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](./LICENSE) file for details.

---

*Built with precision for the GenAI era.*
