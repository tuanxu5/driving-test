import { Link } from 'react-router';
import { Button } from '../ui/Button';
import { RotateCcw, Home } from 'lucide-react';

interface ResultActionsProps {
  licenseType: string;
}

export function ResultActions({ licenseType }: ResultActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to={`/exam/${licenseType}`}>
        <Button variant="primary" size="lg" className="min-w-[200px]">
          <RotateCcw className="w-5 h-5 mr-2" />
          Thi lại
        </Button>
      </Link>
      <Link to="/">
        <Button variant="secondary" size="lg" className="min-w-[200px]">
          <Home className="w-5 h-5 mr-2" />
          Về trang chủ
        </Button>
      </Link>
    </div>
  );
}
