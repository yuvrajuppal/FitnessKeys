import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Dumbbell, Target } from "lucide-react";
import chestImg from "../assets/WorkoutIages/chest.png";
import tricepsImg from "../assets/WorkoutIages/triceps.png";
import backImg from "../assets/WorkoutIages/back.png";
import bicepsImg from "../assets/WorkoutIages/biceps.png";
import legsImg from "../assets/WorkoutIages/legs.png";
import shouldersImg from "../assets/WorkoutIages/sholder.png";

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

const difficultyDots = {
  Beginner: [true, false, false],
  Intermediate: [true, true, false],
  Advanced: [true, true, true],
} as const;

interface Workout {
  id: string;
  name: string;
  exercises: number;
  duration: string;
  difficulty: keyof typeof difficultyDots;
  description: string;
}

const workoutsData: Record<string, Workout[]> = {
  Chest: [
    { id: "c1", name: "Push-Up Progression", exercises: 6, duration: "25 min", difficulty: "Beginner", description: "Build foundation strength with progressive push-up variations." },
    { id: "c2", name: "Bench Press Blast", exercises: 8, duration: "35 min", difficulty: "Intermediate", description: "Barbell and dumbbell bench press variations for mass." },
    { id: "c3", name: "Chest Hypertrophy", exercises: 10, duration: "45 min", difficulty: "Advanced", description: "High-volume chest training for maximum muscle growth." },
    { id: "c4", name: "Incline Focus", exercises: 7, duration: "30 min", difficulty: "Intermediate", description: "Target upper chest with incline presses and flyes." },
  ],
  Triceps: [
    { id: "t1", name: "Bodyweight Extensions", exercises: 5, duration: "20 min", difficulty: "Beginner", description: "Dips and bodyweight movements to sculpt triceps." },
    { id: "t2", name: "Skull Crushers", exercises: 7, duration: "30 min", difficulty: "Intermediate", description: "EZ-bar and dumbbell extensions for triceps mass." },
    { id: "t3", name: "Triceps Torch", exercises: 9, duration: "40 min", difficulty: "Advanced", description: "Cable and isolation work to define every head." },
  ],
  Back: [
    { id: "b1", name: "Pull-Up Foundation", exercises: 5, duration: "25 min", difficulty: "Beginner", description: "Master pull-ups with assisted variations and negatives." },
    { id: "b2", name: "Deadlift Day", exercises: 6, duration: "40 min", difficulty: "Advanced", description: "Conventional and sumo deadlifts for posterior chain." },
    { id: "b3", name: "Lat Builder", exercises: 8, duration: "35 min", difficulty: "Intermediate", description: "Rows and pulldowns to widen and thicken the back." },
    { id: "b4", name: "Rear Delt & Trap", exercises: 7, duration: "30 min", difficulty: "Intermediate", description: "Face pulls, shrugs, and reverse flyes for depth." },
  ],
  Biceps: [
    { id: "bi1", name: "Curl Variations", exercises: 6, duration: "25 min", difficulty: "Beginner", description: "Barbell, dumbbell, and hammer curls for brachialis." },
    { id: "bi2", name: "Peak Biceps", exercises: 8, duration: "35 min", difficulty: "Intermediate", description: "Concentration curls and preacher curls for the peak." },
    { id: "bi3", name: "Arm Annihilation", exercises: 10, duration: "45 min", difficulty: "Advanced", description: "High-intensity biceps and brachialis super-sets." },
  ],
  Legs: [
    { id: "l1", name: "Squat Fundamentals", exercises: 5, duration: "30 min", difficulty: "Beginner", description: "Goblet squats and bodyweight progressions for form." },
    { id: "l2", name: "Leg Day", exercises: 8, duration: "45 min", difficulty: "Intermediate", description: "Squats, lunges, and leg press for overall leg mass." },
    { id: "l3", name: "Quad Domination", exercises: 9, duration: "50 min", difficulty: "Advanced", description: "High-volume front squats and extensions for vastus." },
    { id: "l4", name: "Hamstring & Glute", exercises: 7, duration: "40 min", difficulty: "Intermediate", description: "RDLs, hamstring curls, and hip thrusts for posterior." },
    { id: "l5", name: "Explosive Legs", exercises: 6, duration: "35 min", difficulty: "Advanced", description: "Plyometrics and Olympic lifts for power and speed." },
  ],
  Shoulders: [
    { id: "s1", name: "Press Mechanics", exercises: 5, duration: "25 min", difficulty: "Beginner", description: "Overhead press form work with dumbbells and barbells." },
    { id: "s2", name: "Lateral Raise Specialist", exercises: 7, duration: "30 min", difficulty: "Intermediate", description: "Cable and dumbbell lateral raises for round delts." },
    { id: "s3", name: "Shoulder Sculpt", exercises: 9, duration: "40 min", difficulty: "Advanced", description: "Full delt development with press, raise, and upright row." },
  ],
};

