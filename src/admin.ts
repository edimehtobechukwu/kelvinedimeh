import { createClient } from '@supabase/supabase-js';

declare const Quill: any;
const supabaseUrl = 'https://hdcqgpfpwkkejdgbgbkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3FncGZwd2trZWpkZ2JnYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjM2MDcsImV4cCI6MjA4OTQzOTYwN30.OksanVRlDMF0OSj7egpj3qxUg1EUg41PfvDnh0_bvYA';
const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET = 'portfolio_images';

// State
let projects: any[] = [];
let currentProject: any = null;
let activeTab: 'cover' | 'page' = 'cover';

// Modular Case Study State
let csBlocks: any[] = [];

// DOM Elements
const loginScreen = document.getElementById('admin-login-screen')!;
const dashScreen = document.getElementById('admin-dashboard-screen')!;
const btnLogout = document.getElementById('btn-logout')!;
const btnAddNew = document.getElementById('btn-add-new')!;
const projectList = document.getElementById('project-list')!;
const btnSave = document.getElementById('btn-save') as HTMLButtonElement;
const btnDelete = document.getElementById('btn-delete') as HTMLButtonElement;
const editorTitle = document.getElementById('editor-title')!;
const editorStatus = document.getElementById('editor-status')!;
const previewGrid = document.getElementById('preview-grid')!;

// Tabs & Forms
const tabCover = document.getElementById('tab-cover')!;
const tabPage = document.getElementById('tab-page')!;
const formCover = document.getElementById('form-cover')!;
const formPage = document.getElementById('form-page')!;

// Case Study Elements
const csEnabled = document.getElementById('cs-enabled') as HTMLInputElement;
const csBuilder = document.getElementById('cs-builder')!;
const csBlocksContainer = document.getElementById('cs-blocks-container')!;
const btnAddBlock = document.getElementById('btn-add-block')!;
const blockTypeSelect = document.getElementById('p-add-block-type') as HTMLSelectElement;

// Form elements
const formIds = [
    'p-title', 'p-subtitle', 'p-type', 'p-live', 'p-case', 
    'p-media-type', 'p-media-url', 'p-video-poster', 'p-order', 'p-class'
];
const inputs = formIds.reduce((acc: any, id) => {
    acc[id] = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
    return acc;
}, {});
const fileInput = document.getElementById('p-media-file') as HTMLInputElement;

// Initialize
async function init() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        showDashboard();
    } else {
        showLogin();
    }
}

// Login logic
function showLogin() {
    loginScreen.style.display = 'flex';
    dashScreen.style.display = 'none';

    document.getElementById('admin-login-btn')?.addEventListener('click', async () => {
        const pass = (document.getElementById('admin-password') as HTMLInputElement).value;
        const errEl = document.getElementById('admin-login-error')!;
        
        const { error } = await supabase.auth.signInWithPassword({ email: 'kelvinedimeh@gmail.com', password: pass });
        if (error) {
            errEl.innerText = error.message;
            errEl.style.display = 'block';
        } else {
            loginScreen.style.display = 'none';
            showDashboard();
        }
    });

    document.getElementById('admin-password')?.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') document.getElementById('admin-login-btn')?.click();
    });
}

// Dashboard Init
async function showDashboard() {
    dashScreen.style.display = 'grid';
    await loadProjects();
    selectProject(null);
    setupEventListeners();
}

async function loadProjects() {
    const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });
        
    if (!error && data) {
        projects = data;
        renderSidebar();
    }
}

function renderSidebar() {
    projectList.innerHTML = '';
    projects.forEach(p => {
        const li = document.createElement('li');
        li.className = `project-list-item ${currentProject && currentProject.id === p.id ? 'selected' : ''}`;
        li.innerText = p.title || 'Untitled Project';
        li.onclick = () => selectProject(p);
        projectList.appendChild(li);
    });
}

