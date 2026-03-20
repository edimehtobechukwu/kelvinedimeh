import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdcqgpfpwkkejdgbgbkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3FncGZwd2trZWpkZ2JnYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjM2MDcsImV4cCI6MjA4OTQzOTYwN30.OksanVRlDMF0OSj7egpj3qxUg1EUg41PfvDnh0_bvYA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    await supabase.auth.signInWithPassword({
        email: 'kelvinedimeh@gmail.com',
        password: 'KelvinDash2026@'
    });

    const infoGrid = [
        { label: 'COMPANY', value: 'RentBoss' },
        { label: 'ROLE', value: 'UX Designer + Flow' },
        { label: 'EXPERTISE', value: 'UX/UI Design' },
        { label: 'YEAR', value: '2024' }
    ];

    const sections = [
        {
            title: 'Project description',
            text: `<p class="cs-text">RentBoss connects renters to verified landlords for short and long stays. The goal was to make the booking journey trustworthy, fast, and flexible.</p>
<ul class="cs-list" style="margin-top: 1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
    <li><strong style="color:#fff;">Timeline:</strong> 8 weeks across design sprints</li>
    <li><strong style="color:#fff;">Background:</strong> Users complained about poor listings, unresponsive landlords, and confusing terms.</li>
    <li><strong style="color:#fff;">Why:</strong> Needed clear breakdown between short and long rentals. Listings needed trust indicators and verified info. Mobile-first users needed quicker booking paths.</li>
    <li><strong style="color:#fff;">How:</strong> Built trust-based profiles, booking calendar, and responsive filtering.</li>
    <li><strong style="color:#fff;">My Role:</strong> UX research, UI Design, Booking flow simplification, Style guide</li>
</ul>`
        },
        {
            title: 'Process',
            text: `<p class="cs-text">The goal was to make finding, comparing, and booking rental properties simple and stress-free whether for a weekend or a year.</p>
<ul class="cs-list" style="margin-top: 1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
    <li><strong style="color:#fff;">Discovery & Definement:</strong> Mapped out key user flows for booking. Ran tests on competitor platforms.</li>
    <li><strong style="color:#fff;">Ideation & Concepting:</strong> Designed modular listing cards. Created rating and ID-verification elements. Prototyped multi-step checkout.</li>
    <li><strong style="color:#fff;">Evaluation & Iteration:</strong> Improved search speed with keyword tagging. Added "flexible dates" and other filters.</li>
    <li><strong style="color:#fff;">Final Designs:</strong> Delivered handoff-ready assets. Created mobile-optimized modals. Used components for scalability.</li>
</ul>`
        },
        {
            title: 'Solution',
            text: `<p class="cs-text">A fast, easy-to-navigate app for all types of rentals. Key features include:</p>
<ul class="cs-list" style="margin-top: 1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
    <li><strong style="color:#fff;">Smart Filtering:</strong> Users can search by date, budget, duration, and location.</li>
    <li><strong style="color:#fff;">Verified Listings:</strong> Only approved properties with reviews are shown.</li>
    <li><strong style="color:#fff;">Saved Favorites:</strong> Users can bookmark homes and revisit them anytime.</li>
    <li><strong style="color:#fff;">Implementation:</strong> Worked with developers to create an intuitive layout and efficient navigation system.</li>
</ul>`
        },
        {
            title: 'Results',
            text: `<p class="cs-text">Here, the outcomes and achievements of the project are highlighted, including user feedback, adoption rates, and industry recognition.</p>
<ul class="cs-list" style="margin-top: 1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
    <li><strong style="color:#fff;">Faster Onboarding:</strong> Average onboarding time dropped by 40%.</li>
    <li><strong style="color:#fff;">Improved Trust:</strong> Clearer language helped users feel more confident with Web3/payments.</li>
    <li><strong style="color:#fff;">Sleek Visual Identity:</strong> The design set RentBoss apart from legacy rental apps.</li>
</ul>`
        },
        {
            title: 'Testimonials',
            text: `<div class="gallery-grid-clean" style="margin-top:1rem;">
    <div class="gallery-item-clean" style="flex-direction:column; align-items:flex-start; justify-content:space-between; min-height:150px;">
        <p class="cs-text" style="color:#fff; font-size:1.1rem; font-style:italic;">"Set it up once and forget it. My rent basically pays itself now."</p>
        <p class="cs-label-clean" style="margin-top:2rem; margin-bottom:0;">— Adebisi K.</p>
    </div>
    <div class="gallery-item-clean" style="flex-direction:column; align-items:flex-start; justify-content:space-between; min-height:150px;">
        <p class="cs-text" style="color:#fff; font-size:1.1rem; font-style:italic;">"Finally an app that understands how renting actually works in real life."</p>
        <p class="cs-label-clean" style="margin-top:2rem; margin-bottom:0;">— Emily R., Atlanta</p>
    </div>
    <div class="gallery-item-clean" style="flex-direction:column; align-items:flex-start; justify-content:space-between; min-height:150px;">
        <p class="cs-text" style="color:#fff; font-size:1.1rem; font-style:italic;">"Honestly, it’s the reminders for me. No more late fees, ever."</p>
        <p class="cs-label-clean" style="margin-top:2rem; margin-bottom:0;">— Facebook Post</p>
    </div>
    <div class="gallery-item-clean" style="flex-direction:column; align-items:flex-start; justify-content:space-between; min-height:150px;">
        <p class="cs-text" style="color:#fff; font-size:1.1rem; font-style:italic;">"Splitting rent with roommates used to be a nightmare RentBoss made it effortless."</p>
        <p class="cs-label-clean" style="margin-top:2rem; margin-bottom:0;">— Tasha M., Apapa</p>
    </div>
</div>`
        }
    ];

    const { data: proj } = await supabase.from('portfolio_projects').select('case_study_content').eq('title', 'RentBoss').single();
    if(proj) {
        let cs = proj.case_study_content;
        cs.info_grid = infoGrid;
        cs.sections = sections;
        await supabase.from('portfolio_projects').update({case_study_content: cs}).eq('title','RentBoss');
        console.log('Successfully updated RentBoss CMS data!');
    }
}
run();
