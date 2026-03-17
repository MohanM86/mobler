import Link from 'next/link';
import type { Metadata } from 'next';
import { guides, getGuide } from '@/data/guides';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.filter(g => g.category === 'kjopsguide').map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.metaTitle, description: guide.metaDescription, alternates: { canonical: `https://møbler.com/guide/${guide.slug}/` } };
}

function SofaGuideContent() {
  return (
    <div className="article-content container--narrow">
      <h2>Hvordan velge riktig sofa</h2>
      <p>
        Sofaen er det møbelet du bruker mest i hjemmet. Den er samlingspunktet for filmkvelder, 
        middagsselskaper, late søndager og alt imellom. Derfor er det viktig å ta seg tid til å 
        velge riktig. I denne guiden går vi gjennom alt du trenger å vite for å finne sofaen som 
        passer ditt hjem, din livsstil og ditt budsjett.
      </p>

      <h2>Størrelse og plassering</h2>
      <p>
        Før du ser på materialer og design, start med det mest grunnleggende: hvor stor plass har 
        du? Mål rommet nøye, og husk å ta hensyn til gangpassasjer (minimum 60 cm), dører som 
        åpnes, og andre møbler. En vanlig feil er å kjøpe for stor sofa til rommet.
      </p>
      <p>
        En 2-seter er typisk 150 til 180 cm bred og passer godt i mindre stuer og leiligheter. 
        En 3-seter ligger normalt mellom 200 og 240 cm, mens en hjørnesofa kan ta alt fra 250 
        til over 300 cm. Sjesesofaer, der den ene siden er forlenget, gir deg det beste av begge 
        verdener: sofaplass og hvileplass uten å ta like mye gulvplass som en hjørnesofa.
      </p>

      <h2>Materialer og trekk</h2>
      <p>
        Valget av trekkstoff påvirker både utseende, komfort, vedlikehold og holdbarhet. Her er 
        de vanligste alternativene og hva du bør tenke på.
      </p>
      <h3>Stoff</h3>
      <p>
        Stoffsofaer er det mest populære valget i Norge. Bomull er mykt og pustende, men flekker 
        lettere. Polyester er mer slitesterkt og flekkavisende. Lin gir en avslappet, naturlig 
        følelse men krøller lett. Velour og fløyel er luksuriøst og mykt, men krever mer vedlikehold. 
        For familier med barn eller kjæledyr er et robust blandingsstoff eller mikrofiber ofte det 
        smarteste valget.
      </p>
      <h3>Skinn og kunstskinn</h3>
      <p>
        Ekte skinn er holdbart, utvikler vakker patina over tid, og er enkelt å tørke av. 
        Ulempen er høyere pris og at det kan føles kaldt å sitte på. Kunstskinn (PU-skinn) er 
        rimeligere og dyrevennlig, men har kortere levetid. Det beste kunstskinnet har blitt 
        betydelig bedre de siste årene, og for mange er det et godt kompromiss.
      </p>

      <h2>Komfort og polstring</h2>
      <p>
        Sittekomforten avhenger av polstringen. Høyresiliensskum (HR-skum) gir god støtte og 
        holder formen lenge. Fjærpolstring gir en mykere, mer innsynkende følelse. De beste 
        sofaene kombinerer gjerne et HR-skum-kjerne med et lag dun eller fiber på toppen for 
        en kombinasjon av støtte og mykthet.
      </p>
      <p>
        Sittedybden er viktig å teste. Standard sittedybde er rundt 55 cm. Er du lang, kan du 
        foretrekke 60 cm eller mer. Sittehøyden (typisk 42 til 47 cm) påvirker hvor lett det er 
        å reise seg. Eldre eller personer med bevegelsesproblemer bør velge en høyere sittehøyde.
      </p>

      <h2>Ramme og konstruksjon</h2>
      <p>
        Rammen er fundamentet. En solid ramme i tørket hardtre (bøk, eik, bjørk) varer lengst. 
        Unngå rammer i furu, som er mykt og kan vri seg. Sjekk at skjøtene er limt og skrudd, 
        ikke bare stiftet. En god sofaramme bør ha minimum 15 års garanti.
      </p>
      <p>
        Under setene bør det være noskag-fjærer eller elastiske stropper. Noskag-fjærer (S-fjærer) 
        gir bedre støtte og lengre levetid enn vevde stropper, men er også dyrere.
      </p>

      <h2>Budsjett og prisklasser</h2>
      <p>
        I det norske markedet kan du grovt dele sofaer inn i tre prisklasser. Under 10 000 kroner 
        finner du grunnleggende sofaer fra IKEA, JYSK og nettbutikker. Kvaliteten er akseptabel 
        for midlertidige løsninger eller studentleiligheter. Mellom 10 000 og 30 000 kroner ligger 
        det beste value-segmentet der du finner sofaer fra Bohus, Skeidar og Møbelringen med god 
        komfort og rimelig holdbarhet. Over 30 000 kroner er premium-segmentet med merker som 
        Bolia, Slettvoll, LK Hjelle og Stordal, der du får overlegen kvalitet på ramme, polstring 
        og trekk.
      </p>

      <h2>De viktigste norske møbelkjedene for sofa</h2>
      <p>
        IKEA dominerer volummarkedet med et enormt utvalg og lave priser. Bohus har tradisjonelt 
        hatt et sterkt sofa-sortiment i mellomsjiktet. Skeidar og Møbelringen tilbyr et bredt 
        spekter fra budsjett til premium. For de som vil ha norsk design og håndverkskvalitet, 
        er Slettvoll, Bolia og A-Møbler verdt å utforske. Nettbutikker som Sweef og Trademax 
        har også blitt seriøse alternativer med gode priser og enkel levering.
      </p>

      <h2>Vedlikehold og levetid</h2>
      <p>
        En god sofa bør vare minst 10 til 15 år med riktig vedlikehold. Snu og roter putene 
        jevnlig (helst annenhver uke) for jevn slitasje. Støvsug sofaen månedlig. Fjern flekker 
        umiddelbart. For stoffsofaer kan det være lurt å impregnere trekket. Mange produsenter 
        selger også ekstra sett med trekk, slik at du kan bytte utseende etter noen år uten å 
        kjøpe ny sofa.
      </p>

      <h2>Sjekkliste før du kjøper</h2>
      <p>
        Mål rommet og døråpningene nøye. Sitt i sofaen i minst 15 minutter i butikken. 
        Sjekk ramme-materiale og garanti. Spør om leveringstid og returbetingelser. 
        Vurder om trekket kan tas av og vaskes. Tenk på fremtidig fleksibilitet: kan du 
        bygge på med ekstra moduler? Og ikke minst: kjøp det beste du har råd til. En sofa 
        du bruker hver dag i 10 til 15 år er verdt å investere litt ekstra i.
      </p>

      <div style={{ marginTop: 'var(--space-3xl)', padding: 'var(--space-2xl)', background: 'var(--color-accent-subtle)', borderRadius: 'var(--border-radius-lg)' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Finn møbelbutikker nær deg</h3>
        <p style={{ marginBottom: 'var(--space-lg)' }}>
          Klar for å teste sofaer? Se vår komplette oversikt over møbelbutikker i hele Norge.
        </p>
        <Link href="/mobelbutikker/" className="btn btn--primary" style={{ display: 'inline-flex' }}>
          Finn butikk →
        </Link>
      </div>
    </div>
  );
}

function SengGuideContent() {
  return (
    <div className="article-content container--narrow">
      <h2>Hvorfor sengen er hjemmets viktigste møbel</h2>
      <p>
        Du tilbringer rundt 26 år av livet ditt i sengen. Ingen andre møbler kommer i nærheten
        av den bruken. Likevel er det mange som bruker mer tid på å velge sofa enn seng. Det er 
        bakvendt. En god seng forbedrer søvnkvaliteten, gir mer energi i hverdagen og forebygger 
        rygg- og nakkeplager. En dårlig seng gjør det motsatte.
      </p>
      <p>
        Denne guiden gir deg alt du trenger for å ta et godt valg. Vi forklarer de ulike 
        sengetypene, hjelper deg med å finne riktig størrelse og fasthet, og gir deg en realistisk 
        oversikt over hva du bør forvente å betale i Norge i 2026.
      </p>

      <h2>De tre hovedtypene seng</h2>
      <p>
        I Norge er det tre sengetyper som dominerer markedet: kontinentalseng, rammemadrass og 
        regulerbar seng. Alle har sine styrker, og riktig valg avhenger av behov, plass og budsjett.
      </p>

      <h3>Kontinentalseng</h3>
      <p>
        Kontinentalsengen er Norges mest populære sengetype. Den består av tre lag: en bunnmadrass 
        med fjærer (boxmadrass), en springfjærmadrass oppå, og en overmadrass øverst. Denne 
        trelagsoppbygningen gir dyp komfort, god trykkavlastning og et luksuriøst utseende.
      </p>
      <p>
        Fordelene er tydelige. Flere lag med fjærer betyr bedre tilpasning til kroppen. Sengen 
        blir høy (typisk 55 til 65 cm), noe som gjør det lett å legge seg og stå opp. Du kan 
        velge ulik fasthet på hver side, slik at begge som deler sengen får optimal komfort. 
        Ulempen er at kontinentalsenger er tunge, tar mye plass, og er vanskelige å flytte. De 
        er også dyrere enn rammemadrasser.
      </p>
      <p>
        Kort forklart: Velg kontinentalseng hvis du prioriterer komfort, har plass i soverommet, 
        og vil ha en seng som varer i 15 til 20 år.
      </p>

      <h3>Rammemadrass (rammeseng)</h3>
      <p>
        En rammemadrass er en madrass montert i en treramme. Den er enklere, rimeligere og 
        lettere å flytte enn en kontinentalseng. Rammemadrasser passer godt i sengerammer, og 
        mange modeller har vendbar madrass slik at du kan velge mellom en mykere og en fastere side.
      </p>
      <p>
        Rammemadrasser er et godt valg for ungdomsrom, gjesterom, mindre soverom og for deg 
        som foretrekker et fastere underlag. De fleste rammemadrasser i mellomprisklassen gir 
        overraskende god komfort, spesielt med en kvalitets-overmadrass oppå.
      </p>
      <p>
        Kort forklart: Velg rammemadrass hvis du vil ha god komfort til en lavere pris, eller 
        har begrenset plass.
      </p>

      <h3>Regulerbar seng</h3>
      <p>
        En regulerbar seng lar deg heve hodedelen og fotenden elektrisk. Dette er et utmerket 
        valg for deg som leser, ser på TV, eller har medisinske behov som refluks, pusteproblemer 
        eller dårlig sirkulasjon. Eldre mennesker har ofte stor nytte av å kunne justere 
        sengenstillingen.
      </p>
      <p>
        Regulerbare senger har blitt langt mer stilfulle de siste årene og ligner i dag ofte 
        på vanlige kontinentalsenger utenpå. Prisene starter rundt 15 000 kroner for en enkel 
        modell og kan gå opp mot 80 000 kroner eller mer for toppmodeller med avanserte 
        justeringsmuligheter.
      </p>
      <p>
        Kort forklart: Velg regulerbar seng hvis du vil justere liggestilling, har helseforutsetninger, 
        eller rett og slett ønsker ekstra fleksibilitet.
      </p>

      <h2>Slik velger du riktig størrelse</h2>
      <p>
        Størrelsen på sengen påvirker søvnkvaliteten direkte. En for smal seng gir urolig søvn 
        fordi du ikke kan bevege deg fritt. En for stor seng kan gjøre at soverommet føles trangt.
        Her er de vanligste størrelsene i Norge og hvem de passer for.
      </p>
      <p>
        Enkeltsenger kommer i 75, 80, 90, 105 og 120 cm bredde, alle med 200 cm lengde som 
        standard. En 90 cm seng er minimumet for en voksen som sover alene. En 120 cm seng, 
        ofte kalt «breddet enkeltseng», gir god plass for en person og er populær på ungdomsrom 
        og i leiligheter. Senger i 210 cm lengde finnes for deg som er over 185 cm.
      </p>
      <p>
        Dobbeltsenger finnes i 150, 160, 180 og 200 cm bredde. 150 cm er minimum for to voksne, 
        men mange opplever det som trangt. 160 cm er Norges mest solgte dobbeltsengsbredde og 
        fungerer bra for de fleste par. 180 cm gir merkbart bedre plass og anbefales hvis 
        soverommet tillater det. 200 cm er et luksusmål som passer godt for par som ønsker 
        ekstra plass, eller familier der barna kryper opp i sengen.
      </p>

      <h2>Madrassen: sengens viktigste del</h2>
      <p>
        Uansett hvilken sengetype du velger, er madrassen det som avgjør liggekomforten. En 
        dyr sengeramme med billig madrass gir dårlig søvn. En god madrass i en enkel ramme 
        gir god søvn. Prioriter alltid madrassen.
      </p>

      <h3>Fjærsystemer</h3>
      <p>
        De fleste madrasser i Norge bruker et av tre fjærsystemer. Bonnellfjærer er de enkleste 
        og rimeligste. De er timeglassformede og koblet sammen, noe som gir et fast underlag med 
        god holdbarhet. Ulempen er at bevegelse overføres til hele madrassen.
      </p>
      <p>
        LFK-fjærer er sylindriske og tynnere, og gir flere støttepunkter enn bonnellfjærer. 
        Pocketfjærer er det mest avanserte systemet. Hver fjær er innpakket i en egen stofflomme, 
        slik at fjærene jobber uavhengig av hverandre. Det betyr minimal bevegelsesoverføring 
        (partner som snur seg vekker deg ikke) og presis tilpasning til kroppens konturer.
      </p>
      <p>
        Kort forklart: Pocketfjærer gir best komfort og minst bevegelsesoverføring. Bonnellfjærer 
        er rimeligst og mest holdbare.
      </p>

      <h3>Komfortsoner</h3>
      <p>
        Moderne madrasser har gjerne 5 til 7 komfortsoner med ulik fasthet gjennom madrassen. 
        Skulder- og hoftesonen er mykere slik at kroppen kan synke ned naturlig, mens midjesonen 
        er fastere for å støtte korsryggen. Jo flere soner, desto bedre tilpasning, men også 
        høyere pris. For de fleste gir 5 soner svært god komfort.
      </p>

      <h3>Overmadrassen</h3>
      <p>
        Overmadrassen ligger øverst og er det du kjenner direkte mot kroppen. Den finnes i 
        skum, latex, dun og fiber. Skum (memory foam) former seg etter kroppen og gir god 
        trykkavlastning, men kan bli varmt. Latex er pustende, elastisk og langvarig, men 
        dyrere. Dun og fiber gir en myk og luftig følelse, men flatere raskere.
      </p>
      <p>
        Et viktig tips: overmadrassen bør byttes oftere enn selve madrassen. En god overmadrass 
        varer 5 til 8 år, mens madrassen under kan vare 10 til 15 år.
      </p>

      <h2>Fasthet: slik finner du riktig</h2>
      <p>
        Fastheten på madrassen er avgjørende for god søvn. For myk madrass gir dårlig støtte 
        og ryggsmerter. For hard madrass gir trykkpunkter på skuldre og hofter. Riktig fasthet 
        avhenger av kroppsvekt, sovestilling og personlig preferanse.
      </p>
      <p>
        Som tommelfingerregel: personer under 70 kg bør velge myk til medium. Mellom 70 og 
        95 kg passer medium til fast for de fleste. Over 95 kg bør du vurdere fast til ekstra fast 
        for tilstrekkelig støtte. Magesovere trenger gjerne en fastere madrass enn sidesovere, 
        fordi bekkenet ellers synker for mye ned.
      </p>
      <p>
        Det viktigste rådet: test madrassen i butikken i minst 10 til 15 minutter. Ta av jakken, 
        legg deg ned i din vanlige sovestilling, og kjenn etter om ryggraden ligger i en naturlig 
        linje. Flere kjeder som Jensen, Wonderland og Svane har sengeeksperter som kan hjelpe 
        deg med å finne riktig fasthet.
      </p>

      <h2>Prisklasser i Norge 2026</h2>
      <p>
        Sengemarkedet i Norge spenner fra budsjettmodeller til svært eksklusive senger. Her er 
        en realistisk oversikt over hva du kan forvente i de ulike prisklassene.
      </p>
      <p>
        Under 8 000 kroner finner du enkle rammemadrasser og basismodeller fra IKEA, JYSK og 
        nettbutikker. Kvaliteten er grei for gjesterom og midlertidige løsninger, men madrassen 
        vil typisk vare 5 til 7 år.
      </p>
      <p>
        Mellom 8 000 og 20 000 kroner ligger det beste verdi-segmentet. Her finner du solide 
        rammemadrasser og innstegsmodeller av kontinentalsenger fra Bohus, Skeidar, Møbelringen 
        og nettforhandlere som Bedre Nætter. Mange av disse har pocketfjærer, vendbar madrass 
        og grei komfort som varer 8 til 12 år.
      </p>
      <p>
        Mellom 20 000 og 45 000 kroner får du kontinentalsenger med avanserte fjærsystemer, 
        flere komfortsoner, og kvalitetsmadrasser fra kjente norske og skandinaviske produsenter 
        som Jensen, Wonderland og Svane. Dette er prisklassen der de fleste finner den beste 
        balansen mellom komfort, kvalitet og pris.
      </p>
      <p>
        Over 45 000 kroner er premium-segmentet med toppmodeller fra Jensen, Wonderland, DUX 
        og Hästens. Her får du den beste teknologien, materialkvaliteten og liggekomforten 
        som er tilgjengelig. En seng i denne klassen kan vare 20 år eller mer med riktig 
        vedlikehold.
      </p>

      <h2>Norske sengemerker og kjeder du bør kjenne til</h2>
      <p>
        Jensen er Norges mest kjente sengeprodusent. Alle senger produseres i Svelvik utenfor 
        Drammen, og merket er Svanemerket. Jensen selges primært gjennom Skeidar, som er 
        Norges største Jensen-forhandler, men finnes også hos andre kjeder.
      </p>
      <p>
        Wonderland er et annet norskprodusert merke med hovedkontor i Ålesund. De er kjent 
        for sitt patenterte justerbare bunnlag og bruker naturmaterialer som ull og naturlatex 
        i mange modeller. Svane, produsert av Ekornes-konsernet, er et tredje norsk alternativ 
        med lang tradisjon.
      </p>
      <p>
        Blant kjedene har Bohus, Skeidar og Møbelringen det bredeste utvalget i fysiske butikker. 
        IKEA tilbyr de laveste prisene, men med enklere konstruksjon. Nettbaserte aktører som 
        Bedre Nætter og Nordic Dream har gjort seg bemerket med skandinavisk design, lange 
        prøveperioder (opptil 100 dager) og konkurransedyktige priser levert rett hjem.
      </p>

      <h2>Seng for vondt i ryggen</h2>
      <p>
        Ryggsmerter er en av de vanligste grunnene til å bytte seng. Nøkkelen er å finne en 
        madrass som holder ryggraden i en naturlig linje uansett sovestilling. Det betyr en 
        madrass med gode komfortsoner som gir skuldrene og hoftene plass til å synke ned, 
        samtidig som korsryggen får aktiv støtte.
      </p>
      <p>
        En vanlig feil er å tro at en hard madrass er best for ryggen. Det stemmer ikke. En 
        for hard madrass tvinger kroppen inn i unaturlige stillinger og skaper trykkpunkter. 
        For de fleste med ryggplager er medium til medium-fast det beste valget. Regulerbare 
        senger kan også hjelpe, siden du kan heve hodedelen lett for å redusere belastningen 
        på korsryggen.
      </p>
      <p>
        Har du kroniske ryggproblemer, bør du rådføre deg med lege eller fysioterapeut før 
        du velger seng. Mange sengeforhandlere har også sengeeksperter med kompetanse på 
        ergonomi.
      </p>

      <h2>Vanlige feil når du kjøper seng</h2>
      <p>
        Den vanligste feilen er å velge seng basert på utseende fremfor liggekomfort. En 
        vakker seng med dårlig madrass gir dårlig søvn. Prioriter alltid madrassen først, 
        deretter hodegavl og design.
      </p>
      <p>
        Feil nummer to er å teste madrassen for kort tid i butikken. 30 sekunder gir deg 
        ingen informasjon. Legg deg ned i 10 til 15 minutter og kjenn etter i din vanlige 
        sovestilling. Feil nummer tre er å kjøpe for smal seng. Hvis budsjettet er stramt, 
        er det bedre å velge en bredere seng med rimeligere madrass enn en smal seng med 
        dyr madrass.
      </p>
      <p>
        En fjerde feil er å glemme overmadrassen. En god overmadrass utgjør en enorm forskjell 
        i komfort og forlenger levetiden til madrassen under. Den femte feilen er å vente for 
        lenge med å bytte. En madrass som er eldre enn 10 år har mistet mye av støtteevnen, 
        selv om den virker fin utenpå.
      </p>

      <h2>Slik vedlikeholder du sengen</h2>
      <p>
        Riktig vedlikehold forlenger levetiden betraktelig. Luft soverommet daglig og la 
        dynen ligge brettet tilbake i minst 30 minutter etter at du har stått opp, slik at 
        fukt kan fordampe. Snu og roter overmadrassen hver tredje måned for jevn slitasje. 
        Mange madrasser bør også snus etter produsentens anvisning.
      </p>
      <p>
        Bruk alltid madrassbeskytter. Den beskytter mot svette, flekker og støvmidd, og 
        kan vaskes på 60 grader. Støvsug madrassen halvårlig for å fjerne støv og allergener. 
        Sjekk sengebena og rammen for løse deler eller slitasje en gang i året.
      </p>

      <h2>Når bør du bytte seng?</h2>
      <p>
        Tommelfingerregel: bytt madrass hvert 8 til 12 år, overmadrass hvert 5 til 8 år. 
        Men det finnes tydelige tegn på at det er på tide å bytte tidligere. Hvis du våkner 
        med stivhet eller smerter som forsvinner i løpet av dagen, er madrassen sannsynligvis 
        utslitt. Synlige groper eller ujevnheter i madrassen er et sikkert tegn. Hvis du sover 
        bedre på hotell enn hjemme, er det på tide å handle.
      </p>
      <p>
        En god seng er en av de smarteste investeringene du kan gjøre for helsen din. Prisen 
        per natt for en seng til 25 000 kroner som varer 12 år er under 6 kroner. Det er 
        rimeligere enn en kopp kaffe, og langt viktigere for livskvaliteten.
      </p>

      <h2>Sammenligning: kontinentalseng vs rammemadrass vs regulerbar seng</h2>
      <p>
        For å gjøre valget enklere har vi sammenlignet de tre hovedtypene på de viktigste 
        parameterne. Kontinentalsengen scorer høyest på komfort og luksusfølelse, men er 
        tyngst og dyreste. Rammemadrassen er den mest fleksible og rimeligste, men gir 
        noe mindre dybdekomfort. Den regulerbare sengen vinner for deg med spesielle behov 
        eller som ønsker å lese og se TV i sengen.
      </p>
      <p>
        Når det gjelder komfort scorer kontinentalsengen 9 av 10, regulerbar seng 8 av 10, 
        og rammemadrass 7 av 10. På pris starter rammemadrassen fra rundt 3 000 kroner, 
        kontinentalsengen fra 8 000 kroner, og regulerbar seng fra 15 000 kroner. Levetiden 
        er lengst for kontinentalseng med 12 til 20 år, deretter regulerbar med 10 til 15 år, 
        og rammemadrass med 8 til 12 år. Rammemadrassen er enklest å flytte, kontinentalsengen 
        vanskeligst. For par som trenger ulik fasthet er kontinentalseng og regulerbar seng 
        klart bedre enn rammemadrass.
      </p>

      <h2>Sovestilling og sengevalg</h2>
      <p>
        Sovestillingen din påvirker hvilken madrass som gir best resultat. Sidesovere trenger 
        en madrass som lar skulder og hofte synke ned, slik at ryggraden holder en rett linje 
        sett fra siden. En medium til myk madrass med gode komfortsoner er ideelt. Mange 
        sidesovere har ekstra nytte av en god overmadrass i latex eller memory foam som 
        former seg etter kroppens konturer.
      </p>
      <p>
        Ryggsovere trenger jevn støtte gjennom hele kroppen, med litt ekstra i korsryggpartiet. 
        Medium fasthet fungerer for de fleste ryggsovere. En madrass med 5 til 7 soner fordeler 
        vekten godt. Magesovere har det vanskeligst. De trenger en fastere madrass som hindrer 
        bekkenet i å synke for mye ned, noe som ellers ville skapt en unaturlig svaibue i 
        korsryggen. En fast madrass uten for mye dybdekomfort er ofte det beste valget.
      </p>
      <p>
        Mange av oss skifter stilling gjennom natten. Er du en kombinasjonssover, velg medium 
        fasthet med pocketfjærer. Disse responderer raskt på bevegelse og tilpasser seg uansett 
        hvilken stilling du havner i.
      </p>

      <h2>Hodegavl: mer enn pynt</h2>
      <p>
        Hodegavlen er det første du ser når du går inn i soverommet, og den setter tonen for 
        hele rommet. Men hodegavlen har også en praktisk funksjon: den gir støtte når du sitter 
        oppreist i sengen, og den hindrer puter i å falle ned bak sengen.
      </p>
      <p>
        Polstrede hodegavler i stoff eller skinn er mest komfortable å lene seg mot. 
        Trehoderavler gir et skandinavisk uttrykk og er enkle å holde rene. Mange 
        kontinentalsenger selges uten hodegavl, slik at du kan velge en som passer stilen 
        din. Priser for hodegavler varierer fra 1 000 kroner for enkle modeller til 10 000 
        kroner eller mer for polstrede designhodegavler.
      </p>
      <p>
        Et tips: velg en nøytral farge på hodegavl og seng, og varier stilen med sengetøy, 
        pledd og puter. En seng skal vare i mange år, og nøytrale farger forblir tidløse.
      </p>

      <h2>Kjøpe seng på nett vs i butikk</h2>
      <p>
        Netthandel med senger har eksplodert de siste årene. Fordelen er lavere priser, enkel 
        sammenligning og levering rett hjem. Mange nettforhandlere tilbyr 100 dagers prøvetid 
        med full returrett, noe som fjerner mye av risikoen.
      </p>
      <p>
        Likevel anbefaler vi å teste senger i butikk hvis du kan, spesielt første gang du 
        kjøper en kvalitetsseng. Ingenting erstatter følelsen av å ligge på madrassen og kjenne 
        fastheten mot egen kropp. Butikker som Bohus, Skeidar og Møbelringen har sengeeksperter 
        som kan hjelpe deg med å finne riktig madrass basert på kroppsvekt, sovestilling og 
        eventuelle helsebehov.
      </p>
      <p>
        En god mellomløsning er å teste i butikk og deretter sammenligne priser på nett. 
        Mange kjeder prismatcher mot nettbutikker. Du kan også teste en sengetype i butikk, 
        og deretter bestille en tilsvarende modell fra en nettforhandler med lang prøvetid.
      </p>

      <h2>Sjekkliste: 10 ting å tenke på før du kjøper</h2>
      <p>
        Mål soverommet nøye, inkludert døråpninger og gangpassasjer. Bestem om du vil ha 
        kontinentalseng, rammemadrass eller regulerbar seng. Velg riktig størrelse basert 
        på hvem som skal sove i sengen. Finn riktig fasthet ut fra kroppsvekt og sovestilling. 
        Test madrassen i butikken i minst 10 til 15 minutter. Sjekk hva slags fjærsystem 
        og komfortsoner madrassen har. Vurder overmadrassen som en del av investeringen. 
        Spør om garanti, prøvetid og returbetingelser. Planlegg for levering og eventuell 
        fjerning av gammel seng. Og husk: kjøp det beste du har råd til. Søvnen din er 
        verdt det.
      </p>

      <div style={{ marginTop: 'var(--space-3xl)', padding: 'var(--space-2xl)', background: 'var(--color-accent-subtle)', borderRadius: 'var(--border-radius-lg)' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Finn møbelbutikker nær deg</h3>
        <p style={{ marginBottom: 'var(--space-lg)' }}>
          Klar for å teste senger? Se vår komplette oversikt over møbelbutikker i hele Norge.
        </p>
        <Link href="/mobelbutikker/" className="btn btn--primary" style={{ display: 'inline-flex' }}>
          Finn butikk →
        </Link>
      </div>
    </div>
  );
}

function PlaceholderContent({ guide }: { guide: { title: string } }) {
  return (
    <div className="article-content container--narrow">
      <p>Denne guiden er under utarbeidelse. Vi jobber med å gi deg den mest komplette og uavhengige oversikten over de beste alternativene i {new Date().getFullYear()}.</p>
      <p>Kom tilbake snart for den ferdige guiden, eller utforsk våre andre guider i mellomtiden.</p>
      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <Link href="/guide/" className="btn btn--outline">← Tilbake til alle guider</Link>
      </div>
    </div>
  );
}

export default async function GuideSinglePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || guide.category !== 'kjopsguide') return notFound();

  const faqItems = slug === 'beste-sofa' ? [
    { q: 'Hva koster en god sofa i Norge?', a: 'En god sofa i Norge koster typisk mellom 10 000 og 30 000 kroner. Under 10 000 får du grunnleggende kvalitet, mens over 30 000 kroner gir premium materialer og konstruksjon som varer 15+ år.' },
    { q: 'Hvilket materiale er best for sofa med barn og dyr?', a: 'Mikrofiber og robuste blandingsstoffer er best for familier. De er slitesterke, flekkavisende og enkle å rengjøre. Unngå lyst lin og fløyel.' },
    { q: 'Hvor lenge bør en sofa vare?', a: 'En kvalitetssofa bør vare 10 til 15 år med riktig vedlikehold. Billigere sofaer holder typisk 3 til 7 år.' },
    { q: 'Er det verdt å kjøpe dyr sofa?', a: 'Ja, over tid er det ofte billigere å kjøpe én kvalitetssofa enn to billige. En sofa til 25 000 som varer 15 år koster under 5 kroner per dag.' },
  ] : slug === 'beste-seng' ? [
    { q: 'Hva koster en god seng i Norge?', a: 'En god seng i Norge koster typisk mellom 10 000 og 30 000 kroner. Under 8 000 kroner får du enkle rammemadrasser. Mellom 20 000 og 45 000 kroner finner du kvalitetskontinentalsenger fra Jensen, Wonderland og Svane. Over 45 000 kroner er premium-segmentet.' },
    { q: 'Hva er forskjellen på kontinentalseng og rammemadrass?', a: 'En kontinentalseng har tre lag (bunnmadrass, springfjærmadrass og overmadrass) og gir dypere komfort og høyere seng. En rammemadrass er enklere med madrass i treramme, rimeligere, lettere å flytte, og gir gjerne et fastere underlag.' },
    { q: 'Hvor lenge bør en seng vare?', a: 'En kvalitetsmadrass bør vare 8 til 12 år, en overmadrass 5 til 8 år. Premium kontinentalsenger fra anerkjente produsenter kan vare 15 til 20 år med riktig vedlikehold. Bytt dersom du våkner med stivhet eller smerter som forsvinner i løpet av dagen.' },
    { q: 'Hvilken fasthet bør jeg velge?', a: 'Fastheten avhenger av kroppsvekt og sovestilling. Under 70 kg: myk til medium. 70 til 95 kg: medium til fast. Over 95 kg: fast til ekstra fast. Magesovere trenger gjerne fastere madrass enn sidesovere. Test alltid i butikken i minst 10 til 15 minutter.' },
    { q: 'Er dyr seng verdt pengene?', a: 'Ja. En seng til 25 000 kroner som varer 12 år koster under 6 kroner per natt. God søvn påvirker energi, humør og helse hver eneste dag. Det er en av de smarteste investeringene du kan gjøre i hjemmet.' },
    { q: 'Hvilken seng er best for vondt i ryggen?', a: 'Velg en madrass med gode komfortsoner som gir skuldrene og hoftene plass til å synke ned, mens korsryggen får støtte. Medium til medium-fast fasthet passer de fleste med ryggplager. En regulerbar seng kan også hjelpe. Rådgjør med lege ved kroniske problemer.' },
    { q: 'Hva er pocketfjærer?', a: 'Pocketfjærer er individuelle fjærer innpakket i egne stofflommer. De jobber uavhengig av hverandre, slik at bevegelse ikke overføres til resten av madrassen. Det gir presis tilpasning til kroppen og er det mest avanserte fjærsystemet for senger.' },
    { q: 'Hvor ofte bør jeg snu madrassen?', a: 'Snu og roter overmadrassen hver tredje måned for jevn slitasje. Selve madrassen bør snus etter produsentens anvisning. Bruk alltid madrassbeskytter og luft sengen daglig ved å la dynen ligge brettet tilbake i minst 30 minutter.' },
  ] : [];

  const jsonLd: Record<string, unknown>[] = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.metaDescription, datePublished: guide.publishedDate, dateModified: guide.updatedDate, author: { '@type': 'Organization', name: 'møbler.com' }, publisher: { '@type': 'Organization', name: 'møbler.com', url: 'https://møbler.com' } },
  ];
  if (faqItems.length > 0) {
    jsonLd.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
  }

  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
    <article>
      <section className="hero" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Hjem</Link><span>/</span>
            <Link href="/guide/">Kjøpsguider</Link><span>/</span>
            <span>{guide.title.split(' — ')[0]}</span>
          </div>
          <span className="hero__label">Kjøpsguide · {guide.readingTime} min lesetid</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{guide.title}</h1>
          <p className="hero__subtitle">{guide.excerpt}</p>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>Sist oppdatert: {guide.updatedDate}</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        {slug === 'beste-sofa' ? <SofaGuideContent /> : slug === 'beste-seng' ? <SengGuideContent /> : <PlaceholderContent guide={guide} />}
      </section>

      {faqItems.length > 0 && (
        <section className="section section--warm">
          <div className="container">
            <div className="section__header">
              <span className="section__label">Ofte stilte spørsmål</span>
              <h2 className="section__title">FAQ — {guide.title.split(' — ')[0]}</h2>
            </div>
            <div className="faq-list" style={{ maxWidth: 'var(--max-width-narrow)' }}>
              {faqItems.map((faq, i) => (
                <details key={i} className="faq-item">
                  <summary>{faq.q}</summary>
                  <div className="faq-item__answer"><p>{faq.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  </>);
}
