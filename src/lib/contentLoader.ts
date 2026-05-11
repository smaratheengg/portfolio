/// <reference types="vite/client" />
import matter from 'gray-matter';

export async function loadContent() {
  const profileModules = import.meta.glob('/src/content/profile.md', { query: '?raw', eager: true });
  const experienceModules = import.meta.glob('/src/content/experience/*.md', { query: '?raw', eager: true });
  const projectModules = import.meta.glob('/src/content/projects/*.md', { query: '?raw', eager: true });
  const blogModules = import.meta.glob('/src/content/blogs/*.md', { query: '?raw', eager: true });
  const certificationModules = import.meta.glob('/src/content/certifications/*.md', { query: '?raw', eager: true });
  const openSourceModules = import.meta.glob('/src/content/open-source/*.md', { query: '?raw', eager: true });
  const competencyModules = import.meta.glob('/src/content/competencies.md', { query: '?raw', eager: true });

  const parse = (module: any) => {
    const content = typeof module === 'string' ? module : module.default;
    if (typeof content !== 'string') return { body: '' };
    const { data, content: body } = matter(content);
    return { ...data, body };
  };

  const profileKey = Object.keys(profileModules)[0];
  const profile = profileKey ? parse(profileModules[profileKey]) : {};

  const mapModules = (modules: Record<string, any>) => {
    return Object.entries(modules)
      .map(([path, mod]) => ({ path, ...parse(mod) }))
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  };

  const experience = mapModules(experienceModules);
  const projects = mapModules(projectModules);
  const blogs = mapModules(blogModules);
  const certifications = mapModules(certificationModules);
  const openSource = mapModules(openSourceModules);

  // Competencies parsing
  const compKey = Object.keys(competencyModules)[0];
  const compData = compKey ? parse(competencyModules[compKey]) : {};
  // Filter out the 'body' property which is added by our parse helper
  const competencies = Object.entries(compData).filter(([k]) => k !== 'body').map(([category, skills]) => ({
    category,
    skills: skills as string[]
  }));

  return {
    ...profile,
    experience,
    projects,
    blogs,
    certifications,
    openSource,
    competencies
  };
}
