import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import maleDeveloperData from '../../assets/male-developer.json';

interface LottieMaleAvatarProps {
  className?: string;
  style?: React.CSSProperties;
}

export const LottieMaleAvatar: React.FC<LottieMaleAvatarProps> = ({
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
      animationData: maleDeveloperData,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      aria-label="Animasi avatar male developer"
    />
  );
};
