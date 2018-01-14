(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
window['PrivacyPolicy'] = index_1.PrivacyPolicy;

},{"./index":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrivacyPolicy = (function () {
    function PrivacyPolicy(opts) {
        console.log('jj');
        if (!opts)
            opts = {};
        if (!opts.localStorageName)
            opts.localStorageName = '_privacyPolicyAccepted';
        if (!opts.domName)
            opts.domName = 'privacyPolicy';
        if (!opts.backgroundColor)
            opts.backgroundColor = 'white';
        if (!opts.vPosition)
            opts.vPosition = 'bottom';
        if (!opts.textColor)
            opts.textColor = 'black';
        this.opts = opts;
    }
    PrivacyPolicy.prototype.check = function () {
        var opts = this.opts;
        var lstore = window.localStorage;
        if (lstore.getItem(opts.localStorageName))
            return true;
        var domElPolicyLink = document.createElement("a");
        domElPolicyLink.href = opts.pplink;
        domElPolicyLink.target = '_blank';
        domElPolicyLink.appendChild(document.createTextNode("clicca quì"));
        var domElPolicyAccept = document.createElement("a");
        domElPolicyAccept.href = 'javascript:window.acceptpolicy()';
        domElPolicyAccept.onclick = window['acceptpolicy'];
        domElPolicyAccept.appendChild(document.createTextNode("ACCETTA"));
        var domEl = document.createElement("div");
        domEl.id = opts.domName;
        domEl.style.position = 'absolute';
        domEl.style.width = '100%';
        domEl.style.display = 'block';
        domEl.style.zIndex = '100000';
        domEl.style.backgroundColor = opts.backgroundColor;
        domEl.style.color = opts.textColor;
        switch (opts.vPosition) {
            case 'bottom':
                domEl.style.bottom = '0px';
        }
        var text1 = document.createTextNode("Su questo sito utilizziamo cookie tecnici e, previo tuo consenso, cookie di profilazione.");
        var text2 = document.createTextNode("Se vuoi saperne di più ");
        var text3 = document.createTextNode("Cliccando in un punto qualsiasi dello schermo, effettuando un’azione di scroll, presti il consenso all’uso di tutti i cookie. ");
        domEl.appendChild(text1);
        domEl.appendChild(text2);
        domEl.appendChild(domElPolicyLink);
        domEl.appendChild(text3);
        domEl.appendChild(domElPolicyAccept);
        if (opts.domAttachId) {
            document.getElementById(opts.domAttachId).appendChild(domEl);
        }
        else {
            document.body.appendChild(domEl);
        }
        window['acceptpolicy'] = function () {
            lstore.setItem(opts.localStorageName, "ok");
            document.getElementById(opts.domName).remove();
        };
        if (opts.acceptOnScroll) {
            window.onscroll = function () { window['acceptpolicy'](); };
        }
    };
    PrivacyPolicy.prototype.show = function (nodeId, owner) {
        var domEl = document.createElement("div");
        var title = document.createElement("h1");
        title.appendChild(document.createTextNode("Privacy Policy"));
        var subtitle = document.createElement("h2");
        subtitle.appendChild(document.createTextNode(owner.title));
        domEl.appendChild(title);
        domEl.appendChild(subtitle);
        document.getElementById(nodeId).appendChild(domEl);
    };
    return PrivacyPolicy;
}());
exports.PrivacyPolicy = PrivacyPolicy;

},{}]},{},[1]);
