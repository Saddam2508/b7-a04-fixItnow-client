# 🔧 FixItNow — Home Service Platform

**Your Trusted Partner for Every Home Service Need.**

FixItNow is a modern home service platform designed to connect customers with skilled and reliable service professionals. From plumbing and electrical repairs to cleaning and AC maintenance, FixItNow makes discovering, booking, and managing home services simple and convenient.

🌐 **Live Demo:** [FixItNow](https://b7-a04-fix-itnow-client.vercel.app)

---

## 🚀 Live Links

| Resource | URL |
|---|---|
| Frontend Application | [Visit Website](https://b7-a04-fix-itnow-client.vercel.app) |
| Backend API | [API Server](https://b7-a04-fix-itnow.vercel.app) |
| Frontend Repository | [GitHub Repository](https://github.com/Saddam2508/b7-a04-fixItnow-client.git) |

---

## ✨ Key Features

### 🌐 Public Features
- Modern and fully responsive user interface.
- Browse available home services.
- Search and filter services.
- Explore professional technicians.
- View service details and technician information.
- Optimized user experience across desktop, tablet, and mobile devices.

### 👤 Customer Features
- User registration and authentication.
- Browse and explore home services.
- Book services with preferred technicians.
- Track booking history and status.
- Manage personal booking information.
- Payment and review workflow.

### 🛠️ Technician Features
- Dedicated technician dashboard.
- Manage technician profile and services.
- Manage service availability.
- View incoming booking requests.
- Accept or decline booking requests.
- Update booking progress and completion status.
- Monitor assigned jobs.

### 🛡️ Admin Features
- Dedicated administration dashboard.
- Manage platform users.
- Manage service categories.
- Monitor bookings and platform activities.
- Access platform management tools.

---

## 📌 Platform Roles

| Role | Responsibilities |
|---|---|
| **Customer** | Discover services, book technicians, manage bookings, and submit reviews. |
| **Technician** | Manage services, availability, and customer bookings. |
| **Admin** | Manage users, service categories, and platform operations. |

The platform provides role-based experiences to ensure that customers, technicians, and administrators can access their respective functionalities.

---

## 🔄 Booking Workflow

The platform follows a structured booking workflow:

1. Customer registers or logs in.
2. Customer explores available services.
3. Customer selects a suitable technician.
4. Customer submits a booking request.
5. Technician reviews and responds to the request.
6. Customer proceeds with payment after acceptance.
7. Technician starts and completes the job.
8. Customer can submit a review after completion.

### Booking Status

| Status | Description |
|---|---|
| `REQUESTED` | Booking request submitted |
| `ACCEPTED` | Technician accepted the booking |
| `DECLINED` | Technician declined the request |
| `PAID` | Payment completed |
| `IN_PROGRESS` | Service is in progress |
| `COMPLETED` | Service successfully completed |
| `CANCELLED` | Booking cancelled |

---

## 🧰 Technology Stack

### Frontend
- **Next.js** — React framework
- **React** — UI development
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Styling and responsive layouts
- **shadcn/ui** — Reusable UI components
- **Lucide React** — Icon library
- **React Icons** — Social and brand icons

### Backend & Integration
- REST API
- Next.js API integration
- Environment-based API configuration

### Deployment
- **Vercel** — Frontend hosting
- **Vercel** — Backend API hosting
- **GitHub** — Source code management

---

## 📂 Project Structure

```text
b7-a04-fixItnow-client/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   │   ├── customer/
│   │   │   ├── technician/
│   │   │   └── admin/
│   │   ├── services/
│   │   ├── payment/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── shared/
│   │   └── dashboard/
│   │
│   ├── hooks/
│   ├── lib/
│   └── types/
│
├── .env.local
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Saddam2508/b7-a04-fixItnow-client.git
```

### 2. Navigate to the Project Directory

```bash
cd b7-a04-fixItnow-client
```

### 3. Install Dependencies

This project uses pnpm.

```bash
pnpm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root directory.

```env
NEXT_PUBLIC_BASE_URL=https://b7-a04-fix-itnow.vercel.app
```

**Environment Variable Description:**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Backend API base URL |

Replace the URL with your local backend URL when running the backend locally.

### 5. Start the Development Server

```bash
pnpm dev
```

Open your browser and visit:

```text
http://localhost:3000
```

### 6. Build for Production

```bash
pnpm build
```

### 7. Start Production Server

```bash
pnpm start
```

---

## 🌍 Deployment

The application is deployed using Vercel.

### Frontend Deployment
- Hosting Platform: Vercel
- Framework: Next.js
- Production URL: https://b7-a04-fix-itnow-client.vercel.app

### Backend Deployment
- Hosting Platform: Vercel
- API URL: https://b7-a04-fix-itnow.vercel.app

Make sure the required environment variables are configured in the Vercel project settings before deployment.

---

## 🔐 Security & Access Control

- Role-based dashboard access.
- Protected application routes.
- Authentication-aware user experience.
- Environment-based API configuration.
- Server-side validation and authorization through the backend.

---

## 🎯 Project Goals

FixItNow aims to simplify home maintenance by providing a centralized platform where customers can find trusted professionals without the hassle of searching for individual service providers.

The platform focuses on:

- Convenience and accessibility.
- Reliable service discovery.
- Efficient booking management.
- Better communication between customers and technicians.
- A smooth and user-friendly experience.

---

## 👨‍💻 Developer

**Saddam Hossain**

Full Stack Web Developer

- GitHub: [@Saddam2508](https://github.com/Saddam2508)
- Project: [FixItNow](https://b7-a04-fix-itnow-client.vercel.app)

---

## 📄 License

This project is developed for educational and portfolio purposes.

---

<p align="center">
  <strong>FixItNow — Better Homes, Happier Lives. 🏡</strong>
</p>

<p align="center">
  Made with ❤️ by Saddam Hossain
</p>