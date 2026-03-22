import type { Question } from '../data/questions';

export interface SavedExamProgress {
  licenseType: string;
  examSet: string;
  questions: Question[];
  answers: (number | null)[];
  currentQuestion: number;
  timeLeft: number;
  viewedQuestions: number[];
  timestamp: number;
}

const STORAGE_KEY = 'driving-exam-progress';
const EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2 hours

export function saveExamProgress(progress: SavedExamProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save exam progress:', error);
  }
}

export function loadExamProgress(licenseType: string): SavedExamProgress | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const progress: SavedExamProgress = JSON.parse(saved);
    
    // Check if it's the same license type
    if (progress.licenseType !== licenseType) {
      clearExamProgress();
      return null;
    }

    // Check if it's expired (older than 2 hours)
    const now = Date.now();
    if (now - progress.timestamp > EXPIRY_TIME) {
      clearExamProgress();
      return null;
    }

    // Check if time is still left
    if (progress.timeLeft <= 0) {
      clearExamProgress();
      return null;
    }

    return progress;
  } catch (error) {
    console.error('Failed to load exam progress:', error);
    return null;
  }
}

export function clearExamProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear exam progress:', error);
  }
}

export function hasUnansweredQuestions(answers: (number | null)[]): boolean {
  return answers.some(answer => answer === null);
}
