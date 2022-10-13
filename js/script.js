(function() {
    const cnv = document.querySelector("#canvas");
    const ctx = cnv.getContext("2d");
    const points = document.querySelector("#points");
    if (window.sessionStorage.getItem("highscore") != null) {
        document.querySelector("#highscore").textContent = window.sessionStorage.getItem("highscore");
    }
    
    // variables
    let moveUp = false;
    let moveDown = false;
    let haveObstacle = false;
    let collision = false;
    let crtPoints = 0;

    // get player
    const player = new setPlayer(80, 150, 50, 50, "#666");

    // get obstacles
    let obstacles = [];
    let psb_obstacles = [];
    let crt_obstacles = [];
    const obs_fl_sm = new setObstacle("obs_fl_sm", 600, 150, 30, 50); obstacles.push(obs_fl_sm);
    const obs_fl_md = new setObstacle("obs_fl_md", 600, 150, 50, 50); obstacles.push(obs_fl_md);
    const obs_fl_lg = new setObstacle("obs_fl_lg", 600, 150, 70, 50); obstacles.push(obs_fl_lg);
    const obs_fl_tl = new setObstacle("obs_fl_tl", 600, 130, 30, 70); obstacles.push(obs_fl_tl);

    window.addEventListener("keydown", function(key){
        const keyName = key.key;
        switch (keyName){
            case "ArrowDown":
                if (!moveUp){
                    player.height = 30;
                    player.width = 60;
                    player.posX = 75;
                    player.posY = 170;
                }
                break;
            case "ArrowUp":
                moveUp = true;
                break;
        }
    })

    window.addEventListener("keyup", function(key){
        const keyName = key.key;
        switch (keyName){
            case "ArrowDown":
                player.height = 50;
                player.width = 50;
                player.posX = 80;
                player.posY = 150;
                break;
        }
    })

    function setPoints() {
        crtPoints = parseInt(points.textContent);
        if (crtPoints > 0 || moveUp){
            points.textContent = ("00000"+(crtPoints+1).toString()).slice(-5);
        }
        if (crtPoints >= 500) {
            if (!(obstacles[3] == psb_obstacles[3])) {
                psb_obstacles.push(obstacles[3]);
            }
        } else if (crtPoints >= 250) {
            if (!(obstacles[2] == psb_obstacles[2])) {
                psb_obstacles.push(obstacles[2]);
            }
        } else if (crtPoints >= 100) {
            if (!(obstacles[1] == psb_obstacles[1])) {
                psb_obstacles.push(obstacles[1]);
            }
        } else if (crtPoints >= 50) {
            if (!(obstacles[0] == psb_obstacles[0])) {
                psb_obstacles.push(obstacles[0]);
            }
        }
        return crtPoints;
    }
    
    // show player
    function showPlayer() {
        if (moveUp && !moveDown) {
            if (player.posY <= 20) {
                moveDown = true;
            } else if (player.posY <= 25) {
                player.posY -= 2;
            } else if (player.posY <= 40) {
                player.posY -= 5;
            } else {
                player.posY -= 10;
            }
        } else if (moveDown) {
            if (player.posY >= 150) {
                moveUp = false;
                moveDown = false;
            } else if (player.posY >= 40) {
                player.posY += 10;
            } else if (player.posY >= 25) {
                player.posY += 5;
            } else {
                player.posY += 2;
            }
        }
        ctx.fillStyle = player.color;
        ctx.fillRect(player.posX, player.posY, player.width, player.height);
    }

    function getObstacle() {
        const obs = psb_obstacles[Math.floor(Math.random()*psb_obstacles.length)];
        crt_obstacles.push(new setObstacle(obs.name, obs.posX, obs.posY, obs.width, obs.height));
    }

    function showObstacles() {
        for (let i in crt_obstacles) {
            const obs = crt_obstacles[i];
            console.log(obs);
            obs.posX -= 7;
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.posX, obs.posY, obs.width, obs.height);
            if (obs.posX <= 200 && obs.posX >= 190) {
                setTimeout(() => {haveObstacle = false}, Math.random()*600);
            }
            if (obs.posX <= -100) {
                crt_obstacles.shift();
            }
        }
    }

    function checkCollision() {
        for (let i in crt_obstacles) {
            const obs = crt_obstacles[i];
            if (player.posX+player.width>=obs.posX && player.posX<=obs.posX+obs.width && player.posY+player.height>=obs.posY) {
                collision = true;
            }
        }
    }

    function atualizarTela() {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        if (!collision) {
            window.requestAnimationFrame(atualizarTela, cnv);
        } else {
            const highscore = document.querySelector("#highscore");
            if (crtPoints > parseInt(highscore.textContent)){
                highscore.textContent = ("00000"+(crtPoints+2)).slice(-5);  
            }
            window.sessionStorage.setItem("highscore", highscore.textContent);
        }
        crtPoints = setPoints();
        showPlayer();
        if (!haveObstacle && crtPoints > 50){
            haveObstacle = true;
            getObstacle();
        }
        showObstacles();
        checkCollision();
    }

    atualizarTela()

}())