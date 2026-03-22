import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { examConfigs, type LicenseType } from '../../data/questions';
import { Car, Bike, Truck, Bus, TramFront, ChevronDown, Check, Shuffle, FileText, Lightbulb } from 'lucide-react';

const licenseOptions = [
  { value: 'A1', label: 'A1 - Mô tô 50-175cc', icon: Bike, group: 'Xe mô tô' },
  { value: 'A2', label: 'A2 - Mô tô ≥175cc', icon: Bike, group: 'Xe mô tô' },
  { value: 'A3', label: 'A3 - Mô tô 3 bánh', icon: Bike, group: 'Xe mô tô' },
  { value: 'A4', label: 'A4 - Máy kéo', icon: TramFront, group: 'Xe mô tô' },
  { value: 'B1', label: 'B1 - Xe con + mô tô', icon: Car, group: 'Xe ô tô' },
  { value: 'B2', label: 'B2 - Xe con + tải nhẹ', icon: Car, group: 'Xe ô tô' },
  { value: 'C', label: 'C - Xe tải ≥3.5 tấn', icon: Truck, group: 'Xe tải & khách' },
  { value: 'D', label: 'D - Xe khách 10-30 chỗ', icon: Bus, group: 'Xe tải & khách' },
  { value: 'E', label: 'E - Xe khách >30 chỗ', icon: Bus, group: 'Xe tải & khách' },
  { value: 'F', label: 'F - Xe kéo rơ moóc', icon: Truck, group: 'Xe tải & khách' },
];

const descriptions: Record<string, string> = {
  A1: 'Xe mô tô hai bánh có dung tích xi-lanh từ 50 cm³ đến dưới 175 cm³',
  A2: 'Xe mô tô hai bánh có dung tích xi-lanh từ 175 cm³ trở lên và các loại xe quy định tại giấy phép lái xe hạng A1',
  A3: 'Xe mô tô ba bánh dùng cho người khuyết tật',
  A4: 'Máy kéo có trọng tải đến 1.000 kg',
  B1: 'Xe mô tô hai bánh, xe mô tô ba bánh và các loại xe ô tô chở người đến 9 chỗ ngồi',
  B2: 'Xe ô tô chở người đến 9 chỗ ngồi, xe ô tô tải có trọng tải dưới 3.500kg và các loại xe quy định tại giấy phép lái xe hạng B1',
  C: 'Xe ô tô tải có trọng tải từ 3.500 kg trở lên và các loại xe quy định tại giấy phép lái xe hạng B1, B2',
  D: 'Xe ô tô chở người từ 10 đến 30 chỗ ngồi và các loại xe quy định tại giấy phép lái xe hạng B1, B2, C',
  E: 'Xe ô tô chở người trên 30 chỗ ngồi và các loại xe quy định tại giấy phép lái xe hạng B1, B2, C, D',
  F: 'Các loại xe có kéo rơ moóc (FB2, FC, FD, FE) và các loại xe quy định tại các giấy phép lái xe tương ứng',
};

