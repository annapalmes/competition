var myMusic = object.music;
console.log(myMusic);

var myTeams = object.teams;
console.log(myTeams);

getdate();
listener();
hideShow("home");

// date //

function getdate() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    m = checkTime(m);

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var result = `${weekday[date.getDay()]} ${date.getDate()} ${month[date.getMonth()]} ${h}:${m}h.`;

    document.getElementById("date").append(result);

}

// hide and show //

function hideShow(page) {

    var pages = document.getElementsByClassName("container");

    for (var n = 0; n < pages.length; n++) {
        pages[n].style.display = "none";

    }

    switch (page) {
        case "music":
            music();
            break;
        case "chat":
            getPosts();
            break;
        case "ranking":
            teams();
            break;
        case "teams":
            showmembers(event.target.textContent);
            break;
    }

    document.getElementById(page).style.display = "";
}

function listener() {
    var links = document.querySelectorAll("[data-page]"); //seleccionar todos los data-page y guardarlos en array                                                           links
    for (var i = 0; i < links.length; i++) { //loop en array links, y poner eventListener click
        links[i].addEventListener("click", function () {
            var page = this.getAttribute("data-page"); //coger valor del attr data-page
            hideShow(page); //enseñar div con id igual al valor del data-page    
        })
    }
}
 
// chat //

document.getElementById("login").addEventListener("click", login);

function login() {

    // https://firebase.google.com/docs/auth/web/google-signin

    // Provider

    var provider = new firebase.auth.GoogleAuthProvider();
        
    // How to Log In

    firebase.auth().signInWithPopup(provider).then(function(){ 
        myProfile();
    }).then;

    console.log("login");

}

function writeNewPost() {

    // https://firebase.google.com/docs/database/web/read-and-write

    var textToSend = document.getElementById("textInput").value;

    // Values

    var message = {
        message: textToSend,
        name: firebase.auth().currentUser.displayName
    }


    firebase.database().ref('chat').push(message)

    console.log(message);

    // A post entry.

    // Get a key for a new Post.

    // Write data

    console.log("write");
}

function getPosts() {
    var posts = document.getElementById("posts");
    firebase.database().ref('chat').on('value', function (data) {
        
        posts.innerHTML = "";

        var messages = data.val();

        for (var key in messages) {
            var text = document.createElement("div");
            var element = messages[key];
             
            text.setAttribute("class", "message");
            
            text.append(element.name + (":") + (" "));
            text.append(element.message);
            posts.append(text);
        }
        posts.scrollTop = posts.scrollHeight;

    })

    console.log("getting posts");

}

// music //

document.getElementById("music").addEventListener("click", music);

function music() {
 
    var songs = document.getElementById("songs");
    
   songs.innerHTML = "";
    
    for (var n = 0; n < object.music.length; n++) {

        var names = document.createElement("p");
        var song = document.createElement("span");
        var singer = document.createElement("span");

        song.setAttribute("class", "song");
        singer.setAttribute("class", "singer");

        var audio = document.createElement("audio")
        audio.setAttribute("controls", null)
        var source = document.createElement("source")
        source.setAttribute("src", object.music[n].url)
        source.setAttribute("type", "audio/mpeg")
        audio.append(source)

        song.append(object.music[n].song_name);
        singer.append(object.music[n].singer_name);
        names.append(song, singer);
        source.append(object.music[n].url);

        songs.append(names, audio);

    }

}

// members //

function showmembers(teamname) {
    console.log(teamname);
    
    var teaminfo= myTeams.find(cadateam => cadateam.name == teamname); 

    var tbody = document.getElementById("infomember");
    tbody.innerHTML = "";
    for (var n = 0; n < teaminfo.members.length; n++) {

        var row = document.createElement("tr");

        var cellname = document.createElement("td");
        var cellage = document.createElement("td");
        var cellnacionality = document.createElement("td");

        var names = teaminfo.members[n].name;
        var ages =teaminfo.members[n].age;
        var nacionalities = teaminfo.members[n].nacionality;

        cellname.append(names);
        cellage.append(ages);
        cellnacionality.append(nacionalities);
    
        row.append(cellname);
        row.append(cellage);
        row.append(cellnacionality);

        tbody.append(row);

    }
    
}

// teams // 

function teams() {

    var team = document.getElementById("listteams");
    team.innerHTML = "";

    for (var n = 0; n < myTeams.length; n++) {

        var name = document.createElement("li");

        name.setAttribute("data-page", "teams");
        name.setAttribute("data-team", myTeams[n].name);

        name.append(myTeams[n].name);
        team.append(name);
    }
    listener();
}

// profile //

function myProfile(){

var profile = document.getElementById("profile");


        var photo = document.createElement("img");
        var name = document.createElement("p");
        var mail = document.createElement("p");
        
        photo.setAttribute("src", firebase.auth().currentUser.photoURL);
        photo.setAttribute("class", "profile2");
        name.setAttribute("class", "nameandmail");
        mail.setAttribute("class", "nameandmail");
        
        name.append(firebase.auth().currentUser.displayName);
        mail.append(firebase.auth().currentUser.email);
        
    
        profile.append(photo, name, mail);

}
