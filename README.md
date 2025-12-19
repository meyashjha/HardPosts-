# 📝 HardPosts - Because Medium Posts Are Overrated

> *A full-stack blogging platform that actually works (most of the time)*

## 🎯 What's This About?

Ever wanted to yell your thoughts into the void? HardPosts is your answer! It's a sleek blogging platform where you can sign up, write posts, and pretend people are reading them.

---

## 🚀 Backend - The Boring But Important Stuff

The backend is basically the backbone that keeps everything from falling apart. Running on **Hono** (found it similar to express in most aspects), a lightweight web framework that's faster than my ability to procrastinate. It's deployed on **Cloudflare Workers** because who needs traditional servers anyway?

We've got **Prisma** handling our PostgreSQL database with *Accelerate* extension (because slow queries are so 2020). The API has JWT authentication (fancy tokens to prove you're actually you), password hashing with bcrypt (no plain text passwords here, we're professionals... kinda), and RESTful routes for users and blogs. User signup/signin, creating posts, reading posts, updating profiles - all that jazz. Plus, there's a `common` package for shared TypeScript types because DRY is life.

**Tech Stack:** Hono + Prisma + PostgreSQL + Cloudflare Workers + TypeScript + JWT + .....

---

## 🎨 Frontend - The Pretty Face

Built with **React** and **Vite** (because Create React App is vintage now), styled with **Tailwind CSS** (utility classes go brrr). The frontend has all the routes you'd expect: landing page, signup/login flows, a feed to scroll through posts, profile pages, and an editor to pour your soul into blog posts.

It's fully responsive-ish, has proper routing with React Router, and uses Axios to talk to the backend. The component structure is chef's kiss - BlogCard, Feed, Header, Landing, Login, Signup, Profile, WriteBlog, and ReadBlog. Each does exactly what it says on the tin. State management? We're keeping it simple with React hooks. No Redux rabbit holes here.

**Tech Stack:** React + TypeScript + Vite + Tailwind CSS + React Router + Axios + .....

---

## 🛠️ Project Structure

```
├── backend/          # API & Database magic
├── frontend/         # React UI goodness  
└── common/          # Shared validation schemas
```

---

## 💻 Getting Started

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Common Package:**
```bash
cd common
npm install
```

---

## 📚 Features That Actually Work

- ✅ User authentication (signup/signin)
- ✅ Create and read blog posts
- ✅ User profiles
- ✅ Feed with all posts
- ✅ Individual blog post pages
- ✅ Shared TypeScript validation

---

## 🎓 Lessons Learned

Cloudflare Workers are cool but confusing. Prisma is your friend. TypeScript will yell at you but it's for your own good. Tailwind makes styling addictive. And most importantly - always push to GitHub before your laptop dies.

---

**Not the best project I made but I like it**💖
