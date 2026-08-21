"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const profile = {
  name: "Muhammed Ahmed",
  role: "Web Developer",
  tagline: "I build modern, fast and beautiful websites.",
  email: "kaimkhani493@gmail.com",
  phone: "03153269527",
  whatsapp: "https://wa.me/923153269527",
  location: "Khipro, Sindh, Pakistan",
};

const skills = [
  { name: "HTML & CSS", level: 95, icon: "🎨" },
  { name: "JavaScript", level: 90, icon: "⚡" },
  { name: "React.js", level: 92, icon: "⚛️" },
  { name: "Next.js", level: 91, icon: "🚀" },
  { name: "Tailwind CSS", level: 92, icon: "🌊" },
  { name: "Node.js", level: 89, icon: "🟢" },
];

const projects = [
  {
    title: "Ali Gamers",
    desc: "Browser-based flying game with Easy/Medium/Hard modes, coin collection, shield power-ups and high score system.",
    tags: ["JavaScript", "Game", "HTML5"],
    emoji: "🎮",
    link: "http://ali-gamers.vercel.app",
  },
  {
    title: "Broadway Kitchen & Grill",
    desc: "Restaurant website with digital menu, cart system and direct WhatsApp ordering.",
    tags: ["Restaurant", "Cart", "WhatsApp Orders"],
    emoji: "🍕",
    link: "http://broad-way-baba.vercel.app",
  },
  {
    title: "Dua Restaurant",
    desc: "Desi restaurant site from Khipro with menu, gallery, table booking and WhatsApp orders.",
    tags: ["Restaurant", "Gallery", "Booking"],
    emoji: "🍛",
    link: "http://dua-restaurant-khipro.vercel.app",
  },
  {
    title: "Age Calculator",
    desc: "Finds exact age in years, months, days and minutes with date picker and manual input options.",
    tags: ["JavaScript", "Date Logic", "UI"],
    emoji: "⏳",
    link: "http://age-calculater-omega.vercel.app",
  },
  {
    title: "Smart Calculator",
    desc: "Clean and fast web calculator with all basic operations and smooth button experience.",
    tags: ["JavaScript", "Calculator", "App"],
    emoji: "🔢",
    link: "http://ali-calculater.vercel.app",
  },
  {
    title: "ALI Quiz App",
    desc: "Quiz app with Islamic, Maths and English categories — 3 difficulty levels, 90 questions total.",
    tags: ["Quiz", "Categories", "Levels"],
    emoji: "🧠",
    link: "https://alikk-quiz.netlify.app",
  },
  {
    title: "Earn Trading Platform",
    desc: "Online trading platform with secure user login and account management system.",
    tags: ["PHP", "Web App", "Auth"],
    emoji: "📈",
    link: "https://earntrading.click/login.php",
  },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function Counter({ target, start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 1500;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);
  return <>{val}%</>;
}

function AnimatedBar({ value, delay, active }) {
  return (
    <div className="relative h-3">
      <div className="absolute inset-0 rounded-full bg-black/40 border border-white/10 overflow-hidden">
        {[25, 50, 75].map((t) => (
          <span
            key={t}
            className="absolute top-0 bottom-0 w-px bg-white/15"
            style={{ left: `${t}%` }}
          />
        ))}
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.55)] skill-shine"
          style={{
            width: active ? `${value}%` : "0%",
            transition: `width 1.4s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        />
      </div>
      <span
        className="absolute -top-1 h-5 w-1 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)] transition-all duration-1000"
        style={{
          left: active ? `calc(${value}% - 2px)` : "-4px",
          transitionDelay: `${delay + 400}ms`,
          opacity: active ? 1 : 0,
        }}
      />
    </div>
  );
}

function SkillCard({ skill, index, active }) {
  return (
    <div
      className={active ? "animate-fadeUp" : "opacity-0"}
      style={{ animationDelay: `${index * 110}ms` }}
    >
      <div className="group glass rounded-2xl p-5 h-full hover:border-cyan-400/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="text-xl inline-block transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
              {skill.icon}
            </span>
            {skill.name}
          </span>
          <span className="text-sm font-bold text-cyan-400 tabular-nums">
            <Counter target={skill.level} start={active} />
          </span>
        </div>
        <AnimatedBar value={skill.level} delay={index * 130} active={active} />
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [sending, setSending] = useState(false);
  const skillsRef = useRef(null);
  const skillsVisible = useInView(skillsRef);
  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/05fcd2759aca99b82bd3840d20e9fdbb",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
            _subject: "New Portfolio Message!",
            _template: "table",
            _captcha: "false",
          }),
        }
      );
      if (res.ok) {
        e.target.reset();
        setShowPopup(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="relative overflow-x-hidden">
      <div className="fixed top-0 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="fixed top-1/3 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob pointer-events-none" />

      <nav className="fixed top-0 left-0 w-full z-50 glass">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#home" className="text-xl font-bold gradient-text">
            {profile.name}
          </a>
          <div className="hidden md:flex gap-8">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm text-gray-300 hover:text-cyan-400 transition"
              >
                {l}
              </a>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-11 h-11 rounded-xl glass flex flex-col items-center justify-center gap-[5px] active:scale-90 transition"
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-[2px] rounded-full bg-gray-200 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px] bg-cyan-400" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] rounded-full bg-gray-200 transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] rounded-full bg-gray-200 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px] bg-cyan-400" : ""
              }`}
            />
          </button>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-4 mb-4 rounded-2xl bg-[#0b0b20]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
            {links.map((l, i) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                className={`group flex items-center justify-between px-6 py-4 font-medium border-b border-white/5 last:border-0 transition-all duration-300 ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs font-bold text-cyan-400/70">
                    0{i + 1}
                  </span>
                  <span className="text-gray-200 group-hover:text-cyan-400 group-active:text-cyan-400 transition">
                    {l}
                  </span>
                </span>
                <span className="text-cyan-400 opacity-40 group-hover:opacity-100 group-active:opacity-100 transition">
                  ›
                </span>
              </a>
            ))}
            <div className="flex justify-center gap-3 py-4 border-t border-white/10 bg-white/[0.03]">
              <a
                href={profile.whatsapp}
                target="_blank"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 active:scale-90 transition"
              >
                💬
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                title="Email"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-indigo-500/20 hover:text-indigo-300 active:scale-90 transition"
              >
                📧
              </a>
              <a
                href={`tel:${profile.phone}`}
                aria-label="Phone"
                title="Call"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 active:scale-90 transition"
              >
                📞
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section
        id="home"
        className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center max-w-6xl mx-auto px-6 pt-28 pb-16 gap-12"
      >
        <div className="text-center md:text-left animate-fadeUp">
          <p className="text-cyan-400 font-medium mb-3">👋 Hello, I&apos;m</p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            {profile.name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold gradient-text mb-6">
            {profile.role}
          </h2>
          <p className="text-gray-400 max-w-md mb-8">{profile.tagline}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              className="btn-glow px-7 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold transition"
            >
              Hire Me
            </a>
            <a
              href="/CV.jpeg"
              target="_blank"
              className="btn-glow px-7 py-3 rounded-full border border-indigo-400/50 font-semibold hover:bg-white/5 transition"
            >
              Download CV ⬇
            </a>
          </div>
        </div>
        <div className="animate-float">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-cyan-400 to-purple-500">
            <Image
              src="/profile.jpeg"
              alt={profile.name}
              width={320}
              height={320}
              priority
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </section>

      <section id="about" className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <span className="absolute -top-4 left-4 text-[140px] leading-none text-cyan-400/10 select-none pointer-events-none font-serif">
            &ldquo;
          </span>
          <p className="relative text-lg md:text-xl text-gray-300 leading-relaxed md:leading-loose mb-8 first-letter:text-7xl first-letter:font-black first-letter:text-transparent first-letter:bg-clip-text first-letter:bg-gradient-to-br first-letter:from-indigo-400 first-letter:to-cyan-400 first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
            Assalam-o-Alaikum! I am{" "}
            <span className="gradient-text font-bold">Muhammed Ahmed</span>, a
            passionate{" "}
            <span className="text-cyan-300 font-semibold">
              web developer
            </span>{" "}
            from Khipro, Sindh, Pakistan, who builds{" "}
            <span className="text-cyan-300 font-semibold">
              modern websites
            </span>{" "}
            and web applications. My goal is to deliver the best user
            experience through{" "}
            <span className="text-indigo-300 font-semibold">clean code</span>{" "}
            and{" "}
            <span className="text-purple-300 font-semibold">
              stunning design
            </span>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="group glass rounded-xl p-5 flex flex-col items-center text-center gap-2 hover:border-cyan-400/50 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/15 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.45)]">
                📧
              </span>
              <span className="text-cyan-400 font-semibold">Email</span>
              <span className="text-gray-300 break-all group-hover:text-cyan-200 transition">
                {profile.email}
              </span>
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="group glass rounded-xl p-5 flex flex-col items-center text-center gap-2 hover:border-green-400/50 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/15 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.45)]">
                📞
              </span>
              <span className="text-green-400 font-semibold">Phone</span>
              <span className="text-gray-300 group-hover:text-green-200 transition">
                {profile.phone}
              </span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Khipro,+Sindh,+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-xl p-5 flex flex-col items-center text-center gap-2 hover:border-purple-400/50 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/15 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-full bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.45)]">
                📍
              </span>
              <span className="text-purple-400 font-semibold">Location</span>
              <span className="text-gray-300 group-hover:text-purple-200 transition">
                {profile.location}
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="skills" ref={skillsRef} className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-3">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Technologies I work with daily 🛠️
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} active={skillsVisible} />
          ))}
        </div>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          My <span className="gradient-text">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-3xl p-7 flex flex-col hover:-translate-y-2 hover:border-cyan-400/40 transition duration-300"
            >
              <div className="text-5xl mb-4">{p.emoji}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition">
                {p.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                Visit Site
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-4">
          Contact <span className="gradient-text">Me</span>
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Have a question or a project in mind? Send me a message — it will go
          straight to my inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 space-y-5"
        >
          <input type="hidden" name="_subject" value="New Portfolio Message!" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 placeholder:text-gray-500"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 placeholder:text-gray-500"
            />
          </div>
          <textarea
            name="message"
            rows="5"
            required
            placeholder="Your Message..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={sending}
            className="btn-glow w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-bold text-lg transition disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send Message 🚀"}
          </button>
          <p className="text-center text-xs text-gray-500">
            After submitting the form for the first time, FormSubmit sends an
            activation email to your Gmail — once activated, every message will
            arrive directly in your inbox.
          </p>
        </form>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href={profile.whatsapp}
            target="_blank"
            className="btn-glow px-6 py-3 rounded-full bg-green-600 font-semibold transition"
          >
            💬 WhatsApp: {profile.phone}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="btn-glow px-6 py-3 rounded-full border border-cyan-400/50 font-semibold hover:bg-white/5 transition"
          >
            📧 Direct Email
          </a>
        </div>
      </section>

      <footer className="relative mt-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-3">
              {profile.name}
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
              Passionate web developer crafting modern, fast and beautiful
              websites &amp; web apps with clean code and stunning design.
            </p>
            <div className="flex gap-3">
              <a
                href={profile.whatsapp}
                target="_blank"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition"
              >
                💬
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                title="Email"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-indigo-500/20 hover:text-indigo-300 transition"
              >
                📧
              </a>
              <a
                href={`tel:${profile.phone}`}
                aria-label="Phone"
                title="Phone"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition"
              >
                📞
              </a>
              <a
                href="#home"
                aria-label="Location"
                title={profile.location}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-purple-500/20 hover:text-purple-300 transition"
              >
                📍
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-gray-400">
              {links.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="group inline-flex items-center gap-2 hover:text-cyan-400 transition"
                  >
                    <span className="text-cyan-400/0 group-hover:text-cyan-400 transition">
                      ›
                    </span>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200 mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span>📧</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-cyan-400 break-all transition"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href={`tel:${profile.phone}`} className="hover:text-cyan-400 transition">
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                {profile.location}
              </li>
              <li>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-full bg-green-600/90 font-semibold text-white hover:bg-green-500 btn-glow transition"
                >
                  💬 WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 py-5 text-center text-gray-500 text-xs space-y-1">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-300 font-medium">{profile.name}</span>.
            All rights reserved.
          </p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>

      {showPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeUp px-4"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="glass rounded-3xl p-10 max-w-sm w-full text-center border border-cyan-400/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-tr from-green-500 to-cyan-400 flex items-center justify-center text-4xl btn-glow">
              ✓
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">
              Message Sent!
            </h3>
            <p className="text-gray-300 mb-6">
              Your message sent successfully. I will get back to you soon! 🚀
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="btn-glow w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-bold transition"
            >
              OK, Great!
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
