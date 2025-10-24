// === CONFIG (edite aqui) ===
const SESSION_LABEL = "Domingo, 09 de Novembro de 2025 — 13:30";
const WHATSAPP_LINK = "https://chat.whatsapp.com/JOoqIydd1XDDtKhHffFZhF";
// ============================

// estado dos pedestais
let solved = { num: false, grav: false, alch: false };

// helpers
const setSolved = (k) => {
    solved[k] = true;
    document.getElementById('p' + k + '-ind').textContent = 'resolvido';
    document.getElementById('p-' + k)?.classList?.add('done');
    if (k === 'num') document.getElementById('orb-num').classList.add('lit');
    if (k === 'grav') document.getElementById('orb-grav').classList.add('lit');
    if (k === 'alch') document.getElementById('orb-alch').classList.add('lit');
    checkAll();
}

function checkAll() {
    if (solved.num && solved.grav && solved.alch) {
        setTimeout(() => showModal(), 500);
    }
}

// ---- NUMERI ----
document.getElementById('btn-num').addEventListener('click', () => {
    const v = document.getElementById('ans-num').value.trim();
    if (!v) { document.getElementById('status-num').textContent = 'Insira um número.'; return }
    if (v === '21') { document.getElementById('status-num').textContent = 'Correto!'; setSolved('num') }
    else document.getElementById('status-num').textContent = 'Incorreto — tente outra sequência.';
})

// ---- GRAVITAS ----
document.getElementById('btn-grav').addEventListener('click', () => {
    const v = document.getElementById('ans-grav').value.trim();
    if (!v) { document.getElementById('status-grav').textContent = 'Insira um número.'; return }
    if (v === '3') { document.getElementById('status-grav').textContent = 'Correto!'; setSolved('grav') }
    else document.getElementById('status-grav').textContent = 'Incorreto — reconsidere as massas.';
})

// ---- ALCHIMIA (simulação dos jarros) ----
let jars = { five: 0, three: 0 };
const stateEl = document.getElementById('state-alch');
function updateState() {
    stateEl.textContent = `(5L:${jars.five} — 3L:${jars.three})`;
    if (jars.five === 4) { document.getElementById('status-alch').textContent = 'Resolvido!'; setSolved('alch') }
}

document.getElementById('fill5').addEventListener('click', () => { jars.five = 5; updateState(); })
document.getElementById('fill3').addEventListener('click', () => { jars.three = 3; updateState(); })
document.getElementById('empty5').addEventListener('click', () => { jars.five = 0; updateState(); })
document.getElementById('empty3').addEventListener('click', () => { jars.three = 0; updateState(); })
document.getElementById('pour5to3').addEventListener('click', () => {
    const space = 3 - jars.three;
    const transfer = Math.min(jars.five, space);
    jars.five -= transfer; jars.three += transfer; updateState();
})
document.getElementById('pour3to5').addEventListener('click', () => {
    const space = 5 - jars.five;
    const transfer = Math.min(jars.three, space);
    jars.three -= transfer; jars.five += transfer; updateState();
})

// modal actions
const modal = document.getElementById('modal');
function showModal() {
    document.getElementById('session-text').textContent = 'Data e hora: ' + SESSION_LABEL;
    const linkHTML = `<a href="${WHATSAPP_LINK}" target="_blank" style="color:var(--accent);text-decoration:underline">Entrar no grupo do WhatsApp</a>`;
    document.getElementById('session-link').innerHTML = 'Link do grupo: ' + linkHTML;
    modal.classList.add('show');
}
document.getElementById('copy-session').addEventListener('click', () => {
    const t = `Sessão: ${SESSION_LABEL} — Grupo: ${WHATSAPP_LINK}`;
    navigator.clipboard?.writeText(t).then(() => alert('Copiado para a área de transferência.'))
})
document.getElementById('open-whats').addEventListener('click', () => { window.open(WHATSAPP_LINK, '_blank') })
document.getElementById('close-modal').addEventListener('click', () => { modal.classList.remove('show') })

// small UX: press Enter to submit for text inputs
document.getElementById('ans-num').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('btn-num').click() })
document.getElementById('ans-grav').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('btn-grav').click() })