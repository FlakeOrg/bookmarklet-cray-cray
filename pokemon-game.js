// pokemon-game.js

// Basic structure for a Pokémon battle game

class Pokemon {
    constructor(name, type, health, attack) {
        this.name = name;
        this.type = type;
        this.health = health;
        this.attack = attack;
    }

    attackOpponent(opponent) {
        opponent.health -= this.attack;
        console.log(`${this.name} attacks ${opponent.name} for ${this.attack} damage!`);
    }

    isKnockedOut() {
        return this.health <= 0;
    }
}

function battle(pokemon1, pokemon2) {
    let turn = 0;
    while (!pokemon1.isKnockedOut() && !pokemon2.isKnockedOut()) {
        if (turn % 2 === 0) {
            pokemon1.attackOpponent(pokemon2);
        } else {
            pokemon2.attackOpponent(pokemon1);
        }
        turn++;
        console.log(`${pokemon1.name} Health: ${pokemon1.health}`);
        console.log(`${pokemon2.name} Health: ${pokemon2.health}`);
    }

    if (pokemon1.isKnockedOut()) {
        console.log(`${pokemon2.name} wins!`);
    } else {
        console.log(`${pokemon1.name} wins!`);
    }
}

// Example Pokémon
const pikachu = new Pokemon("Pikachu", "Electric", 35, 10);
const charmander = new Pokemon("Charmander", "Fire", 39, 9);

// Start the battle
battle(pikachu, charmander);