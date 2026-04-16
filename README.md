# 🚀 MeraEvents Dashboard – Event & Attendee Management System

## 📌 Overview

MeraEvents Dashboard is a full-stack event management platform that enables organizers to create events, manage attendees, and track registrations efficiently through a centralized dashboard.

The system is designed with a focus on **data integrity, scalability, and real-world constraints**, ensuring reliable event handling.

---

## 🧠 Problem Statement

Managing event registrations manually leads to:

* Overbooking due to lack of capacity tracking
* Poor visibility of attendees
* Inefficient coordination between organizers and participants

This project solves these issues by providing a **structured, API-driven system** for event and attendee management.

---

## ⚙️ Features

* Create and manage events
* Register attendees for events
* Enforce event capacity constraints (prevents overbooking)
* View events along with attendee data
* Role-based structure ready for extension

---

## 🏗️ Tech Stack

* **Frontend:** Next.js (React)
* **Backend:** Next.js API Routes
* **Database:** Prisma ORM (SQLite/PostgreSQL)
* **State Management & Fetching:** React Query
* **Form Handling & Validation:** React Hook Form + Zod
* **Styling:** Tailwind CSS

---

## 🔄 System Architecture

1. Organizer creates an event → stored in database
2. Attendees register → linked to event via relational schema
3. Backend APIs handle validation and business logic
4. Dashboard fetches structured data → renders event + attendee info

---

## 🧠 Data Modeling & Constraints

* Designed relational schema linking **events ↔ attendees** using Prisma
* Enforced real-world constraint: **event capacity limit** to prevent overbooking
* Implemented server-side validation for reliable data handling

---

## ⚙️ API Design

* Built RESTful endpoints for:

  * Event creation (`POST /api/events`)
  * Event retrieval (`GET /api/events`)
  * Attendee registration (`POST /api/attendees`)
* Optimized queries by fetching events with attendees in a single call
* Structured responses for efficient frontend rendering

---

## 🚨 Edge Case Handling

* Prevented event overbooking using capacity checks
* Handled missing events with proper error responses
* Ensured consistent data validation across backend

---

## 📊 Key Learnings

* Designed scalable backend architecture using API-driven approach
* Applied relational data modeling for real-world scenarios
* Improved performance using optimized data fetching strategies
* Built robust validation pipelines using Zod

---

## 🚧 Future Improvements

* Add analytics dashboard (attendance trends, drop-off rates)
* Implement authentication & role-based access (admin/user)
* Integrate payment gateway for paid events
* Optimize database queries for large-scale usage

---

## 🧪 How to Run Locally

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

---

## 💡 Highlight

A key aspect of this project is enforcing **business constraints (event capacity)** at the backend level, ensuring correctness and preventing invalid states — an essential requirement in real-world systems.

---
