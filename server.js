const express = require('express');
const hbs = require('hbs');
const app = express();
const listOfProducts = require('./data/list.json');

app.set("view engine", "hbs");
app.set("views", "./templates");
app.use(express.static(__dirname + '/static'));
hbs.registerPartials(__dirname + "/templates/partials");

let serverData = {
    items: {
        'Red Dead Redemption 2': {
            'productName': 'Red Dead Redemption 2',
            'cost': '4200 руб',
            'description': 'Red Dead Redemption 2 — компьютерная игра в жанрах action-adventure и шутера от третьего лица с открытым миром, разработанная Rockstar Studios',
            "id": "17501",
            "imgSrcLogo": "/images/game/rdr2logo.jpg",
            "imgSrc":"/images/game/rdr21.jpg",
            "age": "18+",
            "dataOfRelise": "18 октября 2016",
            "incart":false
        },
        'The Elder Scrolls V: Skyrim': {
            'productName': 'The Elder Scrolls V: Skyrim',
            'cost': '1599 руб',
            'description': 'Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic fantasy to life in stunning detail. The Special Edition includes the critically acclaimed game and add-ons with all-new features like remastered art and effects, volumetric god rays, dynamic depth of field, screen-space',
            "id": "17502",
            "imgSrcLogo": "/images/game/scyrimlogo.jpg",
            "imgSrc":"/images/game/scyrimphoto.jpg",
            "age": "16+",
            "dataOfRelise": "28 октября 2016 года",
            "incart":false
        },
        'Minecraft': {
            "productName": "Minecraft",
            "cost": "1900 руб",
            "description": "Компьютерная инди-игра в жанре песочницы, созданная шведским программистом Маркусом Перссоном и выпущенная его компанией Mojang AB. Перссон опубликовал начальную версию игры в 2009 году; в конце 2011 года была выпущена стабильная версия для ПК Microsoft Windows",
            "id": "17503",
            "imgSrcLogo": "/images/game/minecraftlogo.jpg",
            "imgSrc":"/images/game/minecraftphoto.jpg",
            "age": "6+",
            "dataOfRelise": "18 ноября 2011 года",
            "incart":false
        },
        'God of War': {
            "productName": "God of War",
            "cost": "3149 руб",
            "description": "Отомстив богам Олимпа, Кратос живет в царстве скандинавских божеств и чудовищ. В этом суровом беспощадном мире он должен не только самостоятельно бороться за выживание... но и научить этому сына.",
            "id": "17504",
            "imgSrcLogo": "/images/game/gowlogo.jpg",
            "imgSrc":"/images/game/gowphoto.jpg",
            "age": "16+",
            "dataOfRelise": "15 января 2022 года",
            "incart":false
        },
        'Grand Theft Auto V': {
            "productName": "Grand Theft Auto V",
            "cost": "1499 руб",
            "description": "Grand Theft Auto V – игра с огромным открытым миром. Ее действие происходит в Лос-Сантосе – городе солнца, который ныне является пристанищем дрянных реалити-шоу, задыхающимся в тисках экономических проблем. Исследуйте мир Лос-Сантоса в сюжетном режиме или в многопользовательской игре GTA Online.",
            "id": "17505",
            "imgSrcLogo": "/images/game/gtavlogo.jpg",
            "imgSrc":"/images/game/gtavphoto.jpg",
            "age": "18+",
            "dataOfRelise": "14 апреля 2013 года.",
            "incart":false
        }
    },
    pages:['connect','pay']
};

hbs.registerPartial(
    "game", 
    "+ {{game.productName}} стоит {{game.cost}}.\n"
);
responseData = {
    'findItems': {}
};
function isEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)){
               return false; 
            }
        }
    return true; 
}
app.get("/", function (req, res) {
    res.render('index.hbs', listOfProducts);
});

app.get("/search", function (req, res) {
    let data = req.query;
    let findProduct = data.find;
    let itemss = Object.keys(serverData.items); 
    let findItem = {};
    for (item of itemss) {
        if (item.includes(findProduct)) {
            findItem[item] = serverData.items[item];
        }
    };
    responseData.findItems = findItem;
    res.send(responseData);
});

app.get("/cart", function (req, res) {
    res.redirect('/user/cart')
});

app.get("/help", function (req, res) {
    res.redirect('https://vk.com/@gaming-vk-play-faq')
});

app.get("/account", function (req, res) {
    res.render('newaccount.hbs');
});

app.get("/find", function (req, res) {
    res.render('find.hbs',listOfProducts);
});

app.get("/newacc", function (req, res) {
    let data = req.query;
    let userLogin = data.lgn;
    let userPassword = data.pswrd;
    res.redirect('/');
});

app.get("/game/:id", function (req, res) {
    let gameid = req.params.id;
    let itemss = Object.keys(serverData.items); 
    let findItem = {};
    for (item of itemss) {
        if (serverData.items[item].id == gameid) {
            findItem = serverData.items[item];
            break;
        }
    };
    if (isEmptyObject(findItem)) {
        res.render('error.hbs');
    } else {
        res.render('gamepage.hbs', findItem);
    };
});

app.get("/addtocart", function (req, res) {
    let data = req.query;
    let gameid = data.id;
    let itemss = Object.keys(serverData.items); 
    for (item of itemss) {
        if (serverData.items[item].id == gameid) {
            if(serverData.items[item].incart){
                serverData.items[item].incart = false;
            }else{
                serverData.items[item].incart = true;
            }
            res.send(serverData.items[item]);
            break;
        }
    };
});

app.get("/user/cart", function (req,res) {
    let userCartList = {
        "userList":[],
        "total": 0
    };
    let itemss = Object.keys(serverData.items); 
    for (item of itemss) {
        if (serverData.items[item].incart) {
            userCartList.total = userCartList.total + Number(serverData.items[item].cost.split(" ")[0])
            userCartList.userList.push(serverData.items[item]);
        };
    };
    if (userCartList.total != 0) {
        res.render("cart.hbs",userCartList);      
    } else {
        userCartList.total = false;
        res.render("cart.hbs",userCartList);
    };
});

app.get("/:page", function (req, res) {
    page = req.params.page;
    
    if (page != 'favicon.ico') {
        if(serverData.pages.indexOf(page)>=0){
            res.render(page + ".hbs");
        }else{
            res.render("error.hbs");
            res.statusCode = 404;
        }
    } else {
        res.render(page);
    }
});

app.listen(3000, function () {
    console.log("следим");
})