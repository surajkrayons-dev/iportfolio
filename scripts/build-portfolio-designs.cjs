// Rebuild the three standalone designs from the main portfolio's current content.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const output = path.join(root, 'designs');
fs.mkdirSync(output, { recursive: true });
const intro = `<p class="desc">I'm Suraj Verma, a full stack developer building web applications with Laravel, React.js and Next.js. From REST APIs to payment integrations, I turn ideas into working products.</p>`;
const actions = `<div class="btn-row"><a href="#portfolio" class="btn solid">Explore my work</a><a href="mailto:surajv2344@gmail.com" class="btn outline">Let's talk</a></div><p class="hero-note"><strong>Based in India.</strong> Available for freelance projects &amp; full-time roles.</p>`;
const caption = `<div class="visual-caption"><img src="../assets/img/my-profile-img.jpg" alt="Suraj Verma"><div><strong>Suraj Verma</strong>Full Stack Developer · BCA</div></div>`;
const dots = `<div class="window-bar" aria-hidden="true"><i></i><i></i><i></i><span>suraj / developer</span></div>`;
const designs = [
  {id:'terminal',name:'Terminal',hero:`<section class="hero" id="hero"><div class="wrap"><div data-aos="fade-up"><span class="tag">Available for work</span><h1>Good code.<br>Real products.<br><em>Built to scale.</em></h1>${intro}${actions}</div><div class="hero-visual" data-aos="fade-up" data-aos-delay="150"><div class="code-window"><div class="window-bar" aria-hidden="true"><i></i><i></i><i></i><span>suraj@portfolio: ~</span></div><div class="code-body"><p class="muted"># A little about me</p><p><span class="accent">❯</span> whoami</p><p class="value">Suraj Verma / Full Stack Developer</p><br><p><span class="accent">❯</span> cat skills.json</p><p>{</p><p class="indent">"backend": <span class="value">"Laravel, PHP, MySQL"</span>,</p><p class="indent">"frontend": <span class="value">"React.js, Next.js"</span>,</p><p class="indent">"focus": <span class="value">"APIs &amp; web applications"</span></p><p>}</p><p class="command"><span class="accent">❯</span> ready to build <span class="cursor" aria-hidden="true"></span></p></div></div>${caption}</div></div></section>`},
  {id:'studio',name:'Code Studio',hero:`<section class="hero" id="hero"><div class="wrap"><div data-aos="fade-up"><span class="tag">Full Stack Developer</span><h1>Your next idea.<br><em>Thoughtfully</em><br>engineered.</h1>${intro}${actions}</div><div class="hero-visual" data-aos="fade-up" data-aos-delay="150"><div class="code-window">${dots}<div class="editor-tab"><span>TS</span> developer.ts</div><div class="code-body"><p class="muted">// Ideas → code → production</p><br><p><span class="accent">const</span> developer = {</p><p class="indent">name: <span class="value">'Suraj Verma'</span>,</p><p class="indent">role: <span class="value">'Full Stack Developer'</span>,</p><p class="indent">stack: [</p><p class="indent">&nbsp; <span class="value">'Laravel', 'React', 'Next.js'</span></p><p class="indent">],</p><p class="indent">build: <span class="accent">async</span> (idea) =&gt; {</p><p class="indent">&nbsp; <span class="accent">return</span> ship(idea);</p><p class="indent">}</p><p>};</p><br><p class="muted">✓ Ready for the next challenge</p></div></div>${caption}</div></div></section>`},
  {id:'orbit',name:'Orbit',hero:`<section class="hero" id="hero"><div class="wrap"><div data-aos="fade-up"><span class="tag">Open to new opportunities</span><h1>From concept<br>to code.<br><em>To launch.</em></h1>${intro}${actions}</div><div class="hero-visual orbit-stage" data-aos="fade-up" data-aos-delay="150"><span class="floating-stack" aria-hidden="true">&lt; Laravel / React / Next.js &gt;</span><div class="photo-frame"><img src="../assets/img/my-profile-img.jpg" alt="Suraj Verma, Full Stack Developer"><div class="photo-meta"><div><span class="k">Speciality</span>Full Stack</div><div><span class="k">Education</span>BCA</div><div><span class="k">Based in</span>India</div><div><span class="k">Status</span>Let's build</div></div></div></div></div></section>`}
];
for (const design of designs) {
  let html = source
    .replace(/^[ \t]*<link\b[^>]*\bdata-home-styles[^>]*>\r?\n/gm, '')
    .replace(/(src|href)="assets\//g, '$1="../assets/')
    .replace(/<title>.*?<\/title>/, `<title>Suraj Verma | ${design.name} Portfolio</title>`)
    .replace('<body>', `<body data-design="${design.id}">`)
    .replace('</head>', '  <link rel="stylesheet" href="../assets/css/portfolio-designs.css">\n</head>')
    .replace(/  <section class="hero"[\s\S]*?(?=  <section class="about")/, design.hero + '\n\n')
    .replace('<nav class="topnav" id="main-nav" aria-label="Main navigation">', '<nav class="topnav" id="main-nav" aria-label="Main navigation"><a href="index.html">Designs</a>')
    .replace(/FIG\. \d+ — /g, '')
    .replace(/View Live →/g, 'Visit project')
    .replace('</footer>', '<br><a class="design-return" href="index.html">Browse all three portfolio designs</a>\n  </footer>')
    .replace("'.photo-frame, .pf-card, .svc-card, .c-box'", "'.photo-frame, .code-window, .pf-card, .svc-card, .c-box'")
    .replace(/target="_blank"(?! rel=)/g, 'target="_blank" rel="noopener noreferrer"');
  fs.writeFileSync(path.join(output, `${design.id}.html`), html);
  console.log(`Created designs/${design.id}.html`);
}
