/* ============================================================
   Kennisquiz Vorderen van een identiteitsbewijs - JS Legal Force
   Vragen, antwoorden en feedback EXACT volgens originele bron.
   NIET WIJZIGEN.
   ============================================================ */

const vragen = [
  {
    nummer: 1,
    thema: "Bevoegdheid",
    vraag: "Voor het vorderen van een identiteitsbewijs is het altijd vereist dat er sprake is van een verdachte.",
    opties: [
      "Deze stelling klopt",
      "Deze stelling klopt niet"
    ],
    juistIndex: 1,
    feedback: "Een boa kan een identiteitsbewijs vorderen wanneer dit redelijkerwijs noodzakelijk is voor de uitoefening van zijn of haar taak (artikel 8 lid 2 Politiewet 2012). Daarvoor is het dus niet vereist dat er sprake is van een verdachte in de zin van artikel 27 van het Wetboek van Strafvordering.",
    artikel: "art. 8 lid 2 Politiewet 2012 / art. 27 Sv"
  },
  {
    nummer: 2,
    thema: "Wet ID",
    vraag: "De Wet op de identificatieplicht bepaalt met welke identiteitsbewijzen burgers zich kunnen identificeren en vanaf welke leeftijd deze verplichting geldt.",
    opties: [
      "Deze stelling klopt",
      "Deze stelling klopt niet"
    ],
    juistIndex: 0,
    feedback: "Artikel 1 van de Wet op de identificatieplicht (Wet ID) geeft een opsomming van de documenten waarmee in bij de wet aangewezen gevallen de identiteit van personen kan worden vastgesteld. Artikel 2 van de Wet ID bepaalt dat iedereen die de leeftijd van 14 jaar heeft bereikt, verplicht is om in de bij wet aangewezen gevallen een identiteitsbewijs aan te bieden.",
    artikel: "art. 1 en 2 Wet ID"
  },
  {
    nummer: 3,
    thema: "Toezicht & handhaving",
    vraag: "Twee boa's houden toezicht op een evenement. Ze zien dat twee personen met elkaar in conflict raken en tegen elkaar schreeuwen. De boa's benaderen hen, vragen wat er aan de hand is en vorderen van beide personen een identiteitsbewijs.\n\nMogen de boa's in deze situatie het identiteitsbewijs van deze personen vorderen?",
    opties: [
      "Ja, want het redelijkerwijs noodzakelijk voor de uitoefening van hun taak.",
      "Nee, want deze personen kunnen nog niet als verdachten worden aangemerkt."
    ],
    juistIndex: 0,
    feedback: "Ja, de boa's mogen in deze situatie het identiteitsbewijs vorderen. De boa's treden op in het kader van hun toezichthoudende taak tijdens het evenement, gericht op het handhaven van de (openbare) orde en het naleven van de geldende regels. In dit geval is sprake van een conflict en mogelijk een verstoring van de openbare orde, gezien het schreeuwen en de oplopende spanningen tussen de betrokken personen. Het is daarom redelijk en noodzakelijk dat de boa's de identiteit van deze personen vaststellen. Deze gegevens kunnen worden vastgelegd in de registratiesystemen van de boa en, indien nodig, gedeeld worden met de politie of wijkagent. Ook kunnen eventuele afspraken of waarschuwingen aan de betrokkenen worden vastgelegd.",
    artikel: "art. 8 lid 2 Politiewet 2012"
  },
  {
    nummer: 4,
    thema: "Toezicht jeugdgroep",
    vraag: "Twee boa's houden namens de gemeente toezicht op een jeugdgroep die zich voor een supermarkt ophoudt. Ze zien dat er een nieuw, onbekend lid in de groep aanwezig is, die zich provocerend gedraagt.\n\nMogen de boa's in deze situatie het identiteitsbewijs van deze jeugdige vorderen?",
    opties: [
      "Ja, want het redelijkerwijs noodzakelijk voor de uitoefening van hun taak.",
      "Nee, want deze persoon kan nog niet als verdachte worden aangemerkt."
    ],
    juistIndex: 0,
    feedback: "De boa's hebben vanuit de gemeente de opdracht gekregen om toezicht te houden op deze jeugdgroep. Om deze taak goed uit te kunnen voeren, is het redelijkerwijs noodzakelijk om de identiteit van de nieuwe jeugdige vast te stellen (artikel 8, lid 2 Politiewet). De persoonsgegevens kunnen vervolgens worden vastgelegd in hun systemen en gedeeld met de gemeente, wijkagent en eventuele externe partners.",
    artikel: "art. 8 lid 2 Politiewet"
  },
  {
    nummer: 5,
    thema: "Weigering tonen ID",
    vraag: "Stelling:\n\nWanneer iemand opzettelijk weigert om een identiteitsbewijs ter inzage aan te bieden na een rechtmatige vordering, ben je verplicht om te kiezen voor het misdrijf van artikel 184 lid 1 Wetboek van Strafrecht. Een bekeuring op grond van artikel 447e Wetboek van Strafrecht is dan niet meer mogelijk.",
    opties: [
      "Ja, dit klopt",
      "Nee, dit klopt niet"
    ],
    juistIndex: 1,
    feedback: "Degene die niet voldoet aan de verplichting om een identiteitsbewijs ter inzage aan te bieden, maakt zich schuldig aan een overtreding van artikel 447e van het Wetboek van Strafrecht. Dit artikel vormt een specifieke strafbaarstelling voor het niet tonen van een identiteitsbewijs.\n\nWanneer iemand hier opzettelijk niet aan voldoet, zou je in theorie ook kunnen denken aan artikel 184 lid 1 Wetboek van Strafrecht: het niet voldoen aan een bevel of vordering.\n\nMijn advies is echter, al staat een ieder daar vrij in, om in deze situatie te kiezen voor de bekeuringsvariant van artikel 447e Wetboek van Strafrecht en feitcode D517 te gebruiken. De afhandeling hiervan is in de praktijk eenvoudiger en sneller. Daarnaast is deze overtreding vaak makkelijker te bewijzen dan het opzettelijk niet voldoen aan een bevel of vordering op grond van artikel 184 lid 1 Wetboek van Strafrecht. Daarom verdient de bekeuringsvariant in veel gevallen de voorkeur.",
    artikel: "art. 447e Sr / art. 184 lid 1 Sr / feitcode D517"
  }
];