function switchTab(tab: 'cover' | 'page') {
    activeTab = tab;
    if (tab === 'cover') {
        tabCover.classList.add('active');
        tabPage.classList.remove('active');
        formCover.style.display = 'flex';
        formPage.style.display = 'none';
    } else {
        tabPage.classList.add('active');
        tabCover.classList.remove('active');
        formPage.style.display = 'block';
        formCover.style.display = 'none';
    }
    updateLivePreview();
}

function selectProject(proj: any) {
    currentProject = proj;
    editorStatus.innerText = '';
    
    Array.from(projectList.children).forEach((li, idx) => {
        if(proj && projects[idx].id === proj.id) li.classList.add('selected');
        else li.classList.remove('selected');
    });

    if (proj) {
        editorTitle.innerText = `Editing: ${proj.title}`;
        btnDelete.style.display = 'block';
        
        inputs['p-title'].value = proj.title || '';
        inputs['p-subtitle'].value = proj.subtitle || '';
        inputs['p-type'].value = proj.card_type || 'with-actions';
        inputs['p-live'].value = proj.live_url || '';
        inputs['p-case'].value = proj.case_study_url || '';
        inputs['p-media-type'].value = proj.media_type || 'image';
        
        if (proj.media_type === 'video' && proj.video_url) { inputs['p-media-url'].value = proj.video_url; }
        else { inputs['p-media-url'].value = proj.image_url || ''; }
        
        inputs['p-video-poster'].value = proj.media_type === 'video' ? (proj.image_url || '') : '';
        inputs['p-order'].value = proj.display_order || 0;
        inputs['p-class'].value = proj.image_class || '';

        // Load CS Blocks Modularly
        const cs = proj.case_study_content || {};
        csEnabled.checked = !!cs.enabled;
        
        if (cs.blocks) {
            csBlocks = JSON.parse(JSON.stringify(cs.blocks)); // Deep clone
        } else {
            // Backwards compatibility migration
            csBlocks = [];
            if (cs.info_grid && cs.info_grid.length > 0) {
                csBlocks.push({ type: 'info-grid', data: cs.info_grid });
            }
            if (cs.hero_url) {
                csBlocks.push({ type: 'hero-image', data: cs.hero_url });
            }
            if (cs.sections && cs.sections.length > 0) {
            cs.sections.forEach((s: any) => {
                if ((s.title === 'Testimonials' || s.text.includes('gallery-item-clean')) && s.text.includes('cs-text')) {
                    const doc = new DOMParser().parseFromString(s.text, 'text/html');
                    const quotes = Array.from(doc.querySelectorAll('.cs-text'));
                    const authors = Array.from(doc.querySelectorAll('.cs-label-clean'));
                    if (quotes.length > 0) {
                        const testData = quotes.map((q: Element, i: number) => ({
                            quote: q.textContent?.replace(/^"|"$/g, '').trim() || '',
                            author: authors[i]?.textContent?.trim() || ''
                        }));
                        csBlocks.push({ type: 'testimonials', data: testData });
                        return;
                    }
                }

                // Treat html-heavy entries as simple text blocks, otherwise split content
                if (s.title === 'Testimonials' || !s.title) csBlocks.push({ type: 'text-block', data: { text: s.text } });
                else csBlocks.push({ type: 'content-split', data: { title: s.title, text: s.text } });
            });
        }
            if (cs.gallery && cs.gallery.length > 0) {
                csBlocks.push({ type: 'gallery', data: cs.gallery });
            }
        }
    } else {
        editorTitle.innerText = `New Project`;
        btnDelete.style.display = 'none';
        
        Object.keys(inputs).forEach(k => {
            if(k === 'p-order') inputs[k].value = projects.length * 10;
            else if(k === 'p-type') inputs[k].value = 'with-actions';
            else if(k === 'p-media-type') inputs[k].value = 'image';
            else inputs[k].value = '';
        });

        csEnabled.checked = false;
        csBlocks = [];
    }

    applyCSEnabledState();
    toggleVideoPosterField();
    renderCSBlocks();
    updateLivePreview();
}

