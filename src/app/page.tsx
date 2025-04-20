'use client';
import { AlertTriangle, BellOff, Shield } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  interface Card {
    id: number;
    count: number;
    items: number[];
  }
  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rotatingTextIndex, setRotatingTextIndex] = useState<number>(0);
  const [cardData, setCardData] = useState<Card[]>([
    { id: 1, count: 10, items: Array.from({ length: 10 }, (_, i) => i) },
    { id: 2, count: 10, items: Array.from({ length: 10 }, (_, i) => i + 10) },
    { id: 3, count: 0, items: [] },
  ]);
  

  const cardNames: { key: string; title: string }[] = [
    { key: 'card1', title: 'Ignored Alerts' },
    { key: 'card2', title: 'Wrongly Closed' },
    { key: 'card3', title: 'Active Threats' },
  ];
  

  const data = [
    { icon: '💡', text: 'Wating analyst time on false +ves' },
    { icon: '🚀', text: 'Launch your project to stars.' },
    { icon: '📈', text: 'Track your growth efficiently.' },
    { icon: '🔒', text: 'Secure your data with us.' },
  ];
  const rotatingMessages = [
    'Wasting analyst time on false +ves',
    'Chasing alert with no real threats',
    'Manual triage is burning hour true',
  ];
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    cardIndex: number,
    itemIndex: number
  ) => {
    console.log(`Dragging item ${itemIndex} from card ${cardIndex}`);
  
    e.dataTransfer.setData('cardIndex', cardIndex.toString());
    e.dataTransfer.setData('itemIndex', itemIndex.toString());
  };
  
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetCardIndex: number
  ) => {
    e.preventDefault();
    const fromCardIndex = parseInt(e.dataTransfer.getData('cardIndex'));
    const itemIndex = parseInt(e.dataTransfer.getData('itemIndex'));
  
    if (fromCardIndex === targetCardIndex) return;
  
    const itemToMove = cardData[fromCardIndex].items[itemIndex];
  
    const updatedCardData = [...cardData];
    updatedCardData[fromCardIndex].items.splice(itemIndex, 1);
    updatedCardData[fromCardIndex].count -= 1;
  
    updatedCardData[targetCardIndex].items.push(itemToMove);
    updatedCardData[targetCardIndex].count += 1;
  
    setCardData(updatedCardData);
  };
  

  useEffect(() => {
    if (cardData[2].count === 3) {
      const counts = cardData.map(card => card.count).join(',');
      setTimeout(() => {
        router.push(`/success?counts=${counts}`);
      }, 500);
    }
  }, [cardData, router]);


  useEffect(() => {
    if (activeIndex === 0) {
      const interval = setInterval(() => {
        setRotatingTextIndex((prevIndex) =>
          (prevIndex + 1) % rotatingMessages.length
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeIndex, rotatingMessages.length]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <section style={styles.section}>
        <div style={styles.leftColumn}>
          {data.map((item, index) => (
            <div key={index} style={styles.iconRow}>
              {activeIndex === index && index === 0 && (
                <div style={{ ...styles.textBox, ...styles.leftBox(index) }}>
                  <span>{rotatingMessages[rotatingTextIndex]}</span>
                  <span style={styles.arrow}>➜</span>
                </div>
              )}
              <div
                style={{
                  ...styles.iconBox,
                  backgroundColor: activeIndex === index ? '#333' : '#fff',
                }}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                {item.icon}
              </div>
              {activeIndex === index && (
                <div style={styles.rectanglesContainer}>
                  <div style={styles.rectangle}></div>
                  <div style={styles.rectangle}></div>
                  <div style={styles.rectangle}></div>
                </div>
              )}


            </div>


          ))}

        </div>

        <div style={styles.textContent}>
          <h2 style={styles.heading}>Without Simbian</h2>
          <h5 style={styles.subheading}>
            If this sounds all too familiar,you might want to...
          </h5>
          <button style={styles.cta}>
            <div style={styles.ctaContent}>
              <span >Book a Demo</span>
              <Image
                src="/logo.simbian.jpg"
                alt="Logo"
                width={20}
                height={20}
                style={styles.logo}
              />            </div>
          </button>
        </div>

      </section>


      <div style={styles.secondPart}>
        <div>
          {data.map((item, index) => (
            <div key={index} style={styles.rectangleBox}>
              <div style={styles.rectangleContent}>
                <div style={styles.iconBoxs}>{item.icon}</div>
                <div style={styles.texts}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.secondPartCards}>
          {cardData.map((card, cardIndex) => (
            <div
              key={card.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, cardIndex)}
              className="bg-[#1D263A] text-white p-4 rounded-xl w-full max-w-md shadow-md overflow-x-hidden"
              style={{
                ...styles.secondPartOne,
                border: cardIndex === 2 && card.count === 3 ? '2px solid red' : 'none',
                color: cardIndex === 2 && card.count === 3 ? 'red' : 'white',
              }}
            >

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <BellOff size={20} />
                  {cardNames[cardIndex]?.title}
                </div>

                <div className="text-3xl font-bold"
                  style={{
                    color: cardIndex === 2 && card.count === 3 ? 'red' : 'blue',
                  }}>{card.count}</div>
              </div>

              <div className="flex overflow-x-hidden">
                {card.items.map((item, itemIndex) => (
                  <div
                    key={item}
                    draggable
                    onDragStart={(e) => handleDragStart(e, cardIndex, itemIndex)}
                    className={`bg-white p-2 rounded-md flex items-center justify-center w-10 h-10 ${itemIndex !== 0 ? '-ml-3' : ''}`}
                  >
                    {item % 2 === 0 ? (
                      <Shield size={20} className="text-black" />
                    ) : (
                      <AlertTriangle size={20} className="text-black" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>

  );
}

const styles: { [key: string]: any } = {
  secondPart: {
    display: 'flex',
    gap: '24rem',
  },
  secondPartCards: {
    marginTop: '-88px',
  },
  secondPartOne: {
    maxWidth: '350px',
    overflowY: 'auto',
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: '#1D263A',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: '18px',
    width: '100%',
  },

  rectangleBox: {
    width: '297px',
    height: '100px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    marginBottom: '18px',
    marginLeft: '140px',
  },

  rectangleContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  iconBoxs: {
    width: '40px',
    height: '40px',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
  },

  texts: {
    fontSize: '1rem',
    color: '#fff',
    paddingLeft: '10px',
  },
  section: {
    display: 'flex',
    padding: '2rem 2rem',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    position: 'relative',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    position: 'relative',
    marginTop: '93px',
    marginLeft: 'auto', // let it naturally align to the right
    marginRight: '2rem', // padding from the edge
  },

  iconRow: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  iconBox: {
    width: '36px',
    height: '36px',
    color: '#fff',
    fontSize: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'background-color 0.3s ease',
  },

  textBox: {
    position: 'absolute',
    left: '-282px',
    top: '215px',
    transform: 'translateY(-50%)',
    backgroundColor: '#fff',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#333',
    minWidth: '200px',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  arrow: {
    fontSize: '1.2rem',
    color: '#1a1a1a',
    backgroundColor: 'transparent',
  },


  textContent: {
    textAlign: 'right',
    marginLeft: 'auto',
    maxWidth: '400px',
    marginTop: '50px',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
  },
  cta: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#fff',
    fontSize: '1rem',
    border: '1px solid #1a1a1a',
    borderRadius: '29px',
    cursor: 'pointer',
  },
  ctaContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'black'
  },
  logo: {
    width: '20px',
    height: '20px',
    objectFit: 'contain',
  },
  // Responsive overrides
  '@media (max-width: 1024px)': {
    section: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    leftColumn: {
      marginLeft: 0,
      marginTop: '2rem',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    textContent: {
      textAlign: 'center',
      maxWidth: '100%',
    },
    secondPart: {
      flexDirection: 'column',
      gap: '2rem',
    },
    rectangleBox: {
      marginLeft: 0,
    },
  },

  // Optional: if you want to dynamically position textbox for each icon
  leftBox: (index: number): React.CSSProperties => ({
    top: `calc(50% + ${index * 92}px)`, // 92 = height + gap between icon rows
  }),
};
