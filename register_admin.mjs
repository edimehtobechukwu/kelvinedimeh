import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdcqgpfpwkkejdgbgbkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3FncGZwd2trZWpkZ2JnYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjM2MDcsImV4cCI6MjA4OTQzOTYwN30.OksanVRlDMF0OSj7egpj3qxUg1EUg41PfvDnh0_bvYA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function registerAdmin() {
    console.log("Registering admin user...");
    const { data, error } = await supabase.auth.signUp({
        email: 'kelvinedimeh@gmail.com',
        password: 'KelvinDash2026@'
    });
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Success! User ID:", data.user?.id);
        console.log("If email confirmation is required, you must verify the email. Checking identities...");
        console.log(data);
    }
}

registerAdmin();