function applyCSEnabledState() {
    csBuilder.style.pointerEvents = csEnabled.checked ? 'auto' : 'none';
    csBuilder.style.opacity = csEnabled.checked ? '1' : '0.5';
}

function toggleVideoPosterField() {
    const posterGroup = document.getElementById('video-poster-group')!;
    posterGroup.style.display = inputs['p-media-type'].value === 'video' ? 'flex' : 'none';
}

// --- CASE STUDY CUSTOM BLOCKS LOGIC ---

function renderCSBlocks() {
    csBlocksContainer.innerHTML = '';
    
    if (csBlocks.length === 0) {
        csBlocksContainer.innerHTML = '<p style="color:#666; font-size:0.9rem;">No blocks added yet. Use the dropdown below to start building.</p>';
        return;
    }

    csBlocks.forEach((block, idx) => {
        const el = document.createElement('div');
        el.className = 'cs-block-editor';
        el.style.cssText = 'background:#151515; padding:1.5rem; border-radius:12px; border:1px solid #333; position:relative;';
        
        let headerHtml = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding-bottom:1rem; border-bottom:1px solid #222;">
                <strong style="color:#aaa; text-transform:uppercase; font-size:0.8rem;">${block.type.replace('-', ' ')}</strong>
                <div style="display:flex; gap:0.5rem;">
                    <button class="action-btn" onclick="window.moveCSBlock(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>↑</button>
                    <button class="action-btn" onclick="window.moveCSBlock(${idx}, 1)" ${idx === csBlocks.length - 1 ? 'disabled' : ''}>↓</button>
                    <button class="action-btn danger" onclick="window.deleteCSBlock(${idx})">X</button>
                </div>
            </div>
        `;

        let bodyHtml = '';

        if (block.type === 'info-grid') {
            let rowsHtml = (block.data as any[]).map((row, rIdx) => `
                <div style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">
                    <input type="text" class="cms-input" placeholder="Label" value="${row.label}" oninput="window.updateBlockData(${idx}, 'infoGridLabel', ${rIdx}, this.value)">
                    <input type="text" class="cms-input" placeholder="Value" value="${row.value}" oninput="window.updateBlockData(${idx}, 'infoGridValue', ${rIdx}, this.value)">
                    <button class="action-btn danger" onclick="window.deleteBlockRow(${idx}, ${rIdx})">X</button>
                </div>
            `).join('');
            bodyHtml = `
                <div style="display:flex; flex-direction:column;">
                    ${rowsHtml}
                    <button class="btn-secondary" style="align-self:flex-start; margin-top:0.5rem;" onclick="window.addBlockRow(${idx})">+ Add Pair</button>
                </div>
            `;
        } 
        else if (block.type === 'hero-image') {
            bodyHtml = `
                <input type="text" class="cms-input" placeholder="Image URL" value="${block.data}" oninput="window.updateBlockData(${idx}, 'heroUrl', 0, this.value)">
                <div class="form-group upload-zone" style="margin-top:1rem; padding:1rem;" onclick="document.getElementById('file-upload-${idx}').click()">
                    Upload Image
                </div>
                <input type="file" id="file-upload-${idx}" style="display:none;" accept="image/*" onchange="window.uploadBlockFile(event, ${idx}, 'heroUrl')">
            `;
        }
        else if (block.type === 'content-split') {
            bodyHtml = `
                <input type="text" class="cms-input" placeholder="Section Title" value="${block.data.title}" style="margin-bottom:0.8rem" oninput="window.updateBlockData(${idx}, 'splitTitle', 0, this.value)">
                <div id="quill-editor-${idx}"></div>
            `;
        }
        else if (block.type === 'text-block') {
            bodyHtml = `
                <div id="quill-editor-${idx}"></div>
            `;
        }
        else if (block.type === 'gallery') {
            let imgsHtml = (block.data as string[]).map((url, gIdx) => `
                <div style="display:flex; gap:0.5rem; align-items:center; margin-bottom:0.5rem;">
                    <img src="${url}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
                    <input type="text" class="cms-input" value="${url}" oninput="window.updateBlockData(${idx}, 'galleryUrl', ${gIdx}, this.value)">
                    <button class="action-btn danger" onclick="window.deleteBlockRow(${idx}, ${gIdx})">X</button>
                </div>
            `).join('');
            bodyHtml = `
                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    ${imgsHtml}
                    <div style="display:flex; gap:1rem; margin-top:0.5rem;">
                        <button class="btn-secondary" onclick="window.addBlockRow(${idx})">+ Add Empty URL</button>
                        <button class="btn-secondary" onclick="document.getElementById('file-upload-${idx}').click()">+ Upload to Gallery</button>
                    </div>
                </div>
                <input type="file" id="file-upload-${idx}" style="display:none;" accept="image/*" onchange="window.uploadBlockFile(event, ${idx}, 'gallery')">
            `;
        }
        else if (block.type === 'testimonials') {
             let rowsHtml = (block.data as any[]).map((row, rIdx) => `
                <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1rem; padding:1rem; background:#111; border-radius:8px;">
                    <textarea class="cms-input" placeholder="Quote (e.g. Set it up once...)" rows="3" oninput="window.updateBlockData(${idx}, 'testQuote', ${rIdx}, this.value)">${row.quote}</textarea>
                    <input type="text" class="cms-input" placeholder="Author Info (e.g. — Adebisi K.)" value="${row.author}" oninput="window.updateBlockData(${idx}, 'testAuthor', ${rIdx}, this.value)">
                    <button class="action-btn danger" style="align-self:flex-end;" onclick="window.deleteBlockRow(${idx}, ${rIdx})">Remove Quote</button>
                </div>
            `).join('');
            bodyHtml = `
                <div style="display:flex; flex-direction:column;">
                    ${rowsHtml}
                    <button class="btn-secondary" style="align-self:flex-start; margin-top:0.5rem;" onclick="window.addBlockRow(${idx})">+ Add Testimonial</button>
                </div>
            `;
        }
        else if (block.type === 'device-carousel') {
             let rowsHtml = (block.data as any[]).map((row, rIdx) => `
                <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1rem; padding:1rem; background:#111; border-radius:8px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h4 style="margin:0; color:#fff; font-size:0.9rem;">Slide ${rIdx + 1}</h4>
                        <button class="action-btn danger" style="padding:0.3rem 0.6rem; font-size:0.8rem;" onclick="window.deleteBlockRow(${idx}, ${rIdx})">Remove</button>
                    </div>
                    <select class="cms-input" onchange="window.updateBlockData(${idx}, 'deviceType', ${rIdx}, this.value)">
                        <option value="mobile" ${row.device === 'mobile' ? 'selected' : ''}>Mobile App (iPhone)</option>
                        <option value="desktop" ${row.device === 'desktop' ? 'selected' : ''}>Desktop / Web App</option>
                    </select>
                    <input type="text" class="cms-input" placeholder="Phase Title (e.g. ALL-IN-ONE HOMEPAGE)" value="${row.title}" oninput="window.updateBlockData(${idx}, 'deviceTitle', ${rIdx}, this.value)">
                    <textarea class="cms-input" placeholder="Description..." rows="2" oninput="window.updateBlockData(${idx}, 'deviceText', ${rIdx}, this.value)">${row.text}</textarea>
                    <div style="display:flex; gap:0.5rem; align-items:center;">
                        <input type="text" class="cms-input" placeholder="Mockup Image URL" value="${row.image}" oninput="window.updateBlockData(${idx}, 'deviceImage', ${rIdx}, this.value)">
                        <label class="btn-secondary" style="margin:0; padding:0.6rem; cursor:pointer; flex-shrink:0;">
                            Upload Img
                            <input type="file" accept="image/*" style="display:none;" onchange="window.uploadBlockFile(event, ${idx}, 'deviceImage', ${rIdx})">
                        </label>
                    </div>
                </div>
            `).join('');
            bodyHtml = `
                <div style="display:flex; flex-direction:column;">
                    ${rowsHtml}
                    <button class="btn-secondary" style="align-self:flex-start; margin-top:0.5rem;" onclick="window.addBlockRow(${idx})">+ Add Slide to Carousel</button>
                </div>
            `;
        }

        el.innerHTML = headerHtml + bodyHtml;
        csBlocksContainer.appendChild(el);

        if (block.type === 'content-split' || block.type === 'text-block') {
            const quill = new Quill(`#quill-editor-${idx}`, {
                theme: 'snow',
                modules: { toolbar: [[{'header': [2, 3, 4, false]}], ['bold', 'italic', 'underline'], [{'list': 'ordered'}, {'list': 'bullet'}], ['clean']] }
            });

            let contentText = block.type === 'content-split' ? block.data.text : block.data.text;
            if (contentText && !contentText.trim().startsWith('<')) {
                contentText = processRichText(contentText);
            }
            quill.root.innerHTML = contentText || '';

            quill.on('text-change', () => {
                const html = quill.root.innerHTML;
                if (block.type === 'content-split') (window as any).updateBlockData(idx, 'splitText', 0, html);
                else (window as any).updateBlockData(idx, 'textBlock', 0, html);
            });
        }
    });
}

