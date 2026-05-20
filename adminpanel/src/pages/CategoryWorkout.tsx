import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { APIROUTE } from "../utils/APIROUTES";

interface Workout {
  id: string;
  name: string;
  categoryId: string;
  imageUrl: string | null;
  videolink: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
}

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

const EmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
);

function CategoryWorkout() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Workout | null>(null);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [videolink, setVideolink] = useState("");
  const [deleting, setDeleting] = useState<Workout | null>(null);
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [mounted, setMounted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const API_BASE = APIROUTE;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE}/categories/GetAllCategories`)
      .then(({ data }) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const url = filterCategoryId
        ? `${API_BASE}/workouts/GetWorkoutsByCategory/${filterCategoryId}`
        : `${API_BASE}/workouts/GetAllWorkouts`;
      const { data } = await axios.get(url);
      setWorkouts(data);
    } catch (err) {
      console.error("Failed to fetch workouts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [filterCategoryId]);

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || "Unknown";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const openCreate = () => {
    setEditing(null);
    setName("");
    setCategoryId(categories[0]?.id || "");
    setImage(null);
    setPreview(null);
    setVideolink("");
    setModalOpen(true);
  };

  const openEdit = (w: Workout) => {
    setEditing(w);
    setName(w.name);
    setCategoryId(w.categoryId);
    setImage(null);
    setPreview(null);
    setVideolink(w.videolink);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("categoryId", categoryId);
    formData.append("videolink", videolink);
    if (image) formData.append("image", image);

    try {
      if (editing) {
        const { data } = await axios.put(
          `${API_BASE}/workouts/UpdateWorkout/${editing.id}`,
          formData
        );
        if (data.error) {
          alert(data.error);
          return;
        }
      } else {
        const { data } = await axios.post(
          `${API_BASE}/workouts/CreateWorkout`,
          formData
        );
        if (data.error) {
          alert(data.error);
          return;
        }
      }
      setModalOpen(false);
      fetchWorkouts();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        alert(err.response.data.error);
        return;
      }
      console.error("Submit error", err);
      alert("Something went wrong");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      const { data } = await axios.delete(
        `${API_BASE}/workouts/DeleteWorkout/${deleting.id}`
      );
      if (data.error) {
        alert(data.error);
        return;
      }
      setDeleting(null);
      fetchWorkouts();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        alert(err.response.data.error);
        return;
      }
      console.error("Delete error", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0b] text-white">
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#b4fe00]/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
          <div
            className={`transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[3px] w-10 rounded-full bg-[#b4fe00]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
                {loading ? "..." : `${workouts.length} workouts`}
              </span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                  Workouts
                </h1>
                <p className="text-zinc-500 text-sm mt-2">
                  Manage all your workout routines
                </p>
              </div>
              <button
                onClick={openCreate}
                className="inline-flex items-center gap-2 bg-[#b4fe00] text-[#0d0d0b] px-5 py-2.5 rounded-xl font-bold hover:bg-[#a0e800] cursor-pointer transition-all duration-200 active:scale-95"
              >
                <PlusIcon />
                Add Workout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-6 pb-14">
        {/* Category filter */}
        <div className="mb-6">
          <select
            value={filterCategoryId}
            onChange={(e) => setFilterCategoryId(e.target.value)}
            className="bg-[#12120f] border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#b4fe00] focus:border-transparent transition-all w-full max-w-xs cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-[#12120f] overflow-hidden animate-pulse"
                style={{
                  animation: `fade-in-up 0.4s ease-out forwards`,
                  animationDelay: `${i * 80}ms`,
                  opacity: 0,
                }}
              >
                <div className="p-5 space-y-4">
                  <div className="h-5 bg-zinc-800/50 rounded w-3/4" />
                  <div className="h-3 bg-zinc-800/50 rounded w-1/2" />
                  <div className="h-3 bg-zinc-800/50 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : workouts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-zinc-600"
            style={{
              animation: mounted ? "fade-in-up 0.5s ease-out forwards" : "none",
            }}
          >
            <div className="mb-4 text-zinc-700">
              <EmptyIcon />
            </div>
            <p className="text-lg font-medium text-zinc-400">
              No workouts yet
            </p>
            <p className="text-sm mt-1 mb-6">
              {filterCategoryId
                ? "No workouts in this category"
                : "Create your first workout to get started"}
            </p>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 bg-zinc-800 text-zinc-300 px-4 py-2 rounded-lg font-medium hover:bg-zinc-700 cursor-pointer transition-all"
            >
              <PlusIcon />
              Add Workout
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workouts.map((workout, index) => (
              <div
                key={workout.id}
                className="group relative rounded-xl border border-zinc-800 bg-[#12120f] overflow-hidden hover:border-zinc-700 transition-all duration-400"
                style={{
                  animation: mounted
                    ? "fade-in-up 0.4s ease-out forwards"
                    : "none",
                  animationDelay: `${index * 80}ms`,
                  opacity: 0,
                }}
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#b4fe00]/40" />

                {/* Actions overlay on hover */}
                <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <button
                      onClick={() => openEdit(workout)}
                      className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-[#b4fe00] px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-black/80 cursor-pointer transition-all border border-zinc-700/50"
                    >
                      <EditIcon />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleting(workout)}
                      className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-black/80 cursor-pointer transition-all border border-zinc-700/50"
                    >
                      <TrashIcon />
                      Delete
                    </button>
                  </div>

                  {/* Image */}
                  <div className="h-36 overflow-hidden bg-zinc-800/30">
                    {workout.imageUrl ? (
                      <img
                        src={`${API_BASE}/${workout.imageUrl}`}
                        alt={workout.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700">
                        <ImageIcon />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    {/* Workout name */}
                    <h3 className="text-lg font-bold text-white mb-2 pr-20">
                    {workout.name}
                  </h3>

                  {/* Category badge */}
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b4fe00] bg-[#b4fe00]/10 px-2.5 py-1 rounded-md mb-3">
                    {getCategoryName(workout.categoryId)}
                  </span>

                  {/* Video link */}
                  {workout.videolink && (
                    <a
                      href={workout.videolink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-zinc-500 hover:text-[#b4fe00] transition-colors mt-3 group/link"
                    >
                      <VideoIcon />
                      <span className="truncate max-w-[200px]">
                        {workout.videolink}
                      </span>
                    </a>
                  )}
                  </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-zinc-800/50 flex items-center justify-between">
                  <span className="text-xs text-zinc-600">
                    {new Date(workout.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="h-[3px] w-6 rounded-full bg-[#b4fe00]/30" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Create / Edit Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-[#12120f] border border-zinc-800 rounded-2xl w-full max-w-md p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "scale-in 0.2s ease-out" }}
          >
            <h2 className="text-xl font-bold text-white mb-6">
              {editing ? "Edit Workout" : "Add Workout"}
            </h2>

            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0d0d0b] border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#b4fe00] focus:border-transparent transition-all mb-5"
              placeholder="e.g. Push-Up Progression"
              autoFocus
            />

            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-[#0d0d0b] border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#b4fe00] focus:border-transparent transition-all mb-5 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              Image
            </label>
            <div className="mb-5">
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors bg-[#0d0d0b]/50">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : editing?.imageUrl && !image ? (
                  <img
                    src={`${API_BASE}/${editing.imageUrl}`}
                    alt="Current"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-600">
                    <ImageIcon />
                    <span className="text-xs">Click to upload image</span>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              Video Link
            </label>
            <input
              type="text"
              value={videolink}
              onChange={(e) => setVideolink(e.target.value)}
              className="w-full bg-[#0d0d0b] border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#b4fe00] focus:border-transparent transition-all mb-5"
              placeholder="https://www.youtube.com/..."
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl cursor-pointer transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !categoryId}
                className="px-5 py-2.5 bg-[#b4fe00] text-[#0d0d0b] rounded-xl font-bold hover:bg-[#a0e800] disabled:opacity-40 cursor-pointer transition-all active:scale-95"
              >
                {editing ? "Update Workout" : "Create Workout"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deleting && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setDeleting(null)}
        >
          <div
            className="bg-[#12120f] border border-zinc-800 rounded-2xl w-full max-w-sm p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "scale-in 0.2s ease-out" }}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 text-red-500 mb-4 mx-auto">
              <TrashIcon />
            </div>
            <h2 className="text-xl font-bold text-white text-center mb-2">
              Delete Workout
            </h2>
            <p className="text-zinc-400 text-center text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">{deleting.name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleting(null)}
                className="flex-1 px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl cursor-pointer transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 cursor-pointer transition-all active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryWorkout;