export function ExamSelector() {
  const [selectedLicense, setSelectedLicense] = useState<LicenseType | null>(null);
  const [selectedExam, setSelectedExam] = useState<string>('random');
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);
  const [isExamOpen, setIsExamOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartExam = () => {
    if (selectedLicense) {
      navigate(`/exam/${selectedLicense}?exam=${selectedExam}`);
    }
  };

  const handleSelect = (value: LicenseType) => {
    setSelectedLicense(value);
    setIsLicenseOpen(false);
  };

  const selectedOption = licenseOptions.find(opt => opt.value === selectedLicense);
  const SelectedIcon = selectedOption?.icon || Car;

  // Group options
  const groupedOptions = licenseOptions.reduce((acc, option) => {
    if (!acc[option.group]) {
      acc[option.group] = [];
    }
    acc[option.group].push(option);
    return acc;
  }, {} as Record<string, typeof licenseOptions>);

  return (
    <Card variant="elevated" padding="md" className="max-w-2xl mx-auto">
      <div className="space-y-4 md:space-y-6">
        {/* Custom Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Chọn hạng bằng lái
          </label>
          <div className="relative">
            {/* Dropdown Button */}
            <button
              onClick={() => setIsLicenseOpen(!isLicenseOpen)}
              className={`
                w-full px-3 py-2.5 md:px-4 md:py-3 text-left text-base md:text-lg font-medium bg-white border-2 rounded-xl 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all 
                flex items-center justify-between
                ${selectedLicense ? 'border-slate-200 hover:border-slate-300' : 'border-slate-300 hover:border-slate-400'}
              `}
            >
              {selectedLicense ? (
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <SelectedIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                  <span className="text-slate-900">{selectedOption?.label}</span>
                </div>
              ) : (
                <span className="text-slate-500">Chọn hạng bằng lái...</span>
              )}
              <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transition-transform ${isLicenseOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isLicenseOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsLicenseOpen(false)}
                />
                
                {/* Menu */}
                <div className="absolute z-20 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-96 overflow-y-auto animate-fadeIn">
                  {Object.entries(groupedOptions).map(([group, options]) => (
                    <div key={group}>
                      {/* Group Header */}
                      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {group}
                        </span>
                      </div>
                      
                      {/* Options */}
                      {options.map((option) => {
                        const Icon = option.icon;
                        const isSelected = option.value === selectedLicense;
                        
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleSelect(option.value as LicenseType)}
                            className={`
                              w-full px-4 py-3 text-left flex items-center gap-3 transition-colors
                              ${isSelected 
                                ? 'bg-blue-50 text-blue-700' 
                                : 'hover:bg-slate-50 text-slate-700'
                              }
                            `}
                          >
                            <div className={`
                              w-8 h-8 rounded-lg flex items-center justify-center
                              ${isSelected ? 'bg-blue-100' : 'bg-slate-100'}
                            `}>
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
                            </div>
                            <span className="flex-1 font-medium">{option.label}</span>
                            {isSelected && (
                              <Check className="w-5 h-5 text-blue-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Exam Set Selector - Only show when license is selected */}
        {selectedLicense && (
          <div className="animate-fadeIn">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Chọn đề thi
            </label>
            <div className="relative">
              {/* Dropdown Button */}
              <button
                onClick={() => setIsExamOpen(!isExamOpen)}
                className={`
                  w-full px-3 py-2.5 md:px-4 md:py-3 text-left text-base md:text-lg font-medium bg-white border-2 rounded-xl 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all 
                  flex items-center justify-between
                  border-slate-200 hover:border-slate-300
                `}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  {selectedExam === 'random' ? (
                    <>
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Shuffle className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                      </div>
                      <span className="text-slate-900">Ngẫu nhiên</span>
                    </>
                  ) : (
                    <>
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                      </div>
                      <span className="text-slate-900">Đề {selectedExam}</span>
                    </>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transition-transform ${isExamOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isExamOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsExamOpen(false)}
                  />
                  
                  {/* Menu */}
                  <div className="absolute z-20 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-96 overflow-y-auto animate-fadeIn">
                    {/* Random Option */}
                    <button
                      onClick={() => {
                        setSelectedExam('random');
                        setIsExamOpen(false);
                      }}
                      className={`
                        w-full px-4 py-3 text-left flex items-center gap-3 transition-colors border-b border-slate-200
                        ${selectedExam === 'random'
                          ? 'bg-purple-50 text-purple-700' 
                          : 'hover:bg-slate-50 text-slate-700'
                        }
                      `}
                    >
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center
                        ${selectedExam === 'random' ? 'bg-purple-100' : 'bg-slate-100'}
                      `}>
                        <Shuffle className={`w-5 h-5 ${selectedExam === 'random' ? 'text-purple-600' : 'text-slate-600'}`} />
                      </div>
                      <span className="flex-1 font-medium">Ngẫu nhiên</span>
                      {selectedExam === 'random' && (
                        <Check className="w-5 h-5 text-purple-600" />
                      )}
                    </button>

                    {/* Exam Sets 1-20 */}
                    <div className="grid grid-cols-4 gap-1 p-2">
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                        const examNum = num.toString();
                        const isSelected = selectedExam === examNum;
                        
                        return (
                          <button
                            key={num}
                            onClick={() => {
                              setSelectedExam(examNum);
                              setIsExamOpen(false);
                            }}
                            className={`
                              p-3 rounded-lg transition-all font-semibold text-sm
                              ${isSelected
                                ? 'bg-blue-500 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }
                            `}
                          >
                            Đề {num}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* License Info - Only show when selected */}
        {selectedLicense && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 md:p-6 border-2 border-blue-100 animate-fadeIn">
            <div className="flex items-start gap-2 md:gap-4 mb-3 md:mb-4">
              <div className="flex-shrink-0 w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <SelectedIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-xl font-bold text-slate-900 mb-1 md:mb-2">
                  Bằng {selectedLicense}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {descriptions[selectedLicense]}
                </p>
              </div>
            </div>

            {/* Exam Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mt-3 md:mt-4">
              <div className="text-center p-2 md:p-3 bg-white rounded-lg">
                <div className="text-lg md:text-2xl font-bold text-slate-900">{examConfigs[selectedLicense].totalQuestions}</div>
                <div className="text-xs text-slate-500 mt-0.5 md:mt-1">Câu hỏi</div>
              </div>
              <div className="text-center p-2 md:p-3 bg-white rounded-lg">
                <div className="text-lg md:text-2xl font-bold text-slate-900">{examConfigs[selectedLicense].timeLimit}</div>
                <div className="text-xs text-slate-500 mt-0.5 md:mt-1">Phút</div>
              </div>
              <div className="text-center p-2 md:p-3 bg-white rounded-lg">
                <div className="text-lg md:text-2xl font-bold text-slate-900">{examConfigs[selectedLicense].passingScore}/{examConfigs[selectedLicense].totalQuestions}</div>
                <div className="text-xs text-slate-500 mt-0.5 md:mt-1">Điểm đạt</div>
              </div>
            </div>
          </div>
        )}

        {/* Start Button */}
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleStartExam}
          disabled={!selectedLicense}
          className="text-base md:text-lg font-bold md:py-3"
        >
          {selectedLicense ? (
            <>
              Bắt đầu thi ngay
              <span className="ml-2">→</span>
            </>
          ) : (
            'Vui lòng chọn hạng bằng lái'
          )}
        </Button>

        {/* Note */}
        {selectedLicense && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3 md:p-4 animate-fadeIn">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs md:text-sm font-semibold text-amber-900 mb-0.5 md:mb-1">Lưu ý quan trọng</h4>
                <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
                  Sai quá <span className="font-bold">1 câu điểm liệt</span> sẽ không đạt, bất kể số câu đúng là bao nhiêu.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
