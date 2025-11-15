"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gravity = 0.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext("2d");
    if (!c) return;

    canvas.width = 1024;
    canvas.height = 576;

    class Sprite {
      position: { x: number; y: number };
      image: HTMLImageElement;
      scale: number;
      framesMax: number;
      framesCurrent: number = 0;
      frameElapsed: number = 0;
      frameHold: number;
      offset: { x: number; y: number };

      constructor(
        position: { x: number; y: number },
        imageSrc: string,
        scale: number = 1,
        framesMax: number = 1,
        frameHold: number = 10,
        offset = { x: 0, y: 0 }
      ) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameHold = frameHold;
        this.offset = offset;
      }

      draw() {
        if (!c || !this.image.complete) return;
        const frameWidth = this.image.width / this.framesMax;
        const frameHeight = this.image.height;
        c.drawImage(
          this.image,
          this.framesCurrent * frameWidth,
          0,
          frameWidth,
          frameHeight,
          this.position.x - this.offset.x,
          this.position.y - this.offset.y,
          frameWidth * this.scale,
          frameHeight * this.scale
        );
      }

      animateFrames() {
        this.frameElapsed++;
        if (this.frameElapsed % this.frameHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++;
          } else {
            this.framesCurrent = 0;
          }
        }
      }

      update() {
        this.draw();
        this.animateFrames();
      }
    }

    class Fighter extends Sprite {
      velocity: { x: number; y: number };
      width: number = 50;
      height: number = 150;
      health: number = 100;
      isAttacking: boolean = false;
      attackBox: {
        position: { x: number; y: number };
        width: number;
        height: number;
      };
      sprites: Record<string, { image: HTMLImageElement; framesMax: number }>;
      currentSprite: string;
      flipped: boolean = false; // for alignment

      constructor(
        position: { x: number; y: number },
        velocity: { x: number; y: number },
        imageSrc: string,
        scale: number = 1,
        framesMax: number = 1,
        frameHold: number = 10,
        offset: { x: number; y: number } = { x: 0, y: 0 },
        sprites: Record<string, { imageSrc: string; framesMax: number }> = {},
        flipped: boolean = false
      ) {
        super(position, imageSrc, scale, framesMax, frameHold, offset);
        this.velocity = velocity;
        this.flipped = flipped;

        this.attackBox = {
          position: { x: this.position.x, y: this.position.y },
          width: 120,
          height: 50,
        };

        this.sprites = {};
        for (const key in sprites) {
          const img = new Image();
          img.src = sprites[key].imageSrc;
          this.sprites[key] = {
            image: img,
            framesMax: sprites[key].framesMax,
          };
        }
        this.currentSprite = "idle";
      }

      switchSprite(sprite: string) {
        if (this.currentSprite === sprite) return;
        const s = this.sprites[sprite];
        if (!s) return;
        this.image = s.image;
        this.framesMax = s.framesMax;
        this.framesCurrent = 0;
        this.currentSprite = sprite;
      }

      update() {
        this.draw();
        this.animateFrames();

        // attack box positioning
        if (!this.flipped) {
          // facing right
          this.attackBox.position.x = this.position.x + this.width;
        } else {
          // facing left
          this.attackBox.position.x = this.position.x - this.attackBox.width;
        }
        this.attackBox.position.y = this.position.y + this.height / 2;

        // movement
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // gravity
        if (
          canvas &&
          this.position.y + this.height + this.velocity.y >= canvas.height
        ) {
          this.velocity.y = 0;
          this.position.y = canvas.height - this.height;
        } else {
          this.velocity.y += gravity;
        }
      }

      attack() {
        if (this.isAttacking) return;
        this.isAttacking = true;
        this.switchSprite("attack");
      }

      animateFrames() {
        this.frameElapsed++;
        if (this.frameElapsed % this.frameHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++;
          } else {
            this.framesCurrent = 0;

            // reset attack
            if (this.currentSprite === "attack") {
              this.isAttacking = false;
              this.switchSprite("idle");
            }
          }
        }
      }
    }

    const background = new Sprite(
      { x: 0, y: 0 },
      "/img/background_layer_3.png"
    );

    const player = new Fighter(
      { x: 100, y: 100 },
      { x: 0, y: 0 },
      "/img/IDLE.png",
      3,
      8,
      8,
      { x: 200, y: 130 },
      {
        idle: { imageSrc: "/img/IDLE.png", framesMax: 10 },
        run: { imageSrc: "/img/RUN.png", framesMax: 16 },
        attack: { imageSrc: "/img/ATTACK.png", framesMax: 7 },
      },
      false
    );

    const enemy = new Fighter(
      { x: 700, y: 100 },
      { x: 0, y: 0 },
      "/img/p2/_Idle.png",
      3,
      8,
      8,
      { x: 200, y: 130 },
      {
        idle: { imageSrc: "/img/p2/_Idle_flipped.png", framesMax: 10 },
        run: { imageSrc: "/img/p2/_Run_flipped.png", framesMax: 10 },
        attack: { imageSrc: "/img/p2/_Attack2_flipped.png", framesMax: 6 },
      },
      true
    );

    const keys: Record<string, { pressed: boolean }> = {
      w: { pressed: false },
      a: { pressed: false },
      d: { pressed: false },
      ArrowUp: { pressed: false },
      ArrowLeft: { pressed: false },
      ArrowRight: { pressed: false },
    };

    function rectangularCollision({ rectangle1, rectangle2 }: any) {
      return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
      );
    }

    let timer = 60;
    let timerId: NodeJS.Timeout;
    let gameOver = false;

    function determineWinner() {
      const resultEl = document.getElementById("result");
      if (!resultEl) return;

      if (player.health === enemy.health) {
        resultEl.innerText = "Tie";
      } else if (player.health > enemy.health) {
        resultEl.innerText = "Player 1 Wins";
      } else {
        resultEl.innerText = "Player 2 Wins";
      }

      resultEl.style.display = "flex";
      clearTimeout(timerId);
      gameOver = true;
    }

    function decreaseTimer() {
      if (timer > 0 && !gameOver) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.getElementById("timer")!.innerHTML = timer.toString();
      }
      if (timer === 0 && !gameOver) {
        determineWinner();
      }
    }

    decreaseTimer();

    function animate() {
      if (gameOver) return;
      window.requestAnimationFrame(animate);

      if (!canvas) return;
      c!.fillStyle = "black";
      c!.fillRect(0, 0, canvas.width, canvas.height);

      background.update();
      player.update();
      enemy.update();

      player.velocity.x = 0;
      enemy.velocity.x = 0;

      // Player movement
      if (keys.a.pressed) {
        player.velocity.x = -5;
        player.switchSprite("run");
      } else if (keys.d.pressed) {
        player.velocity.x = 5;
        player.switchSprite("run");
      } else if (!player.isAttacking) {
        player.switchSprite("attack" in player.sprites ? "idle" : "run");
      } else {
        enemy.switchSprite("idle");
      }

      // Enemy movement
      if (keys.ArrowLeft.pressed) {
        enemy.velocity.x = -5;
        enemy.switchSprite("run");
      } else if (keys.ArrowRight.pressed) {
        enemy.velocity.x = 5;
        enemy.switchSprite("run");
      } else if (!enemy.isAttacking) {
        enemy.switchSprite("idle");
      } else {
        enemy.switchSprite("idle");
      }

      // Collision detection
      if (
        player.isAttacking &&
        rectangularCollision({
          rectangle1: {
            position: player.attackBox.position,
            width: player.attackBox.width,
            height: player.attackBox.height,
          },
          rectangle2: enemy,
        })
      ) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.getElementById("enemyHealth")!.style.width =
          enemy.health + "%";
        if (enemy.health <= 0 && !gameOver) determineWinner();
      }

      if (
        enemy.isAttacking &&
        rectangularCollision({
          rectangle1: {
            position: enemy.attackBox.position,
            width: enemy.attackBox.width,
            height: enemy.attackBox.height,
          },
          rectangle2: player,
        })
      ) {
        enemy.isAttacking = false;
        player.health -= 20;
        document.getElementById("playerHealth")!.style.width =
          player.health + "%";
        if (player.health <= 0 && !gameOver) determineWinner();
      }
    }

    animate();

    window.addEventListener("keydown", (event) => {
      if (gameOver) return;
      switch (event.key) {
        case "w":
          keys.w.pressed = true;
          player.velocity.y = -10;
          break;
        case "a":
          keys.a.pressed = true;
          break;
        case "d":
          keys.d.pressed = true;
          break;
        case " ":
          player.attack();
          break;
        case "Enter":
          enemy.attack();
          break;
        case "ArrowUp":
          keys.ArrowUp.pressed = true;
          enemy.velocity.y = -10;
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (gameOver) return;
      switch (event.key) {
        case "a":
          keys.a.pressed = false;
          break;
        case "d":
          keys.d.pressed = false;
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = false;
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = false;
          break;
      }
    });
  }, []);

  return (
    <div className="relative inline-block">
      <div>
        <div className="absolute flex w-full items-center">
          <div className="flex justify-end relative h-6 w-full">
            <div
              id="playerHealth"
              className="top-0 left-5 bg-amber-300 z-10 h-6 w-full p-5"
            ></div>
          </div>
          <div
            id="timer"
            className="bg-red-500 h-24 w-24 shrink-0 flex items-center justify-center text-white text-3xl font-bold"
          ></div>
          <div className="relative h-6 w-full">
            <div
              id="enemyHealth"
              className="top-0 left-5 bg-amber-300 h-7 p-5"
            ></div>
          </div>
        </div>
      </div>

      <div
        id="result"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white hidden animate-pulse"
      ></div>

      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
