function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-farm-100 bg-white px-6 py-4 text-center text-sm text-gray-500">
      <span className="relative z-10">
        © {new Date().getFullYear()} PlotFarm — Nền tảng thuê ô đất canh tác trực tuyến. 🌱
      </span>
    </footer>
  );
}

export default Footer;
