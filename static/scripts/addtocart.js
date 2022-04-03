$('#addtocart').click(()=>{
    let a = document.getElementsByTagName("span")['0'].textContent;
    $.ajax({
        url: '/addtocart',
        type: 'GET',
        data: {
            'id': a
        },
        dataType: 'json',
        success:function (response) {
            if (response.incart) {
                $('#addtocart-ico').attr("name","bag-check");    
            } else {
                $('#addtocart-ico').attr("name","bag-add");
            }        
    }})
});