(window as any).moveCSBlock = (idx: number, dir: number) => {
    const temp = csBlocks[idx];
    csBlocks[idx] = csBlocks[idx + dir];
    csBlocks[idx + dir] = temp;
    renderCSBlocks();
    updateLivePreview();
}

(window as any).deleteCSBlock = (idx: number) => {
    csBlocks.splice(idx, 1);
    renderCSBlocks();
    updateLivePreview();
}

(window as any).updateBlockData = (blockIdx: number, fieldType: string, arrIdx: number, val: string) => {
    let b = csBlocks[blockIdx];
    if (fieldType === 'infoGridLabel') b.data[arrIdx].label = val;
    else if (fieldType === 'infoGridValue') b.data[arrIdx].value = val;
    else if (fieldType === 'heroUrl') b.data = val;
    else if (fieldType === 'splitTitle') b.data.title = val;
    else if (fieldType === 'splitText') b.data.text = val;
    else if (fieldType === 'textBlock') b.data = typeof b.data === 'string' ? val : {text: val};
    else if (fieldType === 'galleryUrl') b.data[arrIdx] = val;
    else if (fieldType === 'testQuote') b.data[arrIdx].quote = val;
    else if (fieldType === 'testAuthor') b.data[arrIdx].author = val;
    else if (fieldType === 'deviceType') b.data[arrIdx].device = val;
    else if (fieldType === 'deviceTitle') b.data[arrIdx].title = val;
    else if (fieldType === 'deviceText') b.data[arrIdx].text = val;
    else if (fieldType === 'deviceImage') b.data[arrIdx].image = val;
    updateLivePreview();
}

