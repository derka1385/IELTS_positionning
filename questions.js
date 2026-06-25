window.GRAMMAR_CATEGORIES = [
  { id: 'nouns', name: 'Noms', short: 'Nom', color: '#ff6b4a', index: '01', description: 'Dénombrables, indénombrables, pluriels et possessifs.', skills: ['countability', 'plurals', 'possessives'] },
  { id: 'pronouns', name: 'Pronoms', short: 'Pronom', color: '#8b6cff', index: '02', description: 'Référence, accord, relatifs et réfléchis.', skills: ['reference', 'agreement', 'relative pronouns'] },
  { id: 'verbs', name: 'Verbes & temps', short: 'Verbe', color: '#e9ff70', index: '03', description: 'Temps, modaux, accord, voix et verbes irréguliers.', skills: ['tenses', 'modals', 'voice'] },
  { id: 'sentence-parts', name: 'Structure utile', short: 'Structure', color: '#60d6c5', index: '04', description: 'Phrases complètes, accords, ordre naturel et fragments à éviter.', skills: ['fragments', 'agreement', 'word order'] },
  { id: 'adjectives', name: 'Adjectifs', short: 'Adjectif', color: '#ff9bc5', index: '05', description: 'Ordre, comparaison, participes et position.', skills: ['order', 'comparison', 'participles'] },
  { id: 'adverbs', name: 'Adverbes', short: 'Adverbe', color: '#ffc857', index: '06', description: 'Formation, placement, intensité et comparaison.', skills: ['formation', 'placement', 'degree'] },
  { id: 'prepositions', name: 'Prépositions', short: 'Préposition', color: '#5bb8ff', index: '07', description: 'Temps, lieu et associations idiomatiques.', skills: ['time', 'place', 'collocations'] },
  { id: 'conjunctions', name: 'Conjonctions', short: 'Lien', color: '#ff7b7b', index: '08', description: 'Coordination, subordination et liens logiques.', skills: ['coordination', 'subordination', 'logic'] },
  { id: 'verbals', name: 'Formes verbales', short: 'Forme', color: '#a4e06d', index: '09', description: 'Gérondifs, infinitifs, participes et appositions.', skills: ['gerunds', 'infinitives', 'participles'] },
  { id: 'clauses', name: 'Propositions', short: 'Proposition', color: '#b49cff', index: '10', description: 'Indépendantes, relatives, nominales et adverbiales.', skills: ['relative', 'noun clauses', 'adverb clauses'] },
  { id: 'sentences', name: 'Types de phrases', short: 'Phrase', color: '#ff8c5a', index: '11', description: 'Phrases simples, composées, complexes et mixtes.', skills: ['simple', 'compound', 'complex'] }
];

