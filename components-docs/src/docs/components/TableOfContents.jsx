import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';

export default function TableOfContents() {
  const location = useLocation();
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const content = document.getElementById('doc-content');
      if (!content) return;
      const els = content.querySelectorAll('h2[id], h3[id]');
      setHeadings(Array.from(els).map((el) => ({ id: el.id, text: el.textContent, level: el.tagName === 'H2' ? 2 : 3 })));
    };
    update();
    const timer = setTimeout(update, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (headings.length === 0) return;
    observerRef.current?.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <Box
      sx={{
        width: 180,
        position: 'sticky',
        top: 80,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        pl: 2,
        borderLeft: 1,
        borderColor: 'divider',
        display: { xs: 'none', lg: 'block' },
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
        目录
      </Typography>
      {headings.map((h) => (
        <Typography
          key={h.id}
          variant="caption"
          component="a"
          href={`#${h.id}`}
          sx={{
            display: 'block',
            py: 0.4,
            pl: h.level === 3 ? 1.5 : 0,
            color: activeId === h.id ? 'primary.main' : 'text.secondary',
            fontWeight: activeId === h.id ? 600 : 400,
            textDecoration: 'none',
            fontSize: '0.75rem',
            lineHeight: 1.6,
            '&:hover': { color: 'primary.main' },
          }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {h.text}
        </Typography>
      ))}
    </Box>
  );
}
