# Säkerhet

## Datacenter och Plats

Klivs produktionstjänster är hostade på Amazon Web Services' ("AWS") EC2-plattform. De fysiska servrarna finns i AWS:s EC2-datacenter. Från och med detta datum har AWS (i) certifieringar för efterlevnad av ISO/IEC 27001:2013, 27017:2015 och 27018:2014, (ii) är certifierad som PCI DSS 3.2 Level 1 Service Provider, och (iii) genomgår SOC 1, SOC 2 och SOC 3 revisioner (med halvårsrapporter).

Ytterligare detaljer om AWS:s efterlevnadsprogram, inklusive FedRAMP-efterlevnad, kan hittas på AWS:s webbplats.

Klivs produktionsmiljö är hostad på en AWS EC2-plattform. Användarinnehåll kan också finnas i Klivs säkerhetskopior, lagrade i AWS EC2, S3 och Glacier.

## Produktionsmiljö

Vi underhåller separata och distinkta produktions-, staging- och utvecklingsmiljöer för Kliv.

För att komma åt Klivs produktionsmiljö autentiserar behöriga och utbildade medlemmar av Klivs site reliability engineering-team och utvalda Engineering-team-medlemmar ("Behörig Personal") sig till VPN med unika starka lösenord och hårdvarubaserade tokens och kommer sedan endast åt produktionsmiljön via ssh-terminalanslutningar med lösenordsskyddade personliga RSA-certifikat.

Behörig Personal är tränad att inte replikera icke-offentlig användardata lagrad i Klivs produktionsmiljö till sina arbetsstationer eller mobila enheter.

## Nätverkssäkerhet

AWS Network ACL och Security Groups används för att begränsa åtkomsten till Klivs system som lämpligt för deras roll.

Offentlig åtkomst är begränsad till port 443 och 80 på nätverkslastbalanserarna för allmän trafik.

## Inloggningssäkerhet

SAML 2.0 SSO stöds för Kliv Enterprise-kunder. Alla kunder kan aktivera 2FA på sina konton.

Om SSO används för att komma åt Kliv kommer Kliv att ärva inloggningssäkerhetsinställningarna i användarens IdP eller Google-konto.

Om man loggar in direkt till Kliv med användarnamn eller e-post och lösenord kräver Kliv minst 8 tecken.

Upprepade misslyckade inloggningsförsök utlöser en 30-sekunders låsning innan en användare kan försöka igen. Lösenord lagras i hashad form och kommer aldrig att skickas via e-post—vid konto- och lösenordsåterställning kommer Kliv att skicka en länk till e-postadressen kopplad till kontot som gör det möjligt för användaren att skapa ett nytt lösenord.

Lösenordskomplexitet och sessionslängd-krav kan inte anpassas i appen. Dessa kan dock ställas in inom en IdP för ett SSO-tvingat team.

## Åtkomstkontroll

All användardata lagrad i Kliv skyddas i enlighet med våra skyldigheter i Tjänstevillkoren, och åtkomst till sådan data av Behörig Personal baseras på principen om minsta möjliga privilegium. Endast Behörig Personal har direkt åtkomst till Klivs produktionssystem. De som har direkt åtkomst till produktionssystem får endast se användardata lagrad i Kliv i aggregerad form, för felsökningsändamål eller som annars tillåts i Klivs Integritetspolicy.

Kliv underhåller en lista över Behörig Personal med åtkomst till produktionsmiljön. Dessa medlemmar genomgår brottsregisterkontroller och godkänns av Klivs Engineering-ledning. Kliv underhåller också en lista över personal som har tillåtelse att komma åt Kliv-kod, samt utvecklings- och staging-miljöerna. Dessa listor granskas kvartalsvis och vid rolländring.

