"use strict";

window.addEventListener("load", function () {
    const posts = document.querySelector("#posts");

    /**
     * 
     * @param {String} user 
     * @param {String} time 
     * @param {String} text 
     * @returns {HTMLDivElement} 
     */
    const genPost = function (user, time, text) {
        const post = document.createElement("div");
        post.className = "post";

        const left = document.createElement("div");
        left.className = "post-left";
        post.appendChild(left);

        const right = document.createElement("div");
        right.className = "post-right";
        post.appendChild(right);

        const pfp = document.createElement("div");
        pfp.className = "pfp";
        left.appendChild(pfp);

        const userDiv = document.createElement("div");
        userDiv.className = "user";
        right.appendChild(userDiv);

        const timeDiv = document.createElement("div");
        timeDiv.className = "time";
        right.appendChild(timeDiv);

        const textDiv = document.createElement("div");
        textDiv.className = "text";
        right.appendChild(textDiv);

        pfp.innerHTML = user[0].toUpperCase();
        userDiv.innerHTML = "@" + user;
        timeDiv.innerHTML = time;
        textDiv.innerHTML = text;

        return post;
    };

    const loadData = function () {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", "data.csv", true);

        xhr.addEventListener("load", function () {
            if (xhr.status === 200) {
                let csv = new CSV();
                csv.parse(xhr.responseText);

                let json = csv.toJSON();

                for (let i = 0; i < 1000; i++) {
                    posts.appendChild(genPost(
                        json["account"][i],
                        json["time"][i],
                        json["message"][i]
                    ));
                }
            }
        });

        xhr.send();
    };

    loadData();
}, false);