import { useState } from 'react';
import { DropdownMenu } from '../components/DropdownMenu/DropdownMenu';
import { MoreVertical, Share2, Edit, Trash2 } from 'react-feather';
import styles from './App.module.css';

const IconTrigger = () => (
  <button className={styles.iconButton}>
    <MoreVertical size={20} />
  </button>
);

export default function App() {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const handleClick = (item: string) => {
    console.log('Выбран пункт:', item);
    setActiveDropdownId(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <DropdownMenu
          id="left"
          activeDropdownId={activeDropdownId}
          setActiveDropdownId={setActiveDropdownId}
          trigger={<IconTrigger />}
        >
          <div onClick={() => handleClick('Левый пункт 1')}>
            Левый пункт 1
            <Share2 size={16} style={{ marginLeft: 12 }} />
          </div>
          <div onClick={() => handleClick('Левый пункт 2')}>
            Левый пункт 2
            <Edit size={16} style={{ marginLeft: 12 }} />
          </div>
          <div onClick={() => handleClick('Левый пункт 3')}>
            Левый пункт 3
            <Trash2 size={16} style={{ marginLeft: 12 }} />
          </div>
        </DropdownMenu>
      </div>

      <div className={styles.centerRow}>
        <DropdownMenu
          id="center"
          activeDropdownId={activeDropdownId}
          setActiveDropdownId={setActiveDropdownId}
          trigger={<IconTrigger />}
        >
          <div onClick={() => handleClick('Центральный пункт 1')}>
            Центральный пункт 1
            <Share2 size={16} style={{ marginLeft: 12 }} />
          </div>
          <div onClick={() => handleClick('Центральный пункт 2')}>
            Центральный пункт 2
            <Edit size={16} style={{ marginLeft: 12 }} />
          </div>
          <div onClick={() => handleClick('Центральный пункт 3')}>
            Центральный пункт 3
            <Trash2 size={16} style={{ marginLeft: 12 }} />
          </div>
        </DropdownMenu>
      </div>

      <div className={styles.bottomRow}>
        <DropdownMenu
          id="right"
          activeDropdownId={activeDropdownId}
          setActiveDropdownId={setActiveDropdownId}
          trigger={<IconTrigger />}
        >
          <div onClick={() => handleClick('Правый пункт 1')}>
            Правый пункт 1
            <Share2 size={16} style={{ marginLeft: 12 }} />
          </div>
          <div onClick={() => handleClick('Правый пункт 2')}>
            Правый пункт 2
            <Edit size={16} style={{ marginLeft: 12 }} />
          </div>
          <div onClick={() => handleClick('Правый пункт 3')}>
            Правый пункт 3
            <Trash2 size={16} style={{ marginLeft: 12 }} />
          </div>
        </DropdownMenu>
      </div>
    </div>
  );
}
