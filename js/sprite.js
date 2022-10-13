const setPlayer = function(posX, posY, width, height, color){
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
}

const setObstacle = function(name, posX, posY, width, height, color="#fcba03"){
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
}