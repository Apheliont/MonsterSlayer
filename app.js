new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        monsterMaxHit: 10,
        playerMaxAttack: 10,
        playerMaxSpecial: 20,
        playerMaxHeal: 15,
        logs: [],
        isGameStarted: false
    },
    computed: {
        playerHealthBar() {
            return this.playerHealth > 0 ? this.playerHealth : 0;
        },
        monsterHealthBar() {
            return this.monsterHealth > 0 ? this.monsterHealth : 0;
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
        },
        gameLost() {
            this.isGameStarted = false;
            alert('You lost the game!');
        },
        gameWon() {
            this.isGameStarted = false;
            alert('You won the game!');
        },
        addLog(obj) {
            this.logs.push(obj);
        },
        generateRandomNumber(max) {
          return Math.floor(Math.random() * (max + 1));
        },
        monsterAttack() {
            const value = this.generateRandomNumber(this.monsterMaxHit);
            this.playerHealth -= value;
            this.addLog({value, who: 'monster', action: 'hits'});
        },
        attack() {
            this.monsterAttack();
            const value = this.generateRandomNumber(this.playerMaxAttack);
            this.monsterHealth -= value;
            this.addLog({value, who: 'player', action: 'hits'});
        },
        specialAttack() {
            this.monsterAttack();
            const value = this.generateRandomNumber(this.playerMaxSpecial);
            this.monsterHealth -= value;
            this.addLog({value, who: 'player', action: 'hits'});
        },
        heal() {
            this.monsterAttack();
            const value = this.generateRandomNumber(this.playerMaxHeal);
            this.playerHealth += value;
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