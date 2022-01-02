let app;
let menuScreen;
let playScreen;
let rect1;
let rect2;
let rect3;
let bgBack;
let bgMiddle;
let bgFront;
let bgX = 0;
let bgSpeed = .5;


class Entity extends PIXI.Sprite {
  constructor(x, y, texture) {
    super(texture);
    this.x = x;
    this.y = y;
    this.anchor.set(0.5);
    this.pointerIsDown = false;
    this.pointerIsOver = false;
  }
  changeTexture(texture) {
    this.texture = app.loader.resources[texture].texture;
  }
  makeSelected(firstRect, secondRect) {
    this.visible = true;
    firstRect.visible = false;
    secondRect.visible = false;
    this.x = app.view.width / 2;
    this.y = app.view.height / 2;

    this.interactive = true;
    this.buttonMode = true;
    firstRect.interactive = false;
    firstRect.buttonMode = false;
    secondRect.interavtive = false;
    secondRect.buttonMode = false;

  }
}

window.onload = function () {
  app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor:0xAAAAAA
  });



  document.querySelector("#gameDiv").appendChild(app.view);
  menuScreen = new PIXI.Container();
  playScreen = new PIXI.Container();

  playScreen.visible = false;
  menuScreen.visible = false;

  app.stage.addChild(menuScreen);
  app.stage.addChild(playScreen);

  //create menu screen background
  let menuRect = new PIXI.Graphics();
  menuRect.beginFill(0x00AAAA);
  menuRect.drawRect(0, 0, app.view.width, app.view.height);
  menuScreen.addChild(menuRect);

  window.addEventListener("keydown", switchPlayers);

  app.loader.baseUrl = "images";
  app.loader
    .add("char1", "state1.png")
    .add("char2", "state2.png")
    .add("char3", "state3.png")
    .add("bgBack", "back.png")
    .add("bgMiddle", "middle.png")
    .add("bgFront", "front.png")
    .add("char1_1", "state1_1.png")
    .add("char1_2", "state1_2.png")
    .add("char2_1", "state2_1.png")
    .add("char2_2", "state2_2.png")
    .add("char3_1", "state3_1.png")
    .add("char3_2", "state3_2.png");

    app.loader.onComplete.add(doneLoading);
    app.loader.load();

}

function doneLoading() {
  menuScreen.visible = true;
  createScene();
  createPlayers();
  app.ticker.add(gameLoop);
}

function createPlayers() {

  rect1 = new Entity(200, 300, app.loader.resources["char1"].texture);
  rect2 = new Entity(400, 300, app.loader.resources["char2"].texture);
  rect3 = new Entity(600, 300, app.loader.resources["char3"].texture);

  rect1.on("pointerdown", rect1PointerDown);
  rect2.on("pointerdown", rect2PointerDown);
  rect3.on("pointerdown", rect3PointerDown);

  rect1.on("pointerup", rect1PointerUp);
  rect2.on("pointerup", rect2PointerUp);
  rect3.on("pointerup", rect3PointerUp);

  rect1.on("pointerover", rect1PointerOver);
  rect2.on("pointerover", rect2PointerOver);
  rect3.on("pointerover", rect3PointerOver);

  rect1.on("pointerupoutside", rect1PointerUpOutside);
  rect2.on("pointerupoutside", rect2PointerUpOutside);
  rect3.on("pointerupoutside", rect3PointerUpOutside);

  rect1.on("pointerout", rect1PointerOut);
  rect2.on("pointerout", rect2PointerOut);
  rect3.on("pointerout", rect3PointerOut);

  app.stage.addChild(rect1);
  app.stage.addChild(rect2);
  app.stage.addChild(rect3);
}

function createScene() {
  bgBack = createBg(app.loader.resources["bgBack"].texture);
  bgMiddle = createBg(app.loader.resources["bgMiddle"].texture);
  bgFront = createBg(app.loader.resources["bgFront"].texture);

  let style1 = new PIXI.TextStyle({
    fontSize: 24,
    fill: ["#FB830A", "#FB3A0A"]
  });

  let text1 = new PIXI.Text("Press 1, 2, or 3 to select your square.", style1);
  app.stage.addChild(text1);

}

function createBg(texture) {
  let tiling = new PIXI.TilingSprite(texture, app.view.width, app.view.height);
  tiling.position.set(0, 0);
  tiling.scale.set(3.75);
  app.stage.addChild(tiling);

  return tiling;
}

function switchPlayers(e) {
  switch (e.key) {
    case "1":
      rect1.makeSelected(rect2, rect3);
      break;
    case "2":
      rect2.makeSelected(rect1, rect3);
      break;
    case "3":
      rect3.makeSelected(rect1, rect2);
      break;
  }
}

function rect1PointerDown(e) {
  rect1.pointerIsDown = true;
  rect1.changeTexture("char1_1");
}

function rect2PointerDown(e) {
  rect2.pointerIsDown = true;
  rect2.changeTexture("char2_1");
}

function rect3PointerDown(e) {
  rect3.pointerIsDown = true;
  rect3.changeTexture("char3_1");
}


function rect1PointerUp(e) {
  if (rect1.pointerIsOver) {
    rect1.changeTexture("char1_2");
  } else {
    rect1.changeTexture("char1");
  }
  rect1.pointerIsDown = false;
}

function rect2PointerUp(e) {
  if (rect2.pointerIsOver) {
    rect2.changeTexture("char2_2");
  } else {
    rect2.changeTexture("char2");
  }
  rect2.pointerIsDown = false;
}

function rect3PointerUp(e) {
  if (rect3.pointerIsOver) {
    rect3.changeTexture("char3_2");
  } else {
    rect3.changeTexture("char3");
  }
  rect3.pointerIsDown = false;
}



function rect1PointerOver(e) {
  rect1.pointerIsOver = true;
  rect1.changeTexture("char1_2");
}

function rect2PointerOver(e) {
  rect2.pointerIsOver = true;
  rect2.changeTexture("char2_2");
}

function rect3PointerOver(e) {
  rect3.pointerIsOver = true;
  rect3.changeTexture("char3_2");
}



function rect1PointerUpOutside(e) {
  rect1.changeTexture("char1");
  rect1.pointerIsDown = false;
  rect1.pointerIsOver = false;
}

function rect2PointerUpOutside(e) {
  rect2.changeTexture("char2");
  rect2.pointerIsDown = false;
  rect2.pointerIsOver = false;
}

function rect3PointerUpOutside(e) {
  rect3.changeTexture("char3");
  rect3.pointerIsDown = false;
  rect3.pointerIsOver = false;
}


function rect1PointerOut(e) {
  if (!rect1.pointerIsDown) {
    rect1.changeTexture("char1");
    rect1.pointerIsOver = false;
  }
}

function rect2PointerOut(e) {
  if (!rect2.pointerIsDown) {
    rect2.changeTexture("char2");
    rect2.pointerIsOver = false;
  }
}

function rect3PointerOut(e) {
  if (!rect3.pointerIsDown) {
    rect3.changeTexture("char3");
    rect3.pointerIsOver = false;
  }
}

function gameLoop(delta) {
  updateBg();
}

function updateBg() {
  bgX = (bgX + bgSpeed);
  bgFront.tilePosition.x = bgX;
  bgMiddle.tilePosition.x = bgX / 2;
  bgBack.tilePosition.x = bgX / 4;
}
