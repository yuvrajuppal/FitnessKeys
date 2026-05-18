import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Dumbbell,
  Target,
  Flame,
  Activity,
  Zap,
  Heart,
} from "lucide-react";
import axios from "axios";
import { APIROUTE } from "../utils/APIROUTES";
import chestImg from "../assets/WorkoutIages/chest.png";
import tricepsImg from "../assets/WorkoutIages/triceps.png";
import backImg from "../assets/WorkoutIages/back.png";
import bicepsImg from "../assets/WorkoutIages/biceps.png";
import legsImg from "../assets/WorkoutIages/legs.png";
import shouldersImg from "../assets/WorkoutIages/sholder.png";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Chest: Dumbbell,
  Triceps: Zap,
  Back: Target,
  Biceps: Flame,
  Legs: Activity,
  Shoulders: Heart,
};

const imageMap: Record<string, string> = {
  Chest: chestImg,
  Triceps: tricepsImg,
  Back: backImg,
  Biceps: bicepsImg,
  Legs: legsImg,
  Shoulders: shouldersImg,
};

const categoryAccent: Record<string, string> = {
  Chest: "#b4fe00",
  Triceps: "#f97316",
  Back: "#3b82f6",
  Biceps: "#ef4444",
  Legs: "#a855f7",
  Shoulders: "#06b6d4",
};

interface Category {
  id: string;
  name: string;
  imageUrl: string | null;
  Showindex: number;
  createdAt: string;
  updatedAt: string;
}

export const BodyCategories: React.FC = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${APIROUTE}/api/categories/GetAllCategories`
        );
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0b] text-white font-sans">
      <div className="relative max-w-6xl mx-auto px-6 py-14 md:px-10 md:py-16 lg:py-20">
        {/* ── Header ── */}
        <header
          className={`mb-14 transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-8 bg-[#b4fe00] rounded-full" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Explore
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
            Body&nbsp;<span className="text-[#b4fe00]">Categories</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-base max-w-lg font-medium leading-relaxed">
            Target specific muscle groups with professionally engineered workout
            protocols.
          </p>
        </header>

        {/* ── Categories ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-[#12120f] overflow-hidden animate-pulse min-h-[280px] md:min-h-[320px]"
                style={{
                  animation: `fade-in-up 0.4s ease-out forwards`,
                  animationDelay: `${i * 80}ms`,
                  opacity: 0,
                }}
              >
                <div className="h-full bg-zinc-800/30" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-24 text-zinc-600">
            <p className="text-lg font-medium text-zinc-400">
              No categories available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map((category, index) => {
              const Icon = iconMap[category.name];
              const accent = categoryAccent[category.name] || "#b4fe00";
              const imgSrc = category.imageUrl
                ? `${APIROUTE}/${category.imageUrl}`
                : imageMap[category.name] || imageMap.Chest;

              return (
                <div
                  key={category.id}
                  onClick={() =>
                    navigate(`/BodyCategories/${encodeURIComponent(category.name)}`)
                  }
                  className="group relative rounded-xl border border-zinc-700/50 hover:border-zinc-600 cursor-pointer overflow-hidden transition-all duration-400 ease-out"
                  style={{
                    animation: mounted
                      ? "fade-in-up 0.4s ease-out forwards"
                      : "none",
                    animationDelay: `${index * 80}ms`,
                    opacity: 0,
                  }}
                >
                  {/* ── Image ── */}
                  <div className="absolute inset-0">
                    <img
                      src={imgSrc}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b] via-[#0d0d0b]/60 to-[#0d0d0b]/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0b]/40 to-transparent" />
                  </div>

                  {/* ── Content ── */}
                  <div className="relative p-5 md:p-6 min-h-[280px] md:min-h-[320px] flex flex-col justify-end">
                    {/* Top info */}
                    <div className="flex items-center justify-between mb-auto">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] font-bold text-zinc-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="w-[2px] h-3 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        {Icon && (
                          <Icon className="w-3.5 h-3.5 text-zinc-400 transition-colors duration-300 group-hover:text-white" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600">
                        #{category.Showindex}
                      </span>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Name + CTA row */}
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3
                          className={`font-black text-white tracking-tight leading-none transition-colors duration-300 ${
                            index === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                          }`}
                        >
                          {category.name}
                        </h3>
                      </div>

                      <button
                        className="flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300 shrink-0"
                        style={{
                          borderColor: accent,
                          color: accent,
                          backgroundColor: `${accent}0d`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = accent;
                          e.currentTarget.style.color = "#0d0d0b";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${accent}0d`;
                          e.currentTarget.style.color = accent;
                        }}
                        aria-label={`View ${category.name} workouts`}
                      >
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyCategories;
