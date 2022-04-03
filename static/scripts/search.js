let a = document.getElementById('search-text');
let listProducts = document.getElementById('productList');
list = listProducts.getElementsByClassName("productItem"); // объект с ключами 0 1 2 3 4
/*
LIST = {
    0:
    1:
    2:
    3:
    4:

}
*/
let keys = Object.keys(list);
function isEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
};

$('#btnfind').click(() => {
    $.ajax({
        url: '/search',
        type: 'GET',
        data: {
            'find': a.value,
        },
        dataType: 'json',
        success: function (response) {
            $("#finddiv").css("display", "none");
            if (isEmptyObject(response.findItems)) {
                $("#notfound").css("display", "block");
                $("#findText").text("");
                $("#findText").css("display", "none");
                $("#list").css("display", "none");
                for(a of list){
                    let divId = '#'+a.id;
                    $(divId).css("display", "none");
                };
            } else {
                $("list").css("display", "block");
                $("#notfound").css("display", "none");
                $('#findText').css("display", "block");
                $('#findText').text("По вашему запросу найдено:");
                let itemss = Object.keys(response.findItems);
                let findItemStore = [] // все товары
                for (item of itemss) {
                    for(a of list){
                        let divId = '#'+a.id;
                        $(divId).css("display", "none");
                        if (a.id == response.findItems[item].id) {
                            findItemStore.push(divId);
                            console.log(divId + " найден");
                        }
                    }
                };
                console.log(findItemStore);
                for(i of findItemStore){
                    $(i).css('display','block');
                };
            };
        }
    });
});