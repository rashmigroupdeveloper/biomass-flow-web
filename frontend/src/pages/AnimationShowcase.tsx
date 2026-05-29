import React from 'react';
import { Helmet } from 'react-helmet-async';
import LayeredHero from '@/components/animation/LayeredHero';
import ScrollReveal from '@/components/animation/ScrollReveal';
import ScrollCounter from '@/components/animation/ScrollCounter';
import GsapMagnetic from '@/components/animation/GsapMagnetic';
import AutoplayVideo from '@/components/animation/AutoplayVideo';

export default function AnimationShowcase() {
  return (
    <>
      <Helmet>
        <title>Grab &amp; Go Animation System — Showcase</title>
        <meta
          name="description"
          // eslint-disable-next-line max-len
          content="Showcase page displaying the premium GSAP and IntersectionObserver-based custom animation system inspired by grabandgo.pt."
        />
      </Helmet>

      <main className="bg-[#040c06] text-white min-h-screen pb-32">
        {/* Module 1: Layered GSAP Hero Banner */}
        <LayeredHero
          title="Premium Motion Architecture"
          subtitle="Explore our standalone reusable React animation modules built on GSAP 3 and IntersectionObserver, inspired by grabandgo.pt"
        />

        <div className="container mx-auto px-6 md:px-12 mt-20 space-y-32">
          
          {/* Section: Scroll Counters */}
          <ScrollReveal direction="up" delay={100} className="border-t border-white/10 pt-16">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono tracking-widest text-primary-400 uppercase font-semibold">
                Module 03 — GSAP Scroll Counter
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">
                High Performance Count-Up
              </h2>
              <p className="text-gray-400 font-light mt-3 leading-relaxed">
                Using GSAP's native ScrollTrigger, these counters animate smoothly from 0 to a target value the exact moment they enter the viewport.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  <ScrollCounter endValue={20000} suffix="+" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-500">
                  Annual Metric Sourcing
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
                <div className="text-4xl md:text-5xl font-extrabold text-primary-400 mb-2">
                  <ScrollCounter endValue={99.8} decimals={1} suffix="%" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-500">
                  ESG compliance rate
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  <ScrollCounter endValue={38} prefix="$" suffix="M" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-500">
                  Carbon Savings Capitalized
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Section: Magnetic CTAs */}
          <ScrollReveal direction="up" delay={150} className="border-t border-white/10 pt-16">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono tracking-widest text-primary-400 uppercase font-semibold">
                Module 04 — GSAP Magnetic Hover
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">
                Tactile Button Magnetism
              </h2>
              <p className="text-gray-400 font-light mt-3 leading-relaxed">
                CTA elements pull toward the cursor, creating a satisfying interactive hover effect. When the mouse leaves, they snap back with a high-fidelity elastic ease.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 items-center justify-center p-12 bg-white/[0.02] border border-white/5 rounded-3xl">
              <GsapMagnetic strength={0.25} range={50}>
                <button className="px-6 py-3 border border-white/20 hover:border-white/50 text-white rounded-full transition-colors text-sm font-semibold font-mono">
                  Default Magnet (0.25 strength)
                </button>
              </GsapMagnetic>

              <GsapMagnetic strength={0.4} range={75}>
                <button className="px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white rounded-full text-sm font-semibold tracking-wide shadow-lg shadow-primary-900/40">
                  Strong Magnet (0.4 strength)
                </button>
              </GsapMagnetic>

              <GsapMagnetic strength={0.5} range={90}>
                <button className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg border border-white/10 hover:bg-gray-100 shadow-xl">
                  &rarr;
                </button>
              </GsapMagnetic>
            </div>
          </ScrollReveal>

          {/* Section: Scroll Reveal Utility */}
          <div className="border-t border-white/10 pt-16">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono tracking-widest text-primary-400 uppercase font-semibold">
                Module 02 — IntersectionObserver Scroll Reveal
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">
                Lightweight Layout Animations
              </h2>
              <p className="text-gray-400 font-light mt-3 leading-relaxed">
                Staggered reveals triggered dynamically using Native IntersectionObserver for maximum scroll efficiency and responsiveness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ScrollReveal direction="up" delay={0} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                <span className="text-[10px] font-mono text-gray-500 block mb-2">Direction: UP (Delay: 0ms)</span>
                <h4 className="font-serif text-lg font-bold">Biomass Pellets</h4>
                <p className="text-xs text-gray-500 mt-2 font-light">Compressed industrial heating fuel sourcing.</p>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={150} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                <span className="text-[10px] font-mono text-gray-500 block mb-2">Direction: LEFT (Delay: 150ms)</span>
                <h4 className="font-serif text-lg font-bold">Premium Biochar</h4>
                <p className="text-xs text-gray-500 mt-2 font-light">Active negative emissions soil integration.</p>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={300} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                <span className="text-[10px] font-mono text-gray-500 block mb-2">Direction: RIGHT (Delay: 300ms)</span>
                <h4 className="font-serif text-lg font-bold">Carbon Sourcing</h4>
                <p className="text-xs text-gray-500 mt-2 font-light">High-surface filtration systems.</p>
              </ScrollReveal>

              <ScrollReveal direction="down" delay={450} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                <span className="text-[10px] font-mono text-gray-500 block mb-2">Direction: DOWN (Delay: 450ms)</span>
                <h4 className="font-serif text-lg font-bold">Lump Charcoal</h4>
                <p className="text-xs text-gray-500 mt-2 font-light">Industrial trade & logistics.</p>
              </ScrollReveal>
            </div>
          </div>

          {/* Section: Autoplay Video Crossfade */}
          <ScrollReveal direction="up" delay={200} className="border-t border-white/10 pt-16">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono tracking-widest text-primary-400 uppercase font-semibold">
                Module 05 — Poster-to-Video Crossfade
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">
                Seamless Video Buffering
              </h2>
              <p className="text-gray-400 font-light mt-3 leading-relaxed">
                Inline videos that display a high-resolution poster overlay. When triggered, the video streams in the background, and the poster smoothly crossfades to transparent once playing starts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="text-xs font-mono text-gray-400 block mb-3 uppercase tracking-wider">
                  Example 1: Viewport Trigger (Plays when visible)
                </span>
                <AutoplayVideo
                  videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  posterSrc="/13109.jpg"
                  triggerMode="viewport"
                  aspectRatio="aspect-video"
                />
              </div>

              <div>
                <span className="text-xs font-mono text-gray-400 block mb-3 uppercase tracking-wider">
                  Example 2: Hover Trigger (Plays when cursor hovers)
                </span>
                <AutoplayVideo
                  videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                  posterSrc="/150234.jpg"
                  triggerMode="hover"
                  aspectRatio="aspect-video"
                />
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </>
  );
}
