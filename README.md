# ReHack - Documentazione del Progetto

## Descrizione
ReHack è un applicazione web sviluppata con React che permette agli utenti di navigare, cercare e interagire con una vasta lista di videogiochi. L'applicazione permette di sfogliare un vasto catalogo, filtrare secondo vari parametri, visualizzare i dettagli di un gioco, aggiungerlo o rimuoverlo dai preferiti, leggere le recensioni e live chat, e se autenticato scrivere una recensione o un messaggio live. Inoltre è possibile visualizzare e modificare i propri dati e attività nella dashboard dell'account.

## API
Il progetto utilizza l'API di Rawg.io (https://rawg.io/apidocs) per ottenere dati dai videogiochi e Supabase come BaaS per autenticazione, archiviazione del database e chat in tempo reale.

## Stile
L'applicazione è realizzata in CSS e Bootstrap 5.3 per lo stile.

## Pagine
1. **Home Page** - Elenco dei videogiochi, con la possibilità di filtrarli a piacimento
2. **Pagina Dettaglio** - Elenco informazioni del gioco scelto, con possibilità di aggiungere o rimuovere dai preferiti, visualizzarne gli screenshot con le immagini di gioco, leggere o partecipare alla live chat, leggere o lasciare una recensione.
3. **Risultati di Ricerca** - Mostra giochi filtrati in base ai criteri di ricerca come nome, genere, piattaforma, popolarità, punteggio maggiore, recenti, rilevanza.
4. **Pagine di Autenticazione** - Pagine per registrazione e accesso
5. **Pagina Profilo** - Visualizza le informazioni dell'utente, giochi salvati tra i preferiti e le recensioni fatte, e modifica dei dati utente.

## User Interactions

### Utenti non autenticati:
1. Sfogliare l'elenco completo dei giochi
2. Cercare giochi per nome
3. Filtrare giochi secondo vari criteri e parametri
4. Visualizzare informazioni dettagliate di un gioco specifico
5. Leggere recensioni e live chat di altri utenti
6. Registrarsi con email e password

### Utenti autenticati:
1. Creare e gestire una lista di preferiti
2. Lasciare recensioni
3. Partecipare alla live chat
4. Visualizzare e aggiornare le informazioni del proprio profilo

## Context
L'applicazione utilizza diversi Context Provider React:

1. **SessionContext** - Gestisce i dati della sessione dell'utente
2. **FavContext** - Gestisce i preferiti

## Dipendenze
Lista delle dipendenze usate nel progetto:

- "@supabase/supabase-js"
- "bootstrap"
- "bootstrap-icons"
- "@vercel/analytics"
- "dayjs"
- "prime-react"
- "react"
- "react-dom"
- "react-router"
- "react-spinners"


## Funzionalità principali
1. **Sistema di autenticazione** - Registrazione e Accesso
2. **Chat in tempo reale** - Funzionalità di chat in tempo reale
3. **Filtro giochi** - Filtrare per genere, per nome e piattaforme
4. **Design responsive** - Design full responsive per schermi piccoli, medi e grandi con ottimizzazioni in base alle necessità
5. **Recensioni utente** - Possibilità di leggere e scrivere recensioni
6. **Gestione preferiti** - Salvare i giochi in una lista preferiti

L'applicazione è costruita seguendo standard di codice moderno come custom hooks, Context API e design a componenti, per un codice più pulito e manutenibile

## Struttura di progetto

- Cartella **Components** per elementi UI riutilizzabili (Navbar, Sidebar, Dropdowns, Footer, ecc.)
- Cartella **Pages** per le viste principali dell'applicazione
- Cartella **Context** per la gestione dei contesti
- Cartella **Hooks** per la gestione dei custom hooks
- Cartella **Utils** per funzioni di gestione dei formati delle date
- Cartella **Markup** per la gestione del layout

## Link del progetto

- Link: https://react-progetto-finale-daniele-izzi.vercel.app/
