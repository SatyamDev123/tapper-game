import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'tapper-game-app',
  templateUrl: 'tapper-game.component.html',
  styleUrls: ['tapper-game.component.css']
})

export class TapperGameAppComponent {
  timers: FirebaseListObservable<any[]>;
  player1_scores: FirebaseListObservable<any[]>;
  player2_scores: FirebaseListObservable<any[]>;
  timer_key: string;
  player1_key: string;
  player2_key: string;

  timer = {
    timerProgress: 10,
    match_result: '',
    active: false,
    restart_btn_toggle: false
  };

  player1 = {
    score: 0
  };
  player2 = {
    score: 0
  };


  constructor(af: AngularFire) {
    this.timers = af.list('/timer/');
    this.player1_scores = af.list('/player1/');
    this.player2_scores = af.list('/player2/');

    this.timers._ref.on("child_added", (snapshot)=> {
      this.timer_key = snapshot.key();
    });
    this.timers._ref.on("child_changed", (snapshot)=> {
      let changed_timer_result = snapshot.val();
      this.timer = changed_timer_result;
    });

    this.player1_scores._ref.on("child_added", (snapshot)=> {
      this.player1_key = snapshot.key();
      this.player1 = {
        score: 0
      };
    });
    this.player2_scores._ref.on("child_added", (snapshot)=> {
      this.player2_key = snapshot.key();
      this.player2 = {
        score: 0
      };
    });

    this.player1_scores._ref.on("child_changed", (snapshot)=> {
      let changed_player1_result = snapshot.val();
      this.player1 = changed_player1_result;
    });
    this.player2_scores._ref.on("child_changed", (snapshot)=> {
      let changed_player2_result = snapshot.val();
      this.player2 = changed_player2_result;
    });
  }

  tapLeft() {
    if(this.player1_key) {
      this.player1.score++;
      this.player1_scores.update(this.player1_key, this.player1);
    }
  }
  tapRight() {
    if(this.player2_key){
      this.player2.score++;
      this.player2_scores.update(this.player2_key, this.player2);
    }
  }

  restartGame() {
    this.player1 = {
      score: 0
    };
    this.player2 = {
      score: 0
    };
    this.timer = {
      timerProgress: 10,
      match_result: '',
      active: true,
      restart_btn_toggle: false
    };
    this.startGame();
  }

  startGame() {
    this.timer.active = true;
    this.timers.push(this.timer);
    this.player1_scores.push(this.player1);
    this.player2_scores.push(this.player2);
    const inteval = setInterval(()=>{
          if(this.timer.timerProgress === 0){
            clearInterval(inteval);
            this.timer.restart_btn_toggle=true;
            if(this.player1.score > this.player2.score) {
              this.timer.match_result = 'Player 1 Won the match';
            } else if (this.player1.score < this.player2.score) {
              this.timer.match_result = 'Player 2 Won the match';
            } else if (this.player1.score === this.player2.score) {
              this.timer.match_result = 'Match Draw';
            }
            this.timers.update(this.timer_key, this.timer);
          } else {
            this.timer.timerProgress--;
            this.timers.update(this.timer_key, this.timer);
          }
    },1000);
  }
}
