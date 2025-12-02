import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Play, X } from 'lucide-react';

import lionImg from './assets/images/lion.jpg';
import tigerImg from './assets/images/tiger.jpg';
import elephantImg from './assets/images/elephant.jpg';
import rhinoImg from './assets/images/rhino.jpg';
import hippoImg from './assets/images/hippo.jpg';
import sharkImg from './assets/images/shark.jpg';
import whaleImg from './assets/images/whale.jpg';
import polarBearImg from './assets/images/polar-bear.jpg';
import gorillaImg from './assets/images/gorilla.jpg';
import giraffeImg from './assets/images/giraffe.jpg';
import pandaImg from './assets/images/panda.jpg';
import penguinImg from './assets/images/penguin.jpg';

// --- 类型定义 ---
interface Animal {
  id: string;
  name: string;
  englishName: string;
  emoji: string;
  descriptionZh: string;
  descriptionEn: string;
  // 变更：不再使用数组，只使用单一图片地址，确保准确
  imageUrl: string;
  videoSearchQuery: string;
  color: string;
}

// --- 数据配置 ---
const ANIMALS: Animal[] = [
  {
    id: 'lion',
    name: '狮子',
    englishName: 'Lion',
    emoji: '🦁',
    descriptionZh: '我是威风凛凛的草原之王！我有一头金色的长鬃毛，那是我的皇冠。我最喜欢在阳光下睡觉，但当我不开心时，我的吼声能传得很远很远！',
    descriptionEn: 'I am the majestic King of the Grasslands! I have a golden mane that looks like a crown. I love sleeping in the sun, but when I roar, you can hear me from very far away!',
    imageUrl: lionImg,
    videoSearchQuery: 'lion documentary for kids',
    color: '#fcd34d', // Amber
  },
  {
    id: 'tiger',
    name: '老虎',
    englishName: 'Tiger',
    emoji: '🐯',
    descriptionZh: '我是森林里的独行侠。我身上有黑色和橙色的条纹，那是为了在树林里躲猫猫。我不像别的猫咪，我非常喜欢游泳和玩水哦！',
    descriptionEn: 'I am the lonely hero of the forest. My orange and black stripes help me play hide-and-seek in the trees. Unlike other cats, I love swimming and playing in the water!',
    // 用户指定图片
    imageUrl: tigerImg,
    videoSearchQuery: 'tiger swimming zoo',
    color: '#fb923c', // Orange
  },
  {
    id: 'elephant',
    name: '大象',
    englishName: 'Elephant',
    emoji: '🐘',
    descriptionZh: '我是陆地上最大的动物朋友。我有扇子一样的大耳朵，还有长长的鼻子，不仅能闻味道，还能像手一样抓鱼吃，或者喷水洗澡呢！',
    descriptionEn: 'I am the biggest animal friend on land. I have ears like big fans and a long trunk. My trunk can smell things, grab apples to eat, and even spray water for a bath!',
    // 用户指定图片
    imageUrl: elephantImg,
    videoSearchQuery: 'elephant playing with water',
    color: '#a5f3fc', // Cyan
  },
  {
    id: 'rhino',
    name: '犀牛',
    englishName: 'Rhinoceros',
    emoji: '🦏',
    descriptionZh: '我是强壮的犀牛。我的鼻子上长着尖尖的角，就像童话里的独角兽一样！我的皮肤厚厚的像穿了一层盔甲，虽然我看起来笨重，但我跑起来像小火车一样快！',
    descriptionEn: 'I am a strong Rhinoceros. I have a horn on my nose just like a unicorn! My skin is thick like armor. Even though I look heavy, I can run as fast as a little train!',
    // 用户指定图片
    imageUrl: rhinoImg,
    videoSearchQuery: 'rhino running wild',
    color: '#a8a29e', // Stone
  },
  {
    id: 'hippo',
    name: '河马',
    englishName: 'Hippo',
    emoji: '🦛',
    descriptionZh: '我是河马，我的嘴巴超级大，打哈欠的时候能吞下一个大西瓜！我大部分时间都泡在水里避暑，但我其实不会游泳，我是走在河底的哦。',
    descriptionEn: 'I am a Hippo. My mouth is super big; when I yawn, I look like I could swallow a giant watermelon! I spend most of my time in the water to stay cool, but I actually walk on the river bottom instead of swimming.',
    // 用户指定图片
    imageUrl: hippoImg,
    videoSearchQuery: 'hippo swimming zoo',
    color: '#78716c', // Stone Dark
  },
  {
    id: 'shark',
    name: '鲨鱼',
    englishName: 'Shark',
    emoji: '🦈',
    descriptionZh: '我是海洋里的游泳冠军。虽然我是可怕的猎手，但我其实很害羞。我有一身光滑的皮肤，帮助我在蓝色的海浪里游得飞快！',
    descriptionEn: 'I am the swimming champion of the ocean. Although I have sharp teeth, I am actually very gentle. I have smooth skin that helps me swim very fast in the blue waves!',
    imageUrl: sharkImg,
    videoSearchQuery: 'shark swimming underwater',
    color: '#93c5fd', // Blue
  },
  {
    id: 'whale',
    name: '鲸鱼',
    englishName: 'Whale',
    emoji: '🐋',
    descriptionZh: '我是世界上最大的动物，比恐龙还要大！我虽然住在海里，但我像你一样呼吸空气。我会喷出高高的水柱，还会唱好听的歌给大海听。',
    descriptionEn: 'I am the largest animal in the world, even bigger than dinosaurs! I live in the sea, but I breathe air just like you. I can spray water high up and sing beautiful songs to the ocean.',
    imageUrl: whaleImg,
    videoSearchQuery: 'whale breaching ocean',
    color: '#60a5fa', // Blue Dark
  },
  {
    id: 'polar-bear',
    name: '北极熊',
    englishName: 'Polar Bear',
    emoji: '🐻‍❄️',
    descriptionZh: '我是北极熊，住在地球最北边的冰雪世界。虽然我的毛看起来是白色的，其实是透明的哦！我是陆地上最大的吃肉动物，最喜欢在海冰上抓鱼吃。',
    descriptionEn: 'I am a Polar Bear living in the icy world of the North Pole. My fur looks white, but it is actually transparent! I am the largest meat-eater on land, and I love hunting for fish on the sea ice.',
    // 用户指定图片
    imageUrl: polarBearImg,
    videoSearchQuery: 'polar bear playing in snow',
    color: '#bae6fd', // Sky Light
  },
  {
    id: 'gorilla',
    name: '大猩猩',
    englishName: 'Gorilla',
    emoji: '🦍',
    descriptionZh: '我是大猩猩，是森林里最强壮的力士！我有黑色的毛发和宽宽的胸膛。虽然我看起来很凶，但我其实很温柔，最喜欢吃水果和树叶。',
    descriptionEn: 'I am a Gorilla, the strongest Hercules in the forest! I have black fur and a broad chest. Although I look tough, I am actually very gentle and love eating fruits and leaves.',
    // 用户指定图片
    imageUrl: gorillaImg,
    videoSearchQuery: 'gorilla family zoo',
    color: '#525252', // Neutral
  },
  {
    id: 'giraffe',
    name: '长颈鹿',
    englishName: 'Giraffe',
    emoji: '🦒',
    descriptionZh: '我是世界上最高的动物。我的脖子像滑梯一样长，舌头是紫色的！我可以不费力气就吃到最高树枝上最嫩的叶子，那是我最爱的零食。',
    descriptionEn: 'I am the tallest animal in the world. My neck is as long as a slide, and my tongue is purple! I can easily reach the tender leaves on the highest branches, which are my favorite snacks.',
    // 用户指定图片
    imageUrl: giraffeImg,
    videoSearchQuery: 'giraffe eating leaves',
    color: '#fde047', // Yellow
  },
  {
    id: 'panda',
    name: '熊猫',
    englishName: 'Panda',
    emoji: '🐼',
    descriptionZh: '我是中国的国宝。我穿着黑白相间的毛衣，圆滚滚的肚子像个大皮球。我每天要在竹林里吃好多好多竹子，吃饱了就喜欢挂在树上睡觉。',
    descriptionEn: 'I am a national treasure of China. I wear a black and white coat, and my round belly looks like a big ball. I eat lots of bamboo every day, and after eating, I love to sleep in the trees.',
    imageUrl: pandaImg,
    videoSearchQuery: 'giant panda eating bamboo',
    color: '#e2e8f0', // Slate
  },
  {
    id: 'penguin',
    name: '企鹅',
    englishName: 'Penguin',
    emoji: '🐧',
    descriptionZh: '我住在冰天雪地的南极。虽然我是鸟，但我不会飞，走起路来摇摇摆摆。不过一旦跳进水里，我就变成了黑色的小火箭，游得超级快！',
    descriptionEn: 'I live in the icy Antarctica. Although I am a bird, I cannot fly, and I waddle when I walk. But once I jump into the water, I become a little black rocket and swim super fast!',
    // 用户指定图片
    imageUrl: penguinImg,
    videoSearchQuery: 'penguins walking on ice',
    color: '#cbd5e1', // Slate Light
  },
];

