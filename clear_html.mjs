import fs from 'fs';

function clearProjects(file) {
    let content = fs.readFileSync(file, 'utf8');
    const startStr = '<div class="project-grid">';
    const endStr = '            </div>\n        </section>';
    
    const startIndex = content.indexOf(startStr);
    const endIndex = content.indexOf(endStr, startIndex);
    
    if (startIndex !== -1 && endIndex !== -1) {
        content = content.substring(0, startIndex) + '<div class="project-grid" id="portfolio-grid">\n            </div>\n        </section>' + content.substring(endIndex + endStr.length);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleared projects in ${file}`);
    } else {
        console.log(`Could not find project grid in ${file}`);
    }
}

clearProjects('index.html');
clearProjects('work.html');