Utbildade medlemmar av Klivs kundsupportteam har också ärendespecifik, begränsad åtkomst till användardata lagrad i Kliv genom begränsade åtkomstverktyg för kundsupport. Kundsupportteammedlemmar är inte behöriga att granska icke-offentlig användardata lagrad i Kliv för kundsupportändamål utan uttryckligt tillstånd.

Vid rolländring eller när man lämnar företaget inaktiveras produktionsbehörigheterna för Behörig Personal och deras sessioner tvingas loggas ut. Därefter tas alla sådana konton bort eller ändras.

## Offentligt Innehåll och Andra Behörigheter

Offentliga data kan visas eller kommas åt av vem som helst. Dessutom kan trots allt motsägelsefullt data samlas in, delas, behållas och användas som beskrivs i Klivs Integritetspolicy eller kundens avtal med Kliv.

## Tredjepartsåtkomst

Användardata kan delas av Kliv med tredjepartstjänsteleverantörer (en användares e-postadress för en e-postleverantör, till exempel) i enlighet med Klivs Integritetspolicy och i enlighet med gällande signerade serviceavtal för Kliv.

## Fysisk Säkerhet

Klivs produktionstjänster är hostade på Amazon Web Services' ("AWS") EC2-plattform. De fysiska servrarna finns i AWS:s säkra datacenter.

Vi kräver att kritisk produktionsdata aldrig lagras av de med privilegierad åtkomst på fysiska media utanför vår datahostingleverantörs produktionsmiljöer. Se ovan för information om AWS:s efterlevnadsprogram.

## Företagsmiljö och Flyttbar Media

Strikta brandväggsregler förbjuder åtkomst till nödvändiga portar för användning av Kliv (t.ex. 443), för att hjälpa till att säkerställa begränsad åtkomst till produktionsmiljön till vårt VPN-nätverk och behöriga system. Vårt företagsnätverk har ingen ytterligare åtkomst till produktionsmiljön, med Behörig Personal som krävs för att ansluta till VPN för att komma åt några specialsystem eller miljöer.

Behörig Personal med åtkomst till Klivs produktionsmiljö är tränad som noterat ovan. Dessutom krävs att anställdas arbetsstationer timeout och låses efter maximalt en minut när sömn eller skärmsläckaren börjar.

Vi har ingen ren disk-policy.

## Kryptering Under Överföring

Kliv använder branschstandard Transport Layer Security ("TLS") för att skapa en säker anslutning med 128-bitars Advanced Encryption Standard ("AES") kryptering. Detta inkluderar all data som skickas mellan webb-, desktop-, iOS- och Android-apparna och Kliv-servrarna.

Det finns inget icke-TLS-alternativ för att ansluta till Kliv. Alla anslutningar görs säkert över HTTPS.

## Kryptering I Vila

Dataenheter på servrar som håller användardata använder fullständig disk, branschstandard AES-kryptering.

Kunddatabaser lagras i Amazons S3-tjänst och krypteras med Amazon S3 serverside 256-bitars AES-kryptering.

Krypterings-, nyckelhanterings- och dekrypteringsprocessen inspekteras och verifieras internt av Amazon regelbundet som en del av deras befintliga revisionsprocess. Alla Kliv-säkerhetskopior är krypterade med AES-kryptering.

## Krypteringsnycklar

Krypteringsnycklar för Kliv-bilagor, lagrade i S3, hanteras av Amazon. Krypterings-, nyckelhanterings- och dekrypteringsprocessen inspekteras och verifieras internt av Amazon regelbundet som en del av deras befintliga revisionsprocess.

Krypteringsnycklar som hanteras av vårt team lagras inte utanför Klivs produktionsbackup-miljö och hanteras av vårt SRE-team.

Kliv-säkerhetskopior är av hela datamängden, så de är krypterade med en delad nyckel.

## Databorttagning - Avslut av Avtal

