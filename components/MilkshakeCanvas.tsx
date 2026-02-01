"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion, MotionValue } from "framer-motion";

const FRAME_COUNT = 192;

export default function MilkshakeCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Load images reference for canvas access (assuming LoadingScreen already cached them)
    useEffect(() => {
        const imgs: HTMLImageElement[] = [];
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `/sequence/${i.toString().padStart(3, "0")}.jpg`;
            imgs.push(img);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setImages(imgs);
    }, []);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];
        const { width, height } = canvas;

        // "Cover" fit logic
        // Default to 16:9 if natural dimensions are missing or 0
        const iWidth = img.naturalWidth || 1920;
        const iHeight = img.naturalHeight || 1080;
        const iRatio = iWidth / iHeight;
        const canvasRatio = width / height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > iRatio) {
            drawWidth = width;
            drawHeight = width / iRatio;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        } else {
            drawHeight = height;
            drawWidth = height * iRatio;
            offsetX = (width - drawWidth) / 2;
            offsetY = 0;
        }

        // Fix: Mobile centering adjustment
        // User reported glass is slightly left, so we move it right.
        const isMobile = width < 768; // Standard mobile breakpoint
        if (isMobile) {
            offsetX += 45; // Shift right by 45px on mobile
        }

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, width, height); // Background fill

        if (img.complete) {
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            // Fallback for placeholders/issues
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, width, height);
        }
    }, [images]);

    // Force initial render when images are ready
    useEffect(() => {
        if (images.length > 0) {
            // Small timeout to ensure canvas is ready and images are decoded
            requestAnimationFrame(() => renderFrame(0));
        }
    }, [images, renderFrame]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        const idx = Math.min(FRAME_COUNT - 1, Math.floor(latest));
        requestAnimationFrame(() => renderFrame(idx));
    });

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(Math.floor(frameIndex.get()));
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [images, frameIndex, renderFrame]);

    return (
        <div ref={containerRef} className="h-[400vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* Scrollytelling Text Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <Beat
                        progress={scrollYProgress}
                        range={[0.05, 0.20]}
                        title="THE HARVEST"
                        subtitle="Sun-ripened berries, frozen at the peak of flavor."
                    />
                    <Beat
                        progress={scrollYProgress}
                        range={[0.30, 0.45]}
                        title="THE CHURN"
                        subtitle="A velvety, high-viscosity blend that defies gravity."
                    />
                    <Beat
                        progress={scrollYProgress}
                        range={[0.55, 0.70]}
                        title="THE FINISH"
                        subtitle="Double-aerated for a cloud-like texture."
                    />
                    <Beat
                        progress={scrollYProgress}
                        range={[0.80, 0.95]}
                        title="PURE INDULGENCE"
                        subtitle="The milkshake, redefined for the modern palate."
                    />
                </div>
            </div>
        </div>
    );
}

const Beat = ({ progress, range, title, subtitle }: { progress: MotionValue<number>, range: [number, number], title: string, subtitle: string }) => {
    const opacity = useTransform(progress, [range[0] - 0.05, range[0], range[1], range[1] + 0.05], [0, 1, 1, 0]);
    const y = useTransform(progress, [range[0] - 0.05, range[0], range[1], range[1] + 0.05], [50, 0, 0, -50]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
        >
            <h2 className="font-serif text-6xl md:text-8xl text-white mb-4 drop-shadow-lg">{title}</h2>
            <p className="font-sans text-xl md:text-2xl text-gray-300 max-w-xl font-light">{subtitle}</p>
        </motion.div>
    );
}
