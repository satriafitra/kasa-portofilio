import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import wavingHandData from '../../assets/waving-hand.json';

interface LottieWavingHandProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const LottieWavingHand: React.FC<LottieWavingHandProps> = ({
  size = 52,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim: AnimationItem = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: wavingHandData,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: 1,
        transform: 'translateY(-4px)',
        cursor: 'pointer',
        ...style,
      }}
      aria-label="Animasi melambaikan tangan"
    />
  );
};
