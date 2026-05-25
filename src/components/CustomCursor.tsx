import { useEffect, useRef, useState } from 'react';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const MAGNETIC_RADIUS = 90; // px — how close before magnetic pull activates
const MAGNETIC_STRENGTH = 0.42; // 0–1, how hard it pulls

type CursorState = 'default' | 'hover' | 'click';

const CustomCursor = () => {
  const rawPos = useRef({ x: -200, y: -200 });
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [state, setState] = useState<CursorState>('default');
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef<number>(0);
  const interactivesRef = useRef<Element[]>([]);

  // ── Cache interactive elements (refresh on DOM changes & scroll) ──
  useEffect(() => {
    const refresh = () => {
      interactivesRef.current = Array.from(
        document.querySelectorAll('a, button, [role="button"], input, label, select, textarea')
      );
    };
    refresh();
    const mo = new MutationObserver(refresh);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', refresh, { passive: true });
    return () => {
      mo.disconnect();
      window.removeEventListener('scroll', refresh);
    };
  }, []);

  // ── Track raw mouse position ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => { rawPos.current = { x: e.clientX, y: e.clientY }; };
    const onDown = () => setState('click');
    const onUp = () => setState(s => (s === 'click' ? 'default' : s));
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  // ── Hover state via delegation ──
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, label, select, textarea')) {
        setState(s => (s !== 'click' ? 'hover' : s));
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, label, select, textarea')) {
        setState(s => (s !== 'click' ? 'default' : s));
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  // ── RAF animation loop with magnetic attraction ──
  useEffect(() => {
    let mounted = true;

    const tick = () => {
      // Start from raw mouse position
      let tx = rawPos.current.x;
      let ty = rawPos.current.y;

      // Find nearest interactive element and apply magnetic pull
      let closestDist = Infinity;
      let pull = { dx: 0, dy: 0, strength: 0 };

      interactivesRef.current.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Skip off-screen elements
        if (rect.width === 0 && rect.height === 0) return;

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = rawPos.current.x - cx;
        const dy = rawPos.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNETIC_RADIUS && dist < closestDist) {
          closestDist = dist;
          const t = 1 - dist / MAGNETIC_RADIUS; // 0 at edge, 1 at center
          pull = { dx, dy, strength: t * MAGNETIC_STRENGTH };
        }
      });

      if (pull.strength > 0) {
        tx = rawPos.current.x - pull.dx * pull.strength;
        ty = rawPos.current.y - pull.dy * pull.strength;
      }

      setPos(prev => ({
        x: lerp(prev.x, tx, 0.12),
        y: lerp(prev.y, ty, 0.12),
      }));

      if (mounted) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Hide native cursor ──
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, []);

  const size = state === 'hover' ? 54 : state === 'click' ? 16 : 28;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: '50%',
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: hidden ? 0 : 1,
        transition: [
          'width 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
          'height 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
          'margin 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
          'opacity 0.25s ease',
        ].join(', '),
        willChange: 'transform',
      }}
    />
  );
};

export default CustomCursor;