// --- 组件部分 ---

const Header = () => (
  <header style={{
    textAlign: 'center',
    padding: '2rem 1rem',
    background: 'linear-gradient(135deg, #84cc16 0%, #22c55e 100%)',
    borderRadius: '0 0 50% 50% / 40px',
    boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
    marginBottom: '2rem',
    color: 'white',
    position: 'relative',
    zIndex: 10
  }}>
    <h1 style={{
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textShadow: '2px 2px 0px rgba(0,0,0,0.1)'
    }}>
      Zoe's Zoo
    </h1>
    <p style={{ marginTop: '0.5rem', fontSize: '1.2rem', opacity: 0.9 }}>
      Tap to see more
    </p>
  </header>
);

// 简化版图片组件：只处理单一图片和错误回退显示Emoji
const SimpleImage = ({ animal, style }: { animal: Animal, style: React.CSSProperties }) => {
  const [hasError, setHasError] = useState(false);

  // 当动物改变时，重置状态
  useEffect(() => {
    setHasError(false);
  }, [animal.id]);

  if (hasError) {
    return (
      <div style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '6rem',
        background: animal.color,
        color: '#fff'
      }}>
        {animal.emoji}
      </div>
    );
  }

  return (
    <img
      src={animal.imageUrl}
      alt={animal.name}
      loading="lazy"
      onError={() => setHasError(true)}
      style={style}
    />
  );
};

