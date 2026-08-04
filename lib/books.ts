export type ChapterEntry = { t: string; d: string };

export type BookAngles = {
  argument: string;
  chapters: ChapterEntry[];
  quotes: string[];
  uses: string[];
  pushback: string;
  authorBg: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  hook: string;
  cover: string;
  angles: BookAngles;
};

  export const BOOKS: Book[] = [
    {
      id: 'art-of-seduction', title: `The Art of Seduction`, author: `Robert Greene`, category: `Nonfiction · Self-help, psychology, strategy`,
      hook: `Greene argues that seduction is a form of power and persuasion that works on the mind, not force. He draws on historical figures and literary characters to build a strategic framework for influencing people. The book is for anyone who wants to understand the psychology of attraction and learn how to apply it in social, sexual, and political situations.`, cover: 'var(--rust)',
      angles: {
        argument: `Seduction is a psychological game that bypasses people's defenses by creating a spell and inducing surrender. The key is to work on the mind first, using fantasy, pleasure, and confusion to weaken a person's will, before moving to the physical. Greene contends that this process is a learnable art, rooted in strategies perfected by the greatest seducers in history, and is more effective than brute force or direct persuasion in modern life.`,
        chapters: [
          {t: `Part One: The Seductive Character`, d: `This section opens by stating that seduction begins with your character, not a strategy. Greene explains that everyone has an inherent power of attraction, and the key is to understand and develop it. He introduces the nine types of seducer, each defined by a dominant character trait that draws people in. The types are the Siren, Rake, Ideal Lover, Dandy, Natural, Coquette, Charmer, Charismatic, and Star. He also includes a chapter on the Anti-Seducer, whose qualities repel people. The purpose of this part is for the reader to identify their own seductive type and cultivate it, adding art to what nature has given them.`},
          {t: `Chapter 1: The Siren`, d: `Greene defines the Siren as the ultimate male fantasy figure who offers release from responsibility and a world of pure pleasure. He presents two examples: Cleopatra (the Spectacular Siren) and Marilyn Monroe (the Sex Siren). Cleopatra used theatricality and a larger-than-life presence to distract and enslave powerful men like Caesar and Antony. Monroe used a mix of innocence and overt sexuality to create a powerful effect. The chapter argues that the Siren's power lies in her physical presence, her ability to embody a man's fantasy, and her hint of danger. Key elements are a captivating voice, a theatrical appearance, and a languorous, unhurried demeanor. The symbol is water, representing fluidity and a lure that leads to drowning.`},
          {t: `Chapter 2: The Rake`, d: `Greene presents the Rake as a powerful male fantasy figure for women. The Rake is a man of intense, unbridled desire who is a slave to his love of women, offering an affair of pure pleasure and danger. The chapter uses the Duke de Richelieu as the Ardent Rake and Gabriele D'Annunzio as the Demonic Rake. Richelieu's method was to overcome obstacles with audacious desire, making women feel they were his sole focus. D'Annunzio used seductive language and words to intoxicate women, a strategy also effective on the masses. The chapter argues that a woman is often oppressed by her role and secretly yearns for a man who is passionate, dangerous, and a little evil. The key is to be able to abandon oneself to the moment, to overcome resistance, and to cultivate a devilish reputation. The symbol is fire.`},
          {t: `Chapter 3: The Ideal Lover`, d: `Greene explains the Ideal Lover as someone who can fill the void in a person's life by reflecting their fantasies and ideals. The chapter uses Casanova as the Romantic Ideal and Madame de Pompadour as the Beauty Ideal. Casanova adapted his approach to each woman, providing what she was missing: adventure, friendship, or a chance to sin. Madame de Pompadour cured King Louis XV's boredom and appealed to his crushed ideals of greatness by surrounding him with culture and beauty. The chapter argues that people are disenchanted with reality and yearn for their lost ideals. By observing a person's subtle signs and providing what they lack, you can make them fall in love. The key is patient attentiveness and the ability to hold up a mirror to their nobler selves. The symbol is the Portrait Painter.`},
          {t: `Chapter 4: The Dandy`, d: `Greene defines the Dandy as a person who creates a fluid, ambiguous presence that fascinates because they cannot be categorized. The chapter uses Rudolph Valentino as the Feminine Dandy and Lou Andreas-Salomé as the Masculine Dandy. Valentino seduced women by combining feminine grace and attention to detail with masculine boldness and a hint of cruelty. Andreas-Salomé enthralled men by reversing gender roles, displaying masculine independence and intellect while maintaining feminine beauty. The chapter argues that most people conform to roles, and the Dandy's nonconformity is seductive. The key is to create a striking visual style, to be impudent and live for pleasure, and to play with gender roles to appeal to the narcissism of the target. The symbol is the Orchid.`},
          {t: `Chapter 5: The Natural`, d: `Greene presents the Natural as someone who embodies the longed-for qualities of childhood: spontaneity, sincerity, and unpretentiousness. The chapter uses Charlie Chaplin, Cora Pearl, Josephine Baker, and the fictional Prince Genji as examples. Chaplin seduced mass audiences by playing up his weakness and naivete. Cora Pearl's wild, spoiled independence made her irresistible. Josephine Baker's joy and refusal to be defined charmed the French. Genji's undefensive, natural manner made women fall for him. The chapter argues that childhood is a golden age we all yearn to recapture. The Natural's power lies in their ability to lower inhibitions and infect others with a playful spirit. Key types of Naturals include the Innocent, the Imp, and the Wonder. The symbol is the Lamb.`},
          {t: `Chapter 6: The Coquette`, d: `Greene defines the Coquette as the master of delay and alternating hope and frustration. The chapter uses Josephine Bonaparte as the Hot and Cold Coquette and Andy Warhol as the Cold Coquette. Josephine enslaved Napoleon by alternating intense attention with emotional withdrawal, playing on his insecurities. Warhol created a cult following by his cold, silent, and self-contained presence, making people fight for his attention. The chapter argues that the key to the Coquette is self-sufficiency and narcissism, which creates a fascinating challenge. The strategy is to excite desire and then withdraw, keeping the victim off balance and enslaved. The symbol is the Shadow.`},
          {t: `Chapter 7: The Charmer`, d: `Greene defines charm as seduction without sex, a way to create a mood of pleasure and comfort. The chapter uses Benjamin Disraeli, Pamela Churchill Harriman, Zhou Enlai, and Catherine the Great as examples. Disraeli charmed Queen Victoria by focusing on her and making her feel desirable and brilliant. Pamela Harriman made powerful men dependent by her self-effacing attentiveness. Zhou Enlai disarmed his enemies with patience, humility, and charm. Catherine the Great used feminine charm and patience to orchestrate a bloodless coup. The chapter argues that charmers are consummate manipulators who deflect attention to their targets. The key is to make the target the center of attention, be a source of pleasure, and lull them into ease and comfort. The symbol is the Mirror.`},
          {t: `Chapter 8: The Charismatic`, d: `Greene defines charisma as a presence that excites people, making them feel they are in the presence of something extraordinary, even divine. The chapter presents several types of Charismatic: the Miraculous Prophet (Joan of Arc), the Authentic Animal (Rasputin), the Demonic Performer (Elvis Presley), the Savior (Lenin), the Guru (Krishnamurti), the Drama Saint (Eva Perón), the Deliverer (Malcolm X), and the Olympian Actor (Charles de Gaulle). The chapter argues that charisma is a mass-level seduction that works by radiating intense self-confidence, purpose, and mystery. Key elements are having a vision, maintaining an air of mystery, showing saintliness, using eloquent oratory, and displaying theatricality. The symbol is the Lamp.`},
          {t: `Chapter 9: The Star`, d: `Greene defines the Star as an ethereal, dreamlike presence that projects a mythic quality. The chapter uses Marlene Dietrich as the Fetishistic Star and John F. Kennedy as the Mythic Star. Dietrich made herself an object of fascination through her blank, beautiful face and her self-distance, allowing people to project their fantasies onto her. Kennedy seduced the American public by creating a Hollywood-style myth around himself, embodying heroic archetypes and appealing to unconscious desires. The chapter argues that stars work on the unconscious by mixing the real and the unreal, like a dream. The key is to cultivate a blank, mysterious face, a distinctive style, and to position yourself as a type that people can identify with and fantasize about. The symbol is the Idol.`},
          {t: `Chapter 10: The Anti-Seducer`, d: `Greene defines the Anti-Seducer as someone who repels others due to their insecurity and self-absorption. He outlines several types: the Brute (impatient), the Suffocator (needy), the Moralizer (judgmental), the Tightwad (ungenerous), the Bumbler (self-conscious), the Windbag (talks about themselves), the Reactor (overly sensitive), and the Vulgarian (tactless). The chapter uses historical figures like Emperor Claudius, a fictional Count, and William Gladstone as examples of Anti-Seducers. The key to avoiding Anti-Seducers is to recognize them early and disengage. To avoid being one, one must root out ungenerosity, impatience, and self-absorption. The symbol is the Crab.`},
          {t: `The Seducer's Victims—The Eighteen Types`, d: `This chapter provides a typology of victims, which are the potential targets of a seduction. Greene categorizes people by what they feel they are missing in life. The types are: The Reformed Rake or Siren (yearns for past pleasures), The Disappointed Dreamer (craves romance and adventure), The Pampered Royal (needs constant distraction), The New Prude (longs to transgress), The Crushed Star (wants attention), The Novice (seeks initiation), The Conqueror (loves a challenge), The Exotic Fetishist (fetishizes the foreign), The Drama Queen (needs mental rough treatment), The Professor (wants physical release from mental prison), The Beauty (is isolated and wants to be seen for more than looks), The Aging Baby (wants an adult figure to play with), The Rescuer (wants someone to save), The Roué (sentimental about youth and innocence), The Idol Worshiper (needs something to worship), The Sensualist (wants sensory experience), The Lonely Leader (wants to be treated as an equal), and The Floating Gender (wants to explore their repressed side). The key is to identify what a person lacks and position yourself as the one who can fill that void. The chapter advises never to try to seduce someone of your own type.`},
          {t: `Part Two: The Seductive Process`, d: `This section opens by stating that seduction is a process that occurs over time, requiring patience, strategy, and the ability to get out of one's own head and into the victim's mind. Greene introduces the idea that the process is divided into four phases: Separation (stirring interest and desire), Leading Astray (creating pleasure and confusion), The Precipice (deepening the effect with extreme measures), and Moving In for the Kill (the physical conclusion). He emphasizes that each tactic builds on the previous one and that a seducer cannot be timid or merciful. The process is likened to an initiation ritual, uprooting the victim from their habits and leading them into a new world.`},
          {t: `Chapter 1: Choose the Right Victim`, d: `Greene argues that the success of a seduction depends almost entirely on choosing the right target. He uses the example of Valmont from Dangerous Liaisons, who realizes his seductions are mechanical until he chooses Madame de Tourvel, a woman who genuinely inspires him. The right victim is one who stirs you, who has a void you can fill, who is bored or unhappy, and who is vulnerable. Greene advises to test the target for vulnerability and to look for responses like blushing or shyness. He warns against choosing someone who is completely contented or too busy, as they are hard to seduce. The key is to find a victim who offers a good chase and who makes the seduction a challenge. The symbol is Big Game.`},
          {t: `Chapter 2: Create a False Sense of Security—Approach Indirectly`, d: `Greene argues that a direct approach early on will stir up resistance. The seduction should begin indirectly, making the target feel comfortable and unthreatened. The chapter uses the Duke de Lauzun's seduction of the Grande Mademoiselle as a model. Lauzun befriended her, talked about her interests, and never made a move, making her fall in love with him and come to him. The key is to move from friend to lover, to haunt the periphery of the target's life, and to let them come to you. The method disarms the target and gives the seducer valuable information. The symbol is the Spider's Web.`},
          {t: `Chapter 3: Send Mixed Signals`, d: `Greene argues that ambiguity is more potent than obviousness. To hold a target's attention, you must send mixed signals that suggest depth and complexity. The chapter uses Madame Récamier and Oscar Wilde as examples. Récamier had an angelic face but would send flirtatious looks, creating a confusing and fascinating mix. Wilde combined a physically effeminate appearance with a manly wit and daring. The key is to hint at a complexity, to be both hot and cold, and to create a paradox that intrigues people. The symbol is the Theater Curtain.`},
          {t: `Chapter 4: Appear to Be an Object of Desire—Create Triangles`, d: `Greene argues that people are drawn to what others desire. To increase your value, you must create an aura of desirability by surrounding yourself with admirers and making people compete for your attention. The chapter uses Lou Andreas-Salomé as an example. She kept two men, Paul Rée and Friedrich Nietzsche, in a state of rivalry over her, which inflamed both their desires. The key is to create triangles of desire, using a third party to stimulate jealousy and a competitive urge in your target. The symbol is the Trophy.`},
          {t: `Chapter 5: Create a Need—Stir Anxiety and Discontent`, d: `Greene argues that a perfectly satisfied person cannot be seduced. You must stir feelings of discontent and inadequacy in your target to create a need you can fill. The chapter uses D.H. Lawrence as an example. Lawrence would befriend people, then suddenly hit them with harsh personal criticisms that created self-doubt and anxiety. This made them vulnerable to falling in love with him. The key is to open a wound in the target's psyche, making them feel something is missing from their life. The symbol is Cupid's Arrow.`},
          {t: `Chapter 6: Master the Art of Insinuation`, d: `Greene argues that the best way to plant ideas is through insinuation, dropping elusive hints that seem to originate from the target's own mind. The chapter uses a story from Vivant Denon's 'No Tomorrow,' where a woman subtly seduces a man by making him think he is the aggressor. The key is to be vague and suggestive, using slips of the tongue, ambiguous comments, and alluring glances. The goal is to plant seeds in the target's unconscious that will grow into desire. The symbol is the Seed.`},
          {t: `Chapter 7: Enter Their Spirit`, d: `Greene argues that the best way to lure people out of their shell is to enter their spirit by mirroring their moods, tastes, and values. The chapter uses President Sukarno and Cindy Adams as an example. Sukarno seduced Adams by indulging her every whim and mirroring her casual attitude, which lowered her defenses and made her see him in a positive light. The key is to indulge and mirror the target, making them feel validated and understood. The symbol is the Hunter's Mirror.`},
          {t: `Chapter 8: Create Temptation`, d: `Greene argues that you must create a temptation that is stronger than the target's daily routine. The chapter uses a story from Picón's Dulce y Sabrosa, where a woman creates a fantasy of being married and wealthy to tempt her former lover back. The key is to dangle a prize before the target's eyes, making it forbidden or just out of reach. The temptation must be tailored to the target's weakness, whether it is greed, vanity, or a hunger for the forbidden. The symbol is the Apple in the Garden of Eden.`},
          {t: `Chapter 9: Keep Them in Suspense—What Comes Next?`, d: `Greene argues that predictability is the death of seduction. To maintain control, you must constantly create suspense and surprise. The chapter uses Casanova's seduction by a nun, Mathilde, as an example. She kept him off balance with a series of unexpected surprises, such as appearing as a man, confessing to having a lover, and arranging for him to meet his former lover. The key is to never let the target know what to expect next. The symbol is the Roller Coaster.`},
          {t: `Chapter 10: Use the Demonic Power of Words to Sow Confusion`, d: `Greene argues that seductive language is a powerful tool for confusing and intoxicating the target. The chapter uses Charles de Gaulle's speech in Algeria and Johannes from Kierkegaard's Seducer's Diary as examples. De Gaulle used vague, emotional words to make the French colonists believe he supported them, while he was actually planning to betray them. Johannes used poetic, disordered letters to get inside Cordelia's mind. The key is to say what the target wants to hear, to make words sound pleasant rather than meaningful. The symbol is the Clouds.`},
          {t: `Chapter 11: Pay Attention to Detail`, d: `Greene argues that sensual details and subtle gestures are more charming and revealing than grand words. The chapter uses Empress Dowager Tzu Hsi's banquet, Prince Genji's seduction of Tamakazura, and Pamela Harriman's techniques as examples. Tzu Hsi used a spectacle of color and ceremony to mesmerize foreign ambassadors' wives. Genji used details like perfume, colored paper, and koto lessons to seduce a young woman. Harriman used thoughtful gifts and gestures to make men dependent. The key is to engage the target's senses with pleasant little rituals and objects. The symbol is the Banquet.`},
          {t: `Chapter 12: Poeticize Your Presence`, d: `Greene argues that you must remain elusive and associate yourself with poetic images so that the target idealizes you in your absence. The chapter uses Eva Perón's seduction of Juan Perón and the masses as an example. Eva made herself a dramatic, saintly figure, and during his imprisonment, Perón idealized her. The key is to avoid becoming too familiar and to let the target fill in the gaps with their own fantasies. The symbol is the Halo.`},
          {t: `Chapter 13: Disarm Through Strategic Weakness and Vulnerability`, d: `Greene argues that displaying strategic weakness is the best way to cover your tracks and make yourself seem less manipulative. The chapter uses Valmont's seduction of the Présidente de Tourvel as an example. Valmont positioned himself as the victim of her charms, seeming weak and emotional, which disarmed her and made her want to help and love him. The key is to be honest about a sin or a weakness, which makes you seem sincere. The symbol is the Blemish.`},
          {t: `Chapter 14: Confuse Desire and Reality—The Perfect Illusion`, d: `Greene argues that you must create a fantasy that the target can almost believe is real. The chapter uses the story of Shi Pei Pu and Bernard Bouriscout as an example. Pei Pu seduced Bouriscout by pretending to be a woman, a story that fed his desire for adventure and his repressed homosexual feelings. The key is to start with a foundation of reality and gradually build a fantasy, making the target's wishes seem to come true. The symbol is Shangri-La.`},
          {t: `Chapter 15: Isolate the Victim`, d: `Greene argues that an isolated person is weak and vulnerable. The chapter uses Hsi Shih's seduction of King Fu Chai, Aly Khan's seduction of Rita Hayworth, and Lovelace's seduction of Clarissa as examples. Hsi Shih isolated Fu Chai from his kingdom with her exotic presence. Aly Khan isolated Hayworth by making her the center of his attention and taking her away from her friends. Lovelace isolated Clarissa by turning her family against her. The key is to cut the target off from their normal support systems, making them dependent on you. The symbol is the Pied Piper.`},
          {t: `Chapter 16: Prove Yourself`, d: `Greene argues that one dramatic, self-sacrificing action can overcome a target's doubts and resistance. The chapter uses several examples: Count Grammont's trick on the Duc de Brissac, Major de Canouville's sacrifice of his tooth for Pauline Bonaparte, Gabriele D'Annunzio's war heroics, Sir Lancelot's ride in the cart, and the knights who competed for Tullia d'Aragona. The key is to show through deeds, not words, that you are willing to go to great lengths for the target. The symbol is the Tournament.`},
          {t: `Chapter 17: Effect a Regression`, d: `Greene argues that you can create a deep attachment by making the target relive childhood feelings. The chapter uses the examples of Victor Hugo and Juliette Drouet (infantile regression), Professor Mut and Rosa Fröhlich (oedipal regression), Chateaubriand and Madame Récamier (ego ideal regression), and George Villiers and King James I (reverse parental regression). The key is to position yourself as a parent figure or to let the target play the parent, so they can experience a childlike dependence or the thrill of an Oedipal fantasy. The symbol is the Bed.`},
          {t: `Chapter 18: Stir Up the Transgressive and Taboo`, d: `Greene argues that people are drawn to the forbidden and the taboo. The chapter uses Lord Byron as an example. Byron seduced women by embodying a dangerous, transgressive lifestyle, involving them in adultery, incest, and other social taboos. The key is to make the target feel they are going beyond limits, exploring their dark side. The symbol is the Forest.`},
          {t: `Chapter 19: Use Spiritual Lures`, d: `Greene argues that focusing on the spiritual is a powerful way to distract from the physical and create a deeper bond. The chapter uses Natalie Barney's seduction of Liane de Pougy and Renée Vivien, and the story of the hermit Rustico and Alibech as examples. Barney used poetry, pilgrimage, and pagan rituals to make lesbian love seem innocent and sublime. Rustico used religion to seduce Alibech by framing sex as putting the devil back in hell. The key is to elevate the seduction, making it seem like a spiritual union. The symbol is the Stars in the Sky.`},
          {t: `Chapter 20: Mix Pleasure with Pain`, d: `Greene argues that the greatest mistake in seduction is being too nice. The chapter uses the story of Conchita and Don Mateo and Oriana Fallaci's interviews with Kissinger and the Shah of Iran as examples. Conchita seduced Don Mateo by alternating intense pleasure and hope with brutal pain, humiliation, and despair. Fallaci used a similar technique to break down powerful leaders, alternating harshness and kindness to make them emotional and open up. The key is to create highs and lows, making the target addicted to the emotional roller coaster. The symbol is the Precipice.`},
          {t: `Chapter 21: Give Them Space to Fall—The Pursuer Is Pursued`, d: `Greene argues that once the target is under your spell, you should step back and let them become the pursuer. The chapter uses Charles Baudelaire's seduction of Madame Sabatier as an example. Baudelaire wrote her anonymous, obsessive letters, then grew cold and distant, making her desperate to have him. The key is to withdraw your attention, creating an anxiety that makes the target want to possess you. The symbol is the Pomegranate.`},
          {t: `Chapter 22: Use Physical Lures`, d: `Greene argues that you must put the target's mind to rest and awaken their senses. The chapter uses La Belle Otero and Errol Flynn as examples. Otero projected intense heat and sexuality through her glances, body, and voice, making men lose control. Flynn's cool, nonchalant manner lowered women's inhibitions, while his charged physical presence stirred their desires. The key is to project a sense of ease and sexuality, leading the target into the 'moment.' The symbol is the Raft.`},
          {t: `Chapter 23: Master the Art of the Bold Move`, d: `Greene argues that you must at some point make a bold, decisive move that overwhelms the target and gives them no time to think. The chapter uses Valmont's seduction of the Présidente de Tourvel as an example. After a long, patient seduction, Valmont sensed she was ready and made a sudden, passionate, and overwhelming move, which led to her complete surrender. The key is to choose the right moment and to act with complete confidence. The symbol is the Summer Storm.`},
          {t: `Chapter 24: Beware the Aftereffects`, d: `Greene argues that disenchantment almost inevitably follows a seduction, and you must have a strategy to deal with it. The chapter uses several examples. The Marquise de Merteuil deliberately broke her spell by smothering a lover with attention. Nell Gwyn kept Charles II's interest by never complaining. Duke Ellington maintained mystery and pleasantness to keep his lovers enchanted. D.H. Lawrence used drama and conflict to keep his marriage to Frieda alive. Ninon de l'Enclos made a clean break to avoid a messy ending. Napoleon re-seduced France after his escape from Elba. The key is to either re-seduce the victim or make a clean break, never allowing a slow, painful burnout. The symbol is Embers.`},
          {t: `Appendix A: Seductive Environment/Seductive Time`, d: `Greene argues that creating an environment and a sense of time that is separate from reality is critical to a seduction. He compares it to a festival, where normal rules are suspended. The chapter gives examples from the 'floating world' of 18th-century Japan, Andy Warhol's Factory, and Casanova's escapades. The key components are theatrical effects, a visual language of pleasure, crowded spaces, mystical effects, and a distorted sense of time. The aim is to create a world of pure pleasure and play that makes the target forget their ordinary life.`},
          {t: `Appendix B: Soft Seduction: How to Sell Anything to the Masses`, d: `Greene applies the principles of seduction to mass marketing and political persuasion. He argues that a 'soft sell' is far more effective than a 'hard sell.' The chapter gives examples of Andrew Jackson's presidential campaign, Edward Bernays's 'Torches of Freedom' campaign for Lucky Strike, Ronald Reagan's use of visuals, and Harry Reichenbach's movie publicity stunts. The key is to be indirect, entertaining, and insidious: to appear as news, to stir basic emotions, to make the medium the message, and to create a chain reaction. The goal is to tell people who they are and make them dissatisfied with their current state.`}
        ],
        quotes: [],
        uses: [],
        pushback: `Critics argue that the book's advice is manipulative and promotes treating people as objects to be conquered, rather than partners in a genuine connection. Some reviewers point out that the book lacks a moral framework, presenting all forms of seduction as equally valid regardless of the harm they may cause. The historical examples are often oversimplified and chosen to fit Greene's arguments, ignoring the broader context and complexities of the individuals and relationships. The book's focus on power and control can be seen as unhealthy and counterproductive to building lasting, equitable relationships based on mutual respect.`,
        authorBg: `Robert Greene has a degree in classical literature and has worked as a writer and editor at several magazines in New York. He is best known for his books on strategy, power, and human nature, including 'The 48 Laws of Power.' His work often draws on historical figures, literary sources, and psychological theory to analyze the dynamics of influence and control.`
      }
    },
    {
      id:'atomic-habits', title:'Atomic Habits', author:'James Clear', category:'Nonfiction · Self-improvement',
      hook:"Small, repeated actions compound into identity change over time.", cover:'#C7A05A',
      angles:{
        argument:"Clear argues that lasting change comes from systems, not goals: tiny improvements, repeated consistently, compound into significant results, and habits stick best when they reinforce the identity you want to hold.",
        chapters:[
          {t:'The 1% rule', d:'Opens by reframing progress as compounding small habits rather than dramatic leaps.'},
          {t:'The four laws', d:'Lays out a framework for building habits that stick, built around making them obvious, attractive, easy, and satisfying.'},
          {t:'Identity over outcome', d:'Argues that habits rooted in who you want to become outlast habits chased for results alone.'},
          {t:'Environment design', d:'Shows how shaping your surroundings removes the need for constant willpower.'},
          {t:'Breaking bad habits', d:'Flips the four laws to explain how to make unwanted habits invisible, unattractive, and difficult.'}
        ],
        quotes:[
          "Progress rarely feels dramatic in the moment — it shows up later, all at once, as the sum of habits repeated long before anyone noticed.",
          "The habits that last are the ones that feel like evidence of who you're becoming, not chores you're pushing through.",
          "A system built around your environment does more work than motivation ever will."
        ],
        uses:["Design a habit tracker around one small, obvious cue.","Rearrange your space so the good habit is the easy one.","Tie new habits to the identity you want, not just the outcome."],
        pushback:"Critics note the framework works best for simple, mechanical habits and offers less for complex behavior change tied to trauma, addiction, or deep-rooted circumstance.",
        authorBg:"Clear built the ideas through years of writing about habit formation online before compiling them into the book, drawing partly on his own recovery from a serious injury."
      }
    },
    {
      id:'sapiens', title:'Sapiens', author:'Yuval Noah Harari', category:'Nonfiction · History',
      hook:"A sweep through human history built around three revolutions.", cover:'#B4543A',
      angles:{
        argument:"Harari traces how Homo sapiens came to dominate the planet through an ability to cooperate at scale around shared fictions — money, nations, religions — that no other species can construct.",
        chapters:[
          {t:'The Cognitive Revolution', d:'Explains how the capacity for shared myths let strangers cooperate in numbers no other species could manage.'},
          {t:'The Agricultural Revolution', d:'Reframes farming as a trap dressed as progress, trading a harder, more repetitive life for more food per acre.'},
          {t:'Unification of humankind', d:'Follows how money, empires, and religions grew into forces that connected once-isolated peoples.'},
          {t:'The Scientific Revolution', d:'Looks at how admitting ignorance, paired with capital, accelerated discovery and conquest.'},
          {t:'The future of the species', d:'Closes by asking what happens once biotechnology lets us start redesigning ourselves.'}
        ],
        quotes:[
          "Large-scale cooperation among strangers is only possible because we agree to believe in stories no one can touch.",
          "Farming didn't just feed more people — it also tied them down to longer hours and harder work.",
          "Money may be the most universal and efficient system of mutual trust ever devised."
        ],
        uses:["Apply healthy skepticism to institutions built on shared stories.","Reframe modern crises against a longer historical arc.","Use the myth-cooperation lens to analyze organizations you belong to."],
        pushback:"Historians have pushed back on the book's sweeping generalizations and its thin coverage of non-Western history, arguing it sometimes simplifies contested evidence for narrative effect.",
        authorBg:"Harari is a historian at the Hebrew University of Jerusalem; the book grew out of a world-history course he taught before it became a global bestseller."
      }
    },
    {
      id:'meditations', title:'Meditations', author:'Marcus Aurelius', category:'Nonfiction · Philosophy',
      hook:"Private journal entries from a Roman emperor practicing Stoic discipline.", cover:'#83A78E',
      angles:{
        argument:"Written as personal notes rather than a public treatise, the text works through Stoic ideas — control what's within your power, accept what isn't, and treat each day as practice for facing difficulty calmly.",
        chapters:[
          {t:'Book 1: debts and lessons', d:'Opens with a list of gratitude toward the people who shaped his character.'},
          {t:'The discipline of judgment', d:'Works through separating events from the opinions we layer on top of them.'},
          {t:'The discipline of action', d:'Focuses on acting for the common good regardless of how others behave.'},
          {t:'The discipline of will', d:'Practices accepting what can\u2019t be controlled without resentment.'},
          {t:'Facing mortality', d:'Returns repeatedly to death as a way of clarifying what matters now.'}
        ],
        quotes:[
          "What stands in the way becomes the way, once you stop resisting it.",
          "You hold power over your reactions, even when you hold none over the events themselves.",
          "A short life is enough, if it's lived with reason and steady character."
        ],
        uses:["Start a short daily journaling habit built around reflection.","Separate what's in your control from what isn't before reacting.","Revisit mortality as a way to reset daily priorities."],
        pushback:"Some scholars argue the text is less a systematic philosophy than scattered private reminders, and its comfort with hierarchy sits oddly with modern readers.",
        authorBg:"Marcus Aurelius ruled the Roman Empire from 161 to 180 CE; he wrote privately in Greek, most likely never intending the notes for publication."
      }
    },
    {
      id:'educated', title:'Educated', author:'Tara Westover', category:'Memoir',
      hook:"A memoir of growing up off the grid and finding a path to Cambridge.", cover:'#5E7F91',
      angles:{
        argument:"Westover recounts a childhood without formal schooling, shaped by a survivalist family, and the slow, often painful process of educating herself into a different life — and a different relationship with her family.",
        chapters:[
          {t:'Childhood in the mountains', d:'Sets up a household built around self-reliance and deep suspicion of institutions.'},
          {t:'First taste of a classroom', d:'Follows her first attempts at formal study, largely self-taught from borrowed textbooks.'},
          {t:'College and culture shock', d:'Covers the disorientation of encountering basic facts and social norms for the first time.'},
          {t:'Family rupture', d:'Traces the growing distance between her and family members as her worldview shifts.'},
          {t:'Graduate life and reckoning', d:'Closes with her doctoral work and an uneasy peace with what she left behind.'}
        ],
        quotes:[
          "Education, for her, becomes less about facts and more about learning to trust her own perception of events.",
          "Every new idea she encountered had to be weighed against what she'd been taught to fear.",
          "Distance from home turns out to be the only way she can finally see it clearly."
        ],
        uses:["Reflect on which formative beliefs still shape your decisions.","Examine family narratives you've never questioned.","Use as a case study on self-directed education."],
        pushback:"Some family members have publicly disputed portions of the account, and reviewers note that memoir inherently reflects one person's memory rather than a verified record.",
        authorBg:"Westover earned a PhD in history from Cambridge after her unconventional path into formal education; the memoir was published in 2018."
      }
    },
    {
      id:'the-odyssey', title:'The Odyssey', author:'Homer', category:'Fiction · Epic poem',
      hook:"Odysseus's decade-long journey home, tested by monsters, gods, and pride.", cover:'#CBA35F',
      angles:{
        argument:"The epic follows Odysseus's struggle to return to Ithaca and reclaim his household, framing endurance, cunning, and hospitality as the qualities that separate a hero from a fool.",
        chapters:[
          {t:'The suitors at home', d:'Sets up the crisis waiting for Odysseus back in Ithaca while he is still away.'},
          {t:'Among the Cyclops', d:'Shows cunning winning out over brute strength in the encounter with Polyphemus.'},
          {t:'The underworld and the sirens', d:'Tests his resolve against temptation and the pull of the past.'},
          {t:"Circe's island", d:'Slows the journey down with transformation, both literal and personal.'},
          {t:'The return and the bow', d:'Builds to the final test that only the true king of Ithaca can pass.'}
        ],
        quotes:[
          "Cleverness gets him out of dangers that strength alone never could.",
          "Hospitality, or its absence, becomes the moral test running through every stop on the journey.",
          "Coming home turns out to require as much patience as the entire voyage."
        ],
        uses:['Framework for discussing the hero\'s-journey story structure.','Compare ancient hospitality customs to modern equivalents.','Use for comparative mythology discussion.'],
        pushback:"Scholars still debate whether the poem was composed by a single author, an oral tradition, or several hands, which complicates any single reading of its themes.",
        authorBg:"Attributed to Homer, a figure whose historical existence is itself debated; the poem descends from a long oral storytelling tradition in ancient Greece."
      }
    },
    {
      id:'deep-work', title:'Deep Work', author:'Cal Newport', category:'Nonfiction · Productivity',
      hook:"A case for scheduled, distraction-free focus as a scarce modern skill.", cover:'#E7DBBE',
      angles:{
        argument:"Newport argues that the ability to concentrate without distraction is increasingly rare and valuable, and that structured routines — not willpower alone — are what protect it.",
        chapters:[
          {t:'The value of deep work', d:'Makes the case that focused output is what separates work that compounds from work that does not.'},
          {t:"Why it's rare", d:'Looks at how open offices and constant messaging erode the conditions focus needs.'},
          {t:'Four scheduling philosophies', d:'Lays out different ways to carve out protected time depending on your job.'},
          {t:'Embracing boredom', d:'Argues that training your tolerance for boredom is what makes deep focus possible on demand.'},
          {t:'Draining the shallows', d:'Closes with tactics for shrinking the low-value busywork that crowds out focus.'}
        ],
        quotes:[
          "Attention, once fragmented by constant notifications, takes real time to rebuild.",
          "Depth of focus, not hours logged, is what produces work that's hard to replicate.",
          "Boredom tolerance turns out to be a trainable skill, not a fixed trait."
        ],
        uses:["Block dedicated focus time on your calendar.","Set a shutdown ritual to close out the workday.","Reduce app notifications during scheduled focus blocks."],
        pushback:"Critics note the advice assumes a degree of job flexibility not everyone has, and argue the book underplays the collaborative, interruption-heavy nature of many real jobs.",
        authorBg:"Newport is a computer science professor at Georgetown who writes about technology and productivity alongside his academic research."
      }
    },
    {
      id:'thinking-fast-and-slow', title:'Thinking, Fast and Slow', author:'Daniel Kahneman', category:'Nonfiction · Psychology',
      hook:"A Nobel laureate's map of the two systems behind human judgment.", cover:'#C7A05A',
      angles:{
        argument:"Kahneman lays out decades of research showing how quick, automatic thinking and slower, effortful reasoning interact — and how predictably that interaction produces biased judgments.",
        chapters:[
          {t:'System 1 and System 2', d:'Introduces the fast, intuitive mode and the slow, deliberate mode that trade off in every decision.'},
          {t:'Heuristics and biases', d:'Catalogs the mental shortcuts that work well most of the time and fail predictably.'},
          {t:'Overconfidence', d:'Shows how confident a judgment feels has little to do with how accurate it is.'},
          {t:'Loss aversion', d:'Explains why losses are felt more sharply than equivalent gains.'},
          {t:'Two selves', d:'Distinguishes the experiencing self from the remembering self, and how differently they rate the same event.'}
        ],
        quotes:[
          "Confidence in a judgment often has more to do with the coherence of the story than the quality of the evidence.",
          "Losses tend to be felt roughly twice as strongly as equivalent gains.",
          "The remembering self and the experiencing self can rate the same event in completely different ways."
        ],
        uses:["Slow down before high-stakes decisions to engage deliberate thinking.","Design choice architecture aware of loss aversion.","Watch for overconfidence in judgments that feel obviously right."],
        pushback:"Some of the underlying studies have faced replication challenges since publication, which Kahneman himself has publicly acknowledged for a handful of findings.",
        authorBg:"Kahneman, a psychologist, won the Nobel Memorial Prize in Economic Sciences in 2002 for work bridging psychology and economics."
      }
    },
    {
      id:'1984', title:'1984', author:'George Orwell', category:'Fiction · Dystopian',
      hook:"A totalitarian state that controls thought itself, seen through one clerk's rebellion.", cover:'#B4543A',
      angles:{
        argument:"Orwell imagines a regime that survives by rewriting history and language itself, following Winston Smith's doomed attempt to think — and love — outside the Party's control.",
        chapters:[
          {t:"Winston's forbidden diary", d:'Opens with the small, dangerous act of writing down a private thought.'},
          {t:'Newspeak and doublethink', d:'Explores how narrowing language narrows what a person can even think.'},
          {t:'The affair with Julia', d:'Follows a private rebellion that briefly makes another kind of life feel possible.'},
          {t:'Capture by the Thought Police', d:'Turns from rebellion to interrogation once the Party closes in.'},
          {t:'Room 101', d:'Ends with the final psychological break the Party demands before it accepts surrender.'}
        ],
        quotes:[
          "Whoever controls the record of the past controls the story of the present.",
          "A language stripped of certain words makes certain thoughts impossible to have at all.",
          "Total power isn't satisfied until it controls what a person believes, not just what they do."
        ],
        uses:["Framework for discussing surveillance and propaganda.","Case study for media literacy classes.","Compare its warnings to current data and monitoring practices."],
        pushback:"Some critics argue the book's bleakness borders on didactic, sacrificing character depth for political allegory; others debate how directly its warnings map onto modern technology.",
        authorBg:"Orwell wrote the novel in the late 1940s, drawing on his experience with wartime propaganda and his opposition to totalitarian regimes of both the left and right."
      }
    },
    {
      id:'mans-search-for-meaning', title:"Man's Search for Meaning", author:'Viktor Frankl', category:'Nonfiction · Memoir',
      hook:"A psychiatrist's account of surviving the camps, and the theory of meaning he built from it.", cover:'#83A78E',
      angles:{
        argument:"Frankl argues that even in extreme suffering, people retain the freedom to choose their attitude, and that a sense of purpose — not pleasure or power — is what makes survival, and a good life, possible.",
        chapters:[
          {t:'Arrival and loss of identity', d:'Describes the stripping away of name, possessions, and status on arrival at the camp.'},
          {t:'Daily survival', d:'Details the psychological adjustments needed just to get through each day.'},
          {t:'The psychology of apathy', d:'Examines the numbness that sets in as a protective response to constant loss.'},
          {t:'Liberation', d:'Covers the disorienting return to freedom after years of total control.'},
          {t:'Introducing logotherapy', d:'Closes by outlining the theory of meaning he developed from the experience.'}
        ],
        quotes:[
          "Everything can be taken from a person except the choice of how to respond to what happens.",
          "Those who found some future purpose to live for were more likely to endure.",
          "Meaning, in his view, can be found through work, through love, or through how one faces unavoidable suffering."
        ],
        uses:["Reframe hardship around a sense of purpose rather than pleasure.","Set purpose-driven goals during difficult periods.","Foundational reading before exploring logotherapy further."],
        pushback:"Some scholars note that survival in the camps depended heavily on luck and circumstance, and caution against reading the book as a formula where attitude alone determines outcomes.",
        authorBg:"Frankl was a Viennese psychiatrist before his imprisonment; after the war he developed logotherapy, a form of existential analysis centered on meaning."
      }
    },
    {
      id:'the-lean-startup', title:'The Lean Startup', author:'Eric Ries', category:'Nonfiction · Business',
      hook:"A build-measure-learn framework for testing ideas before betting everything.", cover:'#5E7F91',
      angles:{
        argument:"Ries argues that startups succeed by treating a business plan as a set of untested hypotheses, then running fast, cheap experiments to validate or kill ideas before scaling them.",
        chapters:[
          {t:'The lean startup method', d:'Frames a startup as an experiment, not a scaled-down version of an established company.'},
          {t:'The minimum viable product', d:'Explains how to build the smallest version that tests the riskiest assumption.'},
          {t:'Build-measure-learn', d:'Lays out the core feedback loop for iterating quickly on real data.'},
          {t:'Innovation accounting', d:'Introduces metrics built for judging progress before revenue exists.'},
          {t:'Pivot or persevere', d:'Covers the decision point every founder eventually has to face directly.'}
        ],
        quotes:[
          "A product's first version only needs to be good enough to test the riskiest assumption behind it.",
          "Vanity metrics can make a failing product look healthy right up until it isn't.",
          "The hardest strategic decision is often not what to build, but whether to pivot."
        ],
        uses:["Design a minimum viable product around one risky assumption.","Set up a build-measure-learn cycle for a new feature.","Choose actionable metrics over vanity metrics."],
        pushback:"Critics argue the framework works better for software products than capital-intensive or highly regulated industries, and that 'fail fast' advice can be misapplied to justify sloppy execution.",
        authorBg:"Ries developed the lean startup methodology from his own experience founding and iterating on software startups in Silicon Valley."
      }
    }
  ];
