new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        monsterMaxAttack: 13,
        playerMaxAttack: 10,
        playerMaxSpecial: 30,
        playerMaxHeal: 15,
        logs: [],
        isGameStarted: false,
        gainedPower: 0
    },
    computed: {
        playerHealthBar() {
            return this.playerHealth > 0 ? this.playerHealth : 0;
        },
        monsterHealthBar() {
            return this.monsterHealth > 0 ? this.monsterHealth : 0;
        },
        specialEnabled() {
            return this.gainedPower < 5;
        }
    },
    watch: {
        monsterHealth(value) {
            if (value <= 0) {
                this.gameWon();
            }
        },
        playerHealth(value) {
            if (value <= 0) {
                this.gameLost();
            }
        }
    },
    methods: {
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.isGameStarted = true;
            this.logs = [];
            this.gainedPower = 0;
        },
        gameLost() {
            if (this.isGameStarted) {
                this.isGameStarted = false;
                alert('You lost the game!');
            }
        },
        gameWon() {
            if (this.isGameStarted) {
                this.isGameStarted = false;
                alert('You won the game!');
            }
        },
        addLog(obj) {
            this.logs.push(obj);
        },
        generateRandomNumber(max) {
          return Math.floor(Math.random() * (max + 1));
        },
        monsterAttack() {
            const value = this.generateRandomNumber(this.monsterMaxAttack);
            this.playerHealth -= value;
            this.addLog({value, who: 'monster', action: 'hits'});
        },
        attack() {
            this.monsterAttack();
            const value = this.generateRandomNumber(this.playerMaxAttack);
            this.monsterHealth -= value;
            this.gainedPower += 1;
            this.addLog({value, who: 'player', action: 'hits'});
        },
        specialAttack() {
            this.monsterAttack();
            const value = this.generateRandomNumber(this.playerMaxSpecial);
            this.monsterHealth -= value;
            this.gainedPower = 0;
            this.addLog({value, who: 'player', action: 'hits'});
        },
        heal() {
            this.monsterAttack();
            const value = this.generateRandomNumber(this.playerMaxHeal);
            this.playerHealth = (this.playerHealth + value) > 100 ? 100 : (this.playerHealth + value);
            this.addLog({value, who: 'player', action: 'heals'});
        },
        whichClass(log) {
            if (log.who === 'monster') {
                return 'monsterHit';
            }
            if (log.action === 'heals') {
                return 'playerHeals';
            }
            return 'playerHit';
        }
    }
});