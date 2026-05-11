import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, BookOpen, Code, Award, ChevronRight, ChevronDown, Binary, Cloud, ShieldCheck, Terminal, Cpu, Database, Layout, Settings } from "lucide-react";
import { loadContent } from "./lib/contentLoader";
import { PORTFOLIO_DATA } from "./constants";

const TechnicalHeader = ({ title, icon: Icon }: { title: string; icon?: any }) => (
  <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
    {Icon && <Icon size={14} className="text-sky-500/70" />}
    <h3 className="text-sky-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
      {title}
    </h3>
  </div>
);

const MetadataBlock = ({ label, value, href, align = "left" }: { label: string; value: string; href?: string; align?: "left" | "right" | "center" }) => {
  const alignmentClass = align === "right" ? "text-right border-r pr-4" : align === "center" ? "text-center" : "text-left border-l pl-4";
  return (
    <div className={`py-1 ${alignmentClass} border-slate-800 transition-all duration-300 hover:border-sky-500/50 group`}>
      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-sky-400 transition-colors uppercase">{label}</p>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-slate-200 hover:text-white transition-colors">
          {value}
        </a>
      ) : (
        <p className="text-xs font-mono text-slate-200">{value}</p>
      )}
    </div>
  );
};

const SkillRequirement = ({ label, value, percentage, index }: { label: string; value: string; percentage: string; index?: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: (index || 0) * 0.1 }}
    className="group cursor-default"
  >
    <div className="flex justify-between items-end mb-1">
      <p className="technical-label !tracking-tighter">{label}</p>
      <span className="text-[10px] font-mono text-slate-600 group-hover:text-sky-500 transition-colors uppercase tracking-widest">{percentage}</span>
    </div>
    <p className="text-sm text-slate-200 font-medium group-hover:text-white transition-colors">{value}</p>
    <div className="accent-bar bg-slate-800/50 rounded-full h-1 mt-1.5 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: percentage }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: (index || 0) * 0.1 + 0.3 }}
        className="accent-fill h-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.4)]" 
      />
    </div>
  </motion.div>
);

const ExperienceNode = ({ item, isFirst }: { item: any; isFirst: boolean }) => {
  const [isOpen, setIsOpen] = useState(isFirst);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative pl-6 border-l-2 ${isFirst ? 'border-sky-500/30' : 'border-slate-800'} pb-6 last:pb-2 group`}
    >
      <div className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 border-slate-950 transition-all duration-500 ${isFirst ? 'bg-sky-500 ring-4 ring-sky-500/10' : 'bg-slate-700 group-hover:bg-sky-500/50'}`} />
      
      <div 
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-base font-bold transition-colors ${isFirst ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{item.role}</h4>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-slate-500 group-hover:text-sky-500"
            >
              <ChevronDown size={14} />
            </motion.div>
          </div>
          <span className="text-[10px] font-mono text-slate-500 shrink-0 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{item.period}</span>
        </div>
        <p className={`text-[11px] font-mono ${isFirst ? 'text-sky-400 font-bold' : 'text-slate-500'} mb-2 uppercase tracking-wider`}>{item.company}</p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            <div className="markdown-body text-xs text-slate-400 leading-relaxed pt-2 group-hover:text-slate-300 transition-colors">
              <ReactMarkdown
                components={{
                  ul: ({ children }) => <ul className="space-y-2">{children}</ul>,
                  li: ({ children }) => (
                    <li className="flex gap-2.5">
                      <span className="text-sky-500/40 mt-1.5 shrink-0 text-[8px]">▶</span>
                      <span>{children}</span>
                    </li>
                  )
                }}
              >
                {item.body}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProjectGridItem = ({ project }: { project: any; key?: any }) => (
  <motion.a 
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -4, scale: 1.02 }}
    className="group cursor-pointer p-5 bg-slate-900/40 border border-slate-800/50 hover:border-sky-500/30 hover:bg-slate-800/60 rounded-xl transition-all block"
  >
    <div className="flex justify-between items-center mb-3">
      <div className="flex gap-1.5">
        {project.tags.slice(0, 2).map((tag: string) => (
          <span key={tag} className="text-[9px] font-mono text-sky-400/80 border border-sky-500/20 px-1.5 py-0.5 rounded uppercase tracking-tighter">
            {tag}
          </span>
        ))}
      </div>
      <ExternalLink size={12} className="text-slate-600 group-hover:text-sky-400 transition-colors" />
    </div>
    <h5 className="text-sm font-bold group-hover:text-sky-400 transition-colors mb-2 leading-tight">{project.title}</h5>
    <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed mb-4 group-hover:text-slate-400 transition-colors">
      {project.description}
    </p>
    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 group-hover:text-sky-500 transition-colors">
      SYSTEM SPECS <ChevronRight size={10} />
    </div>
  </motion.a>
);

