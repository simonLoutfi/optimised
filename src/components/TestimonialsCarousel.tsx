import React, { useRef, useEffect, useState } from "react";
import { Quote } from "lucide-react"; // lucide-react is already installed
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ACCENT = "#3CE8B3";
const DARK_BG = "#0D1A2B";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  lang: "en" | "ar";
};

const EN_TESTIMONIALS: Testimonial[] = [
  {
    quote: "We reduced our food waste by 30% in just six weeks.",
    author: "Rima Daher",
    role: "Seven Stones Café",
    lang: "en",
  },
  {
    quote: "I used to track inventory in Excel. Now I save 2–3 hours a week with OptiMised.",
    author: "Walid El Masri",
    role: "Urban Bistro",
    lang: "en",
  },
  {
    quote: "Finally, a tool that connects sales to what’s actually in my fridge.",
    author: "Tony Rahme",
    role: "The Fry Line",
    lang: "en",
  },
  {
    quote: "We caught $250/month in hidden waste using OptiMised.",
    author: "Elias Khoury",
    role: "Bistro L’Orient",
    lang: "en",
  },
  {
    quote: "It warned us two days before we ran out of chicken — that alone saved our weekend rush.",
    author: "Farah Chidiac",
    role: "Kebab Junction",
    lang: "en",
  },
  {
    quote: "I love that I get alerts on my phone when something’s off in the kitchen.",
    author: "Nour Hoteit",
    role: "Beit Matbakh",
    lang: "en",
  },
  {
    quote: "The monthly reports are gold. We finally know where we’re losing money.",
    author: "Rana Iskandar",
    role: "Green Garden Restaurant",
    lang: "en",
  },
];

const AR_TESTIMONIALS: Testimonial[] = [
  {
    quote: "وفرنا ٣٥٪ من الهدر خلال أول شهر فقط.",
    author: "سارة الحاج",
    role: "مطبخ النخبة",
    lang: "ar",
  },
  {
    quote: "أول مرة بقدر أراقب التبذير يوم بيوم من موبايلي.",
    author: "فادي شمس",
    role: "كافيه الواجهة",
    lang: "ar",
  },
  {
    quote: "ساعدنا نكتشف فرق كبير بين البيع الحقيقي والاستهلاك.",
    author: "ريم حيدر",
    role: "مطعم البيت",
    lang: "ar",
  },
  {
    quote: "كل تنبيه بيوصلني بيوفرلي وجعة راس.",
    author: "عمر ناصر",
    role: "فلافل الصداقة",
    lang: "ar",
  },
  {
    quote: "التقارير الشهرية واضحة وساعدتنا ناخد قرارات أسرع.",
    author: "رنا عبد",
    role: "جريل مارينا",
    lang: "ar",
  },
];

function useShuffledTestimonials(
  mixRatio: number = 0.5 // 50% arabic, 50% english approx
): Testimonial[] {
  // Try to detect browser language preference
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => {
    let mixed: Testimonial[] = [];
    let ar = [...AR_TESTIMONIALS];
    let en = [...EN_TESTIMONIALS];
    const isRTL =
      typeof navigator !== "undefined" &&
      navigator.language &&
      /^ar\b/.test(navigator.language);

    // Shuffle both
    function shuffle(arr: any[]) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    ar = shuffle(ar);
    en = shuffle(en);

    if (isRTL) {
      mixed = [...ar, ...en.slice(0, Math.ceil(en.length * mixRatio))];
    } else {
      mixed = [];
      let i = 0,
        j = 0;
      // Mix of EN, AR, EN, AR...
      while (i < en.length || j < ar.length) {
        if (i < en.length) mixed.push(en[i++]);
        if (j < ar.length) mixed.push(ar[j++]);
      }
    }
    setTestimonials(mixed);
  }, []);
  return testimonials;
}

