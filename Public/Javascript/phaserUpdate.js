/*global cursors:false, player:false, userId:false, socket:false*/
//jshint unused:false

function update() {
	"use strict";
	// Controls for player
	var direction = "NONE";

	//Controller controls
	if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
		direction = "left";
	}

	if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
		direction = "right";
	}

	if ((pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) && (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > -0.5) && (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < 0.5)) {
		direction = "up";
	}

	if ((pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)  && (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > -0.5) && (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < 0.5)) {
		direction = "down";
	}

	if (pad1.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER)) {
		player.currMoveSpeed = "sprint";
	} else {
		player.currMoveSpeed = "normal";
	}

	if (pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
		player.stab();
	}


	//Arrow and WASD controls
	if (cursorKeys.left.isDown || aKey.isDown) {
		direction = "left";
	}

	if (cursorKeys.right.isDown || dKey.isDown) {
		direction = "right";
	}
	if (cursorKeys.up.isDown || wKey.isDown) {
		direction = "up";
	}

	if (cursorKeys.down.isDown || sKey.isDown) {
		direction = "down";
	}

	if (shiftKey.isDown) {
		player.currMoveSpeed = "sprint";
	} else {
		player.currMoveSpeed = "normal";
	}

	if (spaceKeyStroke.isDown) {
		player.stab();
	}


	if (direction == "NONE") {
		player.moving = false;
	} else {
		player.direction = direction;
		player.moving = true;
	}

	for (var i = 0; i < otherPlayers.length; i++) {
		console.log(otherPlayers[i].sword);
		if (Phaser.Rectangle.intersects(player, otherPlayers[i].sword)) {
			player.onHit(otherPlayers[i].sword);
		}
	}

	var clientData = {
		"id" : id,
		"player" : player.getData()
	};
	socket.emit("userDataUpdate", clientData);

	// Z Index
	var allSpritesInCameraSorted = allSprites.filter(sprite => sprite.inCamera)
			.sort(function(sprite1, sprite2) {
				return sprite1.y > sprite2.y;
			});
	for (var i = 0; i < allSpritesInCameraSorted.length; i++) {
		game.world.bringToTop(allSpritesInCameraSorted[i]);
	}

}
