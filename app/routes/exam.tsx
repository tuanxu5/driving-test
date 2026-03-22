import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/exam";
import { getRandomQuestions, examConfigs, type LicenseType, type Question } from "../data/questions";
import { ExamHeader } from "../components/exam/ExamHeader";
import { QuestionCard } from "../components/exam/QuestionCard";
import { QuestionNavigator } from "../components/exam/QuestionNavigator";
import { ContinueExamModal } from "../components/exam/ContinueExamModal";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { saveExamProgress, loadExamProgress, clearExamProgress } from "../utils/examStorage";
import { ChevronLeft, ChevronRight, FileCheck } from "lucide-react";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Thi Thử Bằng ${params.licenseType} - Bằng Lái Xe` },
  ];
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen py-4 md:py-6 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton width={200} height={32} className="mb-2" />
              <Skeleton width={100} height={20} />
            </div>
            <div className="flex gap-4">
              <Skeleton width={120} height={80} />
              <Skeleton width={120} height={80} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Skeleton width="100%" height={200} className="mb-6" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} width="100%" height={60} />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <Skeleton width="100%" height={300} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Exam() {
  const { licenseType } = useParams();
  const [searchParams] = useSearchParams();
  const examSet = searchParams.get('exam') || 'random';
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [viewedQuestions, setViewedQuestions] = useState<Set<number>>(new Set([0]));
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [savedProgress, setSavedProgress] = useState<ReturnType<typeof loadExamProgress>>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize exam
  useEffect(() => {
    const validLicenses: LicenseType[] = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'C', 'D', 'E', 'F'];
    
    if (!licenseType || !validLicenses.includes(licenseType as LicenseType)) {
      navigate('/');
      return;
    }

    const saved = loadExamProgress(licenseType);
    if (saved) {
      setSavedProgress(saved);
      setShowContinueModal(true);
      setIsInitialized(true);
    } else {
      // Start new exam
      const examQuestions = getRandomQuestions(licenseType as LicenseType, examSet);
      setQuestions(examQuestions);
      setAnswers(new Array(examQuestions.length).fill(null));
      setTimeLeft(examConfigs[licenseType as LicenseType].timeLimit * 60);
      setCurrentQuestion(0);
      setViewedQuestions(new Set([0]));
      setIsInitialized(true);
    }
  }, [licenseType, navigate, examSet]);

  const startNewExam = useCallback(() => {
    if (!licenseType) return;
    
    clearExamProgress();
    const examQuestions = getRandomQuestions(licenseType as LicenseType, examSet);
    setQuestions(examQuestions);
    setAnswers(new Array(examQuestions.length).fill(null));
    setTimeLeft(examConfigs[licenseType as LicenseType].timeLimit * 60);
    setCurrentQuestion(0);
    setViewedQuestions(new Set([0]));
    setShowContinueModal(false);
  }, [licenseType, examSet]);

  const continueExam = useCallback(() => {
    if (!savedProgress) return;
    
    setQuestions(savedProgress.questions);
    setAnswers(savedProgress.answers);
    setTimeLeft(savedProgress.timeLeft);
    setCurrentQuestion(savedProgress.currentQuestion);
    setViewedQuestions(new Set(savedProgress.viewedQuestions));
    setShowContinueModal(false);
  }, [savedProgress]);

  // Save progress
  useEffect(() => {
    if (!isInitialized || questions.length === 0 || timeLeft === null || showContinueModal) return;

    const progress = {
      licenseType: licenseType!,
      questions,
      answers,
      currentQuestion,
      timeLeft,
      viewedQuestions: Array.from(viewedQuestions),
      timestamp: Date.now(),
    };

    saveExamProgress(progress);
  }, [questions, answers, currentQuestion, timeLeft, viewedQuestions, licenseType, isInitialized, showContinueModal]);

  // Timer
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showContinueModal) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showContinueModal]);

  // Auto finish when time runs out
  useEffect(() => {
    if (timeLeft === 0 && questions.length > 0 && !showContinueModal) {
      handleFinish();
    }
  }, [timeLeft, questions.length, showContinueModal]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleFinish = useCallback(() => {
    clearExamProgress();
    
    const config = examConfigs[licenseType as LicenseType];
    
    let correctCount = 0;
    let criticalErrors = 0;

    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount++;
      } else if (q.isCritical && answers[idx] !== null) {
        criticalErrors++;
      }
    });

    const passed = correctCount >= config.passingScore && criticalErrors <= config.maxCriticalErrors;

    navigate('/result', {
      state: {
        licenseType,
        questions,
        answers,
        correctCount,
        criticalErrors,
        passed,
        totalQuestions: config.totalQuestions,
        passingScore: config.passingScore,
      },
    });
  }, [licenseType, questions, answers, navigate]);

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentQuestion - 1);
    setCurrentQuestion(newIndex);
    setViewedQuestions(prev => new Set([...prev, newIndex]));
  };

  const handleNext = () => {
    const newIndex = Math.min(questions.length - 1, currentQuestion + 1);
    setCurrentQuestion(newIndex);
    setViewedQuestions(prev => new Set([...prev, newIndex]));
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestion(index);
    setViewedQuestions(prev => new Set([...prev, index]));
  };

  if (!isInitialized || (questions.length === 0 && !showContinueModal)) {
    return <LoadingSkeleton />;
  }

  if (showContinueModal && savedProgress) {
    return (
      <ContinueExamModal
        licenseType={licenseType!}
        questionsLeft={savedProgress.answers.filter(a => a === null).length}
        timeLeft={savedProgress.timeLeft}
        onContinue={continueExam}
        onStartNew={startNewExam}
      />
    );
  }

  if (questions.length === 0 || timeLeft === null) {
    return <LoadingSkeleton />;
  }

  const question = questions[currentQuestion];
  const answeredCount = answers.filter(a => a !== null).length;

  return (
    <div className="min-h-screen py-4 md:py-6 px-4">
      <div className="container mx-auto max-w-7xl">
        <ExamHeader
          licenseType={licenseType!}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          answeredCount={answeredCount}
          timeLeft={timeLeft}
        />

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <QuestionCard
              question={question}
              questionNumber={currentQuestion + 1}
              selectedAnswer={answers[currentQuestion]}
              onSelectAnswer={handleAnswer}
            />

            <div className="flex justify-between items-center">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="secondary"
                size="lg"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Câu trước
              </Button>

              {currentQuestion < questions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                >
                  Câu sau
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  variant="success"
                  size="lg"
                >
                  <FileCheck className="w-5 h-5 mr-2" />
                  Nộp bài
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <QuestionNavigator
              questions={questions}
              currentQuestion={currentQuestion}
              answers={answers}
              viewedQuestions={viewedQuestions}
              onQuestionSelect={handleQuestionSelect}
              onFinish={handleFinish}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
