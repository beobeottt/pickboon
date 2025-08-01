import React from 'react';

const RankingGuidePage: React.FC = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto text-base leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">Hướng dẫn đăng ký xét trình VĐV Pickleball</h1>
      <p>Để giúp các VĐV chọn được mức trình độ phù hợp khi đăng ký thi đấu Pickleball, chúng tôi cung cấp hướng dẫn dưới đây, đặc biệt dành cho những người đã từng có kinh nghiệm chơi tennis và muốn quy đổi trình độ của mình sang Pickleball.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Chọn trình độ ban đầu</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>2.0</strong>: Mới học, chưa có kinh nghiệm thể thao trước đó. Chưa nắm rõ luật chơi Pickeball.</li>
        <li><strong>2.3</strong>: Hiểu sơ về luật chơi nhưng có ít kinh nghiệm. Đánh được các đường bóng cơ bản, tính điểm trận đấu cơ bản.</li>
        <li><strong>2.5</strong>: Hiểu và Nắm rõ luật, bắt đầu làm quen với kỹ thuật chơi và cách tính điểm. Có thể duy trì rally ngắn.</li>
        <li><strong>2.8</strong>: Hiểu luật và có kinh nghiệm thi đấu thể thao trước đó(Bóng bàn, cầu lông, tennis). Có thể chuyển qua Pickeball mà không cần tập cơ bản nhiều</li>
        <li><strong>3.0</strong>: Có kỹ năng đánh với tốc độ ổn định và đang học cách chọn vị trí, chiến thuật.</li>
        <li><strong>3.5</strong>: Hiểu chiến thuật tốt hơn, di chuyển linh hoạt, có thể thực hiện những cú drop shot, volley với tốc độ ổn định.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Quy đổi điểm tennis sang Pickleball(dành cho các VĐV đã có kinh nghiệm thi đấu tennis)</h2>
      <p>Nếu bạn đã từng thi đấu hoặc có điểm xếp hạng trong tennis, dưới đây là cách quy đổi điểm tennis sang Pickeball:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>620 - 640 điểm tennis: Tương ứng với trình 2.7-2.8 Pickleball</li>
        <li>640 - 660 điểm tennis: Tương ứng với trình 2.8-3.0 Pickleball</li>
        <li>660 - 680 điểm tennis: Tương ứng với trình 3.1-3.3 Pickleball</li>
        <li>680 - 750 điểm tennis: Tương ứng với trình 3.4-3.7 Pickleball</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Đăng ký xét trình</h2>
      <p>
      Điểm xét trình ban đầu do VĐV tự đề xuất chưa phải là 
      điểm được cấp tích xanh. Đối với những VĐV chưa có người bảo lãnh điểm trình 
      và chưa tham gia bất kỳ giải đấu nào, PVNA sẽ chưa cấp tích xanh ngay. 
      Thay vào đó, chúng tôi sẽ theo dõi và quan sát các VĐV qua những giải đấu 
      để đưa ra đánh giá khách quan nhất.Khi đã có đủ cơ sở để xác định tương đối 
      chính xác trình độ của VĐV, PVNA sẽ tiến hành cấp tích xanh. 
      Sau khi được cấp tích xanh, điểm trình của các VĐV sẽ thay đổi dựa trên kết quả từng trận đấu mà họ tham gia. 
      Ở giai đoạn này, PVNA sẽ không can thiệp vào điểm số nữa mà để hệ thống ELO tự động đánh giá, 
      nhằm tránh các yếu tố chủ quan hoặc cảm xúc ảnh hưởng đến điểm trình của VĐV.
      </p>

      <p className="italic text-gray-600">
        Chúng tôi mong các VĐV hiểu và ủng hộ quy trình này để đảm bảo công bằng, minh bạch.
      </p>
    </div>
  );
};

export default RankingGuidePage;
