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

        <div className="grid lg:grid-cols-4 gap-4">
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
  const examSetFromUrl = searchParams.get('exam') || 'random';
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [viewedQuestions, setViewedQuestions] = useState<Set<number>>(new Set([0]));
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [savedProgress, setSavedProgress] = useState<ReturnType<typeof loadExamProgress>>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [examSet, setExamSet] = useState(examSetFromUrl);

  // Initialize exam
  useEffect(() => {
    const validLicenses: LicenseType[] = ['A1', 'A', 'B1', 'B', 'C', 'C1', 'D', 'D1', 'D2', 'BE', 'C1E', 'CE', 'D1E', 'D2E', 'DE'];
    
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
      const examQuestions = getRandomQuestions(licenseType as LicenseType, examSetFromUrl);
      setQuestions(examQuestions);
      setAnswers(new Array(examQuestions.length).fill(null));
      setTimeLeft(examConfigs[licenseType as LicenseType].timeLimit * 60);
      setCurrentQuestion(0);
      setViewedQuestions(new Set([0]));
      setExamSet(examSetFromUrl);
      setIsInitialized(true);
    }
  }, [licenseType, navigate, examSetFromUrl]);

  const startNewExam = useCallback(() => {
    if (!licenseType) return;
    
    clearExamProgress();
    const examQuestions = getRandomQuestions(licenseType as LicenseType, examSetFromUrl);
    setQuestions(examQuestions);
    setAnswers(new Array(examQuestions.length).fill(null));
    setTimeLeft(examConfigs[licenseType as LicenseType].timeLimit * 60);
    setCurrentQuestion(0);
    setViewedQuestions(new Set([0]));
    setShowContinueModal(false);
    setExamSet(examSetFromUrl);
  }, [licenseType, examSetFromUrl]);

  const continueExam = useCallback(() => {
    if (!savedProgress) return;
    
    setQuestions(savedProgress.questions);
    setAnswers(savedProgress.answers);
    setTimeLeft(savedProgress.timeLeft);
    setCurrentQuestion(savedProgress.currentQuestion);
    setViewedQuestions(new Set(savedProgress.viewedQuestions));
    setExamSet(savedProgress.examSet); // Use saved exam set
    setShowContinueModal(false);
  }, [savedProgress]);

  // Save progress only on beforeunload (reload/close browser)
  useEffect(() => {
    if (!isInitialized || questions.length === 0 || timeLeft === null || showContinueModal) return;

    const handleBeforeUnloadSave = () => {
      const progress = {
        licenseType: licenseType!,
        examSet: examSet,
        questions,
        answers,
        currentQuestion,
        timeLeft,
        viewedQuestions: Array.from(viewedQuestions),
        timestamp: Date.now(),
      };
      saveExamProgress(progress);
    };

    window.addEventListener('beforeunload', handleBeforeUnloadSave);
    return () => window.removeEventListener('beforeunload', handleBeforeUnloadSave);
  }, [questions, answers, currentQuestion, timeLeft, viewedQuestions, licenseType, examSet, isInitialized, showContinueModal]);

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

  // Prevent accidental page close/reload - but allow intentional navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (questions.length > 0 && !showContinueModal) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [questions.length, showContinueModal]);

  // Handle browser back button - clear progress when going back
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (questions.length > 0 && !showContinueModal) {
        const confirmExit = window.confirm('Bạn có chắc muốn thoát? Tiến trình làm bài sẽ bị xóa.');
        if (confirmExit) {
          clearExamProgress();
          navigate('/');
        } else {
          window.history.pushState(null, '', window.location.pathname);
        }
      }
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [questions.length, showContinueModal, navigate]);

  // Clear progress when component unmounts (navigating away)
  useEffect(() => {
    return () => {
      // Always clear when leaving exam page
      if (questions.length > 0) {
        clearExamProgress();
      }
    };
  }, [questions.length]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleFinishClick = () => {
    const unansweredCount = answers.filter(a => a === null).length;
    
    if (unansweredCount > 0) {
      setShowSubmitConfirm(true);
    } else {
      handleFinish();
    }
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

  const handleExitClick = () => {
    const unansweredCount = answers.filter(a => a === null).length;
    
    if (unansweredCount > 0 || answeredCount > 0) {
      if (window.confirm('Bạn có chắc muốn thoát? Tiến trình làm bài sẽ bị xóa.')) {
        clearExamProgress();
        navigate('/');
      }
    } else {
      clearExamProgress();
      navigate('/');
    }
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
          examSet={examSet}
          onExitClick={handleExitClick}
        />

        <div className="grid lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 space-y-4">
            <QuestionCard
              question={question}
              questionNumber={currentQuestion + 1}
              selectedAnswer={answers[currentQuestion]}
              onSelectAnswer={handleAnswer}
            />

            {/* Navigation and Answer Selection */}
            <div className="flex justify-between items-center gap-2">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="primary"
                size="md"
                className="flex-shrink-0 bg-slate-600 hover:bg-slate-700 border-slate-600"
              >
                <ChevronLeft className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline text-sm">Câu trước</span>
              </Button>

              {/* Answer Selection in the middle */}
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                <span className="text-xs text-slate-600 hidden sm:inline mr-1">Chọn:</span>
                {question.options.map((_, idx) => {
                  const isSelected = answers[currentQuestion] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`
                        w-9 h-9 rounded-lg font-bold text-sm transition-all
                        ${isSelected
                          ? 'bg-blue-500 text-white border-2 border-blue-600 shadow-md scale-105'
                          : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50'
                        }
                      `}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {currentQuestion < questions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="md"
                  className="flex-shrink-0"
                >
                  <span className="hidden sm:inline text-sm">Câu sau</span>
                  <ChevronRight className="w-4 h-4 sm:ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinishClick}
                  variant="success"
                  size="md"
                  className="flex-shrink-0"
                >
                  <FileCheck className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline text-sm">Nộp bài</span>
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
              onFinish={handleFinishClick}
            />
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slideUp">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Xác nhận nộp bài
                </h3>
                <p className="text-slate-600">
                  Bạn còn <span className="font-bold text-amber-600">{answers.filter(a => a === null).length} câu</span> chưa trả lời.
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Bạn có chắc chắn muốn nộp bài không?
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowSubmitConfirm(false)}
                >
                  Tiếp tục làm
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setShowSubmitConfirm(false);
                    handleFinish();
                  }}
                >
                  Nộp bài ngay
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
