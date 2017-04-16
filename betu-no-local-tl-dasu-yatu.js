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
    'use strict';
    var babu = $("div .column").eq(2).clone().appendTo(".columns-area");
babu.children("div[role='button']").text("pawoo.net local timeline");

var $result = $(babu).children(".scrollable");
var requestUrl = "https://pawoo.net/api/v1/timelines/public?local=true";

var getTL = function(){
    $.getJSON(requestUrl)
        .done(function(data) {
            $result.html("");
            data.forEach(function(toot) {
                var $user = $("<div style='font-size: 15px;' />");
                var $userLink = $("<a class='status__display-name' style='display: block; max-width: 100%; padding-right: 25px;' />").attr("href", toot.account.url);

                var $icon = $("<div class='status__avatar' style='position: absolute; left: 10px; top: 10px; width: 48px; height: 48px;' />");
                $icon.append($("<div class='avatar' style='width: 48px; height: 48px; background-size: 48px 48px;'/>").css('background-image', 'url(' + toot.account.avatar + ')') );

                $userLink.append($icon);
                $userLink.append($("<span  class='display-name' style='display: block; max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;' />").text("@" + toot.account.username));
                $user.append($userLink);

                var $content = $("<div class='status__content'/>").html(toot.content);

                var $footer = $("<div />");
                var $createdAt = $("<a />")
                    .attr("href", toot.url)
                    .text(toot.created_at);
                $footer.append($createdAt);

                var $toot = $("<div class='status'/>");
                $toot
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

setInterval(getTL,4000);
})();
