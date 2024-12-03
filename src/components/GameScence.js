import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const GameScene = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: 800,
      height: 600,
      scene: {
        preload,
        create,
      },
      backgroundColor: "#48BF91",
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(gameConfig);

    function preload() {
      this.load.setBaseURL("https://labs.phaser.io");
      this.load.image("ball", "assets/sprites/pangball.png");
    }

    function create() {
      const graphics = this.add.graphics();
      graphics.fillGradientStyle(0x2e8b57, 1);
      graphics.fillRect(0, 0, 800, 600);

      const ball = this.physics.add.sprite(400, 300, "ball");
      ball.setCollideWorldBounds(true);
      ball.setBounce(1); //

      const randomX = Phaser.Math.Between(-200, 200);
      const randomY = Phaser.Math.Between(-200, 200);
      ball.setVelocity(randomX, randomY);
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} id="phaser-game" />;
};

export default GameScene;
