import fs from 'fs';

function replaceLines(file, start, end) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.splice(start - 1, end - start + 1, '            <div class="project-grid" id="portfolio-grid">\n                <div class="cms-loading" style="text-align: center; grid-column: 1 / -1; padding: 2rem; color: var(--accent);">Loading projects...</div>\n            </div>');
    fs.writeFileSync(file, lines.join('\n'));
    console.log(`Updated ${file}`);
}

replaceLines('index.html', 153, 286);
replaceLines('work.html', 83, 214);
