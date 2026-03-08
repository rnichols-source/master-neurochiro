import { 
  GraduationCap, 
  Play, 
  FileText, 
  ChevronRight, 
  Search, 
  Filter, 
  Clock, 
  BookOpen, 
  Award,
  ArrowRight,
  BarChart3,
  Video
} from "lucide-react";
import Link from "next/link";

export default function AcademyPage() {
  const learningPaths = [
    { title: "Clinical Excellence", progress: 65, courses: 8, icon: "🎯" },
    { title: "Business & Practice", progress: 20, courses: 5, icon: "📈" },
    { title: "Neuro-Pediatrics", progress: 0, courses: 6, icon: "👶" },
  ];

  const recentCourses = [
    { title: "Advanced Neural Mapping", category: "Clinical", type: "Video Course", duration: "4.5 hours", progress: 45 },
    { title: "The Philosophy of NeuroChiro", category: "Foundations", type: "Reading", duration: "1 hour", progress: 100 },
    { title: "Heart Rate Variability Mastery", category: "Clinical", type: "Video Course", duration: "3 hours", progress: 12 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-6 h-6 text-neuro-orange" />
            <span className="text-sm font-bold uppercase tracking-widest text-neuro-navy">NeuroChiro Academy</span>
          </div>
          <h1 className="text-4xl font-heading font-black text-neuro-navy">Your Learning Library.</h1>
          <p className="text-neuro-gray mt-2 text-lg">Full access to clinical protocols, research, and business mastery.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
             <BarChart3 className="w-5 h-5 text-neuro-orange" />
             <div>
               <p className="text-[10px] font-black text-gray-400 uppercase">Learning Hours</p>
               <p className="text-sm font-bold text-neuro-navy">24.5 Total</p>
             </div>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
             <Award className="w-5 h-5 text-green-600" />
             <div>
               <p className="text-[10px] font-black text-gray-400 uppercase">Certifications</p>
               <p className="text-sm font-bold text-neuro-navy">3 Earned</p>
             </div>
          </div>
        </div>
      </header>

      {/* Continue Learning Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-neuro-navy">Continue Learning</h2>
          <Link href="#" className="text-sm font-bold text-neuro-orange hover:underline">View All Courses</Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-neuro-navy rounded-[2rem] p-8 text-white relative overflow-hidden group cursor-pointer shadow-xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-neuro-orange/10 blur-[100px] -mr-32 -mt-32"></div>
             <div className="relative z-10">
               <span className="px-3 py-1 bg-neuro-orange text-white text-[10px] font-black rounded-full uppercase tracking-widest">In Progress</span>
               <h3 className="text-2xl font-bold mt-4 mb-2">Advanced Neural Mapping: Part 3</h3>
               <p className="text-gray-400 text-sm mb-8 max-w-md">Interpretation of cervical scans and their clinical correlation to vagal tone.</p>
               <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-neuro-navy font-black rounded-xl hover:bg-neuro-orange hover:text-white transition-all">
                    <Play className="w-4 h-4 fill-current" /> Resume Lesson
                  </button>
                  <div className="flex-1">
                     <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-1">
                       <span>Progress</span>
                       <span>45%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-neuro-orange" style={{ width: '45%' }}></div>
                     </div>
                  </div>
               </div>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {learningPaths.map((path, i) => (
               <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                  <div className="text-3xl mb-4">{path.icon}</div>
                  <h4 className="font-bold text-neuro-navy group-hover:text-neuro-orange transition-colors">{path.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{path.courses} Courses</p>
                  <div className="mt-6">
                    <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden">
                      <div className="h-full bg-neuro-orange" style={{ width: `${path.progress}%` }}></div>
                    </div>
                  </div>
               </div>
             ))}
             <div className="bg-gray-50 p-6 rounded-[2rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-neuro-orange transition-all">
                <BookOpen className="w-6 h-6 text-gray-400 mb-2 group-hover:text-neuro-orange" />
                <p className="text-xs font-bold text-gray-400 group-hover:text-neuro-navy">Explore All Paths</p>
             </div>
          </div>
        </div>
      </section>

      {/* Filtered Library */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search library, masterminds, or research..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:outline-none shadow-sm"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1">
            {["All", "Clinical", "Business", "Pediatrics", "Masterminds", "Research"].map((cat) => (
              <button key={cat} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${cat === 'All' ? 'bg-neuro-navy text-white' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {recentCourses.map((course, i) => (
             <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-xl transition-all flex flex-col">
                <div className="aspect-video bg-gray-100 relative group-hover:scale-105 transition-transform duration-500">
                   <div className="absolute inset-0 bg-neuro-navy/10 group-hover:bg-neuro-navy/0 transition-colors"></div>
                   <div className="absolute top-4 left-4">
                     <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-neuro-navy text-[9px] font-black rounded uppercase tracking-widest">{course.category}</span>
                   </div>
                   {course.progress === 100 && (
                     <div className="absolute top-4 right-4">
                       <Award className="w-6 h-6 text-green-500 drop-shadow-md" />
                     </div>
                   )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                   <h4 className="font-bold text-neuro-navy text-lg group-hover:text-neuro-orange transition-colors mb-2">{course.title}</h4>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                        <Video className="w-3 h-3" /> {course.type}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                        <Clock className="w-3 h-3" /> {course.duration}
                      </div>
                   </div>
                   <div className="mt-auto">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress</span>
                        <span className="text-xs font-black text-neuro-navy">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                        <div className={`h-full ${course.progress === 100 ? 'bg-green-500' : 'bg-neuro-orange'}`} style={{ width: `${course.progress}%` }}></div>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Seminar Recordings / Masterminds */}
      <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-heading font-bold text-neuro-navy">Seminar Recordings</h2>
           <button className="flex items-center gap-2 text-sm font-bold text-neuro-orange hover:underline">
             View Library <ArrowRight className="w-4 h-4" />
           </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { title: "Neuro-Scanning Masterclass (Dallas '25)", date: "March 12, 2025", duration: "12 hours total" },
             { title: "Clinical Neurology & HRV Integration", date: "Jan 05, 2026", duration: "8 hours total" }
           ].map((recording, i) => (
             <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-all cursor-pointer group">
                <div className="w-16 h-16 rounded-xl bg-neuro-navy flex items-center justify-center text-white shrink-0 group-hover:bg-neuro-orange transition-colors">
                   <Video className="w-8 h-8" />
                </div>
                <div>
                   <h4 className="font-bold text-neuro-navy text-sm group-hover:text-neuro-orange transition-colors">{recording.title}</h4>
                   <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-widest">{recording.date} • {recording.duration}</p>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
