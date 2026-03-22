import type { Route } from "./+types/home";
import { ExamSelector } from "../components/home/ExamSelector";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Thi Thử Bằng Lái Xe - Việt Nam" },
    { name: "description", content: "Website thi thử bằng lái xe cho tất cả loại xe tại Việt Nam" },
  ];
}

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-10 md:py-32">
          <div className="max-w-4xl mx-auto text-center lg:pb-10">
            {/* <div className="inline-block mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-xs md:text-sm font-semibold">🇻🇳 Chuẩn theo quy định Việt Nam</span>
            </div> */}
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight animate-fadeIn">
              Thi Thử Bằng Lái Xe
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Trực Tuyến
              </span>
            </h1>
            
            <p className="text-base md:text-xl lg:text-2xl text-slate-300 mb-6 md:mb-12 leading-relaxed animate-fadeIn">
              Luyện thi tất cả hạng bằng lái xe với đề thi chuẩn, chấm điểm tự động
              và giải thích chi tiết. Hoàn toàn miễn phí!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fadeIn">
              <button
                onClick={() => scrollToSection('exam-selector')}
                className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105 text-sm md:text-base"
              >
                Bắt đầu ngay
                <span className="ml-2">→</span>
              </button>
              <button
                onClick={() => scrollToSection('instructions')}
                className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold rounded-xl border-2 border-white/20 transition-all duration-300 text-sm md:text-base"
              >
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none -mb-1">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Exam Selector Section */}
      <section id="exam-selector" className="py-8 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-4">
              Chọn loại bằng lái
            </h2>
            <p className="text-sm md:text-xl text-slate-600">
              Chọn hạng bằng bạn muốn thi thử và bắt đầu ngay
            </p>
          </div>

          <ExamSelector />
        </div>
      </section>

      {/* Instructions Section */}
      <section id="instructions" className="py-8 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/50 p-4 md:p-8 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 text-center">
              📋 Hướng dẫn thi
            </h3>
            
            <div className="space-y-6 md:space-y-7 lg:space-y-8">
              {/* Bắt đầu thi */}
              <div>
                <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 md:w-8 md:h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs md:text-sm">1</span>
                  Bắt đầu thi thử
                </h4>
                <div className="space-y-2 md:space-y-3 ml-9 md:ml-10">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-sm">•</span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold">Chọn hạng GPLX:</span> Hệ thống hỗ trợ đầy đủ các hạng từ A1, A, B1, B (xe mô tô, xe con) đến C, C1, D, D1, D2 (xe tải, xe khách) và các hạng kéo rơ moóc BE, CE, DE
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-sm">•</span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold">Chọn đề thi:</span> Có 2 dạng - <span className="font-semibold text-purple-600">Ngẫu nhiên</span> (giống thi thật) hoặc <span className="font-semibold text-blue-600">Đề cố định 1-20</span> (ôn tập từng đề)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-sm">•</span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Nhấn <span className="font-semibold">"Bắt đầu thi ngay"</span> để vào phòng thi
                    </p>
                  </div>
                </div>
              </div>

              {/* Thao tác trong thi */}
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">2</span>
                  Thao tác trong bài thi
                </h4>
                <div className="space-y-3 ml-10">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-sm">•</span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold">Di chuyển câu hỏi:</span> Dùng nút "Câu trước/Câu sau" hoặc click vào số câu bên phải
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-sm">•</span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold">Chọn đáp án:</span> Click vào đáp án muốn chọn, có thể đổi đáp án bất cứ lúc nào
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-sm">•</span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold">Theo dõi tiến độ:</span> Xem số câu đã trả lời và thời gian còn lại ở phía trên
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-sm">•</span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold">Nộp bài:</span> Nhấn "Nộp bài" khi hoàn thành hoặc hết giờ sẽ tự động nộp
                    </p>
                  </div>
                </div>
              </div>

              {/* Điều kiện đạt */}
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white text-sm">3</span>
                  Điều kiện ĐẠT
                </h4>
                <div className="space-y-3 ml-10">
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                    <p className="text-sm text-amber-900 font-semibold mb-2">⚠️ Lưu ý quan trọng về câu điểm liệt:</p>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      Sai <span className="font-bold">quá 1 câu điểm liệt</span> sẽ <span className="font-bold">KHÔNG ĐẠT</span>, bất kể số câu đúng là bao nhiêu!
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-3 mt-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="font-semibold text-slate-900 mb-1">Xe mô tô (A1-A4)</p>
                      <p className="text-sm text-slate-600">21/25 câu đúng - 19 phút</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="font-semibold text-slate-900 mb-1">Xe ô tô (B1, B2)</p>
                      <p className="text-sm text-slate-600">32/35 câu đúng - 22 phút</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="font-semibold text-slate-900 mb-1">Xe tải (C)</p>
                      <p className="text-sm text-slate-600">36/40 câu đúng - 25 phút</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="font-semibold text-slate-900 mb-1">Xe khách (D, E, F)</p>
                      <p className="text-sm text-slate-600">41/45 câu đúng - 30 phút</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loại đề thi */}
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm">4</span>
                  Phân biệt 2 loại đề thi
                </h4>
                <div className="space-y-3 ml-10">
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                    <p className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-purple-500 rounded text-white text-xs flex items-center justify-center">🎲</span>
                      Đề ngẫu nhiên (giống thi thật)
                    </p>
                    <p className="text-purple-800 text-sm leading-relaxed">
                      Hệ thống lấy ngẫu nhiên câu hỏi từ bộ 600 câu (ô tô) hoặc 200 câu (mô tô). Mỗi lần thi sẽ có đề khác nhau, giống với đề thi sát hạch thực tế.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">📝</span>
                      Đề cố định 1-20 (ôn tập từng đề)
                    </p>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      Mỗi đề có nội dung cố định, không thay đổi. Ôn hết 20 đề = ôn hết 600 câu hỏi mới nhất của Bộ Công An. Phù hợp để luyện tập và ghi nhớ từng câu.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chú thích màu sắc */}
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-slate-500 rounded-lg flex items-center justify-center text-white text-sm">5</span>
                  Chú thích màu sắc câu hỏi
                </h4>
                <div className="ml-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center font-bold text-green-700">1</div>
                      <span className="text-xs text-slate-600 text-center">Đã trả lời</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-amber-100 rounded-md flex items-center justify-center font-bold text-amber-700">2</div>
                      <span className="text-xs text-slate-600 text-center">Đã xem</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center font-bold text-slate-600">3</div>
                      <span className="text-xs text-slate-600 text-center">Chưa xem</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-lg">
                      <div className="relative w-10 h-10 bg-white border border-red-400 rounded-md flex items-center justify-center font-bold text-slate-700">
                        4
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                      </div>
                      <span className="text-xs text-slate-600 text-center">Câu điểm liệt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="text-4xl mb-4">🚦</div>
          <h3 className="text-2xl font-bold mb-2">Thi Thử Bằng Lái Xe</h3>
          <p className="text-slate-400 mb-6">
            Website luyện thi bằng lái xe trực tuyến - Miễn phí 100%
          </p>
        </div>
      </footer>
    </div>
  );
}
