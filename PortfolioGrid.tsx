import React, { useEffect, useRef, useState } from 'react';
import { getProjectImageAlt, getProjectImages, type Project, type ProjectImage } from './projects';

type Layout = 'left' | 'trio' | 'right' | 'pair' | 'single';
type CardSize = 'large' | 'small' | 'equal' | 'half' | 'full';

type GridItem = {
  project: Project;
  index: number;
  size: CardSize;
  placement: string;
};

const SIZES: Record<CardSize, string> = {
  large: '(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 66vw',
  small: '(max-width: 767px) 100vw, 33vw',
  equal: '(max-width: 767px) 100vw, 33vw',
  half: '(max-width: 767px) 100vw, 50vw',
  full: '100vw',
};

const FRAME: Record<CardSize, string> = {
  large: 'aspect-[4/5] md:aspect-auto md:h-[240px] lg:h-full',
  small: 'aspect-[4/5] md:aspect-auto md:h-[240px] lg:h-full',
  equal: 'aspect-[4/5] md:aspect-auto md:h-[240px] lg:h-full',
  half: 'aspect-[4/5] md:aspect-auto md:h-[240px] lg:h-[280px]',
  full: 'aspect-[4/5] md:aspect-auto md:h-[240px] lg:h-[280px]',
};

const LAYOUTS: Layout[] = ['left', 'trio', 'right', 'trio'];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const groupProjects = (projects: Project[]): { layout: Layout; items: GridItem[] }[] => {
  const groups: { layout: Layout; items: GridItem[] }[] = [];
  let cursor = 0;
  let pattern = 0;

  while (cursor < projects.length) {
    const remaining = projects.length - cursor;
    if (remaining >= 3) {
      const layout = LAYOUTS[pattern % LAYOUTS.length];
      pattern += 1;
      const slice = projects.slice(cursor, cursor + 3);
      groups.push({
        layout,
        items: slice.map((project, offset) => ({
          project,
          index: cursor + offset,
          size: layout === 'trio' ? 'equal' : offset === 0 ? 'large' : 'small',
          placement: placementFor(layout, offset),
        })),
      });
      cursor += 3;
    } else if (remaining === 2) {
      groups.push({
        layout: 'pair',
        items: projects.slice(cursor, cursor + 2).map((project, offset) => ({
          project,
          index: cursor + offset,
          size: 'half',
          placement: '',
        })),
      });
      cursor += 2;
    } else {
      groups.push({
        layout: 'single',
        items: [{
          project: projects[cursor],
          index: cursor,
          size: 'full',
          placement: '',
        }],
      });
      cursor += 1;
    }
  }

  return groups;
};

const placementFor = (layout: Layout, offset: number): string => {
  if (layout === 'left') {
    if (offset === 0) return 'lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2';
    if (offset === 1) return 'lg:col-start-3 lg:row-start-1';
    return 'lg:col-start-3 lg:row-start-2';
  }
  if (layout === 'right') {
    if (offset === 0) return 'lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2';
    if (offset === 1) return 'lg:col-start-1 lg:row-start-1';
    return 'lg:col-start-1 lg:row-start-2';
  }
  return '';
};

const gridClass = (layout: Layout): string => {
  if (layout === 'left' || layout === 'right') {
    return 'grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:grid-rows-[280px_280px]';
  }
  if (layout === 'trio') {
    return 'grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:grid-rows-[280px]';
  }
  if (layout === 'pair') {
    return 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5';
  }
  return 'grid grid-cols-1';
};

