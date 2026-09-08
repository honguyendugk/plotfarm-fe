import type { ReactNode } from "react";

type Tone = "green" | "amber" | "wheat" | "leaf" | "soil";

const toneStyles: Record<Tone, string> = {
  green: "from-farm-600 via-farm-500 to-farm-400",
  amber: "from-amber-600 via-amber-500 to-yellow-400",
  wheat: "from-yellow-600 via-amber-400 to-farm-300",
  leaf: "from-farm-700 via-farm-500 to-lime-400",
  soil: "from-soil-700 via-soil-500 to-soil-200",
};

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  tone?: Tone;
}

function PageHeader({ icon, title, subtitle, tone = "green" }: PageHeaderProps) {
  return (
    <div
      className={`relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br ${toneStyles[tone]} px-6 py-8 text-white shadow-sm`}
    >
      <span className="absolute -right-2 -top-2 text-6xl opacity-20 animate-float-slow select-none">
        {icon}
      </span>
      <span className="absolute bottom-0 left-10 text-4xl opacity-10 animate-float select-none">
        {icon}
      </span>
      <div className="relative z-10 flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-white/85">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
