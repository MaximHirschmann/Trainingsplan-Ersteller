// true wenn value eine ganze Zahl ist
function isInt(value) {
    var x;
    if (isNaN(value)) {
      return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

function saveData() {
    // lade die Daten
    var sex = document.getElementById("sexInput").value;
    if (sex == "Männlich") {
        sex = "m";
    }
    else {
        sex = "w";
    }
    // wandle ja und nein zu true und false um
    var gym = document.getElementById("gymInput").value == "Ja";
    var hours = document.getElementById("hoursInput").value;
    var days = document.getElementById("daysInput").value;
    // aus "Level 4" wird 4
    var level = parseInt(document.getElementById("levelInput").value.charAt(6));

    // Prüfe ob die Werte korrekt sind und speichere sie für die nächste Html-Seite
    var alle = true;
    // prüfe ob die Anzahl an Stunden eine ganze Zahl ist und zwischen 1 und 14 liegt
    if (!isInt(hours)) {
        if (hours < 1 || hours > 14) {
            alert("Du musst zwischen 1 und 14 Stunden pro Woche trainieren");
        }
        else {
            alert("Keine gültige Anzahl an Stunden");
        }
        alle = false;
    }
    else {
        localStorage["hours"] = hours;
    }
    // prüfe ob die Anzahl an Tage zwischen 1 und 7 liegt
    if (!isInt(days)) {
        if (days < 1 || hours > 7) {
            alert("Du musst 1 bis 7 Tage pro Woche trainieren");
        }
        else {
            alert("Keine gültige Anzahl an Tagen");
        }
        alle = false;
    }
    else {
        localStorage["days"] = days;
    }
    // speichere die Daten die keine Überprüfung brauchen
    localStorage["sex"] = sex;
    localStorage["gym"] = gym;
    localStorage["level"] = level;

    if (alle) {
        window.location.href = "plan.html";
    }
}


function createPlan() {
    // bekomme die Daten
    var sex = localStorage["sex"];
    var gym = localStorage["gym"];
    var hours = localStorage["hours"];
    var days = localStorage["days"];
    var level = localStorage["level"];

    // speichere Übungen als Array mit [Name der Übung, für welches Geschlecht geeignet m/w/mw, 
    // Level der Übung (0 steht für kein Level benötigt), ob es auch ohne Gym geht, Url zu einem Erklärvideo]
    var excercises = [
        // Calisthenics
        // Brust
        ["Liegestütze",                         "mw", 2, true, "https://www.youtube.com/watch?v=IODxDxX7oi4"],
        ["Nach vorne geneigte Liegestütze",     "mw", 3, true, "https://www.youtube.com/watch?v=Z0bRiVhnO8Q"],
        ["Nach hinten geneigte Liegestütze",    "mw", 1, true, "https://www.youtube.com/watch?v=SKPab2YC8BE"],
        ["Diamant-Liegestütze",                 "mw", 3, true, "https://www.youtube.com/watch?v=J0DnG1_S92I"],
        ["Breite Liegestütze",                  "mw", 3, true, "https://www.youtube.com/watch?v=B78GwfC-87Y"],
        ["Dips",                                "mw", 3, false, "https://www.youtube.com/watch?v=wjUmnZH528Y"],
        // Rücken
        ["Klimmzüge",                           "m", 3, true, "https://www.youtube.com/watch?v=eGo4IYlbE5g"],
        ["Chin-Up",                             "m", 3, true, "https://www.youtube.com/watch?v=bd_A0kDAyK4"],
        ["Enge Klimmzüge",                      "m", 3, true, "https://www.youtube.com/watch?v=eGo4IYlbE5g"],
        ["Breite Klimmzüge",                    "m", 3, true, "https://www.youtube.com/watch?v=eGo4IYlbE5g"],
        ["Invertiertes Rudern",                 "mw", 2, true, "https://www.youtube.com/watch?v=XZV9IwluPjw"],
        // Schultern
        ["Pike Push-Up",                        "mw", 3, true, "https://www.youtube.com/watch?v=sposDXWEB0A"],
        ["Handstand halten",                    "mw", 5, true, "https://www.youtube.com/watch?v=YdBSefJNbB8"],
        // Arme
        ["Dip halten",                          "mw", 1, true, "https://www.youtube.com/watch?v=bY3uwrulJAg"],
        // Beine
        ["Squats",                              "mw", 2, true, "https://www.youtube.com/watch?v=jQr-Zo4m0os"],
        ["Pistol Squats",                       "mw", 5, true, "https://www.youtube.com/watch?v=1-Yuq9pD7JY"],
        ["Squat Sprünge",                       "mw", 3, true, "https://www.youtube.com/watch?v=DeTBwEL4m7s"],
        ["Lunges",                              "mw", 3, true, "https://www.youtube.com/watch?v=QOVaHwm-Q6U"],
        ["Box Sprünge",                         "mw", 4, true, "https://www.youtube.com/watch?v=hxldG9FX4j4"],
        ["Wadenheben",                          "mw", 2, true, "https://www.youtube.com/watch?v=gwLzBJYoWlI"],
        ["Wandsitzen",                          "mw", 2, true, "https://www.youtube.com/watch?v=y-wV4Venusw"],
        // Extrem schwierig
        ["Type Writer Klimmzug",                "mw", 5, true, "https://www.youtube.com/watch?v=PSjeeKy6I2g"],
        ["Muscle-Up",                           "mw", 6, true, "https://www.youtube.com/watch?v=p7q0UhxPdLY"],
        ["Front Lever",                         "mw", 5, true, "https://www.youtube.com/watch?v=qu62URcSiPo"],
        ["Klatschende Liegestütze",             "mw", 5, true, "https://www.youtube.com/watch?v=k53ogCacHIQ"],
        ["Klatschende Klimmzüge",               "mw", 5, true, "https://www.youtube.com/watch?v=k53ogCacHIQ"],
        ["Einarmige Liegestütze",               "mw", 5, true, "https://www.youtube.com/watch?v=75LWvxsorKI"],
        ["Planches",                            "mw", 6, true, "https://www.youtube.com/watch?v=sZDVllA1yS0"],
        ["Dragon Flags",                        "mw", 5, true, "https://www.youtube.com/watch?v=moyFIvRrS0s&t=89s"],
        ["Handstand-Liegestütze",               "mw", 5, true, "https://www.youtube.com/watch?v=YdBSefJNbB8"],
        // gym
        // Brust
        ["Langhantel Bankdrücken",              "mw", 0, false, "https://www.youtube.com/watch?v=gRVjAtPip0Y"],
        ["Geneigtes Langhantel Bankdrücken",    "mw", 0, false, "https://www.youtube.com/watch?v=DbFgADa2PL8"],
        ["Kurzhantel Bankdrücken",              "mw", 0, false, "https://www.youtube.com/watch?v=VmB1G1K7v94"],
        ["Gewichtete Dips",                     "mw", 0, false, "https://www.youtube.com/watch?v=wjUmnZH528Y&t=43s"],
        // Rücken
        ["Deadlift",                            "mw", 0, false, "https://www.thefitnesstribe.com/deadlift-workout-routine-increase-100-pounds/"],
        ["Langhantel Rudern",                   "m", 0, false, "https://www.youtube.com/watch?v=9efgcAjQe7E"],
        ["Gewichtete Klimmzüge",                "m", 0, false, "https://www.youtube.com/watch?v=HuuyDNGrCI8"],
        ["Latziehen",                           "m", 0, false, "https://www.youtube.com/watch?v=WMast6wAGFw"],
        ["Enges Latziehen",                     "m", 0, false, "https://www.youtube.com/watch?v=neP32qCyPbQ"],
        ["Rudern",                              "m", 0, false, "https://www.youtube.com/watch?v=GZbfZ033f74"],
        // Bauch
        ["Kabel Crunches",                      "mw", 0, false, "https://www.youtube.com/watch?v=E_FenCXyRXE"],
        ["Gewichtetes Knie heben",              "mw", 0, false, "https://www.youtube.com/watch?v=BI7wrB3Crsc"],
        ["Bauch Rad",                           "mw", 0, false, "https://www.youtube.com/watch?v=5I3LgiumTJM"],
        ["Plank",                               "mw", 0, false, "https://www.youtube.com/watch?v=pSHjTRCQxIw&t=14s"],
        // Schulter
        ["Schulterpresse",                      "mw", 0, false, "https://www.youtube.com/watch?v=F3QY5vMz_6I"],
        ["Kurzhantel Schulterpresse",           "mw", 0, false, "https://www.youtube.com/watch?v=6Z15_WdXmVw&t=1s"],
        // Beine
        ["Squats mit Gewicht",                  "mw", 0, false, "https://www.youtube.com/watch?v=Dy28eq2PjcM"],
        ["Beinpresse",                          "mw", 0, false, "https://www.youtube.com/watch?v=ul-zHYYe90c"],
        ["Rumänischer Deadlift",                "mw", 0, false, "https://www.youtube.com/watch?v=2SHsk9AzdjA"],
        ["Hack Squat",                          "mw", 4, false, "https://www.youtube.com/watch?v=EdtaJRBqwes"],
        ["Kurzhantel Lunge",                    "mw", 0, false, "https://www.youtube.com/watch?v=D7KaRcUTQeE"],
        // Bizeps
        ["Bizeps Curls",                        "mw", 0, false, "https://www.youtube.com/watch?v=BbxA1QF3TxY"], 
        ["Langhantel Bizeps Curls",             "mw", 0, false, "https://www.youtube.com/watch?v=LY1V6UbRHFM"],
        // Trizeps
        ["Enges Bankdrücken",                   "mw", 0, false, "https://www.youtube.com/watch?v=LY1V6UbRHFM"],
        ["Skull Crushers",                      "mw", 0, false, "https://www.youtube.com/watch?v=d_KZxkY_0cM"],
        ["Kabel drücken",                       "mw", 0, false, "https://www.youtube.com/watch?v=2-LAMcpzODU"],
    ];
    console.log(excercises);
    // erstelle ein Array aus den nach dem User verfügbaren Übungen
    var available = [];
    for (var i=0; i<excercises.length; i++) {
        // Bedingungen: gym, richtiges Geschlecht und Level entspricht dem Level des Nutzer +- 1 oder 0
        if (gym) {
            if ((excercises[i][1] == "mw" || excercises[i][1] == sex) && (excercises[i][2] == 0 || Math.abs(excercises[i][2]-level) < 2)) {
                available.push(excercises[i]);
            }
        }
        else {
            if (excercises[i][3] && (excercises[i][1] == "mw" || excercises[i][1] == sex) && (excercises[2] == 0 || Math.abs(excercises[2]-level) < 2)) {
                available.push(excercises[i]);
            }
        }
    }
    console.log(available);
    var duration_limit = hours * 60 * 60;
    var number_of_excercises_per_day = 6;
    // Minus die Dauer der Aufwärmung
    var duration_per_day = Math.round(duration_limit/days) - 220;
    var plan = [];
    var repetions = 0;
    for (var i=0; i<days; i++) {
        // vier zufällig gewählte Übungen für den Tag
        var tages_plan = [];
        while(tages_plan.length < number_of_excercises_per_day){
            var r = Math.floor(Math.random() * available.length);
            if(tages_plan.indexOf(r) === -1) {
                tages_plan.push(available[r]);
            }
        }
        var duration = number_of_excercises_per_day*60 + (number_of_excercises_per_day-1)*60 + 180;
        var repetions = parseInt(duration_per_day/duration);

        // füge den Tag dem ganzen Trainingsplan hinzu
        plan.push(tages_plan);    
    }
    console.log(plan);
    var frame_day = '<h2 class="card-title mb0" style="font-weight: 600;">';
    var end_h2 = "</h2>"
    var frame_cards = '<div class="card border-0 mb-3 shadow">';
    var end_div = '</div>';
    var html_aufwarmung = '<div class="card-body border-bottom"><h3 class="card-title mb0" >Aufwärmung<span style="float:right; color:black;">2x wiederholen</span></h3></div><div class="list-group lilst-group-flush"><a class="list-group-item b-0 py-2 text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=UpH7rm0cYbM">Hampelmänner<span style="float:right; color:black;">30s</span></a><a class="list-group-item b-0 py-2 text-decoration-none">Pause<span style="float:right; color:black;">10s</span></a><a class="list-group-item b-0 py-2 text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=nmwgirgXLYM">Mountain Climbers<span style="float:right; color:black">30s</span></a><a class="list-group-item b-0 py-2 text-decoration-none">Pause<span style="float:right;">10s</span></a><a class="list-group-item b-0 py-2 text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=L4oFJRDAU4Q">Up and Down Plank<span style="float:right; color:black;">30s</span></a></div>';
    var frame_training = '<div class="card-body border-bottom"><h3 class="card-title mb0" >Training<span style="float:right;">';
    var frame_training_end = 'x wiederholen</span></h3></div>';
    var frame_excercise_cards = '<div class="list-group lilst-group-flush">';
    var frame_excercise = '<a class="list-group-item b-0 py-2 text-decoration-none"';
    var frame_excercise_end = '</a>';
    var span_60s = '<span style="float:right; color:black;">60s</span>';
    var pause_60s = '<a class="list-group-item b-0 py-2 text-decoration-none">Pause<span style="float:right;">60s</span></a>';
    var pause_180s = '<a class="list-group-item b-0 py-2 text-decoration-none">Pause<span style="float:right;">180s</span></a>';
    
    for (var i=0; i<days; i++) {
        var html = frame_day + "Tag "+(i+1) + end_h2;
        html += frame_cards;
        html += html_aufwarmung;
        html += end_div;
        html += frame_cards;
        html += frame_training + repetions;
        html += frame_training_end;
        html += frame_excercise_cards;
        for (var j=0; j<plan[i].length; j++) {
            html += frame_excercise;
            html += 'target="_blank" rel="noopener noreferrer" href="' + plan[i][j][4] + '">'
            html += plan[i][j][0];
            html += span_60s;
            html += frame_excercise_end;
            html += frame_excercise;
            html += 'Pause';
            if (j == plan[i].length-1) {
                html += pause_180s;
            }
            else {
                html += pause_60s;
            }
            html += frame_excercise_end;
        }
        html += end_div;
        html += end_div;
        var id = "day"+(i+1);
        document.getElementById(id).innerHTML = html;
    }
}