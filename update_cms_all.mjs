import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdcqgpfpwkkejdgbgbkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3FncGZwd2trZWpkZ2JnYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjM2MDcsImV4cCI6MjA4OTQzOTYwN30.OksanVRlDMF0OSj7egpj3qxUg1EUg41PfvDnh0_bvYA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    await supabase.auth.signInWithPassword({
        email: 'kelvinedimeh@gmail.com',
        password: 'KelvinDash2026@'
    });

    const { data: projects } = await supabase.from('portfolio_projects').select('*');
    
    if (!projects) {
        console.log("No projects found or connection failed.");
        return;
    }

    const seniorSections = [
        {
            title: '1. Overview',
            text: '<p class="cs-text">[Provide a high-level summary of the project. What is the product? Who is it for, and what was your primary objective during this engagement?]</p>'
        },
        {
            title: '2. The Business Problem',
            text: '<p class="cs-text">[Describe the business challenge. e.g., The company was experiencing high churn rates during onboarding because the existing flow was too complex, leading to a loss in potential MRR.]</p>'
        },
        {
            title: '3. The User Problem',
            text: '<p class="cs-text">[Describe the user\'s pain points. e.g., Users felt overwhelmed by the data presentation and lacked clear actionable steps when logging into the dashboard.]</p>'
        },
        {
            title: '4. Research & Insights',
            text: `<p class="cs-text">[Discuss your research methodology. Did you conduct user interviews, surveys, or competitor analysis? List 2-3 key insights discovered.]</p>
                   <p class="cs-text">[Placeholder for User Persona / Journey Map Image]</p>`
        },
        {
            title: '5. Design Process & Wireframes',
            text: `<p class="cs-text">[Explain how you translated insights into structure. Discuss information architecture and low-fidelity wireframing.]</p>
                   <p class="cs-text">[Placeholder for Wireframes / Lo-Fi Sketches]</p>`
        },
        {
            title: '6. Key Design Decisions',
            text: `<ul class="cs-list" style="margin-top: 1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
                        <li><strong style="color:#fff;">Decision 1:</strong> [Explain a specific UI/UX choice and why you made it.]</li>
                        <li><strong style="color:#fff;">Decision 2:</strong> [Explain a specific UI/UX choice and why you made it.]</li>
                        <li><strong style="color:#fff;">Decision 3:</strong> [Explain a specific UI/UX choice and why you made it.]</li>
                   </ul>`
        },
        {
            title: '7. The Final Solution',
            text: '<p class="cs-text">[Showcase the high-fidelity designs. Talk about the UI, typography, spacing, and component system.]</p>'
        },
        {
            title: '8. Results & Business Impact',
            text: `<ul class="cs-list" style="margin-top: 1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
                        <li><strong style="color:#fff;">Metric 1:</strong> [e.g., Increased conversion by 15%]</li>
                        <li><strong style="color:#fff;">Metric 2:</strong> [e.g., Reduced onboarding time by 30%]</li>
                   </ul>`
        }
    ];

    for (const proj of projects) {
        let cs = proj.case_study_content || {};
        
        // Ensure info_grid exists, if not create dummy
        if (!cs.info_grid) {
            cs.info_grid = [
                { label: 'ROLE', value: 'Lead Product Designer' },
                { label: 'TOOLS', value: 'Figma, FigJam' },
                { label: 'TIMELINE', value: '8 Weeks' }
            ];
        }

        // Replace sections with Senior Product Design template
        cs.sections = seniorSections;
        
        await supabase.from('portfolio_projects').update({case_study_content: cs}).eq('id', proj.id);
        console.log(`Successfully updated CMS data for: ${proj.title}`);
    }
}
run();
