INSERT INTO livre (id, titre, resume, annee, auteur, editeur, collection) VALUES
(1,
 'Voyage au centre de la Terre',
 'Le professeur Otto Lidenbrock découvre un manuscrit indiquant un passage vers le centre de la Terre. Accompagné de son neveu Axel et du guide Hans, il entreprend une expédition extraordinaire dans les profondeurs du globe.',
 1864,
 'Jules Verne',
 'Pierre-Jules Hetzel',
 'Voyages extraordinaires'),

(2,
 'Illuminations',
 'Recueil de poèmes en prose et en vers libres explorant des visions oniriques, des paysages imaginaires et des expériences sensorielles. Rimbaud y renouvelle profondément le langage poétique.',
 1886,
 'Arthur Rimbaud',
 'La Vogue',
 NULL),

(3,
 'Vingt mille lieues sous les mers',
 'Le professeur Pierre Aronnax, son domestique Conseil et le harponneur Ned Land sont capturés par le mystérieux capitaine Nemo. À bord du Nautilus, ils découvrent les merveilles et les dangers des profondeurs océaniques.',
 1870,
 'Jules Verne',
 'Pierre-Jules Hetzel',
 'Voyages extraordinaires'),

(4,
 'Le Tour du monde en quatre-vingts jours',
 'Phileas Fogg, un gentleman britannique, parie qu''il peut faire le tour du monde en quatre-vingts jours. Accompagné de son domestique Passepartout, il traverse plusieurs continents et affronte de nombreux obstacles pour tenir son pari.',
 1872,
 'Jules Verne',
 'Pierre-Jules Hetzel',
 'Voyages extraordinaires'),

(5,
 'Une saison en enfer',
 'Recueil de poèmes en prose dans lequel Arthur Rimbaud explore ses expériences personnelles, ses désillusions et sa quête de liberté. À travers une écriture intense et novatrice, il remet en question les conventions morales, religieuses et littéraires.',
 1873,
 'Arthur Rimbaud',
 'Alliance typographique (M.-J. Poot et compagnie)',
 NULL);

INSERT INTO avis (note, commentaire, date, livre_id) VALUES 
(5,'Un roman d''aventure captivant qui mêle exploration, science et imagination. Jules Verne parvient à nous transporter dans un univers fascinant, avec des personnages attachants et de nombreux rebondissements.','2026-11-02', 1),
(4,'Une œuvre poétique intense et originale, portée par des images saisissantes et une grande liberté d''écriture. Certains passages demandent plusieurs lectures, mais la richesse des textes rend l''expérience particulièrement intéressante.','2026-11-04',2),
(5,'Une aventure extraordinaire où Jules Verne mêle suspense, découvertes scientifiques et exploration sous-marine. Le capitaine Nemo est un personnage mystérieux et fascinant.','2026-10-15',3),
(4,'Un récit passionnant qui nous entraîne dans un voyage autour du monde riche en péripéties. L''ingéniosité des personnages et les descriptions des différents pays rendent la lecture particulièrement agréable.','2026-10-22',4),
(5,'Un recueil de poèmes remarquable par sa liberté d''expression et la puissance de ses images. Arthur Rimbaud y aborde des thèmes variés avec une sensibilité et une originalité qui marquent durablement le lecteur.','2026-11-01',5)
;