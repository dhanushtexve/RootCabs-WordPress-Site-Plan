import { ReactNode } from "react";

interface PageBannerProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  bannerImageUrl?: string;
  backgroundColor?: string;
}

export function PageBanner({
  title,
  description,
  children,
  className = "",
  bannerImageUrl = "/assets/banner-root-cabs.png",
  backgroundColor = "bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C]",
}: PageBannerProps) {
  return (
    <section
      className={`relative min-h-[280px] overflow-hidden py-8 text-white md:min-h-[360px] md:py-10 ${className}`}
      style={{
        backgroundImage: `url('${bannerImageUrl}')`,
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4">
        {title && <h1 className="mb-3 font-heading text-3xl font-bold md:text-4xl">{title}</h1>}
        {description && <p className="max-w-3xl text-gray-200">{description}</p>}
        {children}
      </div>
    </section>
  );
}
