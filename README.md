# MongoDB

## Popis technologie
Je dokumentově orientovaná databáze, která ukládá data ve formátu podobném JSON. Je vhodná pro aplikace vyžadující flexibilní schémata a efektivní práci s velkým objemem nestrukturovaných dat.

### Obecné chování
#### Redis
Je databáze typu klíč-hodnota, má vysokou rychlostí a efektivitu pro operace v paměti. Je ideální pro aplikace vyžadující rychlé čtení a zápis, jako jsou cache, session management nebo fronty zpráv.

#### Cassandra 
Využívá model sloupcově orientovaného ukládání, což ji činí vhodnou pro práci s velkými datovými množstvími rozptýlenými přes mnoho serverů.

#### Neo4j
Je grafová databáze optimalizovaná pro ukládání a navigaci komplexních vztahů mezi daty. Její struktura je ideální pro aplikace jako jsou sociální sítě nebo doporučovací systémy.

#### MongoDB
Je skvělá volba pro aplikace, které vyžadují vysokou škálovatelnost a efektivní manipulaci s velkými objemy dat. MongoDB je navrženo pro horizontální škálovatelnost, což umožňuje rozdělit a distribuovat data na více serverů. Relační databáze jako **PostgreSQL** jsou silné v provádění složitých join operací, které efektivně propojují data z různých tabulek. MongoDB má omezenější schopnosti join operací. I když MongoDB podporuje operace $lookup v agregacích pro propojení dat z různých kolekcí, tyto operace mohou být méně efektivní než joins v SQL databázích, zejména při práci s velkými datovými sadami.

### Základní principy
#### Dokumentově Orientovaná
MongoDB ukládá data ve formě dokumentů, což je ve formátu podobném JSON. Toto umožňuje ukládat složité datové struktury v jednom dokumentu.

#### Škálovatelnost pomocí Sharding
MongoDB podporuje horizontální škálovatelnost prostřednictvím shardingu, což je proces distribuce dat napříč více serverů.

#### Replikace pro Vysokou Dostupnost
MongoDB používá replikační sady k zajištění vysoké dostupnosti a odolnosti vůči chybám. Replikační sady umožňují automatickou failover funkci a obnovu dat.

#### Odlišnosti od Redis, Cassandra a Neo4j

Oproti **Redis**, který je databáze typu klíč-hodnota optimalizovaná pro rychlé operace v paměti, **MongoDB** poskytuje bohatší datový model a trvalé ukládání.
**Cassandra** je sloupcově orientovaná databáze, která exceluje v lineárním škálování a výkonu pro zápisy, zatímco **MongoDB** poskytuje více flexibilní datový model s důrazem na dotazy.
**Neo4j** je optimalizovaná pro modelování a navigaci vztahů mezi daty, což je odlišný přístup oproti dokumentové struktuře **MongoDB**.
V porovnání s relačními databázemi, **MongoDB** nevyužívá tabulkový model ani JOIN operace, což vede k odlišným vzorcům pro modelování dat a dotazování.

### CAP teorém
MongoDB je navrženo s důrazem na vysokou dostupnost a odolnost vůči rozdělení sítě, přičemž konzistence dat může být dočasně uvolněna. Tato kombinace je ideální pro aplikace, které vyžadují rychlou odezvu a nepřetržitou dostupnost, jako jsou webové aplikace, e-commerce platformy a systémy pro správu obsahu, kde může být přijatelné krátkodobé zpoždění v dosažení konzistence dat po celém clusteru. Toto je semestrální práce, takže pro testovácí účely se to hodi.

### Architektura
#### Architektura Řešení:

Využívá sharded cluster, který zahrnuje routery, konfigurační servery a shard servery, což umožňuje efektivní distribuci a správu velkých objemů dat.
**Router servery (router01, router02)** fungují jako vstupní body pro dotazy a řídí přístup k datům uloženým na shard serverech.
**Konfigurační servery (configsvr01, configsvr02, configsvr03)** udržují metadata o struktuře clusteru a rozložení dat.
**Shards (shard01-a, shard01-b, shard01-c, shard02-a, ... , shard03-c)** uchovávají samotná data a jsou organizovány do replikačních sad pro zajištění redundance a odolnosti proti selhání, což je standartní prístup v MongoDB.
#### Využití Sharding a Replikace:

Sharding je implementován pro rozdělení datové zátěže a zlepšení výkonu při práci s velkými daty. Každý shard je replikován napříč několika nodami.
#### Počet Nodů (14):

Počet nodů v clusteru je zvolen tak, aby byla zajištěna dostatečná redundance a zároveň efektivní správa zdrojů. Mám několik shardů s více nodami pro každý shard.

#### Typy a Formáty Dat:

Databáze pracuje s různými typy dat, včetně osobních údajů, informací o pokojích a událostech, ve formátu BSON (Binary JSON).

#### Další Datové Struktury:

Nebyly zvoleny další datové struktury, jako jsou grafové nebo klíč-hodnota modely, protože dokumentově orientovaný model MongoDB nejlépe vyhovuje požadavkům pro flexibilní a rychlé zpracování různorodých datových sad.