Vid avslutande av ett Kliv Enterprise-avtal, om begärt av Kliv-kundens administratör, kommer det användarinnehåll som lagras av Kliv att tas bort helt från den live Kliv-produktionsdatabasen inom 30 dagar. Teamets data kommer att finnas kvar i krypterade Kliv-databassäkerhetskopior tills dessa säkerhetskopior faller utanför 90-dagars backup-behållningsfönstret och förstörs i enlighet med vår dataretentionspolicy. Om en databasåterställning blir nödvändig inom 90 dagar efter en begärd databorttagning kommer vi att ta bort datan igen så snart som rimligt är möjligt efter att det live produktionssystemet är helt återställt.

För tydlighetens skull, om en kund fortsätter att använda Kliv enligt ett gratis konto eller en annan plan efter avslutandet av ett Business Class eller Enterprise-avtal, kan sådan data behållas för användning i enlighet med de villkor och förutsättningar som gäller för sådant konto eller plan.

## Databorttagning - Användarpersondata

I fallet att ett Kliv-användarkonto tas bort, vid radering, tar Kliv bort användarens persondata, inklusive saker som namn, e-postadress och plats, inom 30 dagar från begäran. Efter 30 dagar kommer sådan persondata att finnas kvar i krypterade Kliv-databassäkerhetskopior tills dessa säkerhetskopior faller utanför 90-dagars behållningsfönster och förstörs helt.

I vissa fall där Kliv har ett legitimt affärs- eller juridiskt ändamål att göra det kan Kliv behålla användarpersondata. Några exempel på detta inkluderar finansiell information relaterad till saker som köp och faktureringsregister; register som visar varför kontot raderades; eller data som rör en rättegång eller annan juridisk förfrågan.

## Utveckling, Patch och Konfigurationshantering

Alla ändringar i Klivs produktionssystem, vare sig kod- eller systemkonfigurationsändringar, kräver granskning före driftsättning till produktionsmiljön. Produktionskod är också föremål för regelbundet utförda automatiserade sårbarhetsskanningar. Alla ändringar i Klivs kod testas i en staging-miljö före driftsättning till produktion. Patcher till Kliv webbklient driftsätts rullande, vanligtvis flera gånger per vecka. Kliv-produktionsservrarna hanteras via ett centraliserat konfigurationssystem. Patcher driftsätts som relevanta för deras säkerhets- och stabilitetspåverkan, med kritiska patcher som kan driftsättas väl inom 24 timmar från tillgänglighet som lämpligt.

Vi begränsar åtkomst som noterat ovan och underhåller separata listor över relevanta roller med åtkomst till källkod, utveckling, staging och produktionsmiljöer. Dessa listor granskas kvartalsvis och vid rolländring. Vi använder källkodshanteringsverktyg och repositories.

Alla produktionsservrar kör en LTS (Long Term Support) distribution av sitt operativsystem för att säkerställa att tidiga uppdateringar är tillgängliga. CVE-listor och notifikationer övervakas aktivt och alla system kan patchas inom en tidslinje relevant för problemets allvarlighetsgrad.

## Händelselogging

Vissa användaråtgärder som manipulerar användardata lagras inom Kliv och är tillgängliga för kunden/användaren.

Alla Kliv API-anrop och applikationsloggar hålls för våra interna ändamål i minst 30 dagar utan känslig information (inga fullständiga användartokens, inget användargenererat innehåll), och är endast tillgängliga för behöriga anställda som krävs av deras roll för övervakning av Kliv för att säkerställa tillgänglighet och prestanda och för att förhindra missbruk.

Applikationsloggar för Kliv samlas in centralt i Amazon CloudWatch i minst 30 dagar för övervakning och analys.

## Resurshantering

Medan vissa resurser inte ägs av en specifik individ, fördelas ägande och underhåll av konfidentialitet, integritet och tillgänglighet för våra system bland SRE- och Operations-teamen. Resurser överförs vid rolländring eller när man lämnar företaget.

## Data Inom Kliv

