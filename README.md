<div align="center">

<!-- Animated Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Sijill%20Staff%20Portal&fontSize=50&fontColor=ffffff&animation=twinkling&fontAlignY=35&desc=Healthcare%20Workflow%20Management%20Platform&descAlignY=60&descSize=20" width="100%"/>

<!-- Animated Typing Effect -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=61DAFB&center=true&vCenter=true&multiline=true&width=700&height=80&lines=Role-Based+Clinical+Workflow+Portal;Built+with+React+%2B+Vite+%2B+Framer+Motion;Secure+%7C+Fast+%7C+Beautiful" alt="Typing SVG" />
</a>

<br/>

<!-- Badges -->
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-API%20Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Served-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Framer](https://img.shields.io/badge/Framer%20Motion-Animated-BB4B96?style=for-the-badge&logo=framer&logoColor=white)

<br/>

<!-- Profile Views & Status -->
![GitHub last commit](https://img.shields.io/github/last-commit/your-org/sijill-staff-portal?style=flat-square&color=61DAFB)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

</div>

---

<div align="center">

## 🩺 What is Sijill Staff Portal?

</div>

> **Sijill Staff Portal** is the role-based web entry point for the **Sijill EHR ecosystem** — giving healthcare providers, laboratories, and imaging centers a controlled, elegant workspace for patient-facing clinical workflows. One portal. Every role. Zero confusion.

<div align="center">

```
🏥 Provider  ──►  Clinical Sessions & Encounter Documentation
🧪 Lab Staff  ──►  Token Redemption & Result Upload
🩻 Imaging   ──►  Radiology Orders & Diagnostic Submissions
```

</div>

---

## 📋 Table of Contents

<div align="center">

| | Section |
|:---:|:---|
| 🌟 | [Overview](#-overview) |
| ⚙️ | [Core Workflows](#%EF%B8%8F-core-workflows) |
| 🏗 | [Architecture](#-architecture) |
| 🔐 | [Security Model](#-security-model) |
| 🎨 | [UI & Motion](#-ui--motion) |
| 🧪 | [Technologies](#-technologies) |
| 🚀 | [Run with Docker](#-run-with-docker) |
| 🌱 | [Future Vision](#-future-vision) |

</div>

---

## 🌟 Overview

<img align="right" src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="300" alt="Coding animation"/>

Sijill Staff Portal keeps healthcare workflows **structured**, **role-aware**, and **accessible** from a single web application. Instead of forcing staff to work across disconnected systems, the portal gives each user a dedicated route into the part of the platform they're responsible for.

- 🩺 **Providers** review patient identity, history, and document encounters
- 🧪 **Labs** redeem patient tokens, inspect orders, and upload results
- 🩻 **Imaging centers** follow the same token-based flow for diagnostic studies
- 🔒 **Role isolation** keeps each user locked into their correct workflow

The frontend is built with **React + Vite**, navigated by **React Router**, powered by **Axios** for APIs, and driven by **Framer Motion** for a premium animated UI experience.

<br clear="right"/>

---

## ⚙️ Core Workflows

<div align="center">

```mermaid
flowchart TD
    A[🔐 Authentication] --> B{Role Detection}
    B -->|Provider| C[🩺 Clinical Session]
    B -->|Lab Staff| D[🧪 Lab Session]
    B -->|Imaging| E[🩻 Imaging Session]
    C --> F[📋 Encounter Documentation]
    D --> G[📤 Result Upload]
    E --> H[📤 Study Submission]
    F --> I[✅ Completion Screen]
    G --> I
    H --> I
```

</div>

| Workflow | Description |
|:---:|:---|
| 🩺 **Provider Sessions** | Access patient identity, medical history, and encounter documentation through a structured clinical flow |
| 🧪 **Laboratory Sessions** | Redeem a patient token, inspect lab orders, and submit results through a dedicated workflow |
| 🩻 **Imaging Sessions** | Token-based flow for radiology and diagnostic study submissions |
| 🔑 **Auth & Recovery** | Login, registration, OTP verification, and password reset — all in dedicated portal pages |
| 🛡️ **Protected Routing** | Session-aware route guards keep users inside the correct role and workflow |
| ✅ **Result Confirmation** | Completion screens provide a clear, definitive end state after submissions |
| 📄 **PDF Generation** | Utilities for generating encounter summary PDFs from recorded clinical data |

---

## 🏗 Architecture

<img align="right" src="https://media.giphy.com/media/SWoSkN6DxTszqIKEqv/giphy.gif" width="270" alt="Architecture animation"/>

The application is organized as a **single-page React frontend** with separate route groups for public pages, authentication, provider workflows, and diagnostic portals.

- `ProtectedRoute` enforces access by authenticated role and session type
- A centralized **Axios client** attaches bearer tokens and normalizes errors
- Clinical and portal sessions are stored **client-side** to preserve context across navigation

### 📁 Project Structure

```text
sijill-staff-portal/
├── 📦 src/
│   ├── 🔌 api/          # Auth, clinical, lab & imaging API clients
│   ├── 🧩 Components/   # Shared UI & workflow-specific components
│   ├── 📄 Pages/        # Route-level screens: landing, auth, provider & portal flows
│   ├── ⚙️ constants/    # Portal/session config & medical lookup data
│   ├── 🌐 context/      # Shared app state (toast notifications, etc.)
│   └── 🛠️ utils/        # Session helpers, routing helpers & PDF utilities
├── 🌍 public/
├── 🐳 Dockerfile
├── 🐳 docker-compose.yml
├── ⚡ vite.config.js
└── 📘 README.md
```

<br clear="right"/>

---

## 🔐 Security Model

<div align="center">

| 🔒 Layer | Implementation |
|:---:|:---|
| **Authentication** | Password-based login with OTP verification |
| **Authorization** | Route access is strictly restricted by user role |
| **Session Scoping** | Clinical and portal workflows require a valid session before rendering |
| **Token Usage** | Backend requests attach bearer tokens where required |
| **Boundary Enforcement** | Provider, Lab, and Imaging flows are fully isolated from one another |

</div>

> 🛡️ **Zero-trust boundary**: no user can enter a workflow they are not authorized for — the portal enforces this at both the routing and API layers.

---

## 🎨 UI & Motion

<img align="right" src="https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" width="260" alt="UI Animation"/>

The interface is **not a static form shell**. Every interaction is designed to feel responsive and deliberate.

- ✨ **Background particles & gradient layers** add depth to the landing page
- 🌊 **Section transitions** use fade and scale-in patterns via Framer Motion
- 🔔 **Toast notifications** with smooth motion-driven feedback states
- 🎯 **Iconography** from Bootstrap Icons and Lucide for at-a-glance readability
- 📱 **Responsive layouts** adapting gracefully across devices

<br clear="right"/>

---

## 🧪 Technologies

<div align="center">

| Category | Stack | Badge |
|:---:|:---|:---:|
| ⚛️ **Frontend** | React 19, Vite 6 | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| 🧭 **Routing** | React Router | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) |
| 🔌 **API** | Axios | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) |
| 📝 **Forms** | React Hook Form, Zod | ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square) |
| 🎨 **UI** | MUI, Bootstrap, React Bootstrap | ![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white) |
| 🎬 **Motion** | Framer Motion | ![Framer](https://img.shields.io/badge/Framer-BB4B96?style=flat-square&logo=framer&logoColor=white) |
| 🔷 **Icons** | Bootstrap Icons, Lucide, React Icons | ![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat-square) |
| 📄 **PDF** | jsPDF | ![jsPDF](https://img.shields.io/badge/jsPDF-FF0000?style=flat-square) |
| 🐳 **Deployment** | Docker, Nginx | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white) |

</div>

---

## 🚀 Run with Docker

<img align="right" src="https://media.giphy.com/media/kH1DBkPNyZPOk0BxrM/giphy.gif" width="240" alt="Docker animation"/>

### ▶️ Build and Run

```bash
docker compose up --build
```

The app will be available at 👉 **`http://localhost:8080`**

### 🔧 Configure the API Base URL

**Windows (PowerShell)**:
```powershell
$env:VITE_API_BASE_URL="https://your-api.example.com/api/v1"
docker compose up --build
```

**Linux / macOS (Bash)**:
```bash
VITE_API_BASE_URL="https://your-api.example.com/api/v1" docker compose up --build
```

### 🏗️ Build the Image Directly

```bash
docker build -t sijill-staff-portal \
  --build-arg VITE_API_BASE_URL=https://your-api.example.com/api/v1 .

docker run -p 8080:80 sijill-staff-portal
```

<br clear="right"/>

---

## 🌱 Future Vision

<div align="center">

```
🗺️ Roadmap
```

</div>

| 🚩 Priority | Enhancement |
|:---:|:---|
| 🔥 **High** | Offline support with service workers for low-connectivity environments |
| 🔥 **High** | Real-time notifications for critical lab and imaging result updates |
| 🌟 **Medium** | Interactive dashboard for workflow analytics and session metrics |
| 🌟 **Medium** | Multilingual support (Arabic, English, French) |
| 💡 **Future** | Mobile app companion via React Native |
| 💡 **Future** | AI-assisted encounter documentation |

> The long-term direction for Sijill Staff Portal is to tighten the connection between healthcare workflows and the data they depend on — serving as the operational front door for **secure, coordinated care**.

---

<div align="center">



## 📜 License

This project is licensed under the **MIT License**.

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&animation=twinkling" width="100%"/>

**Built with ❤️ by the Sijill Engineering Team**

*Last Updated: 1 July 2026*

</div>
