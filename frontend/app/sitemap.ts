import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matist.vercel.app'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ece-practical`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]
  
  // Popular ECE Topics - good for SEO
  const popularTopics = [
    'Convolution of two signals',
    'Fast Fourier Transform (FFT)',
    'FIR Filter Design',
    'Amplitude Modulation and Demodulation',
    'Sampling and Aliasing',
    'Discrete Fourier Transform (DFT)',
    'IIR Filter Design',
    'Z-Transform',
    'Digital Signal Processing',
  ]
  
  const topicPages = popularTopics.map(topic => ({
    url: `${baseUrl}/ece-practical?topic=${encodeURIComponent(topic)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...topicPages]
}
