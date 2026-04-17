"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Results() {
  const router = useRouter();
  const [original, setOriginal] = useState('');
  const [optimized, setOptimized] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Only access sessionStorage on the client
    const optRes = sessionStorage.getItem('optimizedResume');
    const origRes = sessionStorage.getItem('originalResume');

    if (!optRes) {
      router.push('/');
      return;
    }

    setOptimized(optRes);
    if (origRes) setOriginal(origRes);
  }, [router]);

  const handleCopy = () => {
    navigator.clipboard.writeText(optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!optimized) return <div className="flex-1 flex justify-center items-center">Loading...</div>;

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
      
      <div className="w-full mb-8 flex justify-between items-end">
        <div>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors mb-4 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Editor
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
            Optimized Resume
          </h1>
          <p className="text-slate-400 mt-2">Ready to defeat the ATS systems.</p>
        </div>
        
        <button
          onClick={handleCopy}
          className="group relative inline-flex h-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10 px-8 font-medium text-white transition-all hover:bg-white/20 border border-white/5 hover:border-white/20"
        >
          {copied ? (
            <span className="inline-flex items-center gap-2 text-green-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy to Clipboard
            </span>
          )}
        </button>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-8">
        {/* Original */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-semibold text-slate-300">Original</h2>
          <div className="flex-1 w-full p-8 rounded-2xl bg-white/5 border border-white/5 text-slate-400 whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-y-auto max-h-[70vh] custom-scrollbar">
            {original || 'No original text provided.'}
          </div>
        </div>

        {/* Optimized */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            ATS Optimized Result ✨
          </h2>
          <div className="flex-1 w-full p-8 rounded-2xl bg-slate-900 shadow-2xl border border-blue-500/20 text-slate-200 whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-y-auto max-h-[70vh] custom-scrollbar relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {optimized}
          </div>
        </div>
      </div>
      
      {/* Scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </main>
  );
}
