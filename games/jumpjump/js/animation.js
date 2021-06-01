if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            var self = this, start, finish;
            return window.setTimeout(function () {
                start = +new Date();
                callback(start);
                finish = +new Date();
                self.timeout = 1000 / 60 - (finish - start);
            }, self.timeout);
        });
}



function animation(context) {
    for (let i = 0; i < panelgroup.length; i++) {
        var PanelX = panelgroup[i].x;
        var PanelY = panelgroup[i].y;
        var status = panelgroup[i].status;
        var pcolor = panelgroup[i].pcolor;
        var plength = panelgroup[i].plength;
        context.beginPath();
        context.moveTo(PanelX - plength/2, PanelY);
        context.lineTo(PanelX + plength/2, PanelY);
        if (status) {
            context.strokeStyle = pcolor;
        } else {
            context.strokeStyle = "#c4c4c4";
        }

        context.stroke();
    }
}

function jump() {
    Player.y = Player.y - Player.Yacceleration;
    Player.Yacceleration -= 0.5;
    if (Player.Yacceleration < 0) {
        Player.condition = 0;
    }
    if (Player.Yacceleration < -10) {
        Player.Yacceleration = -10;
    }
}

function move(context) {
    if (mouseX == null) {
        context.drawImage(Rdoodle, Player.x, Player.y);
    }


    if (mouseX < Player.x - 3 && mouseX >= Player.x - 9) {
        Player.direction = 0;
        Player.x = Player.x - 6;
    }
    if (mouseX < Player.x - 9 && mouseX >= Player.x - 15) {
        Player.direction = 0;
        Player.x = Player.x - 12;
    }
    if (mouseX < Player.x - 15 && mouseX >= Player.x - 21) {
        Player.direction = 0;
        Player.x = Player.x - 18;
    }
    if (mouseX < Player.x - 21 && mouseX >= Player.x - 27) {
        Player.direction = 0;
        Player.x = Player.x - 24;
    }
    if (mouseX < Player.x - 27) {
        Player.direction = 0;
        Player.x = Player.x - 27;
    }


    if (mouseX > Player.x + 3 && mouseX <= Player.x + 9) {
        Player.direction = 1;
        Player.x = Player.x + 6;
    }
    if (mouseX > Player.x + 9 && mouseX <= Player.x + 15) {
        Player.direction = 1;
        Player.x = Player.x + 12;
    }
    if (mouseX > Player.x + 15 && mouseX <= Player.x + 21) {
        Player.direction = 1;
        Player.x = Player.x + 18;
    }
    if (mouseX > Player.x + 21 && mouseX <= Player.x + 27) {
        Player.direction = 1;
        Player.x = Player.x + 24;
    }
    if (mouseX > Player.x + 27) {
        Player.direction = 1;
        Player.x = Player.x + 27;
    }
    if (Player.direction == 1) {
        context.drawImage(Rdoodle, Player.x, Player.y);
    }
    if (Player.direction == 0) {
        context.drawImage(Ldoodle, Player.x, Player.y);
    }
}

function gamescroll() {
    if (Player.y <= Height / 2) {
        var distance = Height / 2 - Player.y;
        for (let i = 0; i < panelgroup.length; i++) {

            var panel = panelgroup[i];
            if (panel.status == 2){
                panel.x += Width/150;
                if(panel.x >= Width - 40) {
                    panelgroup[i].status = 3;
                }
            }
            else if (panel.status == 3){
                panel.x -= Width/150;
                if(panel.x <= 40) {
                    panelgroup[i].status = 2;
                }
            }
            panel.y += distance / 2;
        }
        Player.y += distance / 2;
        GameData.score += distance / 20;
    }

    if (GameData.score >= 300) {
        GameData.level = 50;
        GameData.probability = 30;
    }
    if (GameData.score >= 600) {
        GameData.level = 70;
        GameData.probability = 40;

    }
    if (GameData.score >= 900) {
        GameData.level = 90;
        GameData.probability = 60;
    }
    if (GameData.score >= 1200) {
        GameData.level = 120;
        GameData.probability = 80;
    }

    if (panelgroup[0].y > Height) {
        panelgroup.shift();
    }
}
