import React, { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    __deferredInstall: any;
  }
}

type Platform = 'chrome' | 'ios-safari' | 'ios-other' | 'android-other' | 'firefox' | 'other';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const isChrome = /chrome\/\d/i.test(ua) && !/edg\//i.test(ua) && !/opr\//i.test(ua);
  const isEdge = /edg\//i.test(ua);
  const isFirefox = /firefox\//i.test(ua);
  const isSafari = /safari\//i.test(ua) && !isChrome && !isEdge;

  if (isIOS && isSafari) return 'ios-safari';
  if (isIOS) return 'ios-other';
  if (isAndroid && !isChrome && !isEdge) return 'android-other';
  if (isChrome || isEdge) return 'chrome';
  if (isFirefox) return 'firefox';
  return 'other';
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

export default function InstallButton() {
  const [platform, setPlatform] = useState<Platform>('other');
  const [installed, setInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasPrompt, setHasPrompt] = useState(false);
  const promptRef = useRef<any>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
    if (isStandalone()) { setInstalled(true); return; }

    // Grab prompt captured before React mounted
    if (window.__deferredInstall) {
      promptRef.current = window.__deferredInstall;
      setHasPrompt(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      promptRef.current = e;
      setHasPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler as EventListener);

    window.addEventListener('appinstalled', () => setInstalled(true));

    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  if (installed) {
    return (
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
        ✅ App installed!
      </span>
    );
  }

  const handleClick = async () => {
    if (hasPrompt && promptRef.current) {
      try {
        await promptRef.current.prompt();
        const { outcome } = await promptRef.current.userChoice;
        if (outcome === 'accepted') setInstalled(true);
        promptRef.current = null;
        setHasPrompt(false);
      } catch {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  const LIVE_URL = 'https://alexandradigital.github.io/bme-beginner-app/';

  const modalContent = () => {
    if (platform === 'ios-safari') {
      return (
        <div className="space-y-3 text-sm text-gray-300">
          <p className="font-semibold text-white text-base">Add to Home Screen on iOS</p>
          <ol className="space-y-2 list-none">
            <li>1. Tap the <strong className="text-white">Share</strong> icon <span className="text-lg">⎙</span> at the bottom of Safari</li>
            <li>2. Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong></li>
            <li>3. Tap <strong className="text-white">Add</strong> in the top-right corner</li>
          </ol>
        </div>
      );
    }
    if (platform === 'ios-other') {
      return (
        <div className="space-y-3 text-sm text-gray-300">
          <p className="font-semibold text-white text-base">Open in Safari to Install</p>
          <p>iOS only allows installation from <strong className="text-white">Safari</strong>. Please open this page in Safari, then tap Share → Add to Home Screen.</p>
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer"
            className="block text-center mt-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-all">
            Open in Safari ↗
          </a>
        </div>
      );
    }
    if (platform === 'firefox') {
      return (
        <div className="space-y-3 text-sm text-gray-300">
          <p className="font-semibold text-white text-base">Install in Firefox</p>
          <p>Look for the <strong className="text-white">house icon</strong> (🏠) in the address bar and click it, or use the Firefox menu → <strong>Install</strong>.</p>
        </div>
      );
    }
    if (platform === 'android-other') {
      return (
        <div className="space-y-3 text-sm text-gray-300">
          <p className="font-semibold text-white text-base">Install on Android</p>
          <p>Open this page in <strong className="text-white">Chrome</strong>, then tap the menu (⋮) → <strong>"Add to Home screen"</strong>.</p>
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer"
            className="block text-center mt-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-all">
            Open in Chrome ↗
          </a>
        </div>
      );
    }
    return (
      <div className="space-y-3 text-sm text-gray-300">
        <p className="font-semibold text-white text-base">Install BioMedAI</p>
        <p>In <strong className="text-white">Chrome or Edge</strong>: click the install icon (⊕) in the address bar or use the browser menu → <strong>"Install BioMedAI"</strong>.</p>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={handleClick}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition-all flex items-center gap-2 text-sm sm:text-base"
        >
          <span>📲</span>
          Install App
        </button>
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors underline underline-offset-4"
        >
          Open in browser ↗
        </a>
      </div>

      {/* Instruction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 max-w-sm w-full rounded-2xl bg-[#0d1832] border border-white/10 p-6 shadow-2xl">
            {modalContent()}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
              >
                Open live site ↗
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
