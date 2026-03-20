import { createClient } from '@supabase/supabase-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const supabaseUrl = 'https://hdcqgpfpwkkejdgbgbkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3FncGZwd2trZWpkZ2JnYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjM2MDcsImV4cCI6MjA4OTQzOTYwN30.OksanVRlDMF0OSj7egpj3qxUg1EUg41PfvDnh0_bvYA';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Fetch & Render Projects ---
export async function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    try {
        const { data: projects, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) throw error;

        grid.innerHTML = ''; // clear loading state

        projects.forEach((proj: any) => {
            const mediaUrl = proj.media_type === 'video' ? proj.video_url : proj.image_url;
            const imgClass = proj.image_class || (proj.card_type === 'internal-route' ? 'bg-cover project-card-img' : '');
            
            let mediaHTML = '';
            if (proj.media_type === 'video') {
                mediaHTML = `<video src="${mediaUrl}" poster="${proj.image_url || ''}" class="${imgClass}" autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover;"></video>`;
            } else {
                mediaHTML = `<img src="${mediaUrl}" alt="${proj.title}" class="${imgClass}">`;
            }

            if (proj.card_type === 'with-actions') {
                grid.innerHTML += `
                <div class="project-card reveal-text" data-id="${proj.id}">
                    <div class="card-image">
                        ${mediaHTML}
                        <object class="card-actions">
                            ${proj.live_url ? `<a href="${proj.live_url}" target="_blank" rel="noopener noreferrer" class="live-btn">LIVE SITE ↗</a>` : ''}
                            ${proj.case_study_url ? `<a href="${proj.case_study_url}" target="_blank" rel="noopener noreferrer" class="live-btn case-study-btn">CASE STUDY</a>` : ''}
                        </object>
                    </div>
                    <a href="${proj.case_study_url || proj.live_url || '#'}" target="_blank" rel="noopener noreferrer" class="card-info">
                        <h3>${proj.title}</h3>
                        <p>${proj.subtitle}</p>
                    </a>
                </div>`;
            } else if (proj.card_type === 'internal-route') {
                grid.innerHTML += `
                <a href="${proj.live_url}" class="project-card reveal-text" data-id="${proj.id}">
                    <div class="card-image">
                        ${mediaHTML}
                    </div>
                    <div class="card-info">
                        <h3>${proj.title}</h3>
                        <p>${proj.subtitle}</p>
                    </div>
                </a>`;
            } else {
                // external-link
                grid.innerHTML += `
                <a href="${proj.live_url}" target="_blank" rel="noopener noreferrer" class="project-card reveal-text" data-id="${proj.id}">
                    <div class="card-image">${mediaHTML}</div>
                    <div class="card-info">
                        <h3>${proj.title}</h3>
                        <p>${proj.subtitle}</p>
                    </div>
                </a>`;
            }
        });

        // Ensure elements become visible immediately to avoid blank sections
        setTimeout(() => {
            gsap.to(".project-card", { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" });
        }, 100);

    } catch (err) {
        grid.innerHTML = '<div style="text-align:center; padding: 2rem;">Error loading projects.</div>';
    }
}

// --- Admin CMS ---
let clickCount = 0;
let clickTimer: any = null;

export function initCMS() {
    renderPortfolio();

    const footerBotLeft = document.querySelector('.bot-left'); // '© 2026 KELVIN EDIMEH'
    if (footerBotLeft) {
        footerBotLeft.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                clickCount = 0;
                checkSessionAndShowAdmin();
            }
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => { clickCount = 0; }, 2000);
        });
        (footerBotLeft as HTMLElement).style.cursor = 'pointer';
    }
}

async function checkSessionAndShowAdmin() {
    showLoginModal();
}

function showLoginModal() {
    if(document.getElementById('cms-styles')) return;
    const style = document.createElement('style');
    style.id = 'cms-styles';
    style.innerHTML = `
        .cms-modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items:center; justify-content:center; }
        .cms-modal { background: #111; padding: 2rem; border-radius: 8px; border: 1px solid #333; width: 90%; max-width: 500px; color: #fff; max-height: 90vh; overflow-y: auto;}
        .cms-modal h2 { margin-top: 0; font-family: 'Syne', sans-serif;}
        .cms-input { width: 100%; padding: 10px; margin-bottom: 15px; background: #222; border: 1px solid #444; color: #fff; border-radius: 4px; box-sizing:border-box; }
        .cms-btn { padding: 10px 20px; background: #fff; color: #000; border: none; cursor: pointer; font-weight: bold; border-radius: 4px; }
        .cms-btn:hover { background: #ddd; }
        .cms-close { float: right; cursor: pointer; font-size: 1.5rem; line-height: 1; }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'cms-modal-overlay';
    overlay.innerHTML = `
        <div class="cms-modal">
            <span class="cms-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Admin Access</h2>
            <div style="margin-bottom: 15px; font-size:0.9rem; color:#888;">Enter master password. Redirecting to secure dashboard.</div>
            <input type="password" id="cms-password" class="cms-input" placeholder="Password">
            <button id="cms-login-btn" class="cms-btn">Login</button>
            <p id="cms-login-error" style="color:red; margin-top:10px; display:none;"></p>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('cms-login-btn')?.addEventListener('click', async () => {
        const pass = (document.getElementById('cms-password') as HTMLInputElement).value;
        const errEl = document.getElementById('cms-login-error')!;
        errEl.style.display = 'none';

        if (pass !== 'KelvinDash2026@') {
            errEl.innerText = 'Invalid Admin Password';
            errEl.style.display = 'block';
            return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            overlay.remove();
            window.location.href = '/admin.html';
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email: 'kelvinedimeh@gmail.com', password: pass });
        
        if (error) {
            errEl.innerText = error.message;
            errEl.style.display = 'block';
        } else {
            overlay.remove();
            window.location.href = '/admin.html';
        }
    });

    // Handle enter key
    document.getElementById('cms-password')?.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') document.getElementById('cms-login-btn')?.click();
    });
}
