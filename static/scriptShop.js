/*CONFIG COMPRA BOLSA*/

cria_bolsa("Bolsa Lolla", "Lolla.jpeg", "89,99", [["#000","preta"]], "#00000066");
cria_bolsa("Bolsa Mary", "BolsaMary.jpeg", "89,90", [["#fff","branca"]], "#555566");
cria_bolsa("Bolsa Chloe", "BolsaChloe.jpeg", "70,99", [["#fff","branca"],["#000","preta"]], "#44444466");




function cria_bolsa(nome, src, preco, cores, decoration) {
  let lista_cor = '';
  for (let x in cores) {
    //<div class="nome_cor">`+cores[x][1]+`</div>
    lista_cor += `
      <div style="background-color: `+ cores[x][0] + `" class="listColor color`+ cores[x][0] + ` `+ cores[x][1] + ` ProdNoSelected"></div>
    `
  };

  $('body').append(`<div id="Bolsa` + nome + `" class="bolsaCard" currentcolor="None">
  <div class="product">
    <div class="imgDecoration" style="background-color:`+ decoration + `">
      <div class="bolsaImg"  style="background-image: url('./static/bolsas/`+ src + `');"></div>
    </div>
  </div>
    <div class="contents">
      <div class="insideContents">
      <div class="bolsaTitle">`+ nome + `</div>
      <div class="bolsaPrice">`+ preco + `</div>
      <div class="bolsaColor">
        `+ lista_cor + `
      </div>
      <button class="bolsaAddCart" onclick="AddCart(event,'`+ nome + `','` + preco + `','` + src + `','` + decoration + `')">ADICIONAR AO CARRINHO</button>
      </div>
    </div>
  </div>`);
}


function AddCart(e,nome, preco, src) {
  let parent = e.currentTarget.parentElement
  parent = parent.parentElement.parentElement
  if (parent.getAttribute('currentcolor') === "None"){
    window.alert("Selecione uma cor para prosseguir.")
    return;
  }
  console.log(parent.getAttribute('currentcolor').split(" "))
  $('#productsList').append(`<div class="cartProd">

   <div class="cartImg" style="background-image: url('./static/bolsas/`+ src + `');"> </div>
    <div style="width: 60%;">
      <div class="prodTitle">`+ nome + `</div>
      
      <div style="display: flex;justify-content: flex-start; align-items: center;">
        <div class="prodPrice">`+ preco + `</div>

        <div class="bolsaColor" corAtual = `+parent.getAttribute('currentcolor').split(" ")[1]+`  style="width: 40px; margin: 0 0 0 1%; height: 40px;">
        <div style="background-color: `+ parent.getAttribute('currentcolor').split(" ")[0] + `;height: 25px;"></div>
      </div>

      
      </div>
      <div class="superRemv">
        <button class="prodRemv" 
        onclick="removeItemCart(event)">Remover</buton>
      </div>
    </div>
  </div>`);
}

function removeItemCart(e) {
  e.target.parentElement.parentElement.parentElement.remove();
}


//SELECT COLOR
$(".listColor").click(function(e){
  $(".bolsaCard").attr("currentColor","None")
  let parent = e.currentTarget.parentElement.parentElement
  parent = parent.parentElement.parentElement
  let currentColor = e.currentTarget.classList.value.split('color')[1]
  parent.setAttribute("currentColor",currentColor)
  $('.listColor').removeClass('ProdSelected')
  $('.listColor').addClass('ProdNoSelected')
  e.currentTarget.classList.remove('ProdNoSelected')
  e.currentTarget.classList.add('ProdSelected')
  
})



//CART CONFIGURATION

var height_ = screen.availHeight;//screen.height;
var width_ = screen.availWidth;//screen.width;


function showCart() {
  let cart_ = $('#cart');
  if (width_ <= 576) {
    cart_.hasClass('show_cart_mob') ? (cart_.removeClass("show_cart_mob").addClass("hide_cart_mob")) : cart_.addClass("show_cart_mob").removeClass("hide_cart_mob");
    cart_.hasClass('hide_init_cart') ? cart_.removeClass("hide_init_cart") : '';
  }
  else {
    cart_.hasClass('show_cart') ? (cart_.removeClass("show_cart").addClass("hide_cart")) : cart_.addClass("show_cart").removeClass("hide_cart");
  }
}



if (width_ <= 576) { //900


  $('#cart').addClass("hide_init_cart");

}
else {
  $('#cart').addClass("hide_init_cart");
}





//GET CART ITEMS
$("#fimCompra").click(function(){
  let prodList = []
  let prodColorList = []
  $("#productsList .prodTitle").each(function(i,val){
    prodList.push(val.textContent)
  })
  $("#productsList .bolsaColor").each(function(i,val){
    prodColorList.push(val.getAttribute('corAtual'))
  })
  prodList = prodList.map(function (val,i){
    return (val.replace(" ","%20")+'%20-%20cor%20'+
            prodColorList[i].replace("#","%23"))
  })
  prodList = prodList.join("%0A")
  let wpMessage = 'https://wa.me/5531996669071?text=Ol%C3%A1%2C%20Gostaria%20de%20realizar%20o%20pedido%20dos%20seguintes%20produtos%3A%0A%0A'+prodList;
  window.location.href = wpMessage.split(" ").join("%20").split("&nbsp;").join("%20");
})