function DifficultyDots({ level }: { level: keyof typeof difficultyDots }) {
  const dots = difficultyDots[level];
  const colors = { Beginner: "bg-emerald-500", Intermediate: "bg-amber-500", Advanced: "bg-rose-500" };
  return (
    <span className="inline-flex items-center gap-[3px]">
      {dots.map((f, i) => (
        <span key={i} className={`w-[5px] h-[5px] rounded-full ${f ? colors[level] : "bg-zinc-700"}`} />
      ))}
    </span>
  );
}

export const CategotyWorkouts: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const name = categoryName || "Chest";
  const accent = categoryAccent[name] || "#b4fe00";
  const imgSrc = imageMap[name] || imageMap.Chest;
  const workouts = workoutsData[name] || workoutsData.Chest;

  return (
    <div className="min-h-screen bg-[#0d0d0b] text-white font-sans">
      {/* ── Hero Section ── */}
      <div className="relative h-[320px] md:h-[400px] overflow-hidden">
        <img src={imgSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b] via-[#0d0d0b]/50 to-[#0d0d0b]/10" />

        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-10">
          <button
            onClick={() => navigate("/BodyCategories")}
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-[3px] w-10 rounded-full" style={{ backgroundColor: accent }} />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                {workouts.length} Workouts
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-none">
              {name}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        {/* Stats bar */}
        <div
          className={`flex items-center gap-6 pb-8 mb-8 border-b border-zinc-800 transition-all duration-600 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Dumbbell className="w-4 h-4" />
            <span className="font-medium text-white">{workouts.length}</span>
            <span>routines</span>
          </div>
          <div className="w-[3px] h-[3px] rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Clock className="w-4 h-4" />
            <span className="font-medium text-white">
              {Math.round(
                workouts.reduce((sum, w) => sum + parseInt(w.duration), 0) /
                  workouts.length
              )}
            </span>
            <span>min avg</span>
          </div>
          <div className="w-[3px] h-[3px] rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Target className="w-4 h-4" />
            <span className="font-medium text-white">
              {workouts.reduce((sum, w) => sum + w.exercises, 0)}
            </span>
            <span>total exercises</span>
          </div>
        </div>

        {/* Workout list */}
        <div className="space-y-4">
          {workouts.map((workout, index) => (
            <div
              key={workout.id}
              className={`group rounded-xl border border-zinc-800 bg-[#12120f] p-5 md:p-6 transition-all duration-400 ease-out hover:border-zinc-700 hover:bg-[#161612] ${
                mounted ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-white">
                      {workout.name}
                    </h3>
                    <DifficultyDots level={workout.difficulty} />
                  </div>
                  <p className="text-sm text-zinc-500 mb-3 line-clamp-1">
                    {workout.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="font-medium text-zinc-400">{workout.exercises} exercises</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-zinc-700" />
                    <span>{workout.duration}</span>
                  </div>
                </div>

                <button
                  className="flex items-center justify-center w-11 h-11 rounded-xl border shrink-0 transition-all duration-300"
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
                  aria-label={`Start ${workout.name}`}
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategotyWorkouts;
