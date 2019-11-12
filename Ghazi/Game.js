const player = new Player("Infected", 1200, 100, true);

const AI = [];
AI[0] = new Player("Human1", 300, 700, false);
AI[1] = new Player("Human2", 600, 500, false);
AI[2] = new Player("Human4", 1000, 300, false);
AI[3] = new Player("Human3", 1200, 900, false);

const animator = new Animator(player, AI);

player.image.onload = gameRun;

function gameRun() 
{
    update();
    requestAnimationFrame(gameRun);
}

function update() 
{
    animator.draw();
}