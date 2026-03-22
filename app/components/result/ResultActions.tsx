import { Link } from 'react-router';
import { Button } from '../ui/Button';
import { RotateCcw, Home } from 'lucide-react';

interface ResultActionsProps {
  licenseType: string;
}

export function ResultActions({ licenseType }: ResultActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link to={`/exam/${licenseType}`} className="flex-1 sm:flex-initial">
        <Button variant="primary" size="md" className="w-full sm:min-w-[180px]">
          <RotateCcw className="w-4 h-4 mr-2" />
          Thi lại
        </Button>
      </Link>
      <Link to="/" className="flex-1 sm:flex-initial">
        <Button variant="secondary" size="md" className="w-full sm:min-w-[180px]">
          <Home className="w-4 h-4 mr-2" />
          Về trang chủ
        </Button>
      </Link>
    </div>
  );
}
