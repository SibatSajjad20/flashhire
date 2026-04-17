"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptimize = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide both your Resume and the Job Description.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await response.json();

      if (response.ok) {
        // We will store the result in sessionStorage to pass it into results page
        sessionStorage.setItem('optimizedResume', data.optimizedText);
        sessionStorage.setItem('originalResume', resumeText);
        router.push('/results');
      } else {
        setError(data.error || 'Something went wrong during optimization.');
      }
    } catch (err) {
      setError('Failed to reach server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col relative w-full">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent pb-2">
          Defeat the ATS. <br />Land your next role.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400">
          Paste your existing resume alongside your target job description. Our AI analyzes the requirements and optimally tailors your resume bullets in seconds.
        </p>
      </section>

      {/* Input Section - Split Screen */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-4 pb-20 flex flex-col items-center">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 w-full max-w-3xl text-center shadow-lg shadow-red-500/5">
            {error}
          </div>
        )}

        <div className="w-full grid md:grid-cols-2 gap-8 mb-12">
          {/* Resume Left */}
          <div className="flex flex-col space-y-3">
            <label className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <span className="p-1.5 rounded bg-blue-500/10 text-blue-400">📄</span>
              Your Current Resume
            </label>
            <textarea
              className="flex-1 min-h-[400px] w-full p-6 rounded-2xl bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-xl resize-none backdrop-blur-sm"
              placeholder="Paste your plain text resume or current bullet points here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              disabled={loading}
            ></textarea>
          </div>

          {/* Job Description Right */}
          <div className="flex flex-col space-y-3">
            <label className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <span className="p-1.5 rounded bg-purple-500/10 text-purple-400">🎯</span>
              Target Job Description
            </label>
            <textarea
              className="flex-1 min-h-[400px] w-full p-6 rounded-2xl bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all shadow-xl resize-none backdrop-blur-sm"
              placeholder="Paste the target job description requirements here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={loading}
            ></textarea>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOptimize}
          disabled={loading}
          className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-12 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(99,102,241,0.3)] disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-3 text-lg">
              <svg className="h-6 w-6 animate-spin text-white/80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Optimizing for ATS...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-lg">
              ✨ Optimize Resume
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
        </button>
      </section>

      {/* Meet the Developer Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-white">Meet the Developer</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Developer Card */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.3)] hover:bg-white/[0.07]"
            style={{transformStyle:'preserve-3d'}}>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-2xl shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                &lt;/&gt;
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Sibat Sajjad</h3>
                <p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Full Stack Web Developer</p>
              </div>
            </div>

            {/* Bio */}
            <p className="mb-6 text-slate-400 leading-relaxed">
              Passionate full-stack developer specializing in building scalable, modern web applications with cutting-edge technologies. Experienced in creating intuitive user interfaces and robust backend architectures that solve real-world problems.
            </p>

            {/* Skills */}
            <div className="mb-8 space-y-3">
              {[
                { title: 'Frontend Expertise', desc: 'React, TypeScript, Tailwind CSS, Next.js' },
                { title: 'Backend Mastery', desc: 'Node.js, Express, PostgreSQL, RESTful APIs' },
                { title: 'DevOps & Tools', desc: 'Git, Docker, CI/CD, Cloud Deployment (Vercel)' },
              ].map((skill) => (
                <div key={skill.title} className="transition-transform duration-200 hover:translate-x-1">
                  <p className="font-semibold text-slate-200">{skill.title}</p>
                  <p className="text-sm text-slate-500">{skill.desc}</p>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sibat-sajjad-a096731a9/', icon: '💼' },
                { label: 'GitHub', href: 'https://github.com/SibatSajjad20', icon: '🐙' },
                { label: 'Email Me', href: 'https://mail.google.com/mail/?view=cm&to=sajjadsibat33@gmail.com', icon: '✉️' },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-blue-500/50 hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20 overflow-hidden group/btn"><span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span><span className="relative z-10 flex items-center gap-2">
                  {link.icon} {link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Project Card */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_0_40px_-5px_rgba(139,92,246,0.3)] hover:bg-white/[0.07]"
            style={{transformStyle:'preserve-3d'}}>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/5 to-blue-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                ✨
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">FlashHire</h3>
                <p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">v 1.0.0</p>
              </div>
            </div>

            {/* Description */}
            <p className="mb-6 text-slate-400 leading-relaxed">
              An AI-powered resume optimizer that tailors your resume to any job description, maximizing ATS keyword matching and helping you land more interviews.
            </p>

            {/* Features */}
            <div className="mb-8 space-y-4">
              {[
                { icon: '🤖', title: 'Gemini AI', desc: 'Google Gemini 2.5 Flash powers intelligent resume rewriting' },
                { icon: '🎯', title: 'ATS Optimization', desc: 'Keyword matching engineered to pass applicant tracking systems' },
                { icon: '🗄️', title: 'PostgreSQL + Neon', desc: 'Serverless database stores every optimization for history' },
                { icon: '⚡', title: 'Instant Results', desc: 'Side-by-side comparison of original vs optimized resume' },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-base">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-200">{f.title}</p>
                    <p className="text-sm text-slate-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'Tailwind', 'PostgreSQL', 'Neon', 'Gemini AI'].map((tag) => (
                <span key={tag}
                  className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 transition-all duration-200 hover:border-purple-500/40 hover:text-purple-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-purple-500/10 group/tag cursor-default">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600/15 to-purple-600/15 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
