// Ngân hàng câu hỏi thi bằng lái xe Việt Nam

export type LicenseType = 'A1' | 'A2' | 'A3' | 'A4' | 'B1' | 'B2' | 'C' | 'D' | 'E' | 'F';

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
  A2: {
    totalQuestions: 25,
    passingScore: 21,
    timeLimit: 19,
    maxCriticalErrors: 1,
  },
  A3: {
    totalQuestions: 25,
    passingScore: 21,
    timeLimit: 19,
    maxCriticalErrors: 1,
  },
  A4: {
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
  B2: {
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
  D: {
    totalQuestions: 45,
    passingScore: 41,
    timeLimit: 30,
    maxCriticalErrors: 1,
  },
  E: {
    totalQuestions: 45,
    passingScore: 41,
    timeLimit: 30,
    maxCriticalErrors: 1,
  },
  F: {
    totalQuestions: 40,
    passingScore: 36,
    timeLimit: 25,
    maxCriticalErrors: 1,
  },
};

export const questionsA1: Question[] = [
  {
    id: 1,
    question: 'Phần của đường bộ được sử dụng cho các phương tiện giao thông qua lại là gì?',
    options: ['Phần mặt đường và lề đường', 'Phần đường xe chạy', 'Phần đường xe cơ giới'],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    id: 2,
    question: '"Làn đường" là gì?',
    options: [
      'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy',
      'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có bề rộng đủ cho xe chạy an toàn',
      'Là đường cho xe ô tô chạy, dừng, đỗ an toàn',
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    id: 3,
    question: 'Người điều khiển phương tiện giao thông đường bộ mà trong cơ thể có chất ma túy có bị nghiêm cấm hay không?',
    options: ['Bị nghiêm cấm', 'Không bị nghiêm cấm', 'Không bị nghiêm cấm nếu có chất ma túy ở mức nhẹ', 'Tùy trường hợp cụ thể'],
    correctAnswer: 0,
    isCritical: true,
    explanation: 'Theo luật giao thông, tuyệt đối cấm người điều khiển phương tiện có chất ma túy trong cơ thể.',
  },
  {
    id: 4,
    question: 'Người điều khiển xe mô tô hai bánh, xe gắn máy có được phép sử dụng xe để kéo hoặc đẩy các phương tiện khác khi tham gia giao thông không?',
    options: ['Được phép', 'Nếu phương tiện được kéo, đẩy có khối lượng nhỏ hơn phương tiện của mình', 'Tuỳ trường hợp', 'Không được phép'],
    correctAnswer: 3,
    isCritical: true,
  },
  {
    id: 5,
    question: 'Biển báo hiệu hình tròn có nền xanh lam là loại biển gì dưới đây?',
    options: ['Biển báo nguy hiểm', 'Biển báo cấm', 'Biển báo hiệu lệnh phải thi hành', 'Biển báo chỉ dẫn'],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: 'Khi gặp hiệu lệnh như hình vẽ của cảnh sát giao thông thì người tham gia giao thông phải đi như thế nào là đúng quy tắc giao thông?',
    options: [
      'Người tham gia giao thông ở các hướng phải dừng lại',
      'Người tham gia giao thông ở các hướng được đi theo chiều gậy chỉ của cảnh sát giao thông',
      'Người tham gia giao thông ở phía trước và phía sau người điều khiển được đi tất cả các hướng; người ở phía bên phải và bên trái người điều khiển phải dừng lại',
    ],
    correctAnswer: 0,
    isCritical: true,
  },
  {
    id: 7,
    question: 'Trên đường có nhiều làn đường cho xe đi cùng chiều được phân biệt bằng vạch kẻ phân làn đường, người điều khiển phương tiện phải cho xe đi như thế nào?',
    options: [
      'Cho xe đi trên bất kỳ làn đường nào; khi cần thiết được phép sang làn đường bên cạnh',
      'Phải cho xe đi trong một làn đường và chỉ được chuyển làn đường ở những nơi cho phép; khi chuyển làn phải có tín hiệu báo trước',
      'Phải cho xe đi trong một làn đường, khi cần thiết phải chuyển làn đường',
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: 'Bạn đang lái xe mô tô trên đường và phát hiện một xe cứu thương đang bật còi ưu tiên từ phía sau lao tới, bạn xử lý như thế nào?',
    options: [
      'Tăng tốc độ và tiếp tục đi',
      'Giảm tốc độ, tránh sang bên phải để nhường đường',
      'Bấm còi và tiếp tục đi',
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    id: 9,
    question: 'Khi điều khiển xe mô tô tay ga xuống đường dốc dài, độ dốc cao, người lái xe cần thực hiện các thao tác nào dưới đây để đảm bảo an toàn?',
    options: [
      'Giữ tay ga ở mức độ phù hợp, sử dụng phanh trước và phanh sau để giảm tốc độ',
      'Nhả hết tay ga, tắt động cơ, sử dụng phanh trước và phanh sau để giảm tốc độ',
      'Sử dụng phanh trước để giảm tốc độ kết hợp với tắt chìa khóa điện của xe',
    ],
    correctAnswer: 0,
  },
  {
    id: 10,
    question: 'Khi điều khiển xe mô tô quay đầu, người lái xe cần phải làm gì để đảm bảo an toàn giao thông?',
    options: [
      'Bật tín hiệu báo rẽ trước khi quay đầu xe',
      'Quan sát an toàn các phương tiện tới từ phía trước, phía sau, hai bên đồng thời nhường đường cho xe từ bên phải và phía trước đi tới',
      'Lựa chọn vị trí quay đầu xe cho thích hợp với điều kiện giao thông',
      'Tất cả các ý nêu trên',
    ],
    correctAnswer: 3,
  },
  {
    id: 11,
    question: 'Người ngồi trên xe mô tô hai bánh, xe gắn máy khi tham gia giao thông có được mang, vác vật cồng kềnh hay không?',
    options: ['Được mang, vác tuỳ trường hợp cụ thể', 'Không được mang, vác', 'Được mang, vác nhưng phải đảm bảo an toàn'],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    id: 12,
    question: 'Người điều khiển xe mô tô hai bánh, xe gắn máy có được đi xe dàn hàng ngang; đi xe vào phần đường dành cho người đi bộ và phương tiện khác; sử dụng ô, điện thoại di động, thiết bị âm thanh (trừ thiết bị trợ thính) hay không?',
    options: ['Được phép nhưng phải đảm bảo an toàn', 'Không được phép', 'Được phép tuỳ từng trường hợp'],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    id: 13,
    question: 'Người lái xe mô tô xử lý như thế nào khi cho xe mô tô phía sau vượt?',
    options: [
      'Nếu đủ điều kiện an toàn, người lái xe phải giảm tốc độ, đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được gây trở ngại đối với xe xin vượt',
      'Tăng tốc độ và cố gắng không cho xe phía sau vượt',
      'Người lái xe phải giảm tốc độ, đi sát về bên trái của phần đường xe chạy cho đến khi xe sau đã vượt qua',
    ],
    correctAnswer: 0,
  },
  {
    id: 14,
    question: 'Tại nơi đường giao nhau, khi đèn điều khiển giao thông có tín hiệu vàng, người điều khiển xe phải chấp hành như thế nào là đúng quy tắc giao thông?',
    options: [
      'Phải cho xe dừng lại trước vạch dừng, trường hợp đã đi quá vạch dừng hoặc đã quá gần vạch dừng nếu dừng lại thấy nguy hiểm thì được đi tiếp',
      'Trong trường hợp tín hiệu vàng nhấp nháy là được đi nhưng phải giảm tốc độ, chú ý quan sát nhường đường cho người đi bộ qua đường',
      'Nhanh chóng tăng tốc độ, vượt qua nút giao và chú ý đảm bảo an toàn',
      'Cả ý 1 và ý 2',
    ],
    correctAnswer: 3,
    isCritical: true,
  },
  {
    id: 15,
    question: 'Người điều khiển xe mô tô hai bánh, ba bánh, xe gắn máy không được thực hiện những hành vi nào dưới đây?',
    options: [
      'Đi vào phần đường dành cho người đi bộ và phương tiện khác',
      'Sử dụng ô, điện thoại di động, thiết bị âm thanh (trừ thiết bị trợ thính)',
      'Đi xe dàn hàng ngang',
      'Tất cả các ý nêu trên',
    ],
    correctAnswer: 3,
    isCritical: true,
  },
  {
    id: 16,
    question: 'Xe mô tô hai bánh, xe gắn máy, xe đạp máy được kéo theo một rơ moóc, một xe nào khác hay không?',
    options: ['Được kéo', 'Không được kéo', 'Được kéo nếu đảm bảo an toàn'],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    id: 17,
    question: 'Khi điều khiển xe mô tô tốc độ cao, người lái xe cần lưu ý điều gì dưới đây?',
    options: [
      'Đi đúng làn đường, đúng tốc độ quy định và chú ý quan sát',
      'Chỉ quan sát phía trước, không cần quan sát hai bên',
      'Giảm tốc độ khi xuống dốc, tăng tốc độ khi lên dốc',
    ],
    correctAnswer: 0,
  },
  {
    id: 18,
    question: 'Khi tránh nhau trên đường hẹp, người lái xe cần phải chú ý những điểm nào để đảm bảo an toàn giao thông?',
    options: [
      'Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn',
      'Giảm tốc độ đến mức cần thiết, về số thấp và thực hiện tránh nhau từ từ',
      'Chú ý báo hiệu của người lái xe khác để phối hợp tránh nhau',
      'Tất cả các ý nêu trên',
    ],
    correctAnswer: 3,
  },
  {
    id: 19,
    question: 'Khi điều khiển xe mô tô hai bánh, người lái xe phải bật tín hiệu báo rẽ trong trường hợp nào dưới đây?',
    options: [
      'Khi cho xe chạy thẳng',
      'Trước khi thay đổi làn đường',
      'Sau khi thay đổi làn đường',
    ],
    correctAnswer: 1,
  },
  {
    id: 20,
    question: 'Người lái xe mô tô xử lý như thế nào khi xe bị trượt hay lật đổ?',
    options: [
      'Giữ chặt tay lái, tăng ga',
      'Nhảy khỏi xe ngay lập tức',
      'Giữ chặt tay lái, giảm ga từ từ và giảm dần tốc độ',
    ],
    correctAnswer: 2,
  },
  {
    id: 21,
    question: 'Khi điều khiển xe mô tô qua đường sắt, người lái xe phải xử lý như thế nào?',
    options: [
      'Giảm tốc độ, quan sát cẩn thận hai bên, nếu không có tàu thì nhanh chóng đi qua',
      'Tăng tốc độ để nhanh chóng vượt qua đường sắt',
      'Dừng lại trước đường sắt, quan sát và chỉ đi qua khi đảm bảo an toàn',
    ],
    correctAnswer: 2,
    isCritical: true,
  },
  {
    id: 22,
    question: 'Khi điều khiển xe mô tô tay ga xuống đường dốc dài, người lái xe cần thực hiện các thao tác nào?',
    options: [
      'Giữ tay ga ở mức độ phù hợp, sử dụng phanh trước và phanh sau để giảm tốc độ',
      'Nhả hết tay ga, tắt động cơ, sử dụng phanh trước và phanh sau để giảm tốc độ',
      'Sử dụng phanh trước để giảm tốc độ kết hợp với tắt chìa khóa điện của xe',
    ],
    correctAnswer: 0,
  },
  {
    id: 23,
    question: 'Biển nào cấm xe mô tô hai bánh đi vào?',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop',
    options: ['Biển 1', 'Biển 2', 'Biển 3', 'Cả 3 biển'],
    correctAnswer: 1,
    explanation: 'Biển 2 là biển cấm xe mô tô (hình tròn, viền đỏ, nền trắng, có hình xe mô tô)',
  },
  {
    id: 24,
    question: 'Biển nào báo hiệu "Đường giao nhau" của các tuyến đường cùng cấp?',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    options: ['Biển 1', 'Biển 2', 'Biển 3', 'Cả 3 biển'],
    correctAnswer: 2,
    explanation: 'Biển 3 là biển báo nguy hiểm đường giao nhau (hình tam giác, viền đỏ, nền vàng)',
  },
  {
    id: 25,
    question: 'Vạch kẻ đường nào dưới đây là vạch phân chia hai chiều xe chạy (vạch tim đường), xe không được đè lên hoặc lấn sang phần đường bên trái?',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop',
    options: ['Vạch 1', 'Vạch 2', 'Vạch 3', 'Cả 3 vạch'],
    correctAnswer: 1,
    isCritical: true,
    explanation: 'Vạch 2 là vạch liền màu trắng hoặc vàng, phân chia hai chiều xe chạy, không được phép vượt qua.',
  },
  {
    id: 26,
    question: 'Khi gặp biển này, người lái xe phải xử lý như thế nào?',
    image: 'https://images.unsplash.com/photo-1502489597346-dad15683d4c2?w=400&h=300&fit=crop',
    options: [
      'Giảm tốc độ, chú ý quan sát, chuẩn bị dừng lại',
      'Dừng lại ngay lập tức',
      'Tăng tốc độ để nhanh chóng qua khu vực',
      'Bấm còi để cảnh báo'
    ],
    correctAnswer: 0,
    isCritical: true,
    explanation: 'Biển báo nguy hiểm yêu cầu giảm tốc độ, quan sát và chuẩn bị xử lý tình huống.',
  },
  {
    id: 27,
    question: 'Người lái xe được phép vượt xe khác khi nào?',
    options: [
      'Khi có đủ điều kiện an toàn, không gây cản trở giao thông',
      'Khi xe phía trước chạy chậm',
      'Khi đường rộng',
      'Bất cứ lúc nào nếu cần thiết'
    ],
    correctAnswer: 0,
    explanation: 'Chỉ được vượt khi đảm bảo an toàn, có tầm nhìn xa, không gây cản trở giao thông.',
  },
  {
    id: 28,
    question: 'Trên đường có làn đường dành cho ô tô, người điều khiển xe mô tô có được đi vào làn đường đó không?',
    options: [
      'Được phép',
      'Không được phép',
      'Được phép khi không có ô tô',
      'Được phép nếu đi với tốc độ cao'
    ],
    correctAnswer: 1,
    isCritical: true,
    explanation: 'Xe mô tô không được đi vào làn đường dành riêng cho ô tô.',
  },
  {
    id: 29,
    question: 'Khi điều khiển xe mô tô gặp biển báo này, người lái xe phải làm gì?',
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&h=300&fit=crop',
    options: [
      'Dừng lại trước vạch dừng',
      'Giảm tốc độ quan sát rồi đi tiếp',
      'Tăng tốc độ đi qua nhanh',
      'Bấm còi và đi tiếp'
    ],
    correctAnswer: 0,
    isCritical: true,
    explanation: 'Biển "Dừng lại" yêu cầu phải dừng hẳn xe trước vạch dừng, quan sát rồi mới được đi tiếp.',
  },
  {
    id: 30,
    question: 'Người lái xe xử lý như thế nào khi quan sát phía trước thấy người đi bộ đang sang đường?',
    options: [
      'Giảm tốc độ, có thể dừng lại để nhường đường',
      'Tăng tốc độ để vượt qua trước',
      'Bấm còi để người đi bộ tránh',
      'Giữ nguyên tốc độ'
    ],
    correctAnswer: 0,
    isCritical: true,
    explanation: 'Phải giảm tốc độ, sẵn sàng dừng lại để nhường đường cho người đi bộ.',
  },
];

export const questionsB2: Question[] = [
  {
    id: 1,
    question: 'Khái niệm "phương tiện giao thông cơ giới đường bộ" được hiểu như thế nào là đúng?',
    options: [
      'Gồm xe ô tô; máy kéo; xe mô tô hai bánh; xe mô tô ba bánh; xe gắn máy; xe cơ giới dành cho người khuyết tật và xe máy chuyên dùng',
      'Gồm xe ô tô; máy kéo; rơ moóc hoặc sơ mi rơ moóc được kéo bởi xe ô tô, máy kéo; xe mô tô hai bánh; xe mô tô ba bánh, xe gắn máy (kể cả xe máy điện) và các loại xe tương tự',
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    id: 2,
    question: 'Người điều khiển phương tiện tham gia giao thông trong hầm đường bộ ngoài việc phải tuân thủ các quy tắc giao thông còn phải thực hiện những quy định nào dưới đây?',
    options: [
      'Xe cơ giới, xe máy chuyên dùng phải bật đèn; xe thô sơ phải bật đèn hoặc có vật phát sáng báo hiệu; chỉ được dừng xe, đỗ xe ở nơi quy định',
      'Xe cơ giới phải bật đèn ngay cả khi đường hầm sáng; phải cho xe chạy với tốc độ tối thiểu theo quy định; không được quay đầu xe, lùi xe; còi không được vượt quá 5 giây',
      'Xe máy chuyên dùng phải bật đèn ngay cả khi đường hầm sáng; phải cho xe chạy với tốc độ tối thiểu theo quy định; không được quay đầu xe, lùi xe; còi không được vượt quá 5 giây',
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    id: 3,
    question: 'Trên đường bộ (trừ đường cao tốc) trong khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới, loại xe nào dưới đây được tham gia giao thông với tốc độ tối đa cho phép là 60 km/h?',
    options: [
      'Ô tô con, ô tô tải, ô tô chở người trên 30 chỗ ngồi',
      'Ô tô con, ô tô tải, ô tô chở người đến 30 chỗ ngồi',
      'Ô tô con, ô tô tải, ô tô chở người trên 30 chỗ ngồi và ô tô kéo rơ moóc',
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: 'Người lái xe phải làm gì khi điều khiển xe vào đường cao tốc?',
    options: [
      'Phải có tín hiệu xin vào và phải nhường đường cho xe đang chạy trên đường, khi thấy an toàn mới cho xe nhập vào dòng xe ở làn đường sát mép ngoài; nếu có làn đường tăng tốc thì phải cho xe chạy trên làn đường đó trước khi vào làn đường của đường cao tốc',
      'Phải có tín hiệu xin vào và phải nhường đường cho xe đang chạy trên đường, khi thấy an toàn mới cho xe nhập vào dòng xe ở làn đường phía trong',
      'Quan sát xe phía trước và cho xe nhập vào dòng xe ở làn đường phía trong; nếu có làn đường tăng tốc thì phải cho xe chạy trên làn đường đó trước khi vào làn đường của đường cao tốc',
    ],
    correctAnswer: 0,
    isCritical: true,
  },
  {
    id: 5,
    question: 'Khi điều khiển xe ô tô xuống dốc dài, độ dốc cao, người lái xe số sàn cần thực hiện các thao tác nào dưới đây để đảm bảo an toàn?',
    options: [
      'Giữ cho xe lăn bánh tự do, nhả bàn đạp ly hợp (côn), tắt máy, về số 0 để xe tự trôi',
      'Nhả bàn đạp ly hợp (côn), về số thấp (số 1, số 2 hoặc số 3), đạp phanh chân với mức độ phù hợp để giảm tốc độ',
      'Đạp ly hợp (côn), về số 0 (số 0), đạp phanh chân và phanh tay để giảm tốc độ',
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: 'Khi điều khiển xe chạy trên đường vòng, người lái xe cần phải làm gì để đảm bảo an toàn?',
    options: [
      'Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn; giảm tốc độ tới mức cần thiết, về số thấp và thực hiện quay vòng với tốc độ phù hợp với bán kính cong của đường vòng',
      'Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn; tăng tốc để nhanh chóng qua đường vòng',
    ],
    correctAnswer: 0,
  },
  {
    id: 7,
    question: 'Khi lái xe ô tô qua đường sắt, người lái xe phải xử lý như thế nào là đúng quy tắc giao thông?',
    options: [
      'Giảm tốc độ, quan sát phía trước, phía sau, bên trái, bên phải, khi thấy an toàn mới cho xe chạy qua đường sắt',
      'Giảm tốc độ, về số thấp, khi thấy không có tàu hỏa thì nhanh chóng cho xe chạy qua đường sắt',
      'Nhanh chóng tăng tốc độ, về số cao để nhanh chóng vượt qua đường sắt',
    ],
    correctAnswer: 0,
    isCritical: true,
  },
  {
    id: 8,
    question: 'Người lái xe phải xử lý như thế nào khi quan sát phía trước thấy người đi bộ đang sang đường tại nơi có vạch đường dành cho người đi bộ để đảm bảo an toàn?',
    options: [
      'Giảm tốc độ, đi từ từ để vượt qua trước người đi bộ',
      'Giảm tốc độ, có thể dừng lại nếu cần thiết trước vạch dừng xe để nhường đường cho người đi bộ qua đường',
      'Tăng tốc độ để vượt qua trước người đi bộ',
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    id: 9,
    question: 'Khi điều khiển xe ô tô tránh nhau trên đường hẹp, người lái xe cần phải chú ý những điểm nào để đảm bảo an toàn giao thông?',
    options: [
      'Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn; giảm tốc độ đến mức cần thiết, về số thấp và thực hiện tránh nhau từ từ',
      'Chú ý báo hiệu của người lái xe khác để phối hợp tránh nhau',
      'Cả ý 1 và ý 2',
    ],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: 'Khi điều khiển xe ô tô quay đầu, người lái xe cần phải thực hiện như thế nào để đảm bảo an toàn giao thông?',
    options: [
      'Quan sát gương, ra tín hiệu, quan sát an toàn các phương tiện tới từ phía trước, phía sau, hai bên đồng thời nhường đường cho xe từ bên phải và phía trước đi tới',
      'Quan sát gương, ra tín hiệu, quan sát an toàn các phương tiện tới từ phía trước, phía sau, hai bên đồng thời nhường đường cho xe từ bên trái và phía trước đi tới',
      'Quan sát gương, quan sát an toàn các phương tiện tới từ phía trước, phía sau, hai bên đồng thời nhường đường cho xe từ bên phải và phía trước đi tới',
      'Chỉ cần quan sát phía trước và quay đầu nhanh'
    ],
    correctAnswer: 0,
    explanation: 'Phải thực hiện đầy đủ: quan sát gương, ra tín hiệu, quan sát tất cả các hướng và nhường đường đúng quy định.',
  },
  {
    id: 11,
    question: 'Biển báo này có ý nghĩa gì?',
    image: 'https://images.unsplash.com/photo-1502489597346-dad15683d4c2?w=400&h=300&fit=crop',
    options: [
      'Cấm đỗ xe',
      'Cấm dừng xe và đỗ xe',
      'Được phép đỗ xe',
      'Hết cấm đỗ xe'
    ],
    correctAnswer: 1,
    isCritical: true,
    explanation: 'Biển cấm dừng xe và đỗ xe (hình tròn, viền đỏ, nền xanh, có dấu X đỏ).',
  },
  {
    id: 12,
    question: 'Khi lái xe ô tô trên đường cao tốc, người lái xe phải tuân thủ quy định nào dưới đây?',
    options: [
      'Không được quay đầu xe, lùi xe, đi vào làn khẩn cấp',
      'Được phép quay đầu nếu không có xe',
      'Được phép lùi xe nếu đi nhầm đường',
      'Được phép dừng xe bất cứ đâu nếu cần thiết'
    ],
    correctAnswer: 0,
    isCritical: true,
    explanation: 'Trên đường cao tốc nghiêm cấm quay đầu, lùi xe và đi vào làn khẩn cấp khi không cần thiết.',
  },
  {
    id: 13,
    question: 'Người lái xe ô tô xử lý như thế nào khi xe bị hỏng trên đường cao tốc?',
    options: [
      'Bật đèn cảnh báo, đặt biển báo, đưa xe ra khỏi phần đường xe chạy',
      'Dừng xe ngay tại chỗ và sửa chữa',
      'Tiếp tục lái xe đến trạm dịch vụ gần nhất',
      'Gọi điện và chờ trong xe'
    ],
    correctAnswer: 0,
    explanation: 'Phải bật đèn cảnh báo, đặt biển báo phía sau xe và cố gắng đưa xe ra khỏi phần đường xe chạy.',
  },
  {
    id: 14,
    question: 'Khi điều khiển xe ô tô gặp biển báo này, người lái xe phải xử lý như thế nào?',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    options: [
      'Giảm tốc độ, chú ý quan sát, chuẩn bị dừng lại nếu cần',
      'Tăng tốc độ để nhanh chóng qua khu vực',
      'Giữ nguyên tốc độ',
      'Dừng lại ngay lập tức'
    ],
    correctAnswer: 0,
    explanation: 'Biển báo nguy hiểm yêu cầu giảm tốc độ, quan sát và chuẩn bị xử lý tình huống.',
  },
  {
    id: 15,
    question: 'Người lái xe ô tô có được phép sử dụng điện thoại di động khi đang lái xe không?',
    options: [
      'Không được phép',
      'Được phép nếu sử dụng tai nghe',
      'Được phép nếu đường vắng',
      'Được phép nếu gọi khẩn cấp'
    ],
    correctAnswer: 0,
    isCritical: true,
    explanation: 'Nghiêm cấm sử dụng điện thoại di động khi đang điều khiển xe, kể cả dùng tai nghe.',
  },
  {
    id: 16,
    question: 'Khi lái xe ô tô xuống dốc dài, người lái xe cần lưu ý điều gì?',
    options: [
      'Sử dụng phanh kết hợp với phanh động cơ (về số thấp)',
      'Chỉ sử dụng phanh chân',
      'Tắt máy để xe tự trôi',
      'Về số 0 và sử dụng phanh tay'
    ],
    correctAnswer: 0,
    explanation: 'Phải kết hợp phanh chân với phanh động cơ (về số thấp) để tránh phanh quá nóng.',
  },
  {
    id: 17,
    question: 'Vạch kẻ đường này có ý nghĩa gì?',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop',
    options: [
      'Vạch phân chia làn đường, được phép chuyển làn',
      'Vạch phân chia hai chiều xe chạy, không được vượt',
      'Vạch dừng xe',
      'Vạch báo hiệu khu vực nguy hiểm'
    ],
    correctAnswer: 1,
    isCritical: true,
    explanation: 'Vạch liền màu trắng hoặc vàng phân chia hai chiều xe chạy, không được phép vượt qua.',
  },
  {
    id: 18,
    question: 'Khi tham gia giao thông, người lái xe ô tô phải mang theo giấy tờ gì?',
    options: [
      'Giấy phép lái xe, giấy đăng ký xe, giấy bảo hiểm',
      'Chỉ cần giấy phép lái xe',
      'Chỉ cần giấy đăng ký xe',
      'Không cần mang theo nếu nhớ số'
    ],
    correctAnswer: 0,
    isCritical: true,
    explanation: 'Phải mang đầy đủ: giấy phép lái xe, giấy đăng ký xe và giấy bảo hiểm bắt buộc.',
  },
  {
    id: 19,
    question: 'Người lái xe ô tô xử lý như thế nào khi gặp xe ưu tiên đang phát tín hiệu?',
    options: [
      'Giảm tốc độ, tránh sang bên phải để nhường đường',
      'Tăng tốc độ để tránh',
      'Giữ nguyên tốc độ',
      'Dừng lại ngay giữa đường'
    ],
    correctAnswer: 0,
    isCritical: true,
    explanation: 'Phải giảm tốc độ, tránh sang bên phải và nhường đường cho xe ưu tiên.',
  },
  {
    id: 20,
    question: 'Biển báo này có ý nghĩa gì?',
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&h=300&fit=crop',
    options: [
      'Cấm rẽ trái',
      'Cấm quay đầu xe',
      'Cấm rẽ phải',
      'Cấm đi thẳng'
    ],
    correctAnswer: 1,
    explanation: 'Biển cấm quay đầu xe (hình tròn, viền đỏ, nền trắng, có mũi tên quay đầu bị gạch).',
  },
];

export function getRandomQuestions(licenseType: LicenseType, examSet?: string): Question[] {
  // Sử dụng câu hỏi A1 cho tất cả loại xe mô tô (A1-A4)
  // Sử dụng câu hỏi B2 cho tất cả loại xe ô tô (B1, B2, C, D, E, F)
  const allQuestions = ['A1', 'A2', 'A3', 'A4'].includes(licenseType) 
    ? questionsA1 
    : questionsB2;
  const config = examConfigs[licenseType];
  
  // Nếu chọn đề cố định (1-20), dùng seed để tạo đề cố định
  if (examSet && examSet !== 'random') {
    const seed = parseInt(examSet);
    // Sử dụng seed để tạo đề cố định
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };
    
    const shuffled = [...allQuestions].sort((a, b) => {
      const hashA = (a.id + seed * 1000) % 1000;
      const hashB = (b.id + seed * 1000) % 1000;
      return seededRandom(hashA) - seededRandom(hashB);
    });
    
    return shuffled.slice(0, config.totalQuestions);
  }
  
  // Ngẫu nhiên (mặc định)
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, config.totalQuestions);
}