const CertificationItem = ({ cert }: { cert: any }) => (
  <div className="group flex items-start gap-3 p-2 rounded-lg border border-transparent hover:border-slate-800 hover:bg-slate-800/30 transition-all">
    <div className="mt-1 p-1.5 bg-sky-500/10 rounded flex items-center justify-center text-sky-500">
      <Award size={12} />
    </div>
    <div>
      <p className="text-[11px] font-bold text-slate-200 group-hover:text-sky-400 transition-colors leading-tight">
        {cert.title}
      </p>
      <div className="flex justify-between items-center mt-0.5">
        <p className="text-[9px] font-mono text-slate-500 uppercase">{cert.issuer}</p>
        <p className="text-[9px] font-mono text-sky-600 font-bold">{cert.date}</p>
      </div>
    </div>
  </div>
);

const OSSContributionItem = ({ oss }: { oss: any }) => (
  <div className="group p-3 border border-transparent hover:border-slate-800 hover:bg-slate-800/40 rounded-xl transition-all cursor-pointer">
    <div className="flex justify-between items-center mb-1">
      <h4 className="text-[11px] font-bold text-slate-200 group-hover:text-sky-400 transition-colors uppercase tracking-tight">{oss.name}</h4>
      <div className="flex items-center gap-1 text-[9px] font-mono text-sky-500 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded">
        ★ {oss.stars}
      </div>
    </div>
    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed italic">{oss.description}</p>
  </div>
);

