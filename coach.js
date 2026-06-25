window.GRAMMAR_KNOWN_PROFILE = {
  nouns: 50,
  pronouns: 67,
  verbs: 67,
  'sentence-parts': 33,
  adjectives: 100,
  adverbs: 33,
  prepositions: 100,
  conjunctions: 100,
  verbals: 67,
  clauses: 100,
  sentences: 67
};

window.GRAMMAR_COACH_LESSONS = {
  'sentence-parts': {
    eyebrow: 'Priorité absolue · 12 min',
    title: 'Faire une phrase complète sous pression',
    promise: 'On oublie les étiquettes scolaires. Le but IELTS : repérer vite une phrase cassée, mal ordonnée ou mal accordée.',
    memory: 'VERBE CONJUGUÉ + IDÉE COMPLÈTE = PHRASE',
    concepts: [
      {
        label: 'Réflexe 01', title: 'Une phrase a besoin d’un verbe conjugué',
        rule: 'Un groupe en -ing seul ne suffit pas toujours. Cherche le verbe qui porte vraiment le temps.',
        wrong: 'The rise in housing costs affecting young workers.',
        correct: 'The rise in housing costs is affecting young workers.',
        why: '“Affecting” seul laisse la phrase suspendue. “Is affecting” crée une vraie phrase.'
      },
      {
        label: 'Réflexe 02', title: 'Because / although / while ne finissent pas seuls',
        rule: 'Ces mots ouvrent une idée dépendante. Il faut ensuite une idée principale pour fermer la phrase.',
        wrong: 'Although the survey was limited.',
        correct: 'Although the survey was limited, the results were useful.',
        why: '“Although” annonce un contraste ; la deuxième partie donne ce contraste.'
      },
      {
        label: 'Réflexe 03', title: 'Le petit groupe “of…” ne décide pas toujours l’accord',
        rule: 'Dans “the impact of these measures”, le mot principal est “impact”, pas “measures”.',
        wrong: 'The impact of these measures are unclear.',
        correct: 'The impact of these measures is unclear.',
        why: 'Le groupe “of these measures” ajoute une précision, mais ne rend pas “impact” pluriel.'
      }
    ],
    checklist: ['Y a-t-il un verbe conjugué ?', 'Le mot de liaison exige-t-il une suite ?', 'Quel mot commande vraiment l’accord ?'],
    examTip: 'En Writing, cette compétence sert surtout à éviter les fragments, les accords faux et les phrases qui s’effondrent avant le point.'
  },
  adverbs: {
    eyebrow: 'Priorité absolue · 12 min',
    title: 'Arrêter de confondre adjectif et adverbe',
    promise: 'Tu n’as pas besoin de mémoriser cent cas : commence par identifier ce que le mot décrit.',
    memory: 'NOM = ADJECTIF · ACTION = ADVERBE',
    concepts: [
      {
        label: 'Réflexe 01', title: 'Une action demande souvent -ly',
        rule: 'Si le mot décrit comment une action se déroule, choisis l’adverbe.',
        wrong: 'The population grew rapid.',
        correct: 'The population grew rapidly.',
        why: '“Rapidly” décrit la manière dont la population a augmenté.'
      },
      {
        label: 'Réflexe 02', title: 'Après un verbe d’état, garde l’adjectif',
        rule: 'Après be, seem, appear, look, feel ou become, le mot décrit le sujet : c’est un adjectif.',
        wrong: 'The evidence appears strongly.',
        correct: 'The evidence appears strong.',
        why: '“Strong” décrit l’évidence, pas la manière d’apparaître.'
      },
      {
        label: 'Réflexe 03', title: 'Avec un auxiliaire, vise le milieu',
        rule: 'Un adverbe comme significantly se place généralement entre l’auxiliaire et le verbe principal.',
        wrong: 'The policy has reduced significantly waste.',
        correct: 'The policy has significantly reduced waste.',
        why: 'Le groupe verbal reste intact et la phrase sonne immédiatement plus naturelle.'
      }
    ],
    checklist: ['Quel mot est décrit ?', 'Verbe d’état ? → adjectif', 'Auxiliaire ? → adverbe au milieu'],
    examTip: 'Piège express : hard = dur ; hardly = à peine. Ce ne sont pas deux formes du même sens.'
  },
  nouns: {
    eyebrow: 'Priorité haute · 10 min',
    title: 'Sécuriser les noms indénombrables',
    promise: 'Quelques noms très fréquents en IELTS provoquent une grande partie des erreurs de déterminant.',
    memory: 'INFORMATION · ADVICE · RESEARCH · EQUIPMENT = PAS DE -S',
    concepts: [
      {
        label: 'Réflexe 01', title: 'Pas de a/an, pas de pluriel',
        rule: 'Information, advice, evidence, research et equipment sont indénombrables.',
        wrong: 'an information · many equipments',
        correct: 'some information · much equipment',
        why: 'Pour compter, ajoute une unité : “a piece of information”, “two pieces of equipment”.'
      },
      {
        label: 'Réflexe 02', title: 'Few compte, little mesure',
        rule: 'A few accompagne un pluriel dénombrable ; a little accompagne un indénombrable.',
        wrong: 'a few equipment · a little students',
        correct: 'a little equipment · a few students',
        why: 'Demande-toi si tu peux naturellement mettre un nombre devant le nom.'
      },
      {
        label: 'Réflexe 03', title: 'Possessif après un pluriel irrégulier',
        rule: 'Children et people sont déjà pluriels : ajoute ’s pour le possessif.',
        wrong: "the childrens' results",
        correct: "the children's results",
        why: 'Le mot “children” ne prend jamais un deuxième marqueur de pluriel.'
      }
    ],
    checklist: ['Puis-je dire “two…” ?', 'Sinon : much/little', 'Pluriel irrégulier ? → ’s'],
    examTip: 'En Writing Task 1, surveille particulièrement information, data, research et evidence.'
  },
  verbs: {
    eyebrow: 'Priorité haute · 12 min',
    title: 'Choisir le temps grâce aux signaux',
    promise: 'Sous pression, ne cherche pas le nom du temps : repère le signal temporel et l’ordre des actions.',
    memory: 'SINCE → PRESENT PERFECT · BY THE TIME → PAST PERFECT',
    concepts: [
      {
        label: 'Réflexe 01', title: 'Since relie le passé au présent',
        rule: 'Avec since + point de départ, utilise le present perfect si la période continue maintenant.',
        wrong: 'Since 2015, the city expanded its network.',
        correct: 'Since 2015, the city has expanded its network.',
        why: 'L’expansion commencée en 2015 a un bilan pertinent aujourd’hui.'
      },
      {
        label: 'Réflexe 02', title: 'L’action la plus ancienne prend had',
        rule: 'Entre deux actions passées, le past perfect marque celle qui s’est produite en premier.',
        wrong: 'By the time they met, they analysed the data.',
        correct: 'By the time they met, they had analysed the data.',
        why: 'L’analyse était terminée avant la réunion.'
      },
      {
        label: 'Réflexe 03', title: 'The number reste singulier',
        rule: 'The number of + pluriel prend un verbe singulier ; a number of prend un pluriel.',
        wrong: 'The number of students increase.',
        correct: 'The number of students increases.',
        why: 'Le noyau grammatical du sujet est “number”.'
      }
    ],
    checklist: ['Cherche since/for/by the time', 'Classe les actions', 'Trouve le noyau du sujet'],
    examTip: 'Mieux vaut trois temps justes que six temps “avancés” employés au hasard.'
  },
  pronouns: {
    eyebrow: 'Consolidation · 8 min',
    title: 'Rendre chaque pronom impossible à confondre',
    promise: 'Un pronom réussi permet au lecteur de savoir immédiatement qui ou quoi il remplace.',
    memory: 'UNE VIRGULE + UNE CHOSE → WHICH, JAMAIS THAT',
    concepts: [
      {
        label: 'Réflexe 01', title: 'Which après une virgule',
        rule: 'Une relative non essentielle sur une chose prend which.',
        wrong: 'The policy, that was introduced in 2022, …',
        correct: 'The policy, which was introduced in 2022, …',
        why: '“That” ne s’emploie pas dans cette relative entre virgules.'
      },
      {
        label: 'Réflexe 02', title: 'Ni l’un ni l’autre = neither',
        rule: 'Neither parle de deux éléments ; none s’emploie plutôt pour trois ou plus.',
        wrong: 'None of the two explanations…',
        correct: 'Neither of the two explanations…',
        why: 'Le mot “two” appelle directement “neither”.'
      },
      {
        label: 'Réflexe 03', title: 'Relis pour trouver l’ambiguïté',
        rule: 'Si he, she, it ou they peut renvoyer à deux noms, répète le nom.',
        wrong: 'The policy affected the industry, but it changed later.',
        correct: 'The policy affected the industry, but the policy changed later.',
        why: 'La répétition légère est préférable à une référence ambiguë.'
      }
    ],
    checklist: ['À quoi renvoie le pronom ?', 'Deux antécédents possibles ?', 'Virgule + chose ? → which'],
    examTip: 'La clarté rapporte davantage qu’une substitution élégante mais ambiguë.'
  },
  verbals: {
    eyebrow: 'Consolidation · 9 min',
    title: 'Choisir entre -ing et to',
    promise: 'Apprends quelques familles très rentables plutôt qu’une liste interminable.',
    memory: 'RECOMMEND + ING · AIM + TO',
    concepts: [
      {
        label: 'Famille -ing', title: 'Recommend, avoid, consider, suggest',
        rule: 'Ces verbes sont suivis d’un gérondif.',
        wrong: 'The committee recommended to revise the plan.',
        correct: 'The committee recommended revising the plan.',
        why: 'Tu peux aussi écrire “recommended that the plan be revised”.'
      },
      {
        label: 'Famille to', title: 'Aim, decide, hope, plan',
        rule: 'Ces verbes sont suivis de to + base verbale.',
        wrong: 'The scheme aims improving access.',
        correct: 'The scheme aims to improve access.',
        why: '“To” fait partie de la construction exigée par le premier verbe.'
      },
      {
        label: 'Sens', title: 'Stop doing ≠ stop to do',
        rule: 'Stop doing = cesser ; stop to do = s’arrêter afin de faire autre chose.',
        wrong: 'The company stopped to produce bags. (= elle a cessé)',
        correct: 'The company stopped producing bags.',
        why: 'Le changement de forme change ici le sens entier.'
      }
    ],
    checklist: ['Quel verbe vient avant ?', 'Famille -ing ou to ?', 'Le sens change-t-il ?'],
    examTip: 'Évite un verbe dont tu ne connais pas la construction : reformule simplement.'
  },
  sentences: {
    eyebrow: 'Consolidation · 8 min',
    title: 'Construire de la complexité sans casser la phrase',
    promise: 'La variété vient de connexions nettes, pas de phrases artificiellement longues.',
    memory: '2 PHRASES COMPLÈTES → POINT, POINT-VIRGULE OU , + AND/BUT',
    concepts: [
      {
        label: 'Réflexe 01', title: 'Deux indépendantes ne prennent pas une virgule seule',
        rule: 'Utilise un point-virgule ou une conjonction de coordination.',
        wrong: 'The survey ended, the team analysed the data.',
        correct: 'The survey ended; the team analysed the data.',
        why: 'La virgule seule crée un comma splice.'
      },
      {
        label: 'Réflexe 02', title: 'Although ne vit pas seul',
        rule: 'Une proposition introduite par although doit être reliée à une proposition principale.',
        wrong: 'Although the policy was expensive.',
        correct: 'Although the policy was expensive, it proved effective.',
        why: 'La première partie crée une attente que la seconde doit compléter.'
      },
      {
        label: 'Réflexe 03', title: 'Une phrase complexe suffit',
        rule: 'Un lien logique juste vaut mieux qu’une accumulation de propositions.',
        wrong: 'The city expanded and it was rapid and this caused congestion.',
        correct: 'The city expanded rapidly, causing congestion.',
        why: 'La relation de cause reste claire et compacte.'
      }
    ],
    checklist: ['Chaque morceau a-t-il sujet + verbe ?', 'Quel lien logique ?', 'Puis-je couper la phrase ?'],
    examTip: 'Pendant la relecture, coupe toute phrase dont tu perds le fil avant le point.'
  }
};
