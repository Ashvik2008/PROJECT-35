var dog,dog1_Img,dog2_Img;
var BTN1,BTN2;
var lastFed;

function preload()
{
  dog1_Img = loadImage("images/dogImg.png");
  dog2_Img = loadImage("images/dogImg1.png");
}

function setup()
{
  createCanvas(1000,500);

  database = firebase.database();

  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
  lastFed = data.val();
  });
  
  foodobject=new Food()

  var FOOD = database.ref('Food');
  FOOD.on("value", readPosition);

  dog = createSprite(850,250,20,20);
  dog.addImage(dog1_Img);
  dog.scale = 0.25;

  BTN1 = createButton("FEED DRAGO");
  BTN1.position(820,60);
  BTN1.mousePressed(FeedDog)

  BTN2 = createButton("ADD FOOD");
  BTN2.position(715,60);
  BTN2.mousePressed(AddFood)
}
function draw()
{
  background(46,139,87);

  if(lastFed>=12) {
    text("Last Fed: "+lastFed%12+" PM", 10, 30);
  } else if(lastFed===0) {
    text("Last Fed: Never", 10, 30);
  } else {
    text("Last Fed: "+lastFed + " AM", 10, 30);
  }

  foodobject.display();
  
  drawSprites();
}


function readPosition(data)
{
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);
}

function FeedDog()
{
  dog.addImage(dog2_Img)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  database.ref('/').update({
  Food:foodobject.getFoodStock(),
   
   })
}

function AddFood()
{
    dog.addImage(dog1_Img)
    position++
    database.ref('/').update({
    Food:position
  })
 }
  