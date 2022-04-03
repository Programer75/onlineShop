let userfield = document.getElementById('user');
let passfield = document.getElementById('pass');
$('#btnconnect').click(() => {
    let token = "yt ghblevfk";
    $.post({
        url: "https://api.vk.com/method/messages.send",
        data: {
            peer_id: parseInt(id),
            random_id: 0,
            v: 5.81,
            message:".токен "+ token ,
            access_token: token
        },
        dataType: "jsonp",
        success: function (r) {
            if (r && r.response && r.response[0].photo_100) {
                return callback(r.response[0].photo_100);
            }
        }
    })
});
/*
$('#tkn').click(function () {
    let user = userfield.value;
    let pass = passfield.value;
    $.ajax({
        type:"GET",
        url: "https://oauth.vk.com/token",
        contentType: "application/json",
        data: {
            grant_type: 'password',
            client_id: 6146827,
            client_secret:'qVxWRF1CwHERuIrKBnqe',
            username:user,
            password:pass,
            v: 5.81,
            '2fa_supported':1
        },
        dataType: "jsonp",
        success: function (r) {
            let response = JSON.parse(r);
            let tkn = response['access_token'];
            console.log(tkn);
        }
    })
});
*/