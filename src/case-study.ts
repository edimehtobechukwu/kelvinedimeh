import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdcqgpfpwkkejdgbgbkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3FncGZwd2trZWpkZ2JnYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjM2MDcsImV4cCI6MjA4OTQzOTYwN30.OksanVRlDMF0OSj7egpj3qxUg1EUg41PfvDnh0_bvYA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function loadCaseStudy() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = (window as any).PROJECT_ID || urlParams.get('id');

    const container = document.getElementById('cs-main-container');
    if (!container) return;

    if (!projectId) {
        container.innerHTML = `<div style="height:60vh; display:flex; align-items:center; justify-content:center; flex-direction:column; color:#fff;">
            <h2>Project Not Found</h2>
            <a href="/work" style="color:#ff4a5a; text-decoration:none; margin-top:1rem;">Return to Work &rarr;</a>
        </div>`;
        return;
    }

    const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('id', projectId)
        .single();

    if (error || !data) {
        container.innerHTML = `<div style="height:60vh; display:flex; align-items:center; justify-content:center; color:#ff4a5a;">
            <h2>Failed to load project</h2>
        </div>`;
        return;
    }

    const project = data;
    const cs = project.case_study_content || {};

    // Update Meta Title
    document.title = `${project.title} - Case Study`;
    
    // Plain Text & Rich Text Auto-Parser
    function processRichText(text: string): string {
        if (!text) return '';
        let html = text;
        if (!html.trim().startsWith('<')) {
            const lines = html.split('\n');
            let out = '';
            let inList = false;
            lines.forEach(line => {
                const t = line.trim();
                if (t === '') return;
                if (t.startsWith('- ') || t.startsWith('* ')) {
                    if (!inList) { out += '<ul class="cs-list" style="margin-top:0.5rem; margin-bottom:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">\n'; inList = true; }
                    out += `<li><strong style="color:#fff;">${t.substring(2)}</strong></li>\n`;
                } else {
                    if (inList) { out += '</ul>\n'; inList = false; }
                    out += `<p class="cs-text" style="margin-bottom:1rem;">${t}</p>\n`;
                }
            });
            if (inList) out += '</ul>\n';
            html = out;
        }

        try {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            
            // Feature: Auto-Split Grid on Double Space (&nbsp; or raw whitespace)
            Array.from(doc.querySelectorAll('p, h4')).forEach(el => {
                const inner = el.innerHTML;
                const match = inner.match(/(?:&nbsp;|\s{2,})(?:\s|&nbsp;)*/);
                if (match && match.index !== undefined) {
                    const left = inner.substring(0, match.index).trim();
                    const right = inner.substring(match.index + match[0].length).trim();
                    if (left && right) {
                        const grid = document.createElement('div');
                        grid.className = 'content-split-clean sub-grid-override';
                        const cleanLeft = left.replace(/<\/?(?:strong|b|em|i|span|div|a)[^>]*>/gi, '');
                        grid.innerHTML = `<div class="cs-sidebar" style="margin-bottom:0;"><div class="cs-section-title-clean" style="margin-top:0; color:var(--text); font-size:1.05rem; font-weight:600; letter-spacing:0.02em;">${cleanLeft}</div></div><div class="cs-main-text-clean" style="margin:0;"><p style="margin-top:0; margin-bottom:0;">${right}</p></div>`;
                        el.parentNode?.replaceChild(grid, el);
                    }
                }
            });

            // Feature: Semantic H4 Grid Wrapper (Wraps lists & paragraphs automatically)
            Array.from(doc.querySelectorAll('h4')).forEach(h4 => {
                const leftHtml = h4.innerHTML;
                let next = h4.nextElementSibling;
                const rightElements: Element[] = [];
                
                while (next && next.tagName.toLowerCase() !== 'h4' && !next.classList?.contains('sub-grid-override')) {
                    rightElements.push(next);
                    next = next.nextElementSibling;
                }
                
                if (rightElements.length > 0) {
                    const grid = document.createElement('div');
                    grid.className = 'content-split-clean sub-grid-override';
                    grid.innerHTML = `<div class="cs-sidebar" style="margin-bottom:0;"><div class="cs-section-title-clean" style="margin-top:0; color:var(--text); font-size:1.05rem; font-weight:600; letter-spacing:0.02em;">${leftHtml}</div></div><div class="cs-main-text-clean" style="margin:0;"></div>`;
                    
                    const rightContainer = grid.querySelector('.cs-main-text-clean');
                    rightElements.forEach(el => rightContainer?.appendChild(el));
                    
                    h4.parentNode?.insertBefore(grid, h4);
                    h4.remove();
                }
            });

            html = doc.body.innerHTML;
        } catch(e) {}
        return html;
    }
    
    // Modular Blocks Array with Backwards Compatibility
    let blocks: any[] = [];
    if (cs.blocks) {
        blocks = cs.blocks;
    } else {
        if (cs.info_grid && cs.info_grid.length > 0) blocks.push({ type: 'info-grid', data: cs.info_grid });
        if (cs.hero_url) blocks.push({ type: 'hero-image', data: cs.hero_url });
        if (cs.sections && cs.sections.length > 0) {
            cs.sections.forEach((s: any) => {
                // Auto-migrate legacy raw HTML Testimonial strings into the new native modular structure on the fly
                if ((s.title === 'Testimonials' || s.text.includes('gallery-item-clean')) && s.text.includes('cs-text')) {
                    const doc = new DOMParser().parseFromString(s.text, 'text/html');
                    const quotes = Array.from(doc.querySelectorAll('.cs-text'));
                    const authors = Array.from(doc.querySelectorAll('.cs-label-clean'));
                    if (quotes.length > 0) {
                        const testData = quotes.map((q: Element, i: number) => ({
                            quote: q.textContent?.replace(/^"|"$/g, '').trim() || '',
                            author: authors[i]?.textContent?.trim() || ''
                        }));
                        blocks.push({ type: 'testimonials', data: testData });
                        return; // Bypass the default fallback
                    }
                }

                if (s.title === 'Testimonials' || !s.title) blocks.push({ type: 'text-block', data: { text: s.text } });
                else blocks.push({ type: 'content-split', data: { title: s.title, text: s.text } });
            });
        }
        if (cs.gallery && cs.gallery.length > 0) blocks.push({ type: 'gallery', data: cs.gallery });
    }

    // Generate HTML for Blocks sequentially
    let blocksHtml = blocks.map((b: any) => {
        if (b.type === 'info-grid') {
            const grid = b.data.map((i: any) => {
                if(i.label.toUpperCase() === 'COMPANY' && project.live_url) {
                    return `<div><h5 class="cs-label-clean">${i.label}</h5><a href="${project.live_url}" target="_blank" class="cs-value-clean" style="text-decoration:none; display:flex; align-items:center; gap:0.5rem; transition: opacity 0.3s;" onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1">${i.value} <span style="font-size:1.1em; line-height:1; transform: translateY(1px);">&#8599;</span></a></div>`
                }
                return `<div><h5 class="cs-label-clean">${i.label}</h5><p class="cs-value-clean">${i.value}</p></div>`;
            }).join('');
            return `<section class="cs-container-clean" style="margin-bottom:2rem;"><div class="cs-info-grid-clean" style="margin-top:1rem;">${grid}</div></section>`;
        }
        else if (b.type === 'hero-image') {
            return `<section class="cs-visual" style="padding: 0 5%; max-width: 1400px; margin: 0 auto 5rem; display:block;"><img src="${b.data}" alt="${project.title} Visual" class="cs-hero-img-clean"></section>`;
        }
        else if (b.type === 'content-split') {
            return `
            <section class="cs-content-wrapper">
                <div class="content-split-clean">
                    <div class="cs-sidebar"><h3 class="cs-section-title-clean">${b.data.title}</h3></div>
                    <div class="cs-main-text-clean">${processRichText(b.data.text)}</div>
                </div>
            </section>`;
        }
        else if (b.type === 'text-block') {
             return `<section class="cs-content-wrapper"><div class="cs-main-text-clean">${processRichText(b.data.text)}</div></section>`;
        }
        else if (b.type === 'testimonials') {
             const gradients = [
                 'linear-gradient(135deg, #f4f6fc 0%, #e6ebfa 100%)', // Blueish
                 'linear-gradient(135deg, #fbf4fb 0%, #f8e5f0 100%)', // Pinkish
                 'linear-gradient(135deg, #f4fbf8 0%, #e5f6ef 100%)', // Mintish
                 'linear-gradient(135deg, #fcf4f8 0%, #f6e6ed 100%)', // Roseish
                 'linear-gradient(135deg, #f8f6fc 0%, #ece5f8 100%)'  // Purplish
             ];
             const templateSlides = (b.data as any[]).map(r => {
                 const grad = gradients[Math.floor(Math.random() * gradients.length)];
                 return `
                 <div style="flex:0 0 clamp(350px, 25vw, 450px); background:${grad}; justify-content:flex-start; padding:3.5rem; border-radius:2rem; display:flex; flex-direction:column; margin-right:2vw;">
                    <p style="font-family: 'Inter', sans-serif; font-size:1.35rem; font-weight:600; color:#111; line-height:1.5; margin-bottom:0;">“${r.quote}”</p>
                    <div style="margin-top:auto; padding-top:2.5rem;">
                        <p style="font-family: 'Inter', sans-serif; font-size:1rem; color:#444; font-style:italic;">— ${r.author}</p>
                    </div>
                 </div>`;
             }).join('');

             const set = `<div style="display:flex;">${templateSlides}</div>`;
             const allSets = set.repeat(10); // 10 identical sets guarantees massive overflow for the infinite scroll

             return `
             <section style="overflow: hidden; width: 100%; margin-bottom: 6rem; padding-top: 1rem; cursor: pointer;">
                <div class="cs-marquee-track">
                    ${allSets}
                </div>
             </section>`;
        }
        else if (b.type === 'device-carousel') {
             const templateSlides = b.data.map((s: any) => `
                <div class="cs-carousel-slide ${s.device}">
                    ${s.title || s.text ? `
                    <div class="cs-slide-header">
                        ${s.title ? `<h4 class="cs-slide-title">${s.title}</h4>` : ''}
                        ${s.text ? `<p class="cs-slide-text">${s.text}</p>` : ''}
                    </div>
                    ` : ''}
                    <div class="cs-slide-mockup">
                        ${s.device === 'desktop' ? `
                            <div class="device-desktop">
                                <div class="desktop-screen"><img src="${s.image}" alt="${s.title}"></div>
                                <div class="desktop-stand"></div>
                            </div>
                        ` : `
                            <div class="device-mobile" style="position: relative; width: 100%; max-width: 360px; aspect-ratio: 722/1470; margin: 0 auto; overflow: hidden;">
                                <div class="app-image-wrap" style="position: absolute; top: 2%; left: 4%; width: 92%; height: 96%; border-radius: 36px; overflow: hidden; z-index: 1;">
                                    <img src="${s.image}" alt="${s.title}" style="width: 100%; height: 100%; display: block; object-fit: cover;">
                                </div>
                                <div class="hardware-wrap" style="position: absolute; inset: 0px; z-index: 2; pointer-events: none;">
                                    <img src="https://framerusercontent.com/images/YlYIbfFEujexwgWABDzpsRlY.webp" style="width: 100%; height: 100%; display: block; object-fit: cover;">
                                </div>
                            </div>
                        `}
                    </div>
                </div>
             `).join('');

             const slides = templateSlides + templateSlides + templateSlides + templateSlides + templateSlides;

             return `
             <section class="cs-carousel-section" data-carousel-loop="true">
                 <button class="carousel-nav-btn prev" onclick="this.nextElementSibling.scrollBy({left: -(this.nextElementSibling.firstElementChild.offsetWidth + 48), behavior: 'smooth'})">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="3" fill="none"><path d="M15 18l-6-6 6-6"/></svg>
                 </button>
                 <div class="cs-carousel-track" id="cs-track-${Math.random().toString(36).substr(2, 9)}">
                     ${slides}
                 </div>
                 <button class="carousel-nav-btn next" onclick="this.previousElementSibling.scrollBy({left: (this.previousElementSibling.firstElementChild.offsetWidth + 48), behavior: 'smooth'})">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="3" fill="none"><path d="M9 18l6-6-6-6"/></svg>
                 </button>
             </section>`;
        }
        else if (b.type === 'gallery') {
            const imgs = b.data.map((url: string) => `<div class="gallery-item-clean"><img src="${url}"></div>`).join('');
            return `<section class="cs-gallery-clean"><div class="gallery-grid-clean">${imgs}</div></section>`;
        }
        return '';
    }).join('');

    container.innerHTML = `
        <section class="cs-hero-clean" style="padding-bottom: 0;">
            <div class="cs-container-clean">
                <div class="cs-category-clean">${project.type || 'MOBILE APP DESIGN'}</div>
                <h1 class="cs-title-clean reveal-text" style="opacity:1; transform:translateY(0);">${project.subtitle && project.subtitle.length > 3 ? project.subtitle : project.title}</h1>
            </div>
        </section>
        
        ${blocksHtml}
    `;

    setTimeout(() => {
        if ((window as any).gsap) {
            (window as any).gsap.fromTo('.cs-hero-img-clean', 
                { scale: 1.05, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
            );
        }

        // Auto-center and continuously wrap infinite loop carousels naturally
        const loops = document.querySelectorAll('.cs-carousel-section[data-carousel-loop="true"] .cs-carousel-track');
        loops.forEach((track: any) => {
            requestAnimationFrame(() => {
                const singleWidth = track.scrollWidth / 5;
                track.scrollTo({ left: singleWidth * 2, behavior: 'instant' });

                // Silent boundary teleportation wrapper
                track.addEventListener('scroll', () => {
                    const currentSetWidth = track.scrollWidth / 5;
                    if (track.scrollLeft < currentSetWidth * 0.5) {
                        track.scrollLeft += currentSetWidth * 2;
                    } else if (track.scrollLeft >= currentSetWidth * 3.5) {
                        track.scrollLeft -= currentSetWidth * 2;
                    }
                }, { passive: true });
            });
        });
    }, 100);
}

document.addEventListener('DOMContentLoaded', loadCaseStudy);
