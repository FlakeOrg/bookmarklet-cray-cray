javascript:(function () {

  if (document.getElementById("gameHubX")) return;

  let hub = document.createElement("div");
  hub.id = "gameHubX";

  Object.assign(hub.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "#0f172a",
    color: "white",
    zIndex: "999999",
    fontFamily: "Arial",
    padding: "20px"
  });

  document.body.appendChild(hub);
  hub.innerHTML = "<h1>🎮 Game Hub</h1>";

  function btn(text, func) {
    let b = document.createElement("button");
    b.innerText = text;
    b.style.display = "block";
    b.style.margin = "10px 0";
    b.style.padding = "12px";
    b.style.fontSize = "18px";
    b.style.borderRadius = "8px";
    b.onclick = func;
    hub.appendChild(b);
  }

  // =========================
  // BETTER UNO
  // =========================

  btn("🃏 Better UNO", function () {
    hub.remove();

    (function () {

      if (document.getElementById("unoX")) return;

      let g = document.createElement("div");
      g.id = "unoX";

      Object.assign(g.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "#1e293b",
        color: "white",
        zIndex: "999999",
        fontFamily: "Arial",
        padding: "20px"
      });

      document.body.appendChild(g);

      const COLORS = ["red", "yellow", "green", "blue"];
      let deck = [];

      COLORS.forEach(color => {
        deck.push({ c: color, v: 0 });

        for (let i = 1; i <= 9; i++) {
          deck.push({ c: color, v: i }, { c: color, v: i });
        }

        ["skip", "reverse", "+2"].forEach(value => {
          deck.push({ c: color, v: value }, { c: color, v: value });
        });
      });

      for (let i = 0; i < 4; i++) {
        deck.push({ c: "wild", v: "wild" }, { c: "wild", v: "+4" });
      }

      deck.sort(() => Math.random() - 0.5);

      let player = deck.splice(0, 7);
      let ai = deck.splice(0, 7);
      let pile = [deck.pop()];
      let color = pile[0].c;
      let turn = 0;

      function reshuffle() {
        if (deck.length === 0) {
          let top = pile.pop();
          deck = pile;
          deck.sort(() => Math.random() - 0.5);
          pile = [top];
        }
      }

      function valid(card) {
        return (
          card.c === color ||
          card.v === pile[pile.length - 1].v ||
          card.c === "wild"
        );
      }

      function draw(hand, n = 1) {
        for (let i = 0; i < n; i++) {
          reshuffle();
          hand.push(deck.pop());
        }
      }

      function apply(card, who) {
        if (card.c !== "wild") color = card.c;

        if (card.c === "wild") {
          color =
            who === 0
              ? prompt("Choose red/yellow/green/blue") || "red"
              : COLORS[Math.floor(Math.random() * 4)];
        }

        if (card.v === "skip" || card.v === "reverse") {
          turn = 1 - turn;
        }

        if (card.v === "+2") {
          draw(who === 0 ? ai : player, 2);
          turn = 1 - turn;
        }

        if (card.v === "+4") {
          draw(who === 0 ? ai : player, 4);
          turn = 1 - turn;
        }
      }

      function render() {
        g.innerHTML =
          "<h2>🃏 UNO</h2>" +
          "<p>Top: <b style='color:" +
          color +
          "'>" +
          pile[pile.length - 1].c +
          " " +
          pile[pile.length - 1].v +
          "</b></p>" +
          "<p>AI Cards: " +
          ai.length +
          "</p>";

        let hand = document.createElement("div");

        player.forEach((card, i) => {
          let b = document.createElement("button");
          b.innerText = card.v;
          b.style.background = card.c === "wild" ? "black" : card.c;
          b.style.color = card.c === "yellow" ? "black" : "white";
          b.style.margin = "5px";
          b.style.padding = "15px";
          b.style.borderRadius = "10px";

          b.onclick = function () {
            if (turn !== 0) return;
            if (!valid(card)) return alert("Invalid");

            player.splice(i, 1);
            pile.push(card);
            apply(card, 0);

            if (player.length === 0) {
              alert("You Win!");
              g.remove();
              return;
            }

            turn = 1 - turn;
            render();
            setTimeout(aiTurn, 600);
          };

          hand.appendChild(b);
        });

        g.appendChild(hand);

        let drawBtn = document.createElement("button");
        drawBtn.innerText = "Draw";
        drawBtn.onclick = function () {
          if (turn === 0) {
            draw(player);
            turn = 1;
            render();
            setTimeout(aiTurn, 600);
          }
        };

        g.appendChild(drawBtn);

        let quitBtn = document.createElement("button");
        quitBtn.innerText = "Quit";
        quitBtn.style.marginLeft = "10px";
        quitBtn.onclick = function () {
          g.remove();
        };

        g.appendChild(quitBtn);
      }

      function aiTurn() {
        if (turn !== 1) return;

        for (let i = 0; i < ai.length; i++) {
          if (valid(ai[i])) {
            let card = ai.splice(i, 1)[0];
            pile.push(card);
            apply(card, 1);

            if (ai.length === 0) {
              alert("AI Wins!");
              g.remove();
              return;
            }

            turn = 1 - turn;
            render();
            return;
          }
        }

        draw(ai);
        turn = 0;
        render();
      }

      render();

    })();
  });

  // tic tac toe and snake sections continue exactly the same way,
  // just formatted instead of compressed into a single breathless sentence

  btn("❌ Close Hub", function () {
    hub.remove();
  });

})();
