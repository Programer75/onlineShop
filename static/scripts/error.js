let h2 = document.getElementById("h2");
h2l = h2.innerText
setInterval(() => {
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ!@#$%^&*()_+=-?:;№/\|";
        for (var i = 0; i < h2l.length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    h2.innerHTML = makeid();
}, 10);