(window as any).addBlockRow = (blockIdx: number) => {
    let b = csBlocks[blockIdx];
    if (b.type === 'info-grid') b.data.push({label:'', value:''});
    else if (b.type === 'gallery') b.data.push('');
    else if (b.type === 'testimonials') b.data.push({quote:'', author:''});
    else if (b.type === 'device-carousel') b.data.push({device:'mobile', title:'', text:'', image:''});
    renderCSBlocks();
}

(window as any).deleteBlockRow = (blockIdx: number, arrIdx: number) => {
    let b = csBlocks[blockIdx];
    if (Array.isArray(b.data)) {
        b.data.splice(arrIdx, 1);
        renderCSBlocks();
        updateLivePreview();
    }
}

btnAddBlock.addEventListener('click', () => {
    const type = blockTypeSelect.value;
    let newBlock: any = { type, data: null };
    
    if (type === 'info-grid') newBlock.data = [{label:'', value:''}];
    else if (type === 'hero-image') newBlock.data = '';
    else if (type === 'content-split') newBlock.data = { title: '', text: '' };
    else if (type === 'text-block') newBlock.data = { text: '' };
    else if (type === 'gallery') newBlock.data = [];
    else if (type === 'testimonials') newBlock.data = [{quote: '', author: ''}];
    else if (type === 'device-carousel') newBlock.data = [{device: 'mobile', title: '', text: '', image: ''}];

    csBlocks.push(newBlock);
    renderCSBlocks();
    updateLivePreview();
});

