# Summer1400-Project-Team4
<div dir="rtl">
برای api و طراحی پایپلاین یه فرمت موقت مینویسم. میتونین اگه باگی داره اصلاح کنین.
  
</div>
## pipeline json:
 
{
    "processes": [
        {
            "name": "filter",
            "instruction": {"outputColumns":["StudentNumber", "Grade", "FirstName", "LastName"], "condition":"IsMale = 1 AND 10 < Grade AND Grade < 15"},
            "price": 1600,
            "cardKind": "MONSTER",
            "image": "src/resources/yugioh/PNG/cardsImages/Babydragon.jpg"
        },
        {
            "isCustom": false,
            "name": "Black Pendant",
            "description": "The equipped monster gains 500 ATK. When this card is sent from the field to the Graveyard: Inflict 500 damage to your opponent.",
            "price": 4300,
            "magicType": "SPELL",
            "cardKind": "MAGIC",
            "image": "src/resources/yugioh/PNG/cardsImages/BlackPendant.jpg"
        },
        {
            "isCustom": false,
            "name": "Command Knight",
            "description": "All Warrior-Type monsters you control gain 400 ATK. If you control another monster, monsters your opponent controls cannot target this card for an attack.",
            "price": 2100,
            "cardKind": "MONSTER",
            "image": "src/resources/yugioh/PNG/cardsImages/CommandKnight.jpg"
        },
        {
            "isCustom": false,
            "name": "Haniwa",
            "description": "An earthen figure that protects the tomb of an ancient ruler.",
            "price": 600,
            "cardKind": "MONSTER",
            "image": "src/resources/yugioh/PNG/cardsImages/Haniwa.jpg"
        },
        {
            "isCustom": false,
            "name": "Yami",
            "description": "All Fiend and Spellcaster monsters on the field gain 200 ATK/DEF, also all Fairy monsters on the field lose 200 ATK/DEF.",
            "price": 4300,
            "magicType": "SPELL",
            "cardKind": "MAGIC",
            "image": "src/resources/yugioh/PNG/cardsImages/Yami.jpg"
        },
        {
            "isCustom": false,
            "name": "Yami",
            "description": "All Fiend and Spellcaster monsters on the field gain 200 ATK/DEF, also all Fairy monsters on the field lose 200 ATK/DEF.",
            "price": 4300,
            "magicType": "SPELL",
            "cardKind": "MAGIC",
            "image": "src/resources/yugioh/PNG/cardsImages/Yami.jpg"
        },
        {
            "isCustom": false,
            "name": "Yomi Ship",
            "description": "If this card is destroyed by battle and sent to the GY: Destroy the monster that destroyed this card.",
            "price": 1700,
            "cardKind": "MONSTER",
            "image": "src/resources/yugioh/PNG/cardsImages/YomiShip.jpg"
        }
    ],
    "sideDeck": [],
    "name": "sdfsf",
    "isActive": false
}
