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
  results: FirebaseListObservable<any[]>;
  key: string;

  toggleRestartBtn = false;
  result = {
    timerProgress: 10,
    score: {
      player1:0,
      player2:0
    },
    match_result: '',
    active: false,
    restart_btn_toggle: false
  };


  constructor(af: AngularFire) {
    this.results = af.list('/results/');
    this.results._ref.on("child_added", (snapshot)=> {
      this.key = snapshot.key();
    });
    this.results._ref.on("child_added", (snapshot)=> {
      this.key = snapshot.key();
    });
    this.results._ref.on("child_changed", (snapshot)=> {
      let changed_result = snapshot.val();
      this.result = changed_result;
    });
  }

  tapLeft() {
    if(this.key) {
      this.result.score.player1++;
      this.results.update(this.key, this.result);
    } else {
      //TODO: click on start btn
    }
  }
  tapRight() {
    if(this.key){
      this.result.score.player2++;
      this.results.update(this.key, this.result);
    } else {
      //TODO: click on start btn
    }
  }

  restartGame() {
    this.result = {
      timerProgress: 10,
      score: {
        player1:0,
        player2:0
      },
      match_result: '',
      active: false,
      restart_btn_toggle: false
    };
    this.startGame();
  }

  startGame() {
    this.results.push(this.result).then((snapshot)=>{
      this.result.active = true;
      const inteval = setInterval(()=>{
            if(this.result.timerProgress === 0){
              clearInterval(inteval);
              this.result.restart_btn_toggle=true;
              if(this.result.score.player1 > this.result.score.player2) {
                this.result.match_result = 'Player 1 Won the match';
              } else if (this.result.score.player1 < this.result.score.player2) {
                this.result.match_result = 'Player 2 Won the match';
              }else if (this.result.score.player1 === this.result.score.player2) {
                this.result.match_result = 'Draw';
              }
              this.results.update(this.key, this.result);
            } else {
              this.result.timerProgress--;
              this.results.update(this.key, this.result);
            }
      },1000);
    });
  }
}