// File Upload Utility for blocks
(window as any).uploadBlockFile = async (e: Event, blockIdx: number, targetField: string, arrIdx?: number) => {
    const target = e.target as HTMLInputElement;
    if(!target.files || !target.files[0]) return;
    editorStatus.innerText = 'Uploading asset...';
    editorStatus.style.color = '#ff4a5a';
    
    const file = target.files[0];
    const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file);
    
    if(!error) {
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
        let b = csBlocks[blockIdx];
        if (targetField === 'heroUrl') b.data = data.publicUrl;
        else if (targetField === 'gallery') b.data.push(data.publicUrl);
        else if (targetField === 'deviceImage' && typeof arrIdx === 'number') b.data[arrIdx].image = data.publicUrl;
        
        renderCSBlocks();
        updateLivePreview();
        editorStatus.innerText = 'Asset uploaded!';
    } else {
        editorStatus.innerText = 'Upload failed: ' + error.message;
    }
}

// Global Cover Media Upload
async function handleFileUpload(e: Event, _inputElName?: string) {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;
    const file = target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    editorStatus.innerText = 'Uploading...';
    editorStatus.style.color = '#ff4a5a';

    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file);

    if (error) { editorStatus.innerText = 'Upload failed'; return; }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    inputs['p-media-url'].value = data.publicUrl;
    
    if (['mp4', 'webm', 'mov'].includes(fileExt?.toLowerCase() || '')) inputs['p-media-type'].value = 'video';
    else inputs['p-media-type'].value = 'image';
    
    toggleVideoPosterField();
    editorStatus.innerText = 'Upload complete!';
    editorStatus.style.color = '#10b981';
    updateLivePreview();
}

// --- HTML GENERATORS ---

function generateCardHTML(): string {
    const title = inputs['p-title'].value || 'Project Title';
    const subtitle = inputs['p-subtitle'].value || 'Project Subtitle';
    const type = inputs['p-type'].value;
    const mediaType = inputs['p-media-type'].value;
    const mediaUrl = inputs['p-media-url'].value || 'https://via.placeholder.com/800x500?text=Media+Placeholder';
    const videoPoster = inputs['p-video-poster'].value || '';
    const liveUrl = inputs['p-live'].value || '#';
    const caseUrl = inputs['p-case'].value || '#';
    const imgClass = inputs['p-class'].value || '';

    let mediaHTML = mediaType === 'video' ? 
        `<video src="${mediaUrl}" poster="${videoPoster}" class="${imgClass}" autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover;"></video>` : 
        `<img src="${mediaUrl}" alt="${title}" class="${imgClass}" style="width:100%; height:100%; object-fit:cover;">`;

    if (type === 'with-actions') {
        return `
        <div class="project-card" style="opacity: 1; transform: translateY(0); pointer-events:none;">
            <div class="card-image">${mediaHTML}
                <object class="card-actions">
                    ${liveUrl !== '#' ? `<a href="#" class="live-btn">LIVE SITE ↗</a>` : ''}
                    ${caseUrl !== '#' ? `<a href="#" class="live-btn case-study-btn">CASE STUDY</a>` : ''}
                </object>
            </div>
            <a href="#" class="card-info"><h3>${title}</h3><p>${subtitle}</p></a>
        </div>`;
    } 
    return `<a href="#" class="project-card" style="opacity:1; transform:translateY(0); pointer-events:none;"><div class="card-image">${mediaHTML}</div><div class="card-info"><h3>${title}</h3><p>${subtitle}</p></div></a>`;
}

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

