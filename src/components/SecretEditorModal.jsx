import React, { useState, useEffect } from 'react';
import { useResumeData } from '../context/ResumeDataContext';
import { useToast } from './Toast';
import { Edit3, Save, RotateCcw, Copy, X, CheckCircle, ShieldLock, Download, Lock } from 'lucide-react';

export default function SecretEditorModal() {
  const { data, isEditMode, setIsEditMode, resetToOriginal, hasCustomEdits } = useResumeData();
  const { addToast } = useToast();
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Secret Key Sequences & Hotkeys Listener
  useEffect(() => {
    let keyBuffer = '';

    const handleKeyDown = (e) => {
      // Shortcut 1: Cmd+Shift+E or Ctrl+Shift+E
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        triggerEditorAccess();
        return;
      }

      // Escape key to close editor
      if (e.key === 'Escape') {
        if (showPinModal) setShowPinModal(false);
      }

      // Shortcut 2: Typing secret keyword "jonah" or "edit"
      if (!isEditMode && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        keyBuffer += e.key.toLowerCase();
        if (keyBuffer.length > 8) keyBuffer = keyBuffer.slice(-8);

        if (keyBuffer.endsWith('jonah') || keyBuffer.endsWith('edit')) {
          keyBuffer = '';
          triggerEditorAccess();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditMode, showPinModal]);

  const triggerEditorAccess = () => {
    if (isEditMode) {
      setIsEditMode(false);
      addToast('Exited Secret Editor Mode');
    } else {
      setShowPinModal(true);
      setPinInput('');
      setPinError(false);
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    // Default secret passcode is 2026 or jonah
    if (pinInput === '2026' || pinInput.toLowerCase() === 'jonah' || pinInput === '') {
      setShowPinModal(false);
      setIsEditMode(true);
      addToast('🔓 Secret Editor Active! Click any text on screen to edit.');
    } else {
      setPinError(true);
    }
  };

  const handleExportCode = () => {
    const codeString = `export const resumeData = ${JSON.stringify(data, null, 2)};\n`;
    navigator.clipboard.writeText(codeString);
    addToast('📋 Copied full updated resumeData.js to clipboard!');
  };

  const handleReset = () => {
    if (window.confirm('Reset all edited text back to original resume defaults?')) {
      resetToOriginal();
      addToast('↺ Restored original defaults');
    }
  };

  return (
    <>
      {/* 1. SECRET PIN PASSCODE MODAL */}
      {showPinModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141311]/85 backdrop-blur-sm animate-in fade-in duration-150 no-print"
          onClick={() => setShowPinModal(false)}
        >
          <div
            className="w-full max-w-sm bg-[#FDFCF7] border-4 border-[#24221E] shadow-2xl p-6 text-[#141311] rounded-xs animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#24221E]">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#B93826]">
                <ShieldLock className="w-4 h-4" />
                <span>JONAH EDIT CONSOLE</span>
              </div>
              <button
                onClick={() => setShowPinModal(false)}
                className="p-1 hover:bg-[#24221E] hover:text-[#F8F6F0] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePinSubmit} className="pt-4 space-y-4">
              <p className="text-xs font-sans text-[#4A463E] leading-relaxed">
                Enter your editor PIN to unlock live text editing across all sections:
              </p>

              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="PIN (Default: 2026)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full px-3 py-2 bg-[#F8F6F0] border-2 border-[#24221E] font-mono text-sm tracking-widest text-center focus:outline-none focus:bg-white"
                />
                {pinError && (
                  <div className="text-[11px] font-mono text-[#B93826] mt-1 text-center font-bold">
                    Incorrect PIN. (Hint: 2026)
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#24221E] text-[#F8F6F0] font-mono text-xs font-bold hover:bg-[#2A7B4C] transition-colors"
                >
                  UNLOCK EDITOR ➔
                </button>
              </div>

              <div className="text-[10px] font-mono text-[#68645C] text-center">
                (Press Esc or click outside to cancel)
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. FLOATING SECRET EDITOR TOOLBAR (Only visible when unlocked) */}
      {isEditMode && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl bg-[#FDFCF7] border-2 border-[#24221E] shadow-2xl p-2.5 sm:p-3 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs font-mono select-none no-print animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2A7B4C] animate-pulse inline-block" />
            <span className="font-bold text-[#141311] flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5 text-[#B93826]" />
              <span>LIVE EDIT MODE ACTIVE</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={handleExportCode}
              className="px-2.5 py-1 bg-[#1E4E79] text-[#F8F6F0] hover:bg-[#153856] font-bold text-[11px] rounded transition-colors flex items-center gap-1 shadow-xs"
              title="Copy the updated code to clipboard"
            >
              <Copy className="w-3 h-3" />
              <span>COPY CODE</span>
            </button>

            {hasCustomEdits && (
              <button
                onClick={handleReset}
                className="px-2 py-1 bg-[#F8F6F0] border border-[#24221E] hover:bg-[#EFECE2] text-[11px] font-bold rounded transition-colors flex items-center gap-1"
                title="Reset to defaults"
              >
                <RotateCcw className="w-3 h-3 text-[#B93826]" />
                <span className="hidden sm:inline">RESET</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsEditMode(false);
                addToast('Saved & Exited Editor Mode');
              }}
              className="px-3 py-1 bg-[#24221E] text-[#F8F6F0] hover:bg-[#B93826] font-bold text-[11px] rounded transition-colors flex items-center gap-1"
            >
              <CheckCircle className="w-3 h-3 text-[#2A7B4C]" />
              <span>DONE</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
