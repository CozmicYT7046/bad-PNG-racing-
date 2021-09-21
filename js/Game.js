class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(carImage1);
    car2 = createSprite(300,200);
    car2.addImage(carImage2);
    car3 = createSprite(500,200);
    car3.addImage(carImage3);
    car4 = createSprite(700,200);
    car4.addImage(carImage4);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getcarsEnd();
    
    if(allPlayers !== undefined){
      background("green");
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 230;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          if(allPlayers[plr].distance > 4199){
            fill("yellow")
            textSize(20);
            text("game over", x-40, y-50);
            var help = player.rank+1;
            text(allPlayers[plr].name +" rank: " + parseInt(help), x-55, y-80);
          }
          
          stroke("white");
          fill("snow");                                                                                                
          ellipse(x,y,80,80);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=100
      player.update();
    }
    if(player.distance > 4200){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updatecarsEnd(player.rank);
    }

    drawSprites();
  }
  end(){
    console.log("game over");
    console.log(player.rank);
  }
}