function generatePageHTML(): string {
    const title = inputs['p-title'].value || 'Project Title';
    const subtitle = inputs['p-subtitle'].value || 'Project Subtitle';
    
    let blocksHtml = csBlocks.map(b => {
        if (b.type === 'info-grid') {
            const grid = (b.data as any[]).map(i => `<div><div class="cs-label-clean">${i.label}</div><div class="cs-value-clean">${i.value}</div></div>`).join('');
            return `<div class="cs-info-grid-clean">${grid}</div>`;
        }
        else if (b.type === 'hero-image') {
            return `<img src="${b.data || 'https://via.placeholder.com/1400x800'}" class="cs-hero-img-clean">`;
        }
        else if (b.type === 'content-split') {
            return `
            <div class="cs-content-wrapper" style="padding:0; margin-bottom:2rem;">
                <div class="content-split-clean">
                    <div><h3 class="cs-section-title-clean">${b.data.title}</h3></div>
                    <div class="cs-main-text-clean">${processRichText(b.data.text)}</div>
                </div>
            </div>`;
        }
        else if (b.type === 'text-block') {
             return `
             <div class="cs-content-wrapper" style="padding:0; margin-bottom:4rem;">
                <div class="cs-main-text-clean">${processRichText(b.data.text)}</div>
             </div>`;
        }
        else if (b.type === 'testimonials') {
             const items = (b.data as any[]).map(r => `
             <div class="gallery-item-clean" style="flex-direction:column; align-items:flex-start; justify-content:space-between; min-height:150px; flex:0 0 300px; background:#111; padding:2rem; border-radius:16px;">
                <p class="cs-text" style="color:#fff; font-size:1.1rem; font-style:italic;">"${r.quote}"</p>
                <p class="cs-label-clean" style="margin-top:2rem; margin-bottom:0;">${r.author}</p>
             </div>`).join('');
             return `
             <div class="cs-gallery-clean" style="padding:0; margin-bottom:4rem;">
                <div class="gallery-grid-clean" style="display:flex; overflow-x:auto; gap:1.5rem; scrollbar-width:none;">
                    ${items}
                </div>
             </div>`;
        }
        else if (b.type === 'gallery') {
            const imgs = (b.data as string[]).map(url => `<div class="gallery-item-clean"><img src="${url}"></div>`).join('');
            return `
            <div class="cs-gallery-clean" style="padding:0; margin-bottom:4rem;">
                <div class="gallery-grid-clean">
                    ${imgs}
                </div>
            </div>`;
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
                            <div class="device-mobile">
                                <img src="${s.image}" alt="${s.title}">
                            </div>
                        `}
                    </div>
                </div>
             `).join('');

             return `
             <section class="cs-carousel-section" style="margin-bottom:2rem;">
                 <button class="carousel-nav-btn prev" onclick="this.nextElementSibling.scrollBy({left: -(this.nextElementSibling.firstElementChild.offsetWidth + 48), behavior: 'smooth'})">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="3" fill="none"><path d="M15 18l-6-6 6-6"/></svg>
                 </button>
                 <div class="cs-carousel-track">
                     ${templateSlides}
                 </div>
                 <button class="carousel-nav-btn next" onclick="this.previousElementSibling.scrollBy({left: (this.previousElementSibling.firstElementChild.offsetWidth + 48), behavior: 'smooth'})">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="3" fill="none"><path d="M9 18l6-6-6-6"/></svg>
                 </button>
             </section>`;
        }
        return '';
    }).join('');

    return `
    <div style="background:#050505; color:#fff; font-family:'Inter', sans-serif; pointer-events:none; padding: 2rem;">
        <div class="cs-category-clean">CASE STUDY</div>
        <h1 class="cs-title-clean" style="color:#fff;">${subtitle && subtitle.length > 3 ? subtitle : title}</h1>
        ${blocksHtml}
    </div>
    `;
}

