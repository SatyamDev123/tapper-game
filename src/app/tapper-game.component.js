"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var TapperGameAppComponent = (function () {
    function TapperGameAppComponent(af) {
        var _this = this;
        this.toggleRestartBtn = false;
        this.result = {
            timerProgress: 10,
            score: {
                player1: 0,
                player2: 0
            },
            match_result: '',
            active: false,
            restart_btn_toggle: false
        };
        this.results = af.list('/results/');
        this.results._ref.on("child_added", function (snapshot) {
            _this.key = snapshot.key();
        });
        this.results._ref.on("child_added", function (snapshot) {
            _this.key = snapshot.key();
        });
        this.results._ref.on("child_changed", function (snapshot) {
            var changed_result = snapshot.val();
            _this.result = changed_result;
        });
    }
    TapperGameAppComponent.prototype.tapLeft = function () {
        if (this.key) {
            this.result.score.player1++;
            this.results.update(this.key, this.result);
        }
        else {
        }
    };
    TapperGameAppComponent.prototype.tapRight = function () {
        if (this.key) {
            this.result.score.player2++;
            this.results.update(this.key, this.result);
        }
        else {
        }
    };
    TapperGameAppComponent.prototype.restartGame = function () {
        this.result = {
            timerProgress: 10,
            score: {
                player1: 0,
                player2: 0
            },
            match_result: '',
            active: false,
            restart_btn_toggle: false
        };
        this.startGame();
    };
    TapperGameAppComponent.prototype.startGame = function () {
        var _this = this;
        this.results.push(this.result).then(function (snapshot) {
            _this.result.active = true;
            var inteval = setInterval(function () {
                if (_this.result.timerProgress === 0) {
                    clearInterval(inteval);
                    _this.result.restart_btn_toggle = true;
                    if (_this.result.score.player1 > _this.result.score.player2) {
                        _this.result.match_result = 'Player 1 Win';
                    }
                    else if (_this.result.score.player1 < _this.result.score.player2) {
                        _this.result.match_result = 'Player 2 Win';
                    }
                    else if (_this.result.score.player1 === _this.result.score.player2) {
                        _this.result.match_result = 'Draw';
                    }
                    _this.results.update(_this.key, _this.result);
                }
                else {
                    _this.result.timerProgress--;
                    _this.results.update(_this.key, _this.result);
                }
            }, 1000);
        });
    };
    TapperGameAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tapper-game-app',
            templateUrl: 'tapper-game.component.html',
            styleUrls: ['tapper-game.component.css']
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], TapperGameAppComponent);
    return TapperGameAppComponent;
}());
exports.TapperGameAppComponent = TapperGameAppComponent;
