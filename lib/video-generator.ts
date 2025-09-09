import { TarotCard } from "@/contexts/tarot-context"

interface VideoGenerationOptions {
    question: string
    cards: TarotCard[]
    interpretation: string
    width?: number
    height?: number
    duration?: number // in seconds
    fps?: number
}

export class VideoGenerator {
    private static readonly DEFAULT_OPTIONS = {
        width: 1920,
        height: 1080,
        duration: 15, // 15 seconds
        fps: 30,
    }

    static async generateVideo(options: VideoGenerationOptions): Promise<Blob> {
        const config = { ...this.DEFAULT_OPTIONS, ...options }
        const totalFrames = config.duration * config.fps
        
        // Generate all frames
        const frames: ImageData[] = []
        
        for (let frame = 0; frame < totalFrames; frame++) {
            try {
                const response = await fetch('/api/share-video', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: options.question,
                        cards: options.cards.map(c => c.meaning),
                        interpretation: options.interpretation,
                        width: config.width,
                        height: config.height,
                        frame,
                        totalFrames,
                    }),
                })

                if (!response.ok) {
                    throw new Error(`Failed to generate frame ${frame}`)
                }

                const blob = await response.blob()
                const imageData = await this.blobToImageData(blob)
                frames.push(imageData)
            } catch (error) {
                console.error(`Error generating frame ${frame}:`, error)
                // Continue with other frames
            }
        }

        // Convert frames to video using WebCodecs API (if available) or fallback
        return this.framesToVideo(frames, config)
    }

    private static async blobToImageData(blob: Blob): Promise<ImageData> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Could not get canvas context'))
                    return
                }
                
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                resolve(imageData)
            }
            img.onerror = reject
            img.src = URL.createObjectURL(blob)
        })
    }

    private static async framesToVideo(frames: ImageData[], config: VideoGenerationOptions): Promise<Blob> {
        // For now, we'll create a simple animated GIF as a fallback
        // In a production environment, you might want to use FFmpeg or similar
        return this.createAnimatedGIF(frames, config)
    }

    private static async createAnimatedGIF(frames: ImageData[], config: VideoGenerationOptions): Promise<Blob> {
        // This is a simplified implementation
        // In practice, you'd want to use a proper GIF encoder library
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
            throw new Error('Could not get canvas context')
        }

        canvas.width = config.width || 1920
        canvas.height = config.height || 1080

        // For now, return the first frame as a static image
        // In a real implementation, you'd encode all frames into a GIF or MP4
        ctx.putImageData(frames[0], 0, 0)
        
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob!)
            }, 'image/png')
        })
    }

    // Alternative method using server-side video generation
    static async generateVideoServer(options: VideoGenerationOptions): Promise<Blob> {
        const config = { ...this.DEFAULT_OPTIONS, ...options }
        
        try {
            const response = await fetch('/api/generate-video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: options.question,
                    cards: options.cards.map(c => c.meaning),
                    interpretation: options.interpretation,
                    width: config.width,
                    height: config.height,
                    duration: config.duration,
                    fps: config.fps,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate video')
            }

            return await response.blob()
        } catch (error) {
            console.error('Video generation error:', error)
            throw error
        }
    }
}

// Utility function for easy video generation
export async function generateReadingVideo(
    question: string,
    cards: TarotCard[],
    interpretation: string,
    options?: Partial<VideoGenerationOptions>
): Promise<Blob> {
    return VideoGenerator.generateVideo({
        question,
        cards,
        interpretation,
        ...options,
    })
}