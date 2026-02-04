"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function BackgroundAnimation() {
    const [mounted, setMounted] = useState(false)
    const { theme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    // Animation variants for organic movement
    const blobVariants = {
        animate: {
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 10, -10, 0],
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    }

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-background/50">
            {/* Noise Texture Filter */}
            <svg className="invisible w-0 h-0">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.6" // Higher frequency for finer grain
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
            </svg>

            {/* Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{ filter: "url(#noiseFilter)" }}
            />

            {/* Organic Blobs */}
            <div className="absolute inset-0 filter blur-[80px] opacity-60">
                {/* Top Left - Blue/Purple */}
                <motion.div
                    variants={blobVariants}
                    animate="animate"
                    transition={{ duration: 25, delay: 0 }}
                    className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full mix-blend-multiply dark:mix-blend-screen bg-blue-300 dark:bg-blue-900/40"
                />

                {/* Top Right - Purple/Pink */}
                <motion.div
                    variants={blobVariants}
                    animate="animate"
                    transition={{ duration: 30, delay: 2 }}
                    className="absolute top-0 -right-20 w-[500px] h-[500px] rounded-full mix-blend-multiply dark:mix-blend-screen bg-purple-300 dark:bg-purple-900/40"
                />

                {/* Bottom Left - Indigo/Cyan */}
                <motion.div
                    variants={blobVariants}
                    animate="animate"
                    transition={{ duration: 35, delay: 4 }}
                    className="absolute -bottom-40 -left-20 w-[700px] h-[700px] rounded-full mix-blend-multiply dark:mix-blend-screen bg-indigo-300 dark:bg-indigo-900/40"
                />

                {/* Center/Moving - Accent */}
                <motion.div
                    animate={{
                        x: [-50, 50, -50],
                        y: [-20, 20, -20],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full mix-blend-multiply dark:mix-blend-screen bg-pink-300/80 dark:bg-pink-900/30"
                />

                {/* Bottom Right - Cyan */}
                <motion.div
                    variants={blobVariants}
                    animate="animate"
                    transition={{ duration: 28, delay: 1 }}
                    className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full mix-blend-multiply dark:mix-blend-screen bg-cyan-200 dark:bg-cyan-900/40"
                />
            </div>

            {/* Subtle overlay to wash out colors slightly in light mode for readability */}
            <div className="absolute inset-0 bg-background/60 dark:bg-background/20 backdrop-blur-[1px]" />
        </div>
    )
}
