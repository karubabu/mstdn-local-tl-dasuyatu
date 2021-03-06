// ==UserScript==
// @name         betu no local tl nagasu yatu
// @namespace    http://tampermonkey.net/
// @version      0.2.2
// @description  try to take over the world!
// @author       You
// @match        https://mstdn.maud.io/web/*
// @grant        none
// ==/UserScript==

(function() {
    "use strict";
    $(".columns-area > div:not([class])").eq(0).css("flex","");
    var babu = $("div .column").eq(2).clone().appendTo(".columns-area");
    var tmp_i = babu.find(".column-header").find("i").clone(true);
    babu.find(".column-header").html("");babu.find(".column-header").append(tmp_i).append($("<form />").css("display","inline").append($("<input />").attr("type","text").attr("id","server").attr("placeholder", "サーバ名を入力(pawoo.netなど)")));
    $("form").bind("submit", function(){
        var reqUrl = $("form").find("input").val();
        if(!reqUrl) return false;
        if(reqUrl.indexOf("://") < 0)reqUrl = "https://" + reqUrl;
        if(reqUrl[reqUrl.length - 1] != "/")reqUrl += "/";
        reqUrl += "api/v1/timelines/public?local=true";

        requestUrl = reqUrl;
        getTL();
        console.log(reqUrl);
        return false;});

    var $result = $(babu).children(".scrollable");
    var requestUrl = "https://pawoo.net/api/v1/timelines/public?local=true";

    var $user = $("<div />")
        .css("font-size", "15px");

    var $userLink = $("<a />")
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
                    "background-size": "48px 48px"
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
                    "text-overflow": "ellipsis"}));

    $user.append($userLink);

    var $content = $("<div />")
        .addClass("status__content");

    var $footer = $("<div />");
    var $createdAt = $("<a />");
    $footer.append($createdAt);

    var getTL = function(){
        $.getJSON(requestUrl)
            .done(function(data) {
                $result.empty();
                data.forEach(function(toot) {

                    var $user_tmp = $user.clone(true);
                    $($user_tmp).find(".status__display-name").attr("href", toot.account.url);
                    $($user_tmp).find(".avatar").css("background-image", "url(" + toot.account.avatar + ")");
                    $($user_tmp).find(".display-name").text("@" + toot.account.username);

                    var $content_tmp = $content.clone(true);
                    $($content_tmp).html(toot.content);

                    var $footer_tmp = $footer.clone(true);
                    $($footer_tmp).find("a").attr("href", toot.url).text(toot.created_at);

                    var $toot = $("<div />")
                        .addClass("status")
                        .append($user_tmp)
                        .append($content_tmp)
                        .append($footer_tmp);

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
