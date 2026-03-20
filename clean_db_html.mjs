import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://hdcqgpfpwkkejdgbgbkd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3FncGZwd2trZWpkZ2JnYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjM2MDcsImV4cCI6MjA4OTQzOTYwN30.OksanVRlDMF0OSj7egpj3qxUg1EUg41PfvDnh0_bvYA');

function htmlToPlainText(html) {
    if(!html) return '';
    if (!html.includes('<')) return html; 
    
    let text = html;
    text = text.replace(/<li[^>]*>/gi, '- ');
    text = text.replace(/<\/li>/gi, '\n');
    text = text.replace(/<p[^>]*>/gi, '');
    text = text.replace(/<\/p>/gi, '\n');
    text = text.replace(/<br\s*\/?>/gi, '\n');
    text = text.replace(/<[^>]+>/g, ''); // all other tags
    text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
    text = text.replace(/\n{3,}/g, '\n\n').trim();
    return text;
}

(async () => {
    let { data: projects, error } = await supabase.from('portfolio_projects').select('*');
    if (error) throw error;

    for (const proj of projects) {
        if (!proj.case_study_content) continue;
        let cs = proj.case_study_content;
        
        let blocks = [];
        if (cs.blocks) {
            blocks = cs.blocks;
        } else {
            if (cs.info_grid && cs.info_grid.length > 0) blocks.push({ type: 'info-grid', data: cs.info_grid });
            if (cs.hero_url) blocks.push({ type: 'hero-image', data: cs.hero_url });
            if (cs.sections && cs.sections.length > 0) {
                cs.sections.forEach(s => {
                    if (s.title === 'Testimonials' || !s.title) blocks.push({ type: 'text-block', data: { text: s.text } });
                    else blocks.push({ type: 'content-split', data: { title: s.title, text: s.text } });
                });
            }
            if (cs.gallery && cs.gallery.length > 0) blocks.push({ type: 'gallery', data: cs.gallery });
        }

        let newBlocks = [];
        for (const b of blocks) {
            if (b.type === 'content-split') {
                b.data.title = htmlToPlainText(b.data.title);
                b.data.text = htmlToPlainText(b.data.text);
                newBlocks.push(b);
            } else if (b.type === 'text-block') {
                if (b.data.text.includes('flex: 0 0 350px') || b.data.text.includes('quote')) {
                    // Extract quotes if possible
                    let quotes = [];
                    const quoteMatches = b.data.text.matchAll(/font-style:italic;">"([^"]+)"<\/p>[^<]*<p[^>]*>— ([^<]+)<\/p>/g);
                    for (const match of quoteMatches) {
                        quotes.push({ quote: match[1], author: match[2] });
                    }
                    if (quotes.length > 0) {
                        newBlocks.push({ type: 'testimonials', data: quotes });
                    } else if (b.data.text.includes('"Set it up once')) {
                        newBlocks.push({ type: 'testimonials', data: [{quote: 'Set it up once and...', author: 'Adebisi K.'}] });
                    } else {
                        b.data.text = htmlToPlainText(b.data.text);
                        newBlocks.push(b);
                    }
                } else {
                    b.data.text = htmlToPlainText(b.data.text);
                    newBlocks.push(b);
                }
            } else if (b.type === 'info-grid') {
                b.data = b.data.map(i => ({ label: htmlToPlainText(i.label), value: htmlToPlainText(i.value) }));
                newBlocks.push(b);
            } else {
                newBlocks.push(b);
            }
        }

        const newCs = { enabled: cs.enabled, blocks: newBlocks };
        await supabase.from('portfolio_projects').update({ case_study_content: newCs }).eq('id', proj.id);
        console.log(`Migrated ${proj.title}`);
    }
    console.log('Complete!');
})();
