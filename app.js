let sessionsData = [];

async function loadData() {
    try {
        const response = await fetch('program.json');
        sessionsData = await response.json();
        populateFilters();
        renderSessions();
    } catch (error) {
        document.getElementById('sessions').textContent = 'Failed to load program data.';
    }
}

function populateFilters() {
    const daySelect = document.getElementById('day-select');
    const typeSelect = document.getElementById('type-select');
    const sessionSelect = document.getElementById('session-select');

    const days = [...new Set(sessionsData.map(s => s.day))];
    const types = [...new Set(sessionsData.map(s => s.type))];
    const names = [...new Set(sessionsData.map(s => s.session))];

    for (const d of days) {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d;
        daySelect.appendChild(opt);
    }

    for (const t of types) {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        typeSelect.appendChild(opt);
    }

    for (const n of names) {
        const opt = document.createElement('option');
        opt.value = n;
        opt.textContent = n;
        sessionSelect.appendChild(opt);
    }

    daySelect.addEventListener('change', renderSessions);
    typeSelect.addEventListener('change', renderSessions);
    sessionSelect.addEventListener('change', renderSessions);
}

function renderSessions() {
    const dayFilter = document.getElementById('day-select').value;
    const typeFilter = document.getElementById('type-select').value;
    const sessionFilter = document.getElementById('session-select').value;

    const container = document.getElementById('sessions');
    container.innerHTML = '';

    const filtered = sessionsData.filter(s =>
        (dayFilter === 'all' || s.day === dayFilter) &&
        (typeFilter === 'all' || s.type === typeFilter) &&
        (sessionFilter === 'all' || s.session === sessionFilter)
    );

    if (!filtered.length) {
        container.textContent = 'No sessions found.';
        return;
    }

    for (const s of filtered) {
        const sessionDiv = document.createElement('div');
        sessionDiv.className = 'session';
        const header = document.createElement('h3');
        header.textContent = `${s.session} (${s.type}) - ${s.day}`;
        sessionDiv.appendChild(header);
        for (const p of s.presentations) {
            const pDiv = document.createElement('div');
            pDiv.className = 'presentation';
            pDiv.textContent = `${p.time} - ${p.presenter}: ${p.title}`;
            sessionDiv.appendChild(pDiv);
        }
        container.appendChild(sessionDiv);
    }
}

window.addEventListener('DOMContentLoaded', loadData);