#### Odkud jsou data generovaná?
Data jsou generovaná pomocí servisu mockaroo.com. Je to rychlý způsob, jak generovat data pro MongoDB, pokud más validační schéma (já ho mám).

V mém řešení s MongoDB, které je nasazeno prostřednictvím Docker Compose, je perzistence dat řešena následujícím způsobem:

### Perzistence
V mém řešení s MongoDB, které je nasazeno prostřednictvím Docker Compose, je perzistence dat řešena následujícím způsobem:
#### Primární a Sekundární Paměť:

MongoDB ukládá data na disk (sekundární paměť), což zajišťuje jejich trvalou perzistenci. V paměti (primární paměť) jsou udržovány pouze indexy a často používaná data pro zvýšení výkonu při čtení a zápisu.
#### Docker Volumes:

Pro trvalost dat jsem využil Docker Volumes v konfiguraci Docker Compose. Toto řešení zajišťuje, že data uložená v databázi přežijí restarty kontejnerů a jsou správně izolována od změn v kontejnerech.

#### Replikace:

MongoDB je konfigurováno s replikačními sadami. To znamená, že všechna data jsou replikována na více serverů (nodů), což přináší redundantnost dat a chrání proti ztrátě dat v případě selhání jednoho serveru.

#### Sharding

Pro správu velkých objemů dat a zlepšení výkonu jsem implementoval sharding, což umožňuje distribuci datové zátěže na více nodů. To zlepšuje výkon a škálovatelnost, zároveň však udržuje data trvale uložená na disk.

### Zabezpečení
Pro zabezpečení MongoDB, což je databáze, kterou jsem zvolil, existuje několik klíčových možností a způsobů zabezpečení:

#### Autentizace Uživatelů:

MongoDB podporuje autentizaci. To zajišťuje, že pouze autorizovaní uživatelé mají přístup k databázi.

#### Role založené na Oprávnění:

MongoDB umožňuje definovat role s konkrétními oprávněními. Tím lze omezit, co může každý uživatel v databázi dělat, a minimalizovat riziko neoprávněného přístupu k citlivým datům.

#### Šifrování Dat:

MongoDB podporuje šifrování dat v klidu (at-rest encryption) a šifrování dat v pohybu (in-transit encryption). Šifrování v klidu chrání data uložená na disku, zatímco šifrování v pohybu zabezpečuje data přenášená po síti.

#### Síťová Izolace a Firewall:

Konfigurace síťového firewallu a pravidla pro izolaci sítí mohou značně omezit riziko neoprávněných přístupů z vnějších zdrojů.

#### Auditování a Monitoring:

MongoDB nabízí možnosti auditování, které pomáhají sledovat a zaznamenávat aktivity v databázi. Toto je užitečné pro detekci podezřelých aktivit a pro forenzní analýzy.

#### Konfigurace TLS/SSL:

Pro zabezpečení komunikace mezi klienty a serverem MongoDB lze nastavit TLS/SSL, což zajistí, že všechny přenášené informace jsou šifrované.

### Vlastní řesení

#### Síťová Izolace:

Docker Compose poskytuje síťovou izolaci mezi kontejnery, což pomáhá v omezení přístupu k databázovým serverům. To je základní úroveň síťového zabezpečení.

#### Volumy pro Trvalost Dat:

Použití Docker Volumes znamená, že data jsou perzistentní a oddělená od samotných kontejnerů, což přispívá k bezpečnosti dat.

#### Omezení Přístupu přes Porty:

V Docker Compose souboru jsou definovány specifické porty pro expozici služeb.

### Výhody a nevýhody

#### Výhody
##### Flexibilita a Škálovatelnost 
MongoDB poskytuje vysokou flexibilitu díky svému dokumentově orientovanému modelu
##### Vysoká Dostupnost
Replikace a sharding v MongoDB zajišťují vysokou dostupnost a odolnost proti selhání, což je klíčové pro nepřetržitý provoz aplikací.
##### Snadná Integrace
Použití Dockeru usnadňuje nasazení, škálování a správu MongoDB, což zjednodušuje celkový proces vývoje a nasazení.

#### Nevýhody
##### Složitost Správy
Konfigurace a správa sharded clusteru mohou být složité, zejména pokud jde o optimalizaci výkonu a zajištění konzistence dat mezi shardy.
##### Omezení v Dotazování
MongoDB má omezení v pokročilých spojovacích dotazech (joins), což může být nevýhodou pro aplikace, které vyžadují složité relační operace.
### Případy užití
Zvolil jsem MongoDB pro svůj projekt z několika důvodů, které úzce souvisí s mým odborným zaměřením a specifickými požadavky projektu:

#### Použití JavaScriptu pro Práci s Databází:

Jako webový inženýr s dobrou znalostí JavaScriptu mi MongoDB umožňuje využít tento jazyk pro interakci s databází. MongoDB využívá JavaScript pro dotazování, což mi umožňuje plynule pracovat s daty.

