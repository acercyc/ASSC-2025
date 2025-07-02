const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

async function fetchProgram() {
  const url = 'https://www.conftool.com/assc2025/index.php?page=browseSessions&mode=list&presentations=show#';
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch: ' + res.status + ' ' + res.statusText);
    }
    const html = await res.text();
    const $ = cheerio.load(html);

    const sessions = [];
    $('.confTable .session').each((_, sessionElem) => {
      const header = $(sessionElem).find('h3').text().trim();
      const [session, type, day] = header.split(' | ');
      const presentations = [];
      $(sessionElem).find('table tr').each((i, row) => {
        const cols = $(row).find('td');
        if (cols.length >= 3) {
          const time = $(cols[0]).text().trim();
          const presenter = $(cols[1]).text().trim();
          const title = $(cols[2]).text().trim();
          presentations.push({ time, presenter, title });
        }
      });
      sessions.push({ session, type, day, presentations });
    });

    fs.writeFileSync('program.json', JSON.stringify(sessions, null, 2));
    console.log('Saved', sessions.length, 'sessions to program.json');
  } catch (err) {
    console.error('Error fetching program:', err.message);
  }
}

fetchProgram();