const AnimalCard: React.FC<{ animal: Animal; onClick: () => void }> = ({ animal, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        border: `4px solid ${animal.color}`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) translateY(-10px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
    >
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative', backgroundColor: animal.color + '44' }}>
        <SimpleImage
          animal={animal}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          fontSize: '3rem',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        }}>
          {animal.emoji}
        </div>
      </div>
      <div style={{
        padding: '1rem',
        textAlign: 'center',
        background: `linear-gradient(to bottom, white, ${animal.color}22)`
      }}>
        <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '0.2rem' }}>{animal.name}</h2>
        <span style={{ fontSize: '1rem', color: '#666', fontWeight: 600 }}>{animal.englishName}</span>
      </div>
    </div>
  );
};

const AnimalModal = ({ animal, onClose }: { animal: Animal; onClose: () => void }) => {
  if (!animal) return null;

  const openVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = encodeURIComponent(animal.videoSearchQuery);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          width: '100%',
          maxWidth: '900px', // PC上宽一点
          maxHeight: '90vh',
          borderRadius: '32px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column', // 默认垂直排列 (手机)
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        {/* 动画定义 */}
        <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @media (min-width: 768px) {
            .modal-content {
              flex-direction: row !important;
              height: 500px !important;
            }
            .modal-image-container {
              width: 55% !important;
              height: 100% !important;
              display: flex;
              flex-direction: column;
            }
            .modal-details {
              width: 45% !important;
              padding: 3rem !important;
              justify-content: center !important;
            }
          }
        `}</style>

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            zIndex: 20
          }}
        >
          <X size={28} color="#666" />
        </button>

        <div className="modal-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
          {/* 左侧/上方图片区域 */}
          <div className="modal-image-container" style={{ width: '100%', height: '350px', background: animal.color + '33', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            {/* 大图 */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SimpleImage
                animal={animal}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '20px',
                fontSize: '4rem',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }}>
                {animal.emoji}
              </div>
            </div>
          </div>

          {/* 右侧/下方详情 */}
          <div className="modal-details" style={{
            flex: 1,
            padding: '2rem',
            paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            <div>
              <h2 style={{ fontSize: '3rem', color: '#333', lineHeight: 1, marginBottom: '0.5rem' }}>{animal.name}</h2>
              <div style={{ fontSize: '1.5rem', color: '#888', fontWeight: 600 }}>{animal.englishName}</div>
            </div>

            <div style={{ marginTop: '1.5rem', flex: 1 }}>
              <p style={{
                fontSize: '1.3rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1rem',
                fontWeight: 500
              }}>
                {animal.descriptionZh}
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.5,
                color: '#64748b',
                fontStyle: 'italic',
                fontFamily: 'sans-serif'
              }}>
                {animal.descriptionEn}
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
              flexWrap: 'wrap'
            }}>
              {/* 视频按钮 */}
              <button
                onClick={openVideo}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '16px 24px',
                  borderRadius: '20px',
                  border: 'none',
                  background: '#ffedd5',
                  color: '#ea580c',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 0 #fed7aa',
                  transition: 'transform 0.1s'
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(4px)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Play size={24} fill="currentColor" />
                看视频
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  // 禁止背景滚动当 Modal 打开时
  useEffect(() => {
    if (selectedAnimal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAnimal]);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <Header />

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
        }}>
          {ANIMALS.map(animal => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onClick={() => setSelectedAnimal(animal)}
            />
          ))}
        </div>
      </main>

      {/* 底部装饰 */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        marginTop: '2rem',
        color: '#94a3b8',
        fontSize: '0.9rem'
      }}>
        <p>🐾 A wonderful zoo for Zoe 🐾</p>
      </footer>

      {selectedAnimal && (
        <AnimalModal
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);