export default function App() {
  const [data, setData] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  useEffect(() => {
    loadContent().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
          <p className="text-sky-500 font-mono text-xs animate-pulse tracking-widest">INITIALIZING ARCHITECTURE...</p>
        </div>
      </div>
    );
  }

  const categories = data.competencies ? [
    { id: 'ai', name: 'AI & GenAI', icon: Binary, skills: data.competencies[0]?.skills || [] },
    { id: 'cloud', name: 'Cloud & Infra', icon: Cloud, skills: data.competencies[1]?.skills || [] },
    { id: 'eng', name: 'Engineering', icon: Terminal, skills: data.competencies[2]?.skills || [] },
    { id: 'devops', name: 'DevOps & SRE', icon: ShieldCheck, skills: data.competencies[3]?.skills || [] },
  ] : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 md:p-8 lg:p-12 gap-8 max-w-[1500px] mx-auto selection:bg-sky-500/30 font-sans">
      
      {/* Header Section: Professional Polish Style */}
      <header className="flex flex-col border-b border-slate-800 pb-12 gap-10 pt-8">
        {/* Row 1: Profile & Name */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 w-full px-2">
          {/* Profile Image with Ring and Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group w-32 h-32 md:w-40 md:h-40 xl:w-48 xl:h-48"
          >
            <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative w-full h-full rounded-2xl md:rounded-3xl border-2 border-slate-800 p-2 bg-slate-900 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400" 
                alt={data.name}
                className="w-full h-full object-cover rounded-xl md:rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Status Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-800 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-2xl z-20 whitespace-nowrap">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">In-Transit: Pune_Zone</span>
            </div>
          </motion.div>

          {/* Name Section - Right Aligned */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-end text-center md:text-right"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white capitalize italic leading-none">
              {data.name}
            </h1>
            <div className="h-px w-24 bg-sky-500/30 mt-4 hidden md:block" />
          </motion.div>
        </div>

        {/* Row 2: Title & Summary */}
        <div className="flex flex-col items-center md:items-start px-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3">
               <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-sky-500/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
               </div>
               <p className="text-sky-400 font-mono text-sm md:text-base tracking-[0.2em] uppercase font-bold">
                 {data.title}
               </p>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 border border-slate-800 px-6 py-2.5 rounded-full hover:border-sky-500/50 transition-all duration-300 bg-slate-900/50 hover:bg-sky-500/10">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.2em] group-hover:text-sky-400 transition-colors">Executive Summary</span>
                  <motion.div
                    animate={{ rotate: isSummaryOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-600 group-hover:text-sky-500"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {isSummaryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-8 max-w-4xl">
                      <div className="markdown-body text-slate-400 text-sm leading-relaxed italic border-l-2 border-sky-500/30 pl-8 py-3 text-left">
                        <ReactMarkdown>
                          {data.body}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Row 3: Global Metadata Rails */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-between items-center gap-x-8 gap-y-6 w-full pt-6 border-t border-slate-900 px-2"
        >
          <div className="text-left group">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-sky-400">LOC_STATION</p>
            <p className="text-xs font-mono text-slate-200 mt-1">{data.location}</p>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12">
            <MetadataBlock label="LINKEDIN" value="/satishmarathe" href={data.linkedin} align="center" />
            <MetadataBlock label="GITHUB" value="@smaratheengg" href={data.github} align="center" />
            <MetadataBlock label="EMAIL" value={data.email} href={`mailto:${data.email}`} align="center" />
          </div>
        </motion.div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 h-full min-h-0">
        
        {/* Left Column (3) */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <section className="dashboard-card p-6 flex flex-col h-full overflow-hidden">
            <TechnicalHeader title="Functional Competencies" icon={Layout} />
            <div className="space-y-6 mb-8">
              <SkillRequirement label="AGENTIC ARCHITECTURE" value="LangGraph, RAG, Tool-Calling" percentage="95%" index={0} />
              <SkillRequirement label="MICRO-SERVICE MESH" value="AKS, Kubernetes, Helm" percentage="92%" index={1} />
              <SkillRequirement label="REAL-TIME PIPELINES" value="Kafka, Event-Driven, gRPC" percentage="90%" index={2} />
              <SkillRequirement label="TECHNICAL LEADERSHIP" value="Mentorship, ADR, Strategy" percentage="88%" index={3} />
            </div>
            
            <div className="mt-auto">
              <TechnicalHeader title="Integrated Stack" icon={Settings} />
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-[11px] font-mono font-bold uppercase tracking-tighter ${activeCategory === cat.id ? 'bg-sky-500 border-sky-400 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    <cat.icon size={12} /> {cat.id}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {activeCategory && (
                  <motion.div 
                    key={activeCategory}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-1.5"
                  >
                    {categories.find(c => c.id === activeCategory)?.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-sky-500/10 text-sky-400 text-[10px] font-mono rounded border border-sky-500/20">
                        {skill}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800 overflow-hidden">
              <TechnicalHeader title="Verified Credentials" icon={ShieldCheck} />
              <div className="space-y-1 overflow-y-auto max-h-[300px] scrollbar-hide">
                {data.certifications.map((cert: any, idx: number) => (
                  <CertificationItem key={idx} cert={cert} />
                ))}
              </div>
            </div>
          </section>
        </aside>

        {/* Center Column (6) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <section className="dashboard-card p-0 flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
              <TechnicalHeader title="Strategic Career Trajectory" icon={Database} />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">NODES ACTIVATED: 03</span>
            </div>
            <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
              <div className="space-y-2">
                {data.experience.map((item, idx) => (
                  <ExperienceNode key={idx} item={item} isFirst={idx === 0} />
                ))}
              </div>
            </div>
          </section>

          <section className="bg-sky-500 h-32 lg:h-24 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-2xl shadow-sky-950/30 group relative overflow-hidden shrink-0">
            <div className="absolute -right-8 -top-8 text-slate-950/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
               <Cpu size={160} />
            </div>
            <div className="text-slate-950 relative z-10 sm:max-w-[70%]">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Architectural Focus 2026</p>
              <h2 className="text-xl md:text-2xl font-black italic tracking-tight">Enterprise GenAI & MCP Orchestration</h2>
            </div>
            <div className="flex items-center gap-4 mt-3 sm:mt-0 relative z-10 shrink-0">
               <div className="text-right hidden md:block text-slate-950">
                  <p className="text-[9px] font-mono font-black opacity-60 uppercase">System Status</p>
                  <p className="text-[11px] font-mono font-bold">PROTOTYPING AGENTS</p>
               </div>
               <div className="h-10 w-10 border-4 border-slate-950/30 rounded-full border-t-slate-950 animate-spin"></div>
            </div>
          </section>
        </div>

        {/* Right Column (3) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <section className="dashboard-card p-6 h-[38%] flex flex-col translate-z-0">
            <TechnicalHeader title="High-Scale Implementation" icon={Code} />
            <div className="space-y-4 overflow-y-auto pr-2 scrollbar-hide py-1">
              {data.projects.map((project: any, idx: number) => (
                <ProjectGridItem key={idx} project={project} />
              ))}
            </div>
          </section>

          <section className="dashboard-card p-6 h-[28%] flex flex-col translate-z-0">
            <TechnicalHeader title="Open Source Contributions" icon={Github} />
            <div className="space-y-2 overflow-y-auto scrollbar-hide pr-1">
              {data.openSource.map((oss: any, idx: number) => (
                <OSSContributionItem key={idx} oss={oss} />
              ))}
            </div>
          </section>

          <section className="dashboard-card p-6 flex-1 flex flex-col overflow-hidden translate-z-0">
            <TechnicalHeader title="Architecture Logs" icon={BookOpen} />
            <div className="space-y-2 flex-1">
              {data.blogs.map((blog: any, idx: number) => (
                <a 
                  key={idx} 
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 border border-transparent hover:border-slate-800 hover:bg-slate-800/40 rounded-xl transition-all cursor-pointer block"
                >
                  <div className="flex justify-between items-center mb-1.5 font-mono text-[9px]">
                    <span className="text-sky-500/70 font-bold">{blog.date.toUpperCase()}</span>
                    <span className="text-slate-600 group-hover:text-slate-400">02 MIN READ</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-1 mb-1 italic uppercase">{blog.title}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed italic pr-4">{blog.excerpt}</p>
                  <div className="mt-2 text-[9px] font-bold text-sky-500 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1">
                    READ LOG <ChevronRight size={10} />
                  </div>
                </a>
              ))}
            </div>
            <div className="pt-4 mt-auto border-t border-slate-800 flex justify-between items-center">
               <span className="text-[10px] font-mono font-bold text-slate-700">AUTH: MARATHE</span>
               <div className="flex gap-1.5">
                  <div className="w-1 h-1 bg-sky-500/50 rounded-full" />
                  <div className="w-1 h-1 bg-sky-500/50 rounded-full" />
                  <div className="w-1 h-1 bg-sky-500 rounded-full" />
               </div>
            </div>
          </section>
        </div>

      </main>

      {/* Navigation & Status Bar */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-800 pt-8 mt-4 text-[10px] font-mono font-medium text-slate-500 tracking-tighter">
        <div className="flex flex-wrap items-center justify-center gap-8 uppercase">
          <span className="text-slate-400 font-bold tracking-widest italic group cursor-default">
            © {new Date().getFullYear()} <span className="group-hover:text-sky-400 transition-colors">S-MARATHE</span>
          </span>
          <span className="hidden sm:inline border-l border-slate-800 h-4" />
          <span className="flex items-center gap-2 group cursor-pointer hover:text-slate-300 transition-colors">
            <MapPin size={10} className="text-sky-500" /> PUNE_ZONE:020
          </span>
          <span className="hidden sm:inline border-l border-slate-800 h-4" />
          <span className="flex items-center gap-2 group cursor-pointer hover:text-slate-300 transition-colors uppercase">
             UPTIME: 21_YEARS.9
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full group transition-all">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:animate-ping" />
            <span className="uppercase text-slate-400 group-hover:text-emerald-400 transition-colors">CORE_ENGINE: OPTIMAL</span>
          </div>
          <div className="flex gap-4">
            <a href={data.linkedin} className="hover:text-sky-400 transition-colors flex items-center gap-1">
              [SYSTEM_PDF] <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
