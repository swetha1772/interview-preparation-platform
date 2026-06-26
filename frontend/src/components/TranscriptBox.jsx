import React, { useEffect, useRef } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

function TranscriptBox({ transcript = '', isLive = false, onCopy = null }) {
  const [copied, setCopied] = React.useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isLive && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, isLive]);

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  return (
    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="font-semibold text-white">
            Live Transcript
          </h3>
          {isLive && (
            <span className="text-xs font-medium text-emerald-400">
              Recording
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          disabled={!transcript}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
            transition-all duration-200
            ${transcript
              ? copied
                ? 'bg-emerald-400/20 text-emerald-400'
                : 'bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          {copied ? (
            <>
              <CheckCircle size={16} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Transcript content */}
      <div
        ref={scrollRef}
        className="h-48 overflow-y-auto p-6 space-y-4"
      >
        {transcript ? (
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap break-words">
              {transcript}
            </p>
            {isLive && (
              <div className="flex gap-2 pt-2">
                <div className="animate-bounce w-2 h-2 bg-cyan-400 rounded-full" />
                <div className="animate-bounce w-2 h-2 bg-cyan-400 rounded-full animation-delay-200" />
                <div className="animate-bounce w-2 h-2 bg-cyan-400 rounded-full animation-delay-400" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500 text-sm">
              No transcript yet. Start speaking to see your live transcript...
            </p>
          </div>
        )}
      </div>

      {/* Footer with char count */}
      <div className="bg-slate-900/50 border-t border-slate-700 px-6 py-3">
        <p className="text-xs text-slate-500">
          {transcript.length} characters
        </p>
      </div>
    </div>
  );
}

export default TranscriptBox;