function updateLivePreview() {
    if (activeTab === 'page' && csEnabled.checked) {
        previewGrid.style.gridTemplateColumns = '1fr';
        previewGrid.innerHTML = generatePageHTML();
    } else {
        previewGrid.style.gridTemplateColumns = '1fr';
        previewGrid.innerHTML = generateCardHTML();
    }
}

async function handleSave() {
    btnSave.disabled = true;
    editorStatus.innerText = 'Saving...';

    const mediaType = inputs['p-media-type'].value;
    const csPayload = {
        enabled: csEnabled.checked,
        blocks: csBlocks // ONLY save blocks now, backward compatibility ensures old fields are mapped into blocks on load
    };

    const payload: any = {
        title: inputs['p-title'].value,
        subtitle: inputs['p-subtitle'].value,
        card_type: inputs['p-type'].value,
        live_url: inputs['p-live'].value,
        case_study_url: inputs['p-case'].value,
        media_type: mediaType,
        display_order: parseInt(inputs['p-order'].value, 10),
        image_class: inputs['p-class'].value,
        case_study_content: csPayload
    };

    if (mediaType === 'video') {
        payload.video_url = inputs['p-media-url'].value;
        payload.image_url = inputs['p-video-poster'].value || ''; 
    } else {
        payload.image_url = inputs['p-media-url'].value;
        payload.video_url = null;
    }

    let error, data;
    if (currentProject) {
        let res = await supabase.from('portfolio_projects').update(payload).eq('id', currentProject.id).select();
        error = res.error; data = res.data;
    } else {
        let res = await supabase.from('portfolio_projects').insert(payload).select();
        error = res.error; data = res.data;
    }

    // Auto-routing magic
    if (!error && data && data.length > 0 && csEnabled.checked) {
        const generatedUrl = `/case-study.html?id=${data[0].id}`;
        const currentLive = inputs['p-live'].value;
        const currentCase = inputs['p-case'].value;
        
        if (inputs['p-type'].value === 'internal-route') {
            if (!currentLive || currentLive.includes('/case-study.html')) {
                await supabase.from('portfolio_projects').update({ live_url: generatedUrl }).eq('id', data[0].id);
            }
        } else {
            if (!currentCase || currentCase.includes('/case-study.html')) {
                await supabase.from('portfolio_projects').update({ case_study_url: generatedUrl }).eq('id', data[0].id);
            }
        }
    }

    btnSave.disabled = false;

    if (error) { editorStatus.innerText = 'Error: ' + error.message; editorStatus.style.color = 'red'; } 
    else { editorStatus.innerText = 'Saved!'; editorStatus.style.color = '#10b981'; await loadProjects(); }
}

async function handleDelete() {
    if (!currentProject) return;
    if (!confirm('Are you sure you want to delete this project?')) return;
    btnDelete.disabled = true;
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', currentProject.id);
    btnDelete.disabled = false;
    if (error) { editorStatus.innerText = 'Error: ' + error.message; } 
    else { await loadProjects(); selectProject(null); }
}

function setupEventListeners() {
    tabCover.addEventListener('click', () => switchTab('cover'));
    tabPage.addEventListener('click', () => switchTab('page'));
    
    csEnabled.addEventListener('change', () => { applyCSEnabledState(); updateLivePreview(); });

    Object.values(inputs).forEach((input: any) => {
        input.addEventListener('input', updateLivePreview);
        input.addEventListener('change', updateLivePreview);
    });

    inputs['p-media-type'].addEventListener('change', toggleVideoPosterField);
    btnAddNew.addEventListener('click', () => selectProject(null));
    btnSave.addEventListener('click', handleSave);
    btnDelete.addEventListener('click', handleDelete);
    fileInput.addEventListener('change', (e) => handleFileUpload(e, 'p-media-url'));
    
    btnLogout.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    });
}

init();