window.GRAMMAR_QUESTIONS = [
  {
    id: 'n1', category: 'nouns', type: 'Complète la phrase', errorType: 'Choix',
    prompt: 'The research provides useful ___ about urban migration.',
    options: ['informations', 'information', 'an information', 'informationes'], answer: 1,
    rule: 'Nom indénombrable', explanation: '“Information” est indénombrable en anglais : pas de -s et pas de “an”. On peut dire “a piece of information”.'
  },
  {
    id: 'n2', category: 'nouns', type: 'Choisis la forme correcte', errorType: 'Forme',
    prompt: 'Which sentence is grammatically correct?',
    options: ["The childrens' results improved.", "The children's results improved.", "The childrens results improved.", "The childrens's results improved."], answer: 1,
    rule: 'Pluriel irrégulier et possessif', explanation: '“Children” est déjà un pluriel irrégulier. Le possessif se forme donc avec ’s : “children’s”.'
  },
  {
    id: 'n3', category: 'nouns', type: 'Repère le bon déterminant', errorType: 'Choix',
    prompt: 'Only ___ equipment was replaced after the inspection.',
    options: ['a few', 'many', 'a little', 'several'], answer: 2,
    rule: 'Dénombrable ou indénombrable', explanation: '“Equipment” est indénombrable. “A little” convient à une petite quantité ; “a few”, “many” et “several” exigent un nom dénombrable.'
  },
  {
    id: 'n4', category: 'nouns', type: 'Trouve le pluriel', errorType: 'Forme',
    prompt: 'The report compares two economic ___.',
    options: ['crisis', 'crisises', 'crises', 'crisies'], answer: 2,
    rule: 'Pluriel d’origine grecque', explanation: 'Le pluriel de “crisis” est “crises”, prononcé /ˈkraɪsiːz/.'
  },
  {
    id: 'n5', category: 'nouns', type: 'Identifie le type de nom', errorType: 'Règle',
    prompt: 'In “Public confidence has fallen”, what kind of noun is “confidence”?',
    options: ['Concrete noun', 'Abstract noun', 'Collective noun', 'Proper noun'], answer: 1,
    rule: 'Noms abstraits', explanation: '“Confidence” désigne une idée ou un état intangible : c’est un nom abstrait.'
  },

  {
    id: 'p1', category: 'pronouns', type: 'Complète la phrase', errorType: 'Accord',
    prompt: 'Each participant submitted ___ response before Friday.',
    options: ['their', 'our', 'its', 'your'], answer: 0,
    rule: 'Accord avec un pronom indéfini', explanation: 'Le singulier “they/their” est courant et correct pour reprendre une personne dont le genre n’est pas précisé après “each participant”.'
  },
  {
    id: 'p2', category: 'pronouns', type: 'Choisis le pronom relatif', errorType: 'Choix',
    prompt: 'The policy, ___ was introduced in 2022, has reduced emissions.',
    options: ['that', 'what', 'which', 'who'], answer: 2,
    rule: 'Proposition relative non restrictive', explanation: 'Après une virgule, une relative non restrictive portant sur une chose prend “which”, jamais “that”.'
  },
  {
    id: 'p3', category: 'pronouns', type: 'Corrige la référence', errorType: 'Choix',
    prompt: 'Neither of the two explanations is convincing; ___ accounts for all the data.',
    options: ['both', 'neither', 'either', 'none'], answer: 1,
    rule: 'Pronoms distributifs', explanation: '“Neither” signifie “aucun des deux”. “None” s’emploie normalement pour trois éléments ou plus.'
  },
  {
    id: 'p4', category: 'pronouns', type: 'Choisis la bonne forme', errorType: 'Forme',
    prompt: 'The researchers designed the survey ___.',
    options: ['themself', 'theirselves', 'themselves', 'themselfs'], answer: 2,
    rule: 'Pronom réfléchi', explanation: 'Le pronom réfléchi correspondant à “they” est “themselves”.'
  },
  {
    id: 'p5', category: 'pronouns', type: 'Évite l’ambiguïté', errorType: 'Référence',
    prompt: 'Maria told Ana that ___ presentation needed more evidence. Which rewrite is clearest?',
    options: ["Maria told Ana, 'Your presentation needs more evidence.'", 'Maria told Ana her presentation needed more evidence.', 'Maria told her that it needed evidence.', 'She told Ana this needed more evidence.'], answer: 0,
    rule: 'Référence pronominale claire', explanation: 'La citation directe avec “your” supprime l’ambiguïté : on sait que la présentation appartient à Ana.'
  },

  {
    id: 'v1', category: 'verbs', type: 'Choisis le temps', errorType: 'Temps',
    prompt: 'Since 2015, the city ___ its cycling network considerably.',
    options: ['expanded', 'has expanded', 'expands', 'had expanded'], answer: 1,
    rule: 'Present perfect', explanation: '“Since 2015” relie un point du passé au présent. On emploie le present perfect : “has expanded”.'
  },
  {
    id: 'v2', category: 'verbs', type: 'Accorde le verbe', errorType: 'Accord',
    prompt: 'The number of international students ___ every year.',
    options: ['increase', 'are increasing', 'increases', 'have increased'], answer: 2,
    rule: 'Accord sujet-verbe', explanation: 'Le noyau du sujet est “the number”, singulier. On écrit “increases”. “A number of students”, lui, prendrait un pluriel.'
  },
  {
    id: 'v3', category: 'verbs', type: 'Choisis la voix adaptée', errorType: 'Structure',
    prompt: 'The final results ___ by an independent panel next week.',
    options: ['will verify', 'will be verified', 'are verifying', 'have verified'], answer: 1,
    rule: 'Passif au futur', explanation: 'Les résultats reçoivent l’action. Le passif futur se construit avec “will be + participe passé”.'
  },
  {
    id: 'v4', category: 'verbs', type: 'Choisis le modal', errorType: 'Nuance',
    prompt: 'The figures are provisional, so they ___ change after the audit.',
    options: ['must', 'should not', 'might', 'used to'], answer: 2,
    rule: 'Modal de possibilité', explanation: '“Might” exprime une possibilité incertaine. “Must” indiquerait une nécessité ou une quasi-certitude.'
  },
  {
    id: 'v5', category: 'verbs', type: 'Ordonne les événements', errorType: 'Temps',
    prompt: 'By the time the committee met, the researchers ___ the data.',
    options: ['already analysed', 'have already analysed', 'had already analysed', 'were already analyse'], answer: 2,
    rule: 'Past perfect', explanation: 'L’analyse est antérieure à une autre action passée (“met”) : on utilise “had analysed”.'
  },

  {
    id: 'sp1', category: 'sentence-parts', type: 'Complète la phrase', errorType: 'Structure',
    prompt: 'Because public transport became cheaper, ___.',
    options: ['more commuters used it', 'using it more commuters', 'which more commuters used', 'and more commuters'], answer: 0,
    rule: 'Phrase complète', explanation: 'Après “because”, il faut terminer avec une proposition complète : sujet + verbe + idée claire.'
  },
  {
    id: 'sp2', category: 'sentence-parts', type: 'Corrige la phrase', errorType: 'Structure',
    prompt: 'Choose the best correction: “The rise in housing costs affecting young workers.”',
    options: ['The rise in housing costs affecting young workers.', 'The rise in housing costs is affecting young workers.', 'The rise in housing costs it affecting young workers.', 'The rise in housing costs to affect young workers.'], answer: 1,
    rule: 'Verbe conjugué nécessaire', explanation: 'La phrase originale n’a pas de verbe conjugué principal. “Is affecting” donne une phrase complète.'
  },
  {
    id: 'sp3', category: 'sentence-parts', type: 'Corrige l’ordre des mots', errorType: 'Ordre',
    prompt: 'Choose the most natural correction: “The scheme has improved significantly access to healthcare.”',
    options: ['The scheme significantly has improved access to healthcare.', 'The scheme has improved significantly access to healthcare.', 'The scheme has significantly improved access to healthcare.', 'The scheme has improved access significantly to healthcare.'], answer: 2,
    rule: 'Ordre naturel du groupe verbal', explanation: 'Avec “has + participe passé”, un adverbe comme “significantly” se place souvent entre l’auxiliaire et le verbe principal.'
  },
  {
    id: 'sp4', category: 'sentence-parts', type: 'Choisis l’accord', errorType: 'Accord',
    prompt: 'The impact of these measures ___ still unclear.',
    options: ['are', 'is', 'were', 'have been'], answer: 1,
    rule: 'Accord avec le noyau du groupe nominal', explanation: 'Le mot principal est “impact”, singulier. “Of these measures” ne change pas l’accord.'
  },
  {
    id: 'sp5', category: 'sentence-parts', type: 'Évite le fragment', errorType: 'Structure',
    prompt: 'Choose the complete sentence.',
    options: ['Although the survey was limited.', 'While the policy remained unpopular.', 'Because the evidence was incomplete.', 'Although the survey was limited, the results were useful.'], answer: 3,
    rule: 'Proposition dépendante', explanation: '“Although”, “while” et “because” créent une dépendance. Il faut ajouter une proposition principale pour finir la phrase.'
  },

  {
    id: 'adj1', category: 'adjectives', type: 'Mets les adjectifs dans l’ordre', errorType: 'Ordre',
    prompt: 'The museum acquired a ___ sculpture.',
    options: ['stone remarkable ancient', 'remarkable ancient stone', 'ancient stone remarkable', 'stone ancient remarkable'], answer: 1,
    rule: 'Ordre des adjectifs', explanation: 'L’ordre naturel est opinion → âge → matière : “a remarkable ancient stone sculpture”.'
  },
  {
    id: 'adj2', category: 'adjectives', type: 'Choisis le comparatif', errorType: 'Forme',
    prompt: 'This method is ___ than the previous one.',
    options: ['more reliable', 'reliabler', 'most reliable', 'more reliabler'], answer: 0,
    rule: 'Comparatif des adjectifs longs', explanation: 'Avec un adjectif long comme “reliable”, le comparatif se forme avec “more”, sans ajouter -er.'
  },
  {
    id: 'adj3', category: 'adjectives', type: 'Choisis le bon participe', errorType: 'Choix',
    prompt: 'Many residents were ___ by the sudden announcement.',
    options: ['surprising', 'surprised', 'surprise', 'surprisingly'], answer: 1,
    rule: 'Adjectifs en -ed et -ing', explanation: 'Les personnes ressentent l’émotion : “surprised”. La chose qui provoque l’émotion est “surprising”.'
  },
  {
    id: 'adj4', category: 'adjectives', type: 'Repère la structure', errorType: 'Structure',
    prompt: 'The higher the price, ___ the demand.',
    options: ['the lower', 'lower', 'the lowest', 'more low'], answer: 0,
    rule: 'Comparatif corrélatif', explanation: 'La structure est “the + comparatif…, the + comparatif…” : “The higher…, the lower…”.'
  },
  {
    id: 'adj5', category: 'adjectives', type: 'Choisis la bonne position', errorType: 'Structure',
    prompt: 'Which sentence is correct?',
    options: ['The afraid residents left early.', 'The residents afraid left early.', 'The residents were afraid and left early.', 'The residents were fear left early.'], answer: 2,
    rule: 'Adjectif prédicatif', explanation: '“Afraid” s’emploie habituellement après un verbe d’état (“were afraid”), et non directement avant le nom.'
  },

  {
    id: 'adv1', category: 'adverbs', type: 'Choisis l’adverbe', errorType: 'Forme',
    prompt: 'The population grew ___ between 2010 and 2020.',
    options: ['rapid', 'rapidly', 'more rapid', 'rapidity'], answer: 1,
    rule: 'Formation de l’adverbe', explanation: 'Le mot modifie le verbe “grew” : il faut l’adverbe “rapidly”.'
  },
  {
    id: 'adv2', category: 'adverbs', type: 'Place l’adverbe', errorType: 'Ordre',
    prompt: 'Which sentence has the most natural word order?',
    options: ['The policy has reduced significantly waste.', 'The policy significantly has reduced waste.', 'The policy has significantly reduced waste.', 'Significantly the policy has waste reduced.'], answer: 2,
    rule: 'Position de l’adverbe', explanation: 'Avec un temps composé, un adverbe médian se place généralement entre l’auxiliaire et le verbe lexical : “has significantly reduced”.'
  },
  {
    id: 'adv3', category: 'adverbs', type: 'Distingue adjectif et adverbe', errorType: 'Choix',
    prompt: 'The evidence appears ___.',
    options: ['strongly', 'strength', 'strong', 'more strongly'], answer: 2,
    rule: 'Après un verbe d’état', explanation: '“Appear” est ici un verbe d’état. Il relie le sujet à un adjectif : “the evidence appears strong”.'
  },
  {
    id: 'adv4', category: 'adverbs', type: 'Choisis le degré', errorType: 'Nuance',
    prompt: 'The two estimates are ___ identical; the difference is less than 0.1%.',
    options: ['hard', 'hardly', 'nearly', 'highly'], answer: 2,
    rule: 'Adverbes de degré', explanation: '“Nearly identical” signifie presque identiques. “Hardly identical” signifierait qu’elles ne le sont presque pas.'
  },
  {
    id: 'adv5', category: 'adverbs', type: 'Évite le faux ami', errorType: 'Choix',
    prompt: 'The team worked ___ to meet the deadline.',
    options: ['hard', 'hardly', 'hardly hard', 'more hardly'], answer: 0,
    rule: 'Hard ou hardly', explanation: '“Work hard” signifie travailler dur. “Hardly” signifie “à peine”, ce qui change complètement le sens.'
  },

  {
    id: 'prep1', category: 'prepositions', type: 'Complète la date', errorType: 'Choix',
    prompt: 'The new regulation came into force ___ 1 January 2024.',
    options: ['in', 'at', 'on', 'by'], answer: 2,
    rule: 'Préposition de temps', explanation: 'On utilise “on” avec une date précise : “on 1 January”.'
  },
  {
    id: 'prep2', category: 'prepositions', type: 'Choisis l’association', errorType: 'Collocation',
    prompt: 'The outcome depends ___ several external factors.',
    options: ['of', 'from', 'on', 'at'], answer: 2,
    rule: 'Préposition idiomatique', explanation: 'Le verbe “depend” se construit avec “on” : “depend on something”.'
  },
  {
    id: 'prep3', category: 'prepositions', type: 'Situe dans le temps', errorType: 'Choix',
    prompt: 'Sales remained stable ___ the first three months of the year.',
    options: ['during', 'since', 'for', 'until'], answer: 0,
    rule: 'During ou for', explanation: '“During” introduit une période nommée (“the first three months”). “For” introduit une durée (“for three months”).'
  },
  {
    id: 'prep4', category: 'prepositions', type: 'Complète le lieu', errorType: 'Choix',
    prompt: 'Most respondents live ___ the outskirts of the city.',
    options: ['in', 'at', 'on', 'to'], answer: 2,
    rule: 'Préposition de lieu', explanation: 'L’expression consacrée est “on the outskirts of a city”.'
  },
  {
    id: 'prep5', category: 'prepositions', type: 'Repère la bonne tournure', errorType: 'Collocation',
    prompt: 'Which phrase is correct?',
    options: ['an increase of 12% in prices', 'an increase at 12% on prices', 'an increase with 12% of prices', 'an increase by 12% of prices'], answer: 0,
    rule: 'Prépositions des tendances', explanation: 'On dit “an increase of 12% in prices”. Avec un verbe : “prices increased by 12%”.'
  },

  {
    id: 'conj1', category: 'conjunctions', type: 'Choisis le lien logique', errorType: 'Logique',
    prompt: '___ the sample was small, the findings were statistically significant.',
    options: ['Because', 'Although', 'Therefore', 'Unless'], answer: 1,
    rule: 'Concession', explanation: '“Although” introduit un contraste : malgré la petite taille de l’échantillon, le résultat est significatif.'
  },
  {
    id: 'conj2', category: 'conjunctions', type: 'Relie deux phrases', errorType: 'Ponctuation',
    prompt: 'The cost is high; ___, the long-term benefits are substantial.',
    options: ['because', 'however', 'although', 'so that'], answer: 1,
    rule: 'Adverbe conjonctif', explanation: '“However” peut suivre un point-virgule et est suivi d’une virgule. “Although” doit introduire une proposition dépendante.'
  },
  {
    id: 'conj3', category: 'conjunctions', type: 'Complète la corrélation', errorType: 'Structure',
    prompt: 'The reform will affect not only schools ___ universities.',
    options: ['and also', 'but also', 'as well', 'or neither'], answer: 1,
    rule: 'Conjonction corrélative', explanation: 'La paire correcte est “not only … but also …”. Les deux éléments reliés doivent être parallèles.'
  },
  {
    id: 'conj4', category: 'conjunctions', type: 'Choisis la condition', errorType: 'Logique',
    prompt: 'The target will not be met ___ further action is taken.',
    options: ['if', 'unless', 'because', 'whereas'], answer: 1,
    rule: 'Unless', explanation: '“Unless” signifie “if … not” : la cible ne sera pas atteinte si aucune mesure supplémentaire n’est prise.'
  },
  {
    id: 'conj5', category: 'conjunctions', type: 'Choisis la coordination', errorType: 'Logique',
    prompt: 'Demand fell, ___ production remained unchanged.',
    options: ['for', 'yet', 'so', 'nor'], answer: 1,
    rule: 'Conjonction de coordination', explanation: '“Yet” relie deux idées contrastées : la demande a baissé, mais la production n’a pas changé.'
  },

  {
    id: 'verbals1', category: 'verbals', type: 'Gérondif ou infinitif', errorType: 'Forme',
    prompt: 'The committee recommended ___ the proposal.',
    options: ['to revise', 'revise', 'revising', 'to revising'], answer: 2,
    rule: 'Verbe suivi du gérondif', explanation: '“Recommend” se construit avec un gérondif (“recommend revising”) ou avec une proposition en “that”.'
  },
  {
    id: 'verbals2', category: 'verbals', type: 'Choisis l’infinitif', errorType: 'Forme',
    prompt: 'The scheme aims ___ access to higher education.',
    options: ['improving', 'improve', 'to improve', 'to improving'], answer: 2,
    rule: 'Verbe suivi de l’infinitif', explanation: '“Aim” est suivi de l’infinitif avec “to” : “aims to improve”.'
  },
  {
    id: 'verbals3', category: 'verbals', type: 'Évite le participe mal rattaché', errorType: 'Structure',
    prompt: 'Which sentence is correctly constructed?',
    options: ['Having analysed the data, the conclusion was clear.', 'Having analysed the data, the researchers reached a clear conclusion.', 'Analysing the data, a conclusion appeared.', 'Having been analysed, the researchers concluded the data.'], answer: 1,
    rule: 'Participe rattaché au bon sujet', explanation: 'Le sujet qui suit la proposition participiale doit accomplir l’action : ce sont les chercheurs qui ont analysé les données.'
  },
  {
    id: 'verbals4', category: 'verbals', type: 'Sens du gérondif', errorType: 'Nuance',
    prompt: '“The company stopped producing plastic bags” means that the company…',
    options: ['paused in order to produce bags', 'no longer produces bags', 'forgot to produce bags', 'tried to produce bags'], answer: 1,
    rule: 'Stop doing ou stop to do', explanation: '“Stop doing” signifie cesser l’activité. “Stop to do” signifie interrompre une action afin d’en faire une autre.'
  },
  {
    id: 'verbals5', category: 'verbals', type: 'Identifie la fonction', errorType: 'Règle',
    prompt: 'In “Reducing waste requires collective action”, what is “Reducing waste”?',
    options: ['A gerund phrase acting as subject', 'A participle modifying action', 'An infinitive phrase', 'A finite verb phrase'], answer: 0,
    rule: 'Groupe gérondif sujet', explanation: '“Reducing waste” fonctionne comme un nom et occupe la position de sujet : c’est un groupe gérondif.'
  },

  {
    id: 'cl1', category: 'clauses', type: 'Choisis la relative', errorType: 'Choix',
    prompt: 'Students ___ first language is not English may need extra support.',
    options: ['who', 'which', 'whose', 'whom'], answer: 2,
    rule: 'Pronom relatif possessif', explanation: '“Whose” exprime la possession : la première langue des étudiants.'
  },
  {
    id: 'cl2', category: 'clauses', type: 'Identifie la proposition', errorType: 'Règle',
    prompt: 'In “What the study reveals is concerning”, what kind of clause is “What the study reveals”?',
    options: ['Adverb clause', 'Noun clause', 'Independent clause', 'Relative clause modifying study'], answer: 1,
    rule: 'Proposition nominale', explanation: 'Toute la proposition occupe la fonction de sujet du verbe “is” : c’est une proposition nominale.'
  },
  {
    id: 'cl3', category: 'clauses', type: 'Évite le fragment', errorType: 'Structure',
    prompt: 'Which option is a complete sentence?',
    options: ['Because the rate declined sharply.', 'Although the policy was expensive.', 'While many experts disagreed.', 'Although the policy was expensive, it proved effective.'], answer: 3,
    rule: 'Proposition dépendante', explanation: 'Une proposition introduite par “although” ne peut pas former une phrase seule. Elle doit être liée à une proposition indépendante.'
  },
  {
    id: 'cl4', category: 'clauses', type: 'Ponctue la relative', errorType: 'Ponctuation',
    prompt: 'Which sentence means that all the reports were published last month?',
    options: ['The reports that were published last month are online.', 'The reports, which were published last month, are online.', 'The reports which were published last month are online.', 'The reports, that were published last month are online.'], answer: 1,
    rule: 'Relative non restrictive', explanation: 'Les virgules indiquent que l’information concerne tous les rapports et qu’elle est non essentielle. On utilise “which”, pas “that”.'
  },
  {
    id: 'cl5', category: 'clauses', type: 'Choisis le subordonnant', errorType: 'Logique',
    prompt: '___ governments invest now, future costs will be much higher.',
    options: ['Unless', 'Because', 'Even though', 'So that'], answer: 0,
    rule: 'Proposition conditionnelle', explanation: '“Unless governments invest now” signifie “if governments do not invest now”.'
  },

  {
    id: 's1', category: 'sentences', type: 'Identifie la structure', errorType: 'Règle',
    prompt: '“The rate fell, but overall spending increased.” is a…',
    options: ['simple sentence', 'compound sentence', 'complex sentence', 'sentence fragment'], answer: 1,
    rule: 'Phrase composée', explanation: 'Deux propositions indépendantes sont reliées par la conjonction de coordination “but” : c’est une phrase composée.'
  },
  {
    id: 's2', category: 'sentences', type: 'Identifie la structure', errorType: 'Règle',
    prompt: '“Although the rate fell, overall spending increased.” is a…',
    options: ['simple sentence', 'compound sentence', 'complex sentence', 'run-on sentence'], answer: 2,
    rule: 'Phrase complexe', explanation: 'La phrase contient une proposition dépendante introduite par “although” et une proposition indépendante.'
  },
  {
    id: 's3', category: 'sentences', type: 'Répare la phrase', errorType: 'Ponctuation',
    prompt: 'Choose the best correction: “The survey ended the team analysed the responses.”',
    options: ['The survey ended, the team analysed the responses.', 'The survey ended; the team analysed the responses.', 'The survey ended because.', 'The survey ended and because the team analysed.'], answer: 1,
    rule: 'Comma splice et run-on', explanation: 'Deux propositions indépendantes peuvent être reliées par un point-virgule. Une simple virgule ne suffit pas.'
  },
  {
    id: 's4', category: 'sentences', type: 'Choisis la phrase mixte', errorType: 'Structure',
    prompt: 'Which is a compound-complex sentence?',
    options: ['The study ended.', 'The study ended, and the team celebrated.', 'When the study ended, the team celebrated.', 'When the study ended, the team celebrated, but the lead researcher kept working.'], answer: 3,
    rule: 'Phrase composée-complexe', explanation: 'Elle contient une dépendante (“When…”), puis deux indépendantes reliées par “but”.'
  },
  {
    id: 's5', category: 'sentences', type: 'Améliore la variété', errorType: 'Style',
    prompt: 'Which version combines the ideas most effectively?',
    options: ['The city expanded. It expanded rapidly. This caused congestion.', 'The city expanded rapidly, causing congestion.', 'The city rapidly. Expanded causing congestion.', 'Causing congestion. The city expanded rapidly.'], answer: 1,
    rule: 'Combinaison de phrases', explanation: 'Le groupe participial “causing congestion” relie clairement le résultat à l’expansion sans créer de fragment.'
  }
];
