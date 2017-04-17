// ==UserScript==
// @name         betu no local tl nagasu yatu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mstdn.maud.io/*
// @grant        none
// ==/UserScript==

(function() {
    "use strict";
    var babu = $("div .column").eq(2).clone().appendTo(".columns-area");
    babu.children("div[role='button']").text("pawoo.net local timeline");

    var $result = $(babu).children(".scrollable");
    var requestUrl = "https://pawoo.net/api/v1/timelines/public?local=true";

    var getTL = function(){
        $.getJSON(requestUrl)
            .done(function(data) {
                $result.html("");
                data.forEach(function(toot) {
                    var $user = $("<div />")
                        .css("font-size", "15px");

                    var $userLink = $("<a />")
                        .attr("href", toot.account.url)
                        .addClass("status__display-name")
                        .css({
                            "display": "block",
                            "max-width": "100%",
                            "padding-right": "25px" });

                    var $icon = $("<div />")
                        .addClass("status__avatar")
                        .css({
                            position: "absolute",
                            left: "10px",
                            top: "10px",
                            width: "48px",
                            height: "48px" })
                        .append($("<div />")
                                .addClass("avatar")
                                .css({
                                    width: "48px",
                                    height: "48px",
                                    "background-size": "48px 48px",
                                    "background-image": "url(" + toot.account.avatar + ")"
                                }));

                    $userLink
                        .append($icon)
                        .append($("<span  />")
                                .addClass("display-name")
                                .css({
                                    "display": "block",
                                    "max-width": "100%",
                                    "overflow": "hidden",
                                    "white-space": "nowrap",
                                    "text-overflow": "ellipsis"})
                                .text("@" + toot.account.username));

                    $user.append($userLink);

                    var $content = $("<div />")
                        .addClass("status__content")
                        .html(toot.content);

                    var $footer = $("<div />");
                    var $createdAt = $("<a />")
                        .attr("href", toot.url)
                        .text(toot.created_at);
                    $footer.append($createdAt);

                    var $toot = $("<div />")
                        .addClass("status")
                        .append($user)
                        .append($content)
                        .append($footer);

                    $result.append($toot);
                });
            })
        .fail(function() {
            $result.html("取得できませんでした");
        });
    };

    getTL();
    setInterval(getTL,4000);
})();
