const agents = [
  { name: 'SCOUT · RESEARCH', title: 'Fact pack ready', cls: '', text: 'Found the eight planets orbiting our Sun. Chosen angle: a fast “address in space” journey from the Sun to Neptune.', pill: 'facts.json · 3 licensed visual search briefs', handoff: 'Fact pack → VOICE' },
  { name: 'VOICE · SCRIPT', title: '10-second narration ready', cls: 'script-log', text: '“Our Solar System is one giant neighborhood. Eight planets race around the Sun—Earth is the bright blue home in the middle. Which planet would you visit?”', pill: '24 words · estimated 9.6 sec', handoff: 'Narration + beats → MAKER' },
  { name: 'MAKER · VIDEO', title: 'Vertical short assembled', cls: 'video-log', text: 'Storyboard: Sun opening → planet sweep → Earth pause → question end-card. Captions, safe-area layout, and audio timing are included.', pill: 'solar_system_short_v01.mp4 · 1080×1920', handoff: 'Render → GUARDIAN' },
  { name: 'GUARDIAN · VALIDATE', title: 'Publish package staged', cls: 'publish-log', text: 'Checks passed: 10.0 seconds, 9:16 format, readable captions, kid-safe language, and source/asset review. YouTube upload remains pending channel connection and final approval.', pill: 'status: READY FOR APPROVAL', handoff: 'Awaiting YouTube connection' }
];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const $ = s => document.querySelector(s);
const cards = [...document.querySelectorAll('.agent-card')];
let running = false;
let titleChoices = ['A tiny tour of our Solar System'];
function pickTitle() {
  const title = titleChoices[Math.floor(Math.random() * titleChoices.length)];
  $('#topic').value = title;
  $('#runStatus').textContent = 'Title selected from titles.txt · ready to launch';
}
async function loadTitles() {
  try {
    const response = await fetch('titles.txt');
    if (!response.ok) throw new Error('Title library unavailable');
    const choices = (await response.text()).split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'));
    if (choices.length) titleChoices = choices;
  } catch (_) { /* A starter title remains available for file-preview mode. */ }
  pickTitle();
}
function setState(card, label, state) { card.classList.remove('active','running','done'); card.classList.add(state); card.querySelector('.agent-state b').textContent = label; }
function addLog(agent, i) { const log = document.createElement('section'); log.className = `log ${agent.cls}`; log.innerHTML = `<div class="log-head"><span>${agent.name}</span><time>HANDOFF ${String(i+1).padStart(2,'0')}</time></div><h3>${agent.title}</h3><p>${agent.text}</p><span class="pill">${agent.pill}</span>`; $('#feed').append(log); }
async function launch() {
  if (running) return; running = true;
  const topic = $('#topic').value.trim() || 'A tiny tour of our Solar System';
  $('#feed').innerHTML = ''; $('#runStatus').textContent = `Mission active · ${topic}`;
  cards.forEach((c,i) => { setState(c, i === 0 ? 'Working' : 'Queued', i === 0 ? 'running' : ''); c.querySelector('.handoff').textContent = i === 0 ? 'Collecting trusted sources' : agents[i].handoff.replace(/.*→ /,'Waiting for '); });
  for (let i=0;i<agents.length;i++) { const traveller = $('#traveller'); traveller.style.opacity = '1'; traveller.style.left = `${i*33.2}%`; await sleep(1150); addLog(agents[i],i); setState(cards[i], 'Complete', 'done'); cards[i].querySelector('.handoff').textContent = agents[i].handoff; if (i < agents.length-1) { setState(cards[i+1], 'Working', 'running'); cards[i+1].querySelector('.handoff').textContent = 'Receiving handoff…'; } }
  $('#traveller').style.left = '100%'; $('#runStatus').textContent = 'Mission complete · upload awaiting approval'; $('#startButton').innerHTML = 'Run again <span>↻</span>'; running = false;
}
function reset() { if(running) return; $('#feed').innerHTML = '<div class="empty"><span>✦</span><p>Each agent will leave a visible handoff here.</p><small>No black boxes. Review every decision before publishing.</small></div>'; cards.forEach((c,i)=>{setState(c,i===0?'Ready':'Queued',i===0?'active':'');c.querySelector('.handoff').textContent=i===0?'Awaiting launch':agents[i].handoff.replace(/.*→ /,'Research package');}); $('#traveller').style.opacity='0'; $('#runStatus').textContent='Idle · choose a topic to begin'; $('#startButton').innerHTML='Launch workflow <span>→</span>'; }
$('#startButton').addEventListener('click',launch); $('#resetButton').addEventListener('click',reset); $('#pickTitle').addEventListener('click',pickTitle); $('#connectButton').addEventListener('click',()=>$('#connectDialog').showModal()); $('#closeDialog').addEventListener('click',()=>$('#connectDialog').close()); $('#acknowledge').addEventListener('click',()=>$('#connectDialog').close()); loadTitles();