export const TestimonialsCarousel: React.FC = () => {
  const testimonials = useShuffledTestimonials();
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isMobile) return; // No auto-scroll on mobile
    const el = carouselRef.current;
    if (!el) return;
    let raf: number | undefined;
    let scrollAmount = 0.7; // px per frame

    function step() {
      if (!isHovered && el) {
        if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 1) {
          // Seamless loop: back to start
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += scrollAmount;
        }
      }
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => raf && cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [isHovered, isMobile, testimonials]);

  // RTL or LTR
  const hasRTL = testimonials.some((t) => t.lang === "ar");
  const dir = hasRTL ? "ltr" : "ltr"; // we'll set rtl per-card for Arabic

  // Duplicated cards for seamless loop
  const cards = [...testimonials, ...testimonials];

  // Card rendering
  function Card({ t }: { t: Testimonial }) {
    const rtl = t.lang === "ar";
    const notoSansAr = rtl ? "'Noto Naskh Arabic', 'Cairo', serif" : undefined;
    return (
      <div
        dir={rtl ? "rtl" : "ltr"}
        className={cn(
          "flex flex-col justify-between rounded-2xl shadow-lg border border-accent/10 bg-white/5 min-w-[320px] max-w-[340px] w-[320px]",
          "px-7 py-7",
          "transition-transform transition-shadow duration-300",
          "hover:scale-105 hover:shadow-2xl",
          "cursor-grab",
          rtl ? "items-end text-right" : "items-start text-left"
        )}
        style={{
          fontFamily: rtl
            ? notoSansAr
            : "'Inter', 'Poppins', 'SF Pro', ui-sans-serif, system-ui",
        }}
      >
        <Quote color={ACCENT} size={28} className={rtl ? "ml-2" : "mr-2"} />
        <div
          className={cn(
            "text-lg font-semibold mb-2",
            rtl ? "text-right" : "text-left",
            "text-white"
          )}
          style={rtl ? { fontFamily: notoSansAr } : undefined}
        >
          {t.quote}
        </div>
        <div className="flex items-center mt-5 w-full gap-2">
          <Avatar className="mr-2 border border-[#3CE8B3]/40 shadow w-10 h-10 bg-white/10">
            {t.avatarUrl ? (
              <img src={t.avatarUrl} alt={t.author} />
            ) : (
              <AvatarFallback className="text-[#3CE8B3] bg-white/10 font-bold">
                {t.author
                  .split(" ")
                  .map((x) => (x[0] ? x[0] : ""))
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <span
              className={cn(
                "font-bold text-[#3CE8B3] leading-tight",
                rtl ? "text-right" : "text-left"
              )}
              dir={rtl ? "rtl" : "ltr"}
              style={{
                fontFamily: rtl
                  ? notoSansAr
                  : "'Inter', 'Poppins', 'SF Pro', ui-sans-serif, system-ui",
              }}
            >
              {t.author}
            </span>
            <span
              className={cn(
                "text-white/70 text-xs font-medium",
                rtl ? "text-right" : "text-left"
              )}
              dir={rtl ? "rtl" : "ltr"}
              style={{
                fontFamily: rtl
                  ? notoSansAr
                  : "'Inter', 'Poppins', 'SF Pro', ui-sans-serif, system-ui",
              }}
            >
              {t.role}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    // Simple vertical stack with swipe support
    return (
      <div
        className="w-full"
        style={{
          background: DARK_BG,
        }}
      >
        <div className="flex flex-col items-center px-2 py-6 gap-5">
          {testimonials.map((t, idx) => (
            <Card t={t} key={idx} />
          ))}
        </div>
      </div>
    );
  }

  // Desktop/tablet: horizontal carousel, auto-scroll, pause on hover, infinite loop
  return (
    <div
      className="w-full py-6 relative"
      style={{ background: DARK_BG }}
      dir={dir}
    >
      <div
        className="flex flex-nowrap gap-x-6 overflow-x-scroll no-scrollbar"
        ref={carouselRef}
        tabIndex={0}
        aria-label="Testimonials"
        style={{
          width: "100%",
          scrollBehavior: "smooth",
          cursor: "grab",
          scrollbarWidth: "none", // Firefox
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none !important;
          }
        `}</style>
        {cards.map((t, idx) => (
          <Card t={t} key={idx + t.author} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