const CoverImage: React.FC<{
  image: ProjectImage;
  alt: string;
  sizes: string;
  eager: boolean;
  objectPosition: string;
  fadeIn?: boolean;
  className?: string;
}> = ({ image, alt, sizes, eager, objectPosition, fadeIn = false, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const markLoaded = () => setLoaded(true);

  return (
    <img
      ref={(node) => {
        if (node?.complete && node.naturalWidth > 0) markLoaded();
      }}
      src={image.src}
      srcSet={image.srcset}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      onLoad={markLoaded}
      style={{ objectPosition, transition: fadeIn ? 'opacity 300ms, transform 500ms' : 'opacity 500ms, transform 500ms' }}
      className={`absolute inset-0 h-full w-full object-cover ${fadeIn ? (loaded ? 'opacity-100' : 'opacity-0') : ''} ${className}`}
    />
  );
};

const frameClass = (size: CardSize, context: 'portfolio' | 'home') =>
  context === 'home' ? FRAME[size].replace('aspect-[4/5]', 'aspect-[4/3]') : FRAME[size];

const PortfolioCard: React.FC<{
  project: Project;
  index: number;
  size: CardSize;
  stagger: number;
  onOpen: (id: string) => void;
  context: 'portfolio' | 'home';
}> = ({ project, index, size, stagger, onOpen, context }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useRef(prefersReducedMotion()).current;
  const [visible, setVisible] = useState(reduceMotion);
  const [previewReady, setPreviewReady] = useState(false);
  const preview = project.gallery[0];
  const photoCount = getProjectImages(project).length;
  const label = String(index + 1).padStart(2, '0');

  useEffect(() => {
    if (reduceMotion) return;
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={frameRef}
      className={`${frameClass(size, context)} transition duration-500 motion-reduce:transition-none ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      style={reduceMotion ? undefined : { transitionDelay: visible ? `${stagger}ms` : '0ms' }}
    >
      <article
        className="group relative h-full overflow-hidden rounded-3xl bg-[#0E2A33] ring-1 ring-white/10 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-[#E2FD48]"
        onMouseEnter={() => {
          if (preview) setPreviewReady(true);
        }}
      >
        <CoverImage
          image={project.mainImg}
          alt={getProjectImageAlt(project, 0)}
          sizes={SIZES[size]}
          eager={context === 'portfolio' && index === 0}
          objectPosition={project.focus ?? 'center'}
          fadeIn
          className="[@media(hover:hover)]:group-hover:scale-[1.04]"
        />
        {previewReady && preview && (
          <CoverImage
            image={preview}
            alt=""
            sizes={SIZES[size]}
            eager={false}
            objectPosition={project.focus ?? 'center'}
            className="opacity-0 [@media(hover:hover)]:group-hover:scale-[1.04] [@media(hover:hover)]:group-hover:opacity-100"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#071318]/90 via-[#071318]/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="pointer-events-none flex items-start justify-between gap-3">
            <span className="text-sm font-bold tabular-nums text-white">{label}</span>
            <span className="flex gap-1 pt-1.5" aria-hidden="true">
              {Array.from({ length: photoCount }, (_, photoIndex) => (
                <span
                  key={photoIndex}
                  className={`h-[3px] w-4 ${photoIndex === 0 ? 'bg-[#E2FD48]' : 'bg-white/40'}`}
                />
              ))}
            </span>
          </div>
          <div className="max-w-[85%] pr-12">
            <p className="pointer-events-none text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E2FD48]">
              {project.tag}
            </p>
            <h3 className="mt-2 text-xl font-extrabold tracking-tighter text-white md:text-2xl">
              <button
                type="button"
                id={`portfolio-card-${project.id}`}
                onClick={() => onOpen(project.id)}
                className="text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2FD48]"
              >
                {project.name}
              </button>
            </h3>
            <p className="pointer-events-none mt-1 text-sm text-white/80">
              {project.city} · {project.year}
            </p>
            <p className="pointer-events-none mt-1 line-clamp-2 text-sm text-white/70">{project.system}</p>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-300 [@media(hover:hover)]:group-hover:border-[#E2FD48] [@media(hover:hover)]:group-hover:bg-[#E2FD48] [@media(hover:hover)]:group-hover:text-[#0E2A33]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </span>
      </article>
    </div>
  );
};

const PortfolioGrid: React.FC<{
  projects: Project[];
  onOpen: (id: string) => void;
  context?: 'portfolio' | 'home';
}> = ({ projects, onOpen, context = 'portfolio' }) => {
  const groups = groupProjects(projects);

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {groups.map((group) => (
        <div key={group.items.map((item) => item.project.id).join('-')} className={gridClass(group.layout)}>
          {group.items.map((item, offset) => (
            <div key={item.project.id} className={`min-w-0 ${item.placement}`}>
              <PortfolioCard
                project={item.project}
                index={item.index}
                size={item.size}
                stagger={Math.min(offset, 2) * 80}
                onOpen={onOpen}
                context={context}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid;
