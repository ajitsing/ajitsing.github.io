---
layout: post
categories: web-development
seo: true
title: Conway's Game Of Life
description: Learn about Conway's Game of Life, its rules, and how to implement it in JavaScript with code and demo.
share-img: /assets/img/posts/game_of_life/cover.png
permalink: /conways-game-of-life/
gh-repo: ajitsing/game_of_life
gh-badge: [star, fork, follow]
tags: [javascript, game]
keywords: "conway's game of life, game of life javascript, cellular automata, zero player games, game of life rules, game of life implementation, javascript game tutorial, conway simulation, coding games, game of life code"
comments: false
video:
  id: "bwDfhsItfq4"
  title: "Conway's Game of Life Demo"
  description: "Interactive demo of Conway's Game of Life implemented in JavaScript - watch cells evolve through generations based on simple rules."
faq:
  - question: "What is Conway's Game of Life?"
    answer: "Conway's Game of Life is a zero-player cellular automaton. It runs on a grid where cells live or die based on their neighbors. You set the initial configuration, then watch cells evolve automatically according to four simple rules."
  - question: "What are the 4 rules of Conway's Game of Life?"
    answer: "1) Under-population: live cell with <2 neighbors dies. 2) Survival: live cell with 2-3 neighbors lives. 3) Over-population: live cell with >3 neighbors dies. 4) Reproduction: dead cell with exactly 3 neighbors becomes alive."
  - question: "How do you implement Game of Life in JavaScript?"
    answer: "Create a 2D grid array to track cell states. For each generation, count neighbors for every cell. Apply the 4 rules to determine next state. Use canvas or DOM elements to render. Use setInterval or requestAnimationFrame for animation."
  - question: "Why is Conway's Game of Life important in computer science?"
    answer: "It demonstrates emergent complexity from simple rules - relevant to AI and complexity theory. It's Turing complete, meaning it can simulate any computation. It's used to teach programming, algorithms, and cellular automata concepts."
---

Conway's game of life is a zero players game. It is played on a rectangular grid where each box is know as cell. A Cell can be alive or dead depending on its neighbours or initial configuration of the grid. It only needs an initial configuration and then the cells on the grid evolves on their own.

# Demo<br><br>

{% include youtubePlayer.html id="bwDfhsItfq4" %}

# Rules Of Conway's Game Of Life

Conway's game of life has only 4 rule:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by over-population.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

# Implementation

I have implemented this game in JavaScript, Html and Css. The code is available on [github](https://github.com/ajitsing/game_of_life){:target="_blank"}. To implement this game you will need below things.

1. Create a grid which will represent your cells.
2. A Cell can be dead or alive. So have two css classes, one for alive and one for dead.
3. Figure out neighbours of a cell.
4. Apply above rules and figure out if the cell will be alive or dead for the next generation.
5. Store the cells which needs to be moved to next generation.
6. Store the cells which will not survive or will die in next generation.
7. Iterate over the list of cells moving to next generation, and mark them as alive by adding alive css class to them.
8. Iterate over the list of cells which will die in next generation and mark them as dead by adding dead css class to them.
9. Run the steps from 3-8 all over again after a small time interval.

# Source Code<br><br>

```javascript
$(document).ready(function(){
  var Grid = function(size) {
    this.size = size;

    this.draw = function() {
      for (var i=0; i < size; i++) {
        $('.grid').append("<div class='col" + i + "'></div>")
        for (var j=0; j < size; j++) {
          $(".col" + i).append("<span class='cell dead'></span>")
        }
      }
    }
  }

  var Cell = function(row, col) {
    this.row = row;
    this.col = col;

    var cell = function() {
      return $($('.col' + col).children()[row]);
    }

    this.isAlive = function() {
      return cell().hasClass('alive');
    }

    this.isDead = function() {
      return cell().hasClass('dead');
    }

    this.isOnGrid = function() {
      return $('.col' + col).children()[row] !== undefined;
    }

    this.bringToLife = function() {
      cell().removeClass('dead');
      cell().addClass('alive');
    }

    this.kill = function() {
      cell().removeClass('alive');
      cell().addClass('dead');
    }

    this.neibhours = function() {
      var rows = [row-1, row, row+1];
      var cols = [col-1, col, col+1];
      neibhourCells = [];

      for(var i=0; i < rows.length; i++) {
        for(var j=0; j < cols.length; j++) {
          if(!(col === cols[j] && row === rows[i])) {
            var cell = new Cell(rows[i], cols[j])
            if(cell.isOnGrid()) {
              neibhourCells.push(cell);
            }
          }
        }
      }

      return neibhourCells;
    }
  }

  var Cells = function(cells) {
    this.cells = cells;

    this.aliveCells = function() {
      return this.cells.filter(function(cell) {
        return cell.isAlive();
      });
    }

    this.killAll = function() {
      $.each(cells, function(index, cell){
        cell.kill();
      });
    }

    this.bringAllToLife = function() {
      $.each(cells, function(index, cell){
        cell.bringToLife();
      });
    }
  }

  var cellsMovingToNextGen = []
  var cellsToKill = []

  var play =function(){
    for(var j=0; j < grid.size; j++){
      for(var i=0; i < grid.size; i++) {
        var cell = new Cell(j, i);
        var aliveCells = new Cells(cell.neibhours()).aliveCells().length;

        if(cell.isAlive() && (aliveCells < 2 || aliveCells > 3)) {
          cellsToKill.push(cell)
        } else if(cell.isDead() && aliveCells === 3) {
          cellsMovingToNextGen.push(cell)
        }
      }
    }

    new Cells(cellsToKill).killAll();
    new Cells(cellsMovingToNextGen).bringAllToLife();
    cellsMovingToNextGen = []
    cellsToKill = []
  }

  var grid = new Grid(40);
  grid.draw();

  $('.cell.dead').click(function(e) {
    $(this).addClass('alive');
    $(this).removeClass('dead');
  });

  $('.start-game').click(function(e) {
    setInterval(play, 200);
  });
})();
```

Thats all folks, enjoy the game :)