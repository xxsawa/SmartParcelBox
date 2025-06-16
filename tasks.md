- endpoint pro vyhledání nejbližších výdejníc


Vytvoř endpoint, který bude volán při dodání zásilky dle UCs. Endpoint musí provést minimálně:

- změnu stavu objednávky,
- vygenerování kódu pro vyzvednutí zákazníkem,
- zavolání (namockované) externí služby pro odeslání notifikace.

Předpokládej, že zařízení volající API zná číslo zásilky, kterou právě doručuje.


----- Vsetko ohladom zasielky ---- Pre vtvorenie endpointov
- změnu stavu objednávky,
- vygenerování kódu pro vyzvednutí zákazníkem,
- zavolání (namockované) externí služby pro odeslání notifikace.
- overovaci kod co prisiel rovnaky smskou klientovi


----- Vsetko ohladom vydajne miesta ---- Pre vtvorenie endpointov
- vydajne miesta v okoli list paginator podla vzdialenosti
- hladanie podla kodu
- detail boxu
- otvorenie boxu podla cisla zasielky
- (namockovane odoslanie na endpoint ktory otvori box)
- (zmena stavu v db ohladom zasielky a odoslanie na endpoint s notifikaciami)
- (zmena stavu v db ohladom zasielky ze je vyzdvihnuta a endpoint s notifikaciami)