Kliv validerar filer för välformlighet. Vi kommer att försöka avvisa alla filer som inte uppfyller lämpliga standarder.

## Backup, Business Continuity och Disaster Recovery Policy

### Backup-policy

Kliv-konfiguration och metadata backas upp regelbundet. Alla säkerhetskopior är krypterade och hanteras av Amazon AWS och utformade så att de är tillgängliga vid det osannolika fallet att en återställning blir nödvändig.

Databaser lagrade av Kliv backas inte upp enligt samma schema, utan förlitar sig istället på Amazon S3:s interna redundansmekanism.

Eftersom användardata lagrad i Kliv är på en delad infrastruktur är det inte möjligt för oss att återställa en delmängd av den informationen från säkerhetskopior. Om någon kund är särskilt orolig för att behålla en komplett register över sin information i Kliv föreslår vi att sådan kund ofta exporterar sin data eller använder vårt API för att ansluta ett DLP-verktyg till Kliv.

### Backup-intervall

Kliv skapar en fullständig backup-snapshot av primärdatabasen en gång varje 24:e timme.

### Backup-lagring

Alla Kliv-säkerhetskopior behålls inuti Amazon AWS.

Endast behöriga medlemmar av Klivs operations-team har tillgång till backup-processen, så att de kan övervaka prestandan för backup-processerna, och i det mycket osannolika fallet att en återställning blir nödvändig.

Efter 90 dagar förstörs de krypterade backup-filerna.

Databaser lagrade inom Kliv hanteras annorlunda än primärdatabas-backuperna. För att backa upp databaser förlitar sig Kliv primärt på S3:s interna redundansmekanism, som Amazon uppger ger 99.99% årlig datadurabilitet.

### Data-portabilitet

Kliv-rapportdefinitioner, användarinformation och metadata är tillgängliga för export av behöriga användare i JSON-format via Kliv REST API.

Databaser som hostas av Kliv kan laddas ner via Kliv API och lagras i industristandard SQLite-format.

### Business Continuity

Klivs operations-team har utformat system för att hålla tjänsten igång även om den underliggande infrastrukturen upplever ett avbrott eller annat betydande problem. Varje kritisk Kliv-tjänst har en sekundär, replikerad tjänst som körs samtidigt med speglad data i en annan AWS tillgänglighetszon än primärservern.

Eftersom det är kritiskt att ha tillförlitlig åtkomst till ditt företags viktiga projekt och data har Kliv arkitekterats för att överleva ett enstaka tillgänglighetszonsavbrott utan betydande tjänststörningar.

### Disaster Recovery

I det osannolika fallet att två Amazon EC2 tillgänglighetszoner har långsiktiga tjänstavbrott har Kliv utformats för att återhämta sig med begränsad tjänststörning och ett mål på max 1 timme dataförlust.

I det ännu mer osannolika fallet att Klivs hela AWS EC2-region är oåterkalleligt förlorad kommer vi att återställa servrar med automatiserade konfigurationssystem. I detta fall är Klivs system utformade för att återställa användardata så snabbt som rimligt är möjligt, med ett mål på högst 24 timmar dataförlust.

Klivs SRE-team testar regelbundet de olika komponenterna i sin Business Continuity-arkitektur för att säkerställa fortsatt drift. Kliv kör för närvarande ingenting som Chaos Monkey.

## Incidenter och Response

Ett Kliv-problem som påverkar en Kliv Enterprise-kund kommer att tilldelas en Severity Nivå och hanteras enligt lösningarna i Tabell 1.

**Tabell 1: Incidenter och Response Severity Nivåer:**

