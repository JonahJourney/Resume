import React, { createContext, useContext, useState, useEffect } from 'react';
import { resumeData as initialData } from '../data/resumeData';
import { useToast } from '../components/Toast';

const ResumeDataContext = createContext(null);

export function ResumeDataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('jonah_resume_custom_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load local edits:', e);
    }
    return initialData;
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [hasCustomEdits, setHasCustomEdits] = useState(false);
  const { addToast } = useToast?.() || { addToast: (msg) => console.log(msg) };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jonah_resume_custom_data');
      if (saved) setHasCustomEdits(true);
    } catch (e) {}
  }, []);

  // Update specific deep property (e.g. "personal.bio", "experience.0.description")
  const updateField = (path, value) => {
    setData((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = cloned;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      try {
        localStorage.setItem('jonah_resume_custom_data', JSON.stringify(cloned));
        setHasCustomEdits(true);
      } catch (e) {}

      return cloned;
    });
  };

  // Save full state
  const saveAllData = (newData) => {
    setData(newData);
    try {
      localStorage.setItem('jonah_resume_custom_data', JSON.stringify(newData));
      setHasCustomEdits(true);
    } catch (e) {}
  };

  // Reset to original resumeData.js
  const resetToOriginal = () => {
    localStorage.removeItem('jonah_resume_custom_data');
    setData(initialData);
    setHasCustomEdits(false);
  };

  return (
    <ResumeDataContext.Provider
      value={{
        data,
        isEditMode,
        setIsEditMode,
        updateField,
        saveAllData,
        resetToOriginal,
        hasCustomEdits,
      }}
    >
      {children}
    </ResumeDataContext.Provider>
  );
}

export function useResumeData() {
  const ctx = useContext(ResumeDataContext);
  if (!ctx) {
    return { data: initialData, isEditMode: false, updateField: () => {} };
  }
  return ctx;
}
