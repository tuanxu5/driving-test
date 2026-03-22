import type { Route } from "./+types/home";
import { LicenseCard } from "../components/home/LicenseCard";
import { FeatureCard } from "../components/home/FeatureCard";
import { examConfigs } from "../data/questions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Thi Thử Bằng Lái Xe - Việt Nam" },
    { name: "description", content: "Website thi thử bằng lái xe cho tất cả loại xe tại Việt Nam" },
  ];
}

export default function Home() {
  const licenses = [
    {
      type: 'A1',
      name: 'Bằng A1',
      description: 'Xe mô tô hai bánh có dung tích xi-lanh từ 50 cm³ đến dưới 175 cm³',
      icon: '🏍️',
      gradient: 'from-blue-500 to-blue-600',
      ...examConfigs.A1,
    },
    {
      type: 'B2',
      name: 'Bằng B2',
      description: 'Xe ô tô chở người đến 9 chỗ ngồi, xe ô tô tải có trọng tải dưới 3.500kg',
      icon: '🚗',
      gradient: 'from-green-500 to-green-600',
      ...examConfigs.B2,
    },
  ];

  const features = [
    {
      icon: '📝',
      title: 'Đề thi chuẩn',
      description: 'Câu hỏi được biên soạn theo đúng quy định của Bộ GTVT Việt Nam',
    },
    {
      icon: '⏱️',
      title: 'Đếm thời gian',
      description: 'Hệ thống đếm ngược thời gian chính xác như kỳ thi thật',
    },
    {
      icon: '⚠️',
      title: 'Câu điểm liệt',
      description: 'Đánh dấu rõ ràng các câu hỏi điểm liệt quan trọng',
    },
    {
      icon: '📊',
      title: 'Chấm điểm tự động',
      description: 'Kết quả chi tiết với giải thích đáp án sau khi hoàn thành',
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Giao diện thân thiện trên mọi thiết bị: máy tính, tablet, điện thoại',
    },
    {
      icon: '🎯',
      title: 'Miễn phí 100%',
      description: 'Hoàn toàn miễn phí, không giới hạn số lần thi thử',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold">🇻🇳 Chuẩn theo quy định Việt Nam</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fadeIn">
              Thi Thử Bằng Lái Xe
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Trực Tuyến
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed animate-fadeIn">
              Luyện thi bằng lái xe A1, B2 với đề thi chuẩn, chấm điểm tự động
              và giải thích chi tiết. Hoàn toàn miễn phí!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
              <a 
                href="#licenses" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105"
              >
                Bắt đầu ngay
                <span className="ml-2">→</span>
              </a>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold rounded-xl border-2 border-white/20 transition-all duration-300"
              >
                Tìm hiểu thêm
              </a>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* License Cards Section */}
      <section id="licenses" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Chọn loại bằng lái
            </h2>
            <p className="text-xl text-slate-600">
              Chọn loại bằng bạn muốn thi thử và bắt đầu ngay
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {licenses.map((license) => (
              <LicenseCard key={license.type} {...license} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-xl text-slate-600">
              Mọi thứ bạn cần để chuẩn bị cho kỳ thi bằng lái xe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="animate-fadeIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              📋 Hướng dẫn thi
            </h3>
            
            <div className="space-y-6">
              {[
                'Chọn loại bằng lái bạn muốn thi thử (A1 hoặc B2)',
                'Làm bài trong thời gian quy định, chú ý đồng hồ đếm ngược',
                'Câu hỏi điểm liệt được đánh dấu ⚠️ - Sai quá 1 câu sẽ trượt',
                'Có thể chuyển qua lại giữa các câu hỏi trước khi nộp bài',
                'Xem kết quả và đáp án chi tiết ngay sau khi nộp bài',
                'Thi lại không giới hạn để luyện tập thêm',
              ].map((instruction, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-1">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="text-4xl mb-4">🚦</div>
          <h3 className="text-2xl font-bold mb-2">Thi Thử Bằng Lái Xe</h3>
          <p className="text-slate-400 mb-6">
            Website luyện thi bằng lái xe trực tuyến - Miễn phí 100%
          </p>
          <div className="text-sm text-slate-500">
            © 2024 Driving Test VN. Được xây dựng với ❤️ bằng React Router
          </div>
        </div>
      </footer>
    </div>
  );
}
