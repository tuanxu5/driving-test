// Ngân hàng câu hỏi thi bằng lái xe Việt Nam
// Import JSON data files
import dethia1Data from './dethia1.json';
import dethiaData from './dethia.json';
import dethib1Data from './dethib1.json';
import dethibData from './dethib.json';
import dethibeData from './dethibe.json';
import dethic1Data from './dethic1.json';
import dethicData from './dethic.json';
import dethic1eData from './dethic1e.json';
import dethiceData from './dethice.json';
import dethid1Data from './dethid1.json';
import dethidData from './dethid.json';
import dethid1eData from './dethid1e.json';
import dethid2Data from './dethid2.json';
import dethid2eData from './dethid2e.json';
import dethideData from './dethide.json';

export type LicenseType = 'A1' | 'A' | 'B1' | 'B' | 'C' | 'C1' | 'D' | 'D1' | 'D2' | 'BE' | 'C1E' | 'CE' | 'D1E' | 'D2E' | 'DE';

export interface Question {
  id: number;
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  isCritical?: boolean; // Câu điểm liệt
}

export interface ExamConfig {
  totalQuestions: number;
  passingScore: number;
  timeLimit: number; // phút
  maxCriticalErrors: number;
}

export const examConfigs: Record<LicenseType, ExamConfig> = {
  A1: {
    totalQuestions: 25,
    passingScore: 21,
    timeLimit: 19,
    maxCriticalErrors: 1,
  },
  A: {
    totalQuestions: 25,
    passingScore: 21,
    timeLimit: 19,
    maxCriticalErrors: 1,
  },
  B1: {
    totalQuestions: 35,
    passingScore: 32,
    timeLimit: 22,
    maxCriticalErrors: 1,
  },
  B: {
    totalQuestions: 35,
    passingScore: 32,
    timeLimit: 22,
    maxCriticalErrors: 1,
  },
  C: {
    totalQuestions: 40,
    passingScore: 36,
    timeLimit: 25,
    maxCriticalErrors: 1,
  },
  C1: {
    totalQuestions: 40,
    passingScore: 36,
    timeLimit: 25,
    maxCriticalErrors: 1,
  },
  D: {
    totalQuestions: 45,
    passingScore: 41,
    timeLimit: 30,
    maxCriticalErrors: 1,
  },
  D1: {
    totalQuestions: 45,
    passingScore: 41,
    timeLimit: 30,
    maxCriticalErrors: 1,
  },
  D2: {
    totalQuestions: 45,
    passingScore: 41,
    timeLimit: 30,
    maxCriticalErrors: 1,
  },
  BE: {
    totalQuestions: 40,
    passingScore: 36,
    timeLimit: 25,
    maxCriticalErrors: 1,
  },
  C1E: {
    totalQuestions: 40,
    passingScore: 36,
    timeLimit: 25,
    maxCriticalErrors: 1,
  },
  CE: {
    totalQuestions: 40,
    passingScore: 36,
    timeLimit: 25,
    maxCriticalErrors: 1,
  },
  D1E: {
    totalQuestions: 45,
    passingScore: 41,
    timeLimit: 30,
    maxCriticalErrors: 1,
  },
  D2E: {
    totalQuestions: 45,
    passingScore: 41,
    timeLimit: 30,
    maxCriticalErrors: 1,
  },
  DE: {
    totalQuestions: 45,
    passingScore: 41,
    timeLimit: 30,
    maxCriticalErrors: 1,
  },
};

// Fix image URLs - convert relative paths to absolute URLs
function fixImageUrl(imagePath?: string): string | undefined {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('http')) return imagePath;
  return `https://csgt.vn${imagePath}`;
}

// Load and fix questions from JSON data
function loadQuestionsFromJson(data: any): Question[] {
  const allQuestions: Question[] = [];
  
  // Merge all exams (de1, de2, de3, ...) into one array
  Object.keys(data).forEach(examKey => {
    if (Array.isArray(data[examKey])) {
      data[examKey].forEach((q: any) => {
        allQuestions.push({
          ...q,
          image: fixImageUrl(q.image),
          isCritical: q.isCritical || false,
        });
      });
    }
  });
  
  return allQuestions;
}

// Load specific exam from JSON data
function loadSpecificExam(data: any, examNumber: string): Question[] {
  const examKey = `de${examNumber}`;
  const examData = data[examKey];
  
  if (!Array.isArray(examData)) {
    console.warn(`Exam ${examNumber} not found in data`);
    return [];
  }
  
  return examData.map((q: any) => ({
    ...q,
    image: fixImageUrl(q.image),
    isCritical: q.isCritical || false,
  }));
}

// Map license types to their JSON data
const dataByLicense: Record<LicenseType, any> = {
  A1: dethia1Data,
  A: dethiaData,
  B1: dethib1Data,
  B: dethibData,
  C: dethicData,
  C1: dethic1Data,
  D: dethidData,
  D1: dethid1Data,
  D2: dethid2Data,
  BE: dethibeData,
  C1E: dethic1eData,
  CE: dethiceData,
  D1E: dethid1eData,
  D2E: dethid2eData,
  DE: dethideData,
};

export function getRandomQuestions(licenseType: LicenseType, examSet?: string): Question[] {
  const data = dataByLicense[licenseType];
  const config = examConfigs[licenseType];
  
  if (!data) {
    console.warn(`No data found for license type: ${licenseType}`);
    return [];
  }
  
  // Nếu chọn đề cố định (1-20), lấy đúng đề đó từ JSON
  if (examSet && examSet !== 'random') {
    const questions = loadSpecificExam(data, examSet);
    
    if (questions.length === 0) {
      console.warn(`No questions found for exam ${examSet}`);
      return [];
    }
    
    return questions.slice(0, config.totalQuestions);
  }
  
  // Ngẫu nhiên - lấy từ tất cả các đề
  const allQuestions = loadQuestionsFromJson(data);
  
  if (allQuestions.length === 0) {
    console.warn(`No questions found for license type: ${licenseType}`);
    return [];
  }
  
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, config.totalQuestions);
}
