function start() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = canvas.width = innerWidth;
    const h = canvas.height = innerHeight;
    const particles = [];
    const properties = {
        bgColor: 'rgba(17, 17, 19, 1)',
        particleColor: 'rgba(0, 200, 255, 1);',
        particleRadius: 3,
        particleCount: 80,
        particleMaxVelocity: 0.5,
        lineLength: 250,
        paticleLife: 6,
    }
    document.querySelector('body').appendChild(canvas);

    //change size canvas after resize window
    window.onresize = function () {
        const w = canvas.width = innerWidth;
        const h = canvas.height = innerHeight;
    };

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.life = Math.random() * properties.paticleLife * 60;
        }

        position() {
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        reDraw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }

        reCalculateLife() {
            if (this.life < 1) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.life = Math.random() * properties.paticleLife * 60;
            }

            this.life--;
        }

    }

    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    };

    function drawLines() {
        let x1, y1, x2, y2, length, opacity;

        particles.forEach(i => {
            particles.forEach(j => {
                x1 = i.x;
                y1 = i.y;
                x2 = j.x;
                y2 = j.y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

                if (length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = 'rgba(0, 200, 255, ' + opacity + ')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            })
        })
    };

    function reDrawParticles() {
        // for (let i in particles) {
        //     particles[i].reDraw();
        // }

        particles.forEach(par => {
            par.reCalculateLife();
            par.position();
            par.reDraw();

        })
    };

    function loop() {
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    };

    function init() {
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle);
        }
        loop();
    };

    init();
};

start();