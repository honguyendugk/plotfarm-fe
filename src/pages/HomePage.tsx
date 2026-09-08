import { Link } from "react-router-dom";

const stats = [
  { label: "Ô đất đang canh tác", value: "120+" },
  { label: "Nông dân tham gia", value: "800+" },
  { label: "Mùa vụ đã hoàn thành", value: "45" },
];

const features = [
  {
    icon: "🌾",
    title: "Chọn ô đất phù hợp",
    desc: "Lọc theo farm, diện tích, giá thuê và xem trạng thái đất theo thời gian thực.",
  },
  {
    icon: "🌱",
    title: "Theo dõi mùa vụ",
    desc: "Ghi nhật ký chăm sóc cây trồng và theo dõi tiến độ sinh trưởng mỗi ngày.",
  },
  {
    icon: "📷",
    title: "Camera giám sát",
    desc: "Xem trực tiếp tình trạng ô đất của bạn mọi lúc, mọi nơi qua camera farm.",
  },
];

function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-farm-600 via-farm-500 to-farm-400 px-8 pb-0 pt-16 text-white shadow-lg">
        <span className="absolute right-14 top-8 h-16 w-16 rounded-full bg-yellow-200/80 shadow-[0_0_50px_20px_rgba(253,224,71,0.35)] select-none" />
        <span className="absolute -left-4 top-8 text-6xl opacity-30 animate-float-slow select-none">
          🌿
        </span>
        <span className="absolute right-32 top-16 text-5xl opacity-30 animate-float select-none">
          🍃
        </span>
        <span className="absolute bottom-24 left-1/3 text-5xl opacity-20 animate-float-slow select-none">
          🌻
        </span>
        <span className="absolute right-10 bottom-24 text-7xl opacity-20 animate-float select-none">
          🌾
        </span>

        <div className="relative z-10 max-w-2xl animate-fade-up pb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
            🚜 Nông trại số hoá đầu tiên cho bạn
          </span>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Chào mừng đến với PlotFarm
          </h1>
          <p className="mt-4 text-lg text-farm-50/90">
            Nền tảng cho thuê ô đất canh tác trực tuyến. Chọn và thuê ô đất
            theo nhu cầu, theo dõi tình trạng cây và nhật ký chăm sóc ngay
            trên hệ thống.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/farms"
              className="rounded-full bg-white px-6 py-3 font-semibold text-farm-700 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Khám phá Farm / Plot
            </Link>
            <Link
              to="/rent"
              className="rounded-full border border-white/70 px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Thuê ô đất ngay
            </Link>
          </div>
        </div>

        {/* rolling hills divider */}
        <svg
          viewBox="0 0 1440 120"
          className="relative z-10 -mb-1 block w-full text-farm-50"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64 C240,120 480,0 720,32 C960,64 1200,112 1440,48 L1440,120 L0,120 Z"
          />
        </svg>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{ animationDelay: `${i * 120}ms` }}
            className="animate-fade-up rounded-2xl border border-farm-100 bg-white p-6 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="font-display text-3xl font-bold text-farm-700">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-farm-800">
          Vì sao chọn PlotFarm?
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{ animationDelay: `${i * 150}ms` }}
              className="group animate-fade-up rounded-2xl border border-farm-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-farm-300 hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-farm-50 text-2xl transition-transform duration-300 group-hover:animate-sway">
                {f.icon}
              </span>
              <h3 className="font-display mt-3 text-lg font-semibold text-farm-800">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-soil-500 to-amber-500 px-8 py-10 text-center text-white shadow-lg">
        <span className="absolute left-8 top-4 text-4xl opacity-25 animate-float-slow select-none">
          🐓
        </span>
        <span className="absolute right-10 bottom-4 text-4xl opacity-25 animate-float select-none">
          🌻
        </span>
        <h2 className="font-display relative z-10 text-2xl font-bold sm:text-3xl">
          Sẵn sàng bắt đầu vụ mùa của bạn?
        </h2>
        <p className="relative z-10 mx-auto mt-2 max-w-xl text-white/90">
          Đăng ký ngay hôm nay để chọn ô đất, gieo trồng và theo dõi nông trại
          của riêng bạn.
        </p>
        <Link
          to="/register"
          className="relative z-10 mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-soil-700 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Đăng ký miễn phí
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
