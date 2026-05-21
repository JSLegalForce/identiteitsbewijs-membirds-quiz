/* ============================================================
   Kennisquiz Vorderen van een identiteitsbewijs - JS Legal Force
   Quizlogica: schermbeheer, scoring, feedback, PDF bewijs
   ============================================================ */

// ---------- State ----------
const state = {
  voornaam: "",
  achternaam: "",
  organisatie: "",
  huidigeIndex: 0,
  antwoorden: [], // {gekozen, juist}
  vraagBeantwoord: false
};

// ---------- DOM ----------
const dom = {
  // Schermen
  schermNaam:       document.getElementById('scherm-naam'),
  schermStart:      document.getElementById('scherm-start'),
  schermVraag:      document.getElementById('scherm-vraag'),
  schermJuridisch:  document.getElementById('scherm-juridisch'),
  schermEinde:      document.getElementById('scherm-einde'),

  // Naamscherm
  inputVoornaam:    document.getElementById('input-voornaam'),
  inputAchternaam:  document.getElementById('input-achternaam'),
  inputOrganisatie: document.getElementById('input-organisatie'),
  naamFout:         document.getElementById('naam-fout'),
  btnNaarStart:     document.getElementById('btn-naar-start'),

  // Startscherm
  startWelkom:      document.getElementById('start-welkom'),
  btnStart:         document.getElementById('btn-start'),

  // Vraagscherm
  voortgangTekst:   document.getElementById('voortgang-tekst'),
  voortgangBalk:    document.getElementById('voortgang-balk'),
  vraagNummers:     document.getElementById('vraag-nummers'),
  vraagThema:       document.getElementById('vraag-thema'),
  vraagNummerBadge: document.getElementById('vraag-nummer-badge'),
  vraagTekst:       document.getElementById('vraag-tekst'),
  optiesContainer:  document.getElementById('opties-container'),
  feedbackContainer:document.getElementById('feedback-container'),
  feedbackTekst:    document.getElementById('feedback-tekst'),
  feedbackArtikel:  document.getElementById('feedback-artikel'),
  btnJuridisch:     document.getElementById('btn-juridisch'),
  btnVolgende:      document.getElementById('btn-volgende'),

  // Juridisch
  btnVerderNaJur:   document.getElementById('btn-verder-na-juridisch'),

  // Einde
  eindeNaam:        document.getElementById('einde-naam-tekst'),
  eindPercentage:   document.getElementById('eind-percentage'),
  eindScore:        document.getElementById('eind-score'),
  eindBeoordeling:  document.getElementById('eind-beoordeling'),
  eindBeoordTekst:  document.getElementById('eind-beoordeling-tekst'),
  vraagOverzicht:   document.getElementById('vraag-overzicht'),
  btnCertificaat:   document.getElementById('btn-certificaat'),
  btnHerstart:      document.getElementById('btn-herstart')
};

