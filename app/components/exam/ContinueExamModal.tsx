import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Clock, FileQuestion, CheckCircle2, RotateCcw } from 'lucide-react';

interface ContinueExamModalProps {
  licenseType: string;
  questionsLeft: number;
  timeLeft: number;
  onContinue: () => void;
  onStartNew: () => void;
}

export function ContinueExamModal({
  licenseType,
  questionsLeft,
  timeLeft,
  onContinue,
  onStartNew,
}: ContinueExamModalProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <Card variant="elevated" padding="lg" className="max-w-md w-full animate-scaleIn">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileQuestion className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Tiếp tục bài thi?
          </h2>
          <p className="text-slate-600">
            Bạn có một bài thi bằng {licenseType} chưa hoàn thành
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 flex items-center gap-2">
              <FileQuestion className="w-4 h-4" />
              Câu hỏi còn lại:
            </span>
            <span className="font-bold text-slate-900">{questionsLeft} câu</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Thời gian còn lại:
            </span>
            <span className="font-bold text-slate-900">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onContinue}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Tiếp tục làm bài
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onStartNew}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Làm bài mới
          </Button>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          Nếu làm bài mới, tiến độ cũ sẽ bị xóa
        </p>
      </Card>
    </div>
  );
}
