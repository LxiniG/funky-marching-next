import { NextPage } from 'next';
import { useState, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    initialRotation?: { x: number; y: number };
}

const TiltableCard: NextPage<Props> = ({ children, initialRotation = { x: 0, y: 0 } }) => {
    const [rotate, setRotate] = useState(initialRotation);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 3;
        const rotateY = ((x - centerX) / centerX) * -3;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate(initialRotation);
    };

    return (
        <div
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: 'transform 0.1s ease-out',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
};

export default TiltableCard;
