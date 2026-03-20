import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://hdcqgpfpwkkejdgbgbkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3FncGZwd2trZWpkZ2JnYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjM2MDcsImV4cCI6MjA4OTQzOTYwN30.OksanVRlDMF0OSj7egpj3qxUg1EUg41PfvDnh0_bvYA';
const supabase = createClient(supabaseUrl, supabaseKey);

const filesToMigrate = [
  { file: 'rentboss.html', titleContains: 'RentBoss' },
  { file: 'lumenone.html', titleContains: 'LumenOne' },
  { file: 'lumenone.html', titleContains: 'Lumen One' }, // just in case
  { file: 'swittea.html', titleContains: 'SwitTea' },
  { file: 'kml.html', titleContains: 'KML' }
];

async function run() {
    // Authenticate first, otherwise RLS silently ignores updates!
    const { error: authErr } = await supabase.auth.signInWithPassword({
        email: 'kelvinedimeh@gmail.com',
        password: 'KelvinDash2026@'
    });
    if (authErr) {
        console.error("Auth failed", authErr);
        return;
    }

    const { data: projects, error } = await supabase.from('portfolio_projects').select('*');
    if (error) {
        console.error("Failed to fetch projects", error);
        return;
    }

    for (let mapping of filesToMigrate) {
        const filePath = path.join(process.cwd(), mapping.file);
        if (!fs.existsSync(filePath)) continue;

        const html = fs.readFileSync(filePath, 'utf-8');

        // Regex parsing
        const heroMatch = html.match(/<img src="([^"]+)" alt=".*Hero.*"/);
        let heroUrl = heroMatch ? heroMatch[1] : '';
        if(!heroMatch) { // fallback
            const h2Match = html.match(/<img src="([^"]+)"[^>]*cs-hero-img/);
            if(h2Match) heroUrl = h2Match[1];
        }

        const infoGrid = [];
        const infoRegex = /<h5 class="cs-label">(.*?)<\/h5>\s*<p class="cs-value">(.*?)<\/p>/g;
        let match;
        while ((match = infoRegex.exec(html)) !== null) {
            infoGrid.push({ label: match[1].trim(), value: match[2].trim() });
        }

        const sections = [];
        const contentSplitRegex = /<h3 class="cs-section-title">(.*?)<\/h3>([\s\S]*?)<\/div>\s*<\/div>/g;
        const parts = html.split('<h3 class="cs-section-title">');
        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            const titleEnd = part.indexOf('</h3>');
            const secTitle = part.substring(0, titleEnd).trim();
            
            let secText = '';
            
            const listMatch = part.match(/<ul class="cs-list">([\s\S]*?)<\/ul>/);
            const textMatch = part.match(/<p class="cs-text">([\s\S]*?)<\/p>/);
            
            if (listMatch) {
                secText += `<ul class="cs-list">${listMatch[1].trim()}</ul>`;
            }
            if (textMatch) {
                secText += `<p class="cs-text" style="color:#aaa;">${textMatch[1].trim()}</p>`;
            }
            
            sections.push({ title: secTitle, text: secText });
        }

        const gallery = [];
        const galleryRegex = /<div class="gallery-item[^>]*>\s*<img src="([^"]+)"/g;
        let gMatch;
        while ((gMatch = galleryRegex.exec(html)) !== null) {
            gallery.push(gMatch[1].trim());
        }

        const caseStudyContent = {
            enabled: true,
            hero_url: heroUrl,
            info_grid: infoGrid,
            sections: sections.filter(s => s.text),
            gallery: gallery
        };

        // Find the project in the DB
        const project = projects.find(p => p.title.toLowerCase().includes(mapping.titleContains.toLowerCase()));
        if (project) {
            console.log(`Updating ${project.title}...`);
            const generatedUrl = `/case-study.html?id=${project.id}`;
            const { error: updErr } = await supabase.from('portfolio_projects').update({
                case_study_content: caseStudyContent,
                card_type: 'internal-route',
                live_url: generatedUrl
            }).eq('id', project.id);
            if(updErr) console.error(updErr);
            else console.log(`✓ ${project.title} updated with case study content.`);
        } else {
            console.log(`x Project not found for ${mapping.titleContains}`);
        }
    }
}

run();
