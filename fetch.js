const fs = require('fs');
const url = 'https://hdcqgpfpwkkejdgbgbkd.supabase.co/rest/v1/projects?id=eq.d3aab849-1f7c-4a70-a66f-25f9ebcd09b9';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY3FncGZwd2trZWpkZ2JnYmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjM2MDcsImV4cCI6MjA4OTQzOTYwN30.OksanVRlDMF0OSj7egpj3qxUg1EUg41PfvDnh0_bvYA';
fetch(url, { headers: { 'apikey': key, 'Authorization': 'Bearer ' + key } })
  .then(res => res.json())
  .then(data => fs.writeFileSync('test.json', JSON.stringify(data[0].sections, null, 2)))
  .catch(err => console.error(err));