#### Zkušenosti s MongoDB v Předchozích Projektech:

Ve své kariéře jsem viděl a pracoval na projektech, které využívaly MongoDB. Tato předchozí zkušenost mi dává důvěru v schopnost efektivně implementovat a spravovat databázi pro aktuální projekt.
#### Specifické Požadavky Projektu:

Můj plán na vytvoření databáze pro studentské koleje vyžaduje flexibilní schéma a efektivní správu rozmanitých dat, což MongoDB nabízí. Jeho schopnost rychle manipulovat s velkými objemy nestrukturovaných dat je ideální pro tuto aplikaci.

#### Proč Ne Redis, Neo4j nebo Cassandra:

Redis by pro tento účel nebyl vhodný, protože je optimalizován pro práci s daty v paměti a nejlépe slouží jako cache nebo pro správu session, což nevyhovuje potřebám databáze studentského koleje.
Neo4j, jako grafová databáze, a Cassandra, jako sloupcově orientovaná databáze, jsou komplexnější a méně vhodné pro tento typ aplikace, která vyžaduje flexibilitu a jednoduchost dokumentově orientovaného modelu.

## Popis vlastního datasetu

Vytvořil jsem vlastní dataset pro databázi studentského koleje, protože to je prostředí, ve kterém žiji a mám s ním každodenní zkušenosti. Rozhodl jsem se zaměřit na popis toho, co vidím každý den, což mi dává přirozené porozumění pro návrh a strukturu dat. To mi umožnilo efektivně vytvořit entity a vztahy, které jsou pro tuto doménu relevantní.

Databáze obsahuje následující kolekce, každá s vlastním validačním schématem a shardováním:

### Students:

Obsahuje záznamy studentů bydlících v kolejích, s informacemi jako **jméno**, **datum narození**, **národnost**, **email**, **telefonní číslo**, **číslo pokoje**, **blok**, **data příjezdu a odjezdu**, **univerzitu a fakultu**. Shardováno na základě **"block"** a **"roomNumber"**.

### Rooms:

Kolekce pro správu pokojů, včetně informací o **čísle pokoje**, **bloku**, **typu pokoje**, **maximální kapacitě**, **aktuálním obsazení a vybavení**. Shardováno na základě **"block"**.

### DormitoryBlocks:

Záznamy o jednotlivých blokách kolejí, včetně jejich **názvů**, **maximální kapacity**, **počtu pokojů a počtu pater**. Shardováno na základě **"name"**.

### Events:

Informace o událostech konaných v koleji, včetně **názvu události**, **data konání**, **popisu** a **organizátora**. Shardováno na základě **"dateOfEvent"**.

### Visitors:

Záznamy návštěvníků studentů, obsahující **ID studenta**, **jméno návštěvníka**, **datum narození**, **pohlaví**, **národnost**, **email**, **telefon** a **účel návštěvy**. Shardováno na základě **"studentId"**.

### MaintenanceRequests:

Požadavky na údržbu v kolejích, včetně **ID studenta**, **ID pokoje**, **datum nahlášení**, **datum vyřešení** a **stavu požadavku**. Shardováno na základě **"dateReported"**.

## Závěr

MongoDB v rámci Docker Compose pro správu databáze studentského koleje nabízí řadu výhod. Klíčovými aspekty jsou:

### Flexibilita a Škálovatelnost MongoDB
Díky dokumentově orientovanému modelu a podpoře shardingů je MongoDB vhodné pro správu a růst velkých a rozmanitých datových sad, které jsou typické pro prostředí koleje.

### Znalost JavaScriptu
Využití JavaScriptu pro práci s MongoDB je významnou výhodou, zejména vzhledem k mé specializaci na webové inženýrství a předchozím zkušenostem s tímto jazykem.

### Vlastní Dataset
Rozhodnutí vytvořit dataset založený na reálném prostředí koleje umožňuje využít praktické znalosti a zkušenosti pro návrh efektivních datových struktur a entit.

### Výběr MongoDB nad Jinými NoSQL Databázemi
MongoDB bylo zvoleno místo jiných NoSQL řešení, jako je Redis, Neo4j nebo Cassandra, kvůli jeho vhodnosti pro daný use case, jednoduchosti a známému vývojovému prostředí.

Celkově je zřejmé, že výběr MongoDB a způsob jeho nasazení v kontejnerech Dockeru byl pečlivě zvážen s ohledem na specifické požadavky a cíle projektu. Toto řešení nabízí kombinaci flexibility, škálovatelnosti, bezpečnosti a přístupnosti, která je klíčová pro úspěšné řízení a analýzu dat v dynamickém a rozmanitém prostředí studentského koleje.

## Zdroje:

https://github.com/minhhungit/mongodb-cluster-docker-compose

https://www.mockaroo.com/

https://www.youtube.com/watch?v=hcFhhYtGGU0

https://www.youtube.com/watch?v=HG6yIjZapSA

https://www.udemy.com/course/docker-kubernetes-the-practical-guide/

https://www.mongodb.com/docs/
