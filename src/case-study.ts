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
    
    // Plain Text to HTML Parser
    function parseTextToHTML(text: string): string {
        if (!text) return '';
        if (text.trim().startsWith('<') && text.trim().endsWith('>')) return text;

        const lines = text.split('\\n');
        let html = '';
        let inList = false;

        lines.forEach(line => {
            const t = line.trim();
            if (t === '') return;

            if (t.startsWith('- ') || t.startsWith('* ')) {
                if (!inList) { html += '<ul class="cs-list" style="margin-top:0.5rem; margin-bottom:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">\\n'; inList = true; }
                html += `<li><strong style="color:#fff;">${t.substring(2)}</strong></li>\\n`;
            } else {
                if (inList) { html += '</ul>\\n'; inList = false; }
                html += `<p class="cs-text" style="margin-bottom:1rem;">${t}</p>\\n`;
            }
        });

        if (inList) html += '</ul>\\n';
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
                if (s.title === 'Testimonials' || !s.title) blocks.push({ type: 'text-block', data: { text: s.text } });
                else blocks.push({ type: 'content-split', data: { title: s.title, text: s.text } });
            });
        }
        if (cs.gallery && cs.gallery.length > 0) blocks.push({ type: 'gallery', data: cs.gallery });
    }

    // Generate HTML for Blocks sequentially
    let blocksHtml = blocks.map((b: any) => {
        if (b.type === 'info-grid') {
            const grid = b.data.map((i: any) => `<div><h5 class="cs-label-clean">${i.label}</h5><p class="cs-value-clean">${i.value}</p></div>`).join('');
            return `<section class="cs-container-clean" style="margin-bottom:2rem;"><div class="cs-info-grid-clean" style="border-top:none; margin-top:2rem;">${grid}</div></section>`;
        }
        else if (b.type === 'hero-image') {
            return `<section class="cs-visual" style="padding: 0 5%; max-width: 1400px; margin: 0 auto 5rem; display:block;"><img src="${b.data}" alt="${project.title} Visual" class="cs-hero-img-clean" style="margin-bottom:0;"></section>`;
        }
        else if (b.type === 'content-split') {
            return `
            <section class="cs-content-clean">
                <div class="content-split-clean">
                    <div class="cs-sidebar"><h3 class="cs-section-title-clean">${b.data.title}</h3></div>
                    <div class="cs-main-text-clean"><div>${parseTextToHTML(b.data.text)}</div></div>
                </div>
            </section>`;
        }
        else if (b.type === 'text-block') {
             return `<section class="cs-content-clean"><div>${parseTextToHTML(b.data.text)}</div></section>`;
        }
        else if (b.type === 'testimonials') {
             const items = (b.data as any[]).map(r => `
             <div class="gallery-item-clean" style="flex-direction:column; align-items:flex-start; justify-content:space-between; min-height:150px; flex:0 0 300px; background:#111; padding:2rem; border-radius:16px;">
                <p class="cs-text" style="color:#fff; font-size:1.1rem; font-style:italic;">"${r.quote}"</p>
                <p class="cs-label-clean" style="margin-top:2rem; margin-bottom:0;">${r.author}</p>
             </div>`).join('');
             return `
             <section class="cs-gallery-clean" style="margin-bottom:4rem;">
                <div class="gallery-grid-clean" style="display:flex; overflow-x:auto; gap:1.5rem; scrollbar-width:none;">
                    ${items}
                </div>
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
                <div class="cs-category-clean">CASE STUDY</div>
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
    }, 100);
}

document.addEventListener('DOMContentLoaded', loadCaseStudy);