// ---------- Helpers ----------
function toonScherm(scherm) {
  [dom.schermNaam, dom.schermStart, dom.schermVraag, dom.schermJuridisch, dom.schermEinde]
    .forEach(s => s.classList.remove('actief'));
  scherm.classList.add('actief');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- Naamscherm ----------
function naarStart() {
  const vn = dom.inputVoornaam.value.trim();
  const an = dom.inputAchternaam.value.trim();
  if (!vn || !an) {
    dom.naamFout.classList.add('actief');
    return;
  }
  dom.naamFout.classList.remove('actief');
  state.voornaam = vn;
  state.achternaam = an;
  state.organisatie = dom.inputOrganisatie.value.trim();
  dom.startWelkom.textContent = `Welkom ${vn}!`;
  toonScherm(dom.schermStart);
}

// ---------- Quiz starten ----------
function startQuiz() {
  state.huidigeIndex = 0;
  state.antwoorden = [];
  renderVraagNummers();
  toonScherm(dom.schermVraag);
  toonVraag();
}

// ---------- Vraagnummer-bolletjes ----------
function renderVraagNummers() {
  dom.vraagNummers.innerHTML = '';
  vragen.forEach((_, i) => {
    const b = document.createElement('div');
    b.className = 'vraag-nr-bolletje';
    b.textContent = i + 1;
    dom.vraagNummers.appendChild(b);
  });
}

function updateVraagNummers() {
  const bolletjes = dom.vraagNummers.querySelectorAll('.vraag-nr-bolletje');
  bolletjes.forEach((b, i) => {
    b.classList.remove('actief', 'beantwoord-goed', 'beantwoord-fout');
    if (state.antwoorden[i]) {
      b.classList.add(state.antwoorden[i].juist ? 'beantwoord-goed' : 'beantwoord-fout');
    }
    if (i === state.huidigeIndex) b.classList.add('actief');
  });
}

// ---------- Vraag tonen ----------
function toonVraag() {
  state.vraagBeantwoord = false;
  const v = vragen[state.huidigeIndex];
  const totaal = vragen.length;

  // Voortgang
  dom.voortgangTekst.textContent = `Vraag ${state.huidigeIndex + 1} van ${totaal}`;
  dom.voortgangBalk.style.width = ((state.huidigeIndex) / totaal * 100) + '%';
  updateVraagNummers();

  // Meta
  dom.vraagThema.textContent = v.thema;
  dom.vraagNummerBadge.textContent = `Vraag ${v.nummer}`;
  dom.vraagTekst.innerHTML = v.vraag.replace(/\n/g, '<br>');

  // Opties
  dom.optiesContainer.innerHTML = '';
  v.opties.forEach((tekst, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'optie-knop';
    btn.innerHTML = `<span class="optie-letter">${String.fromCharCode(65 + i)}</span><span>${tekst}</span>`;
    btn.addEventListener('click', () => beantwoord(i, btn));
    dom.optiesContainer.appendChild(btn);
  });

  // Reset feedback / knoppen
  dom.feedbackContainer.classList.remove('actief', 'goed', 'fout');
  dom.feedbackTekst.textContent = '';
  dom.feedbackArtikel.textContent = '';
  dom.btnJuridisch.style.display = 'none';
  dom.btnVolgende.style.display = 'none';
  dom.btnVolgende.textContent =
    (state.huidigeIndex === vragen.length - 1) ? 'Bekijk resultaat ->' : 'Volgende vraag ->';
}

// ---------- Antwoord verwerken ----------
function beantwoord(gekozenIdx, gekozenBtn) {
  if (state.vraagBeantwoord) return;
  state.vraagBeantwoord = true;

  const v = vragen[state.huidigeIndex];
  const juist = gekozenIdx === v.juistIndex;

  // Markeer knoppen
  const allButtons = dom.optiesContainer.querySelectorAll('.optie-knop');
  allButtons.forEach((b, i) => {
    b.disabled = true;
    if (i === v.juistIndex) b.classList.add('goed');
    if (i === gekozenIdx && !juist) b.classList.add('fout');
  });

  // Opslaan
  state.antwoorden[state.huidigeIndex] = { gekozen: gekozenIdx, juist };
  updateVraagNummers();

  // Feedback
  dom.feedbackContainer.classList.add('actief', juist ? 'goed' : 'fout');
  dom.feedbackTekst.innerHTML = v.feedback.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  if (v.artikel) {
    dom.feedbackArtikel.textContent = v.artikel;
  }

  dom.btnJuridisch.style.display = 'flex';
  dom.btnVolgende.style.display = 'flex';
}

// ---------- Volgende ----------
function volgende() {
  if (state.huidigeIndex < vragen.length - 1) {
    state.huidigeIndex++;
    toonVraag();
  } else {
    toonEinde();
  }
}

// ---------- Juridisch advies ----------
function toonJuridisch() {
  toonScherm(dom.schermJuridisch);
}
function verderNaJuridisch() {
  toonScherm(dom.schermVraag);
}

// ---------- Eindscherm ----------
function toonEinde() {
  const totaal = vragen.length;
  const goed = state.antwoorden.filter(a => a && a.juist).length;
  const pct = Math.round(goed / totaal * 100);
  const geslaagd = pct >= 70;

  dom.voortgangBalk.style.width = '100%';

  // Naam
  const volledige = `${state.voornaam} ${state.achternaam}`.trim();
  dom.eindeNaam.textContent = volledige;

  // Score
  dom.eindPercentage.textContent = pct + '%';
  dom.eindScore.textContent = `${goed} van ${totaal} vragen goed beantwoord`;

  // Beoordeling
  dom.eindBeoordeling.classList.remove('geslaagd', 'niet-geslaagd');
  if (geslaagd) {
    dom.eindBeoordeling.classList.add('geslaagd');
    dom.eindBeoordeling.textContent = '✓ Geslaagd';
    dom.eindBeoordTekst.textContent =
      `Goed gedaan, ${state.voornaam}! Je hebt deze kennisquiz met succes afgerond. Download je bewijs van deelname hieronder.`;
    dom.btnCertificaat.style.display = 'flex';
  } else {
    dom.eindBeoordeling.classList.add('niet-geslaagd');
    dom.eindBeoordeling.textContent = '✗ Niet geslaagd';
    dom.eindBeoordTekst.textContent =
      `${state.voornaam}, je hebt ${pct}% gehaald. Voor deze kennisquiz is een score van 70% vereist. Bestudeer de stof opnieuw en probeer het nogmaals.`;
    dom.btnCertificaat.style.display = 'none';
  }

  // Vraagoverzicht
  dom.vraagOverzicht.innerHTML = '';
  vragen.forEach((v, i) => {
    const ant = state.antwoorden[i];
    const isJuist = ant && ant.juist;
    const rij = document.createElement('div');
    rij.className = 'auditpunt-rij';
    rij.innerHTML = `
      <div class="auditpunt-icoon ${isJuist ? 'goed' : 'fout'}">${isJuist ? '✓' : '✗'}</div>
      <div class="auditpunt-tekst"><strong>Vraag ${v.nummer}:</strong> ${v.thema}</div>
    `;
    dom.vraagOverzicht.appendChild(rij);
  });

  toonScherm(dom.schermEinde);
}

// ---------- Bewijs van deelname (PDF) ----------
function downloadBewijs() {
  if (typeof window.jspdf === 'undefined') {
    alert('Kan PDF niet genereren - jsPDF niet geladen.');
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  const W = 297, H = 210;
  const totaal = vragen.length;
  const goed = state.antwoorden.filter(a => a && a.juist).length;
  const pct = Math.round(goed / totaal * 100);
  const volledige = `${state.voornaam} ${state.achternaam}`.trim();

  // Achtergrond
  doc.setFillColor(10, 15, 30);
  doc.rect(0, 0, W, H, 'F');

  // Decoratieve hoekrechtangles
  doc.setDrawColor(138, 154, 181);
  doc.setLineWidth(0.4);
  doc.rect(10, 10, W - 20, H - 20);
  doc.setDrawColor(45, 64, 153);
  doc.setLineWidth(1.4);
  doc.rect(14, 14, W - 28, H - 28);

  // Header band
  doc.setFillColor(26, 42, 94);
  doc.rect(14, 14, W - 28, 32, 'F');

  // JS Legal Force titel
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('JS LEGAL FORCE', W / 2, 30, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(169, 188, 224);
  doc.text("Juridische kennisquizzen voor BOA's", W / 2, 38, { align: 'center' });

  // Hoofdtitel
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('BEWIJS VAN DEELNAME', W / 2, 70, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(214, 223, 238);
  doc.text('Hierbij wordt verklaard dat', W / 2, 84, { align: 'center' });

  // Naam
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(volledige, W / 2, 100, { align: 'center' });

  // Streep
  doc.setDrawColor(138, 154, 181);
  doc.setLineWidth(0.4);
  const nb = doc.getTextWidth(volledige);
  doc.line((W - nb) / 2 - 8, 104, (W + nb) / 2 + 8, 104);

  // Organisatie (optioneel)
  if (state.organisatie) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(169, 188, 224);
    doc.text(state.organisatie, W / 2, 112, { align: 'center' });
  }

  // Beschrijving
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(214, 223, 238);
  doc.text('heeft met succes de kennisquiz afgerond:', W / 2, state.organisatie ? 122 : 118, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text('Vorderen van een identiteitsbewijs', W / 2, state.organisatie ? 132 : 128, { align: 'center' });

  // Score
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(169, 188, 224);
  doc.text(`Behaalde score: ${goed} van ${totaal} (${pct}%)`, W / 2, state.organisatie ? 144 : 140, { align: 'center' });

  // Datum
  const datum = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.setFontSize(9);
  doc.text(`Datum: ${datum}`, W / 2, state.organisatie ? 152 : 148, { align: 'center' });

  // Onderaan
  doc.setDrawColor(138, 154, 181);
  doc.setLineWidth(0.25);
  doc.line(W / 2 - 40, 175, W / 2 + 40, 175);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(138, 154, 181);
  doc.text("JS Legal Force - Juridische opleiding voor BOA's", W / 2, 183, { align: 'center' });

  const safe = volledige.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`Bewijs_Vorderen_Identiteitsbewijs_${safe}.pdf`);
}

// ---------- Herstart ----------
function herstart() {
  state.huidigeIndex = 0;
  state.antwoorden = [];
  state.vraagBeantwoord = false;
  dom.voortgangBalk.style.width = '0%';
  toonScherm(dom.schermNaam);
}

// ---------- Events ----------
dom.btnNaarStart.addEventListener('click', naarStart);
[dom.inputVoornaam, dom.inputAchternaam, dom.inputOrganisatie].forEach(el => {
  el.addEventListener('keydown', e => { if (e.key === 'Enter') naarStart(); });
});

dom.btnStart.addEventListener('click', startQuiz);
dom.btnVolgende.addEventListener('click', volgende);
dom.btnJuridisch.addEventListener('click', toonJuridisch);
dom.btnVerderNaJur.addEventListener('click', verderNaJuridisch);
dom.btnCertificaat.addEventListener('click', downloadBewijs);
dom.btnHerstart.addEventListener('click', herstart);
