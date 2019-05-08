
(function() {
    "use strict";

    window.app = {};
    
    app.main = function() {
        var skills = ["Java", "Python", "HTML5 / CSS", "JavaScript / Node.js", "Linux / Docker", "DotNET"];
        var switcher = new app.Switcher(_.shuffle(skills));
        switcher.appendTo(document.querySelector("#skills-switcher"));
    };

    app.Switcher = class Switcher extends widgetjs.Widget {
        get tagName() { return "span"; }
        get className() { return "switcher"; }
        constructor(texts) {
            super();
            this.texts = texts;
            this.current = -1;
            this.state = "disappearing";
            this.on("appendedToDom", this.appended);
            this.el.innerHTML = "<span></span>";
            this.el.querySelector("span").style.opacity = 0;
            this.el.querySelector("span").style.transition = "opacity 0.7s ease-out";
        }
        appended() {
            this.next();
            setInterval(this.next.bind(this), 700);
        }
        next() {
            if (this.state === "disappearing") {
                this.current = (this.current + 1) % this.texts.length;
                this.state = "appearing";
                this.el.querySelector("span").innerText = this.texts[this.current];
                setTimeout(function() {
                    this.el.querySelector("span").style.opacity = 1;
                }.bind(this), 0);
            } else { // appearing
                this.state = "disappearing";
                this.el.querySelector("span").style.opacity = 0;
            }
        }
    };

})();
