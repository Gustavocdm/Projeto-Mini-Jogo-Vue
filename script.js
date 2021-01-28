new Vue({
    el: '#vue',
    data: {
        emJogo: false,
        playerLife: 100,
        monsterLife: 100,
        log: []
    },
    watch: {
        emJogo(novo) {
            if(novo) {
                this.resetGame();
            }
        },
        finalizou(novo) {
            if(novo) {
                this.emJogo = false;
            }
        }
    },
    computed: {
        finalizou() {
            return this.playerLife == 0 || this.monsterLife == 0;
        }
    },
    methods: {
        lifeColor(life) {
            return life <= 20 ? 'red' : 'green';
        },
        onAttack() {
            this.damagePlayer(this.generateRandomNumber(7, 11));
            this.damageMonster(this.generateRandomNumber(5, 9));
        },
        onSpecial() {
            this.damagePlayer(this.generateRandomNumber(5, 9));
            this.damageMonster(this.generateRandomNumber(7, 11));
        },
        onHeal() {
            this.healPlayer(this.generateRandomNumber(6, 10));
            this.damagePlayer(this.generateRandomNumber(6, 10));
        },
        onBeginEndGame() {
            this.emJogo = !this.emJogo;
        },
        resetGame() {
            this.playerLife = 100;
            this.monsterLife = 100;
            this.log = [];
        },
        generateRandomNumber(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        },
        damagePlayer(points) {
            const damage = this.playerLife - points;
            if(damage < 0) {
                points += damage;
            }
            this.playerLife -= points;
            this.generateLog(points, 'jogador', 'dano');
        },
        healPlayer(points) {
            const heal = this.playerLife + points;
            if(heal > 100) {
                points -= (heal - 100);
            }
            this.playerLife += points;
            this.generateLog(points, 'jogador', 'cura');
        },
        damageMonster(points) {
            const damage = this.monsterLife - points;
            if(damage < 0) {
                points += damage;
            }
            this.monsterLife -= points;
            this.generateLog(points, 'monstro', 'dano');
        },
        generateLog(qtd, quem, oq) {
            this.log.unshift(
                {
                    qtd: qtd,
                    quem: quem,
                    oq: oq
                }
            );
        }
    }
});