| Nivå | Beskrivning | Lösning | Exempel |
|------|-------------|---------|---------|
| Severity 1 | Kliv är inte tillgängligt eller är oanvändbart. | Arbete börjar inom 1 timme från rapport, tillfällig lösning inom 4 timmar, slutlig lösning inom 7 timmar. | Webbplatsen svarar inte. |
| Severity 2 | Tjänst eller prestanda är avsevärt försämrad på ett sätt som förhindrar normal användning. | Arbete börjar inom 2 timmar från rapport, tillfällig lösning inom 48 timmar, slutlig lösning inom 14 dagar. | Kliv kan inte användas med den nya Firefox-versionen som kom ut idag. |
| Severity 3 | En tjänst som inte är väsentlig för Klivs huvudfunktion är otillgänglig eller försämrad. | Arbete börjar inom 72 timmar från rapport, tillfällig lösning inom 7 dagar, slutlig lösning inom 30 dagar. | Det offentliga rapportgalleriet saknar några nyligen skapade rapporter. |
| Severity 4 | Mindre eller kosmetiska problem med Kliv-tjänster, och alla funktionsförfrågningar. | Lösning efter Kliv-teamets eget gottfinnande. | Rapportbilder har fel bakgrundsfärg; funktionsförfrågan för en ny typ av visualisering. |

## Anställdas Policyer

### Antivirus

För Behörig Personal måste alla arbetsstationer som kör Windows eller macOS som används för ssh-terminalåtkomst till produktionsmiljön ha uppdaterat antivirus och anti-malware-programvara med realtidsövervakning och minst dagliga uppdateringar.

### Fjärråtkomst

Många av Klivs teammedlemmar arbetar på distans. Strikta brandväggsregler är på plats och begränsar därmed åtkomsten till produktionsmiljön till vårt VPN-nätverk och behöriga system. Vissa andra kontroller som beskrivs ovan, inklusive Behörig Personal och företagsmiljökontroller, gäller också för fjärråtkomst som lämpligt.

### Säkerhetsmedvetenhet och Konfidentialitet

Säkerhetsmedvetenhet och användardata-åtkomstpolicyer täcks under vår anställdas onboarding som lämpligt för rollen och anställda uppdateras när relevanta policyer eller praxis ändras. Våra anställda skriver också under ett sekretessavtal.

Vid händelse av att en säkerhetspolicy bryts av en anställd förbehåller sig Kliv rätten att bestämma lämplig respons, vilket kan inkludera avsked.

### Bakgrundskontroller

Alla våra anställda genomgår en omfattande intervjuprocess före anställning. Våra anställda med direkt åtkomst till produktionsmiljön genomgår en brottsregisterkontroll. Andra anställda kan genomgå en kontroll beroende på deras roll (t.ex. akademisk för juridiska roller eller kredit för finansroller). Lämpliga NDAs finns på plats med tredje parter som lämpligt.

## Underhållspolicy

### Planerat Underhåll

När det är nödvändigt att utföra planerat underhåll på Kliv-tjänster kommer Klivs operations-team att utföra arbetet under en av två schemalagda veckovisa underhållsfönster.

**Planerade Underhållsfönster:**
- Tisdag från 03:00 US Eastern Time till tisdag 06:00 US Eastern Time
- Lördag från 03:00 US Eastern Time till söndag 06:00 US Eastern Time

Dessa fönster har valts med målet att minimera tjänstnedtid, långsamhet eller annan påverkan på de människor och företag som förlitar sig på Kliv.

Vi gör vårt bästa för att göra avbrott så korta som möjligt. Dessutom kommer vårt underhållsschema ofta att utvärderas för att säkerställa att vi håller användarpåverkan så låg som rimligt är möjligt.

### Oplanerat Underhåll

På grund av oförutsedda händelser kan vi behöva sällan utföra oplanerat underhåll på Kliv-infrastruktur eller mjukvarukomponenter. Detta underhåll kan orsaka att några eller alla Kliv-tjänster blir otillgängliga för våra användare under en period. Det är vårt mål att göra detta så sällan som möjligt. Som med planerat underhåll gör vi vårt bästa för att minimera störningar orsakade av tjänstavbrott.