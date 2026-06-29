import re

case_studies = [
    ('rentboss.html', 'RentBoss', 'Property Management Dashboard'),
    ('swittea.html', 'Swittea', 'E-commerce App for Tea Enthusiasts'),
    ('kml.html', 'KML', 'Logistics Management Platform'),
    ('lumenone.html', 'LumenOne', 'EdTech Learning Management System')
]

senior_template = """
    <!-- Main Dynamic Content Container -->
    <main id="cs-main-container" style="padding-top: 120px;">
        <!-- Hero Section -->
        <section class="cs-hero-clean" style="padding-bottom: 3rem;">
            <div class="cs-container-clean">
                <div class="cs-category-clean" style="color: var(--accent); font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">{project_type}</div>
                <h1 class="cs-title-clean" style="font-size: clamp(3rem, 5vw, 4.5rem); margin-top: 1rem; line-height: 1.1;">{project_name}</h1>
                <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin-top: 1.5rem;">A comprehensive product design case study focusing on UX research, wireframing, and creating a scalable design system.</p>
            </div>
        </section>

        <!-- Hero Image (Placeholder) -->
        <section class="cs-visual" style="padding: 0 5%; max-width: 1400px; margin: 0 auto 5rem; display:block;">
            <div style="width: 100%; aspect-ratio: 16/9; background: var(--surface); border-radius: 20px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border);">
                <p style="color: var(--text-muted);">[Insert Final Product Hero Image Here]</p>
            </div>
        </section>

        <!-- Info Grid (Tools, Role, Timeline) -->
        <section class="cs-container-clean" style="margin-bottom: 5rem;">
            <div class="cs-info-grid-clean" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 2rem 0;">
                <div>
                    <h5 style="color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Role</h5>
                    <p style="font-weight: 500;">Lead Product Designer</p>
                </div>
                <div>
                    <h5 style="color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Timeline</h5>
                    <p style="font-weight: 500;">[X] Weeks</p>
                </div>
                <div>
                    <h5 style="color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Tools Used</h5>
                    <p style="font-weight: 500;">Figma, FigJam, Framer</p>
                </div>
                <div>
                    <h5 style="color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Platform</h5>
                    <p style="font-weight: 500;">Web & Mobile iOS</p>
                </div>
            </div>
        </section>

        <!-- The Content Structure -->
        <div class="cs-container-clean" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 4rem; padding-bottom: 100px;">
            
            <!-- Overview -->
            <div>
                <h3 style="font-size: 2rem; font-family: var(--font-head); margin-bottom: 1rem;">1. Overview</h3>
                <p style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem;">[Provide a high-level summary of the project. What is {project_name}? Who is it for, and what was your primary objective during this engagement?]</p>
            </div>

            <!-- Business Problem -->
            <div>
                <h3 style="font-size: 2rem; font-family: var(--font-head); margin-bottom: 1rem;">2. The Business Problem</h3>
                <p style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem;">[Describe the business challenge. e.g., The company was experiencing high churn rates during onboarding because the existing flow was too complex, leading to a loss in potential MRR.]</p>
            </div>

            <!-- User Problem -->
            <div>
                <h3 style="font-size: 2rem; font-family: var(--font-head); margin-bottom: 1rem;">3. The User Problem</h3>
                <p style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem;">[Describe the user's pain points. e.g., Users felt overwhelmed by the data presentation and lacked clear actionable steps when logging into the dashboard.]</p>
            </div>

            <!-- Research Insights -->
            <div>
                <h3 style="font-size: 2rem; font-family: var(--font-head); margin-bottom: 1rem;">4. Research & Insights</h3>
                <p style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem;">[Discuss your research methodology. Did you conduct user interviews, surveys, or competitor analysis? List 2-3 key insights discovered.]</p>
                <div style="width: 100%; height: 300px; background: var(--surface); border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); margin-top: 2rem;">
                    <p style="color: var(--text-muted);">[Insert User Persona / Journey Map Image]</p>
                </div>
            </div>

            <!-- Design Process & Wireframes -->
            <div>
                <h3 style="font-size: 2rem; font-family: var(--font-head); margin-bottom: 1rem;">5. Design Process & Wireframes</h3>
                <p style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem;">[Explain how you translated insights into structure. Discuss information architecture and low-fidelity wireframing.]</p>
                <div style="width: 100%; height: 400px; background: var(--surface); border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); margin-top: 2rem;">
                    <p style="color: var(--text-muted);">[Insert Wireframes / Lo-Fi Sketches]</p>
                </div>
            </div>

            <!-- Design Decisions -->
            <div>
                <h3 style="font-size: 2rem; font-family: var(--font-head); margin-bottom: 1rem;">6. Key Design Decisions</h3>
                <ul style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                    <li><strong>Decision 1:</strong> [Explain a specific UI/UX choice and why you made it.]</li>
                    <li><strong>Decision 2:</strong> [Explain a specific UI/UX choice and why you made it.]</li>
                    <li><strong>Decision 3:</strong> [Explain a specific UI/UX choice and why you made it.]</li>
                </ul>
            </div>

            <!-- Final Solution -->
            <div>
                <h3 style="font-size: 2rem; font-family: var(--font-head); margin-bottom: 1rem;">7. The Final Solution</h3>
                <p style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem;">[Showcase the high-fidelity designs. Talk about the UI, typography, spacing, and component system.]</p>
                <div style="width: 100%; height: 500px; background: var(--surface); border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); margin-top: 2rem;">
                    <p style="color: var(--text-muted);">[Insert Hi-Fi Mocks / Prototype GIF]</p>
                </div>
            </div>

            <!-- Results & Impact -->
            <div>
                <h3 style="font-size: 2rem; font-family: var(--font-head); margin-bottom: 1rem;">8. Results & Business Impact</h3>
                <p style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem;">[What was the outcome? Use metrics if possible (e.g., Increased conversion by 15%, reduced onboarding time by 30%).]</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem;">
                    <div style="background: var(--surface); padding: 2rem; border-radius: 12px; border: 1px solid var(--border); text-align: center;">
                        <h2 style="font-size: 2.5rem; color: var(--accent); margin-bottom: 0.5rem;">[XX]%</h2>
                        <p style="color: var(--text-muted);">Increase in Metric</p>
                    </div>
                    <div style="background: var(--surface); padding: 2rem; border-radius: 12px; border: 1px solid var(--border); text-align: center;">
                        <h2 style="font-size: 2.5rem; color: var(--accent); margin-bottom: 0.5rem;">[XX]%</h2>
                        <p style="color: var(--text-muted);">Decrease in Churn</p>
                    </div>
                </div>
            </div>

        </div>
    </main>
"""

for filename, proj_name, proj_type in case_studies:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the main container completely
        new_main = senior_template.replace('{project_name}', proj_name).replace('{project_type}', proj_type)
        content = re.sub(r'<main id="cs-main-container">.*?</main>', new_main, content, flags=re.DOTALL)
        
        # Update title meta
        content = re.sub(r'<title>.*?</title>', f'<title>{proj_name} - Case Study | Kelvin Edimeh</title>', content, flags=re.DOTALL)
        
        # Remove supabase script imports if they exist to prevent it from overwriting the HTML
        content = re.sub(r'<script type="module" src="/src/case-study.ts"></script>', '<!-- <script type="module" src="/src/case-study.ts"></script> -->', content)
        content = re.sub(r'<script>\s*window\.PROJECT_ID.*?</script>', '', content, flags=re.DOTALL)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f'Optimized {filename}')
    except Exception as e:
        print(f"Error on {filename}: {e}")
