'use client';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlertTriangle, BellOff, Shield } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function SuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const countsParam = searchParams.get('counts');
    const parsedCounts = countsParam ? countsParam.split(',').map(Number) : [0, 0, 0];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [cardData, setCardData] = useState([
        { id: 1, count: parsedCounts[0], items: Array.from({ length: parsedCounts[0] }, (_, i) => i) },
        { id: 2, count: parsedCounts[1], items: Array.from({ length: parsedCounts[1] }, (_, i) => i + 10) },
        { id: 3, count: parsedCounts[2], items: Array.from({ length: parsedCounts[2] }, (_, i) => i + 20) },
    ]);

    const cardNames = [
        { key: 'card1', title: 'Ignored Alerts' },
        { key: 'card2', title: 'Wrongly Closed' },
        { key: 'card3', title: 'Active Threats' },
    ];

    const data = [
        { icon: '💡', text: 'Wating valuable analyst time on false +ves' },
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
          setTimeout(() => {
            router.push('/success');
          }, 500);
        }
      }, [cardData, router]);
      
    useEffect(() => {
        const interval = setInterval(() => {
            setCardData(prevData => {
                const newData = prevData.map(card => {
                    if (card.items.length > 0) {
                        const updatedItems = [...card.items];
                        updatedItems.pop();
                        return {
                            ...card,
                            items: updatedItems,
                            count: updatedItems.length,
                        };
                    }
                    return card;
                });

                const allCleared = newData.every(card => card.items.length === 0);
                if (allCleared) {
                    clearInterval(interval);
                }

                return newData;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

   

    return (
        <div style={styles.main}>
            <section style={styles.mainSection}>

                <div style={styles.textContent}>
                    <h2 style={styles.heading}>With Simbian</h2>
                    <h5 style={styles.subheading}>
                        Relax.Our AI Agents will take it from here.
                    </h5>
                </div>

                <div style={styles.leftColumn}>
                    {data.map((item, index) => (
                        <div key={index} style={styles.iconRow}>
                            {activeIndex === index && (
                                <div style={styles.rectanglesContainer}>
                                    {[0, 1, 2].map((_, i) => (
                                        <React.Fragment key={i}>
                                            <div style={styles.rectangle}></div>
                                            {i < 1 && (
                                                <FontAwesomeIcon icon={faArrowRight} style={styles.arrowIcon} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                    <div style={styles.rectangle}></div>
                                    <div style={styles.rectangle}></div>
                                    <div style={styles.rectangle}></div>
                                </div>
                            )}

                            {index === 0 && (
                                <div style={styles.textBox}>
                                    {rotatingMessages.map((message, msgIndex) => (
                                        <div key={msgIndex} style={styles.rectangleContainer}>
                                            <div style={styles.rectangle}>
                                                <span style={styles.icon}>💬</span>
                                                <span style={{ fontSize: '12px', color: '#fff' }}>{message}</span>
                                            </div>
                                        </div>
                                    ))}
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



                        </div>


                    ))}

                </div>

            </section>


            <div>

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
                            }}
                        >

                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2 text-lg font-semibold">
                                    <BellOff size={20} />
                                    {cardNames[cardIndex]?.title}
                                </div>

                                <div className="text-3xl font-bold text-blue-400">{card.count}</div>

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
    rectanglesContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        marginTop: '10px',
    },
    mainSection: {
        marginTop: '50px',
    },
    rectangle: {
        backgroundColor: '#0070f3c2',
        padding: '8px 12px',
        borderRadius: '6px',
        minWidth: '180px',
        color: 'white',
        fontSize: '12px',
        marginLeft: '43px',
    },

    main: {
        padding: '0px 49px',
    },

    secondPartOne: {
        maxWidth: '350px',
        overflowY: 'auto',
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: '#52a9ff8a',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: '18px',
    },

    section: {
        display: 'flex',
        padding: '4rem 2rem',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        position: 'relative',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        position: 'relative',
        marginTop: '-86px',
        marginLeft: '570px',
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
        left: '0px',
        transform: 'translateY(-50%)',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        color: '#333',
        minWidth: '200px',
        zIndex: 1,
        top: '194px',
    },

    arrow: {
        fontSize: '1.2rem',
        color: '#ffffff',
        backgroundColor: 'transparent',
        marginLeft: '-20px',

    },


    textContent: {
        textAlign: 'left',
        maxWidth: '400px',
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
        fontSize: '1rem',
        backgroundColor: '#fff',
        color: '#1a1a1a',
        border: '1px solid #1a1a1a',
        borderRadius: '29px',
        cursor: 'pointer',
    },

    // Optional: if you want to dynamically position textbox for each icon
    leftBox: (index: number): React.CSSProperties => ({
        top: `calc(50% + ${index * 92}px)`, // 92 = height + gap between icon rows
    }),
};
