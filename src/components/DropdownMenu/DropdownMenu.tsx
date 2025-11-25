import { useState, useRef, useEffect, useLayoutEffect, type ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { MoreVertical } from 'react-feather';
import styles from './DropdownMenu.module.css';

type DropdownMenuProps = {
  id: string;
  children: ReactNode;
  trigger?: ReactNode;
  activeDropdownId: string | null;
  setActiveDropdownId: (id: string | null) => void;
};

export const DropdownMenu = ({
  id,
  children,
  activeDropdownId,
  setActiveDropdownId,
}: DropdownMenuProps) => {
  const isOpen = activeDropdownId === id;

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const [wasOpenBeforeHide, setWasOpenBeforeHide] = useState(false);

  const toggleMenu = () => {
    if (isOpen) setActiveDropdownId(null);
    else {
      setCoords(null);
      setActiveDropdownId(id);
    }
  };

  const updatePosition = () => {
    if (!triggerRef.current || !menuRef.current) return;

    const t = triggerRef.current.getBoundingClientRect();
    const m = menuRef.current.getBoundingClientRect();

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const top =
      viewportHeight - t.bottom >= m.height
        ? t.bottom
        : t.top >= m.height
        ? t.top - m.height
        : Math.max(0, viewportHeight - m.height);

    const left =
      viewportWidth - t.left >= m.width
        ? t.left
        : t.right >= m.width
        ? t.right - m.width
        : Math.max(0, viewportWidth - m.width);

    requestAnimationFrame(() => setCoords({ top, left }));
  };

  useLayoutEffect(() => {
    if (!isOpen) return;

    const onScrollOrResize = () => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const inViewport =
        rect.bottom >= 0 &&
        rect.top <= window.innerHeight &&
        rect.right >= 0 &&
        rect.left <= window.innerWidth;

      if (!inViewport) {
        setActiveDropdownId(null);
        return;
      }

      updatePosition();
    };

    updatePosition();

    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isOpen, setActiveDropdownId]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setActiveDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setActiveDropdownId]);

  useEffect(() => {
    if (!triggerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          if (wasOpenBeforeHide) {
            setActiveDropdownId(id);
            setWasOpenBeforeHide(false);
          }
        } else {
          if (activeDropdownId === id) {
            setWasOpenBeforeHide(true);
            setActiveDropdownId(null);
          }
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [activeDropdownId, id, setActiveDropdownId, wasOpenBeforeHide]);

  return (
    <div className={styles.container} ref={triggerRef}>
      <div onClick={toggleMenu} className={styles.trigger}>
        <MoreVertical size={20} />
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={menuRef}
            className={styles.menu}
            style={{
              position: 'fixed',
              top: coords?.top ?? 0,
              left: coords?.left ?? 0,
              visibility: coords ? 'visible' : 'hidden',
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
};
