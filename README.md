# CardTW — 100k multi-chain prototype

Prototype frontend pour connecter un wallet puis configurer une autorisation ERC-20 plafonnée à 100 000 unités.

- Connexion Reown/AppKit conservée.
- Réseaux EVM courants.
- Sélection réseau.
- Sélection token et spender de test.
- Approve de 100 000 unités.
- Lecture de l'allowance et du restant.
- Révocation à 0.

Cette version ne réalise pas le settlement réel des paiements carte. Le debit/settlement réel devra être implémenté côté backend + contrat après validation de l'architecture.
