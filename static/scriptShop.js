/*CONFIG COMPRA BOLSA*/

cria_bolsa({
  nome: "Bolsa Jennifer", src: "BolsaJennifer.jpeg", preco: "R$102,90", decoration: "#555566",
  cores: [["#309292","verde"],["#000","preta"]]});

cria_bolsa({
  nome: "Bolsa Lari P", src: "BolsaLari.jpeg", preco: "R$125,90", decoration: "#555566",
  cores: [["#e1d4ce","rosa"],["#000","preta"]]});

cria_bolsa({
  nome: "Bolsa Lari M", src: "BolsaLari.jpeg", preco: "R$135,90", decoration: "#555566",
  cores: [["#e1d4ce","rosa"],["#000","preta"]]});

cria_bolsa({
  nome: "Bolsa Chloe", src: "BolsaChloe.jpeg", preco: "70,99", decoration: "#44444466", 
  cores: [["#bbb","cinza"],["#000","preta"],["#e6e6fa","lavanda"]]});
cria_bolsa({
  nome: "Bolsa Mary", src: "BolsaMary.jpeg", preco: "89,90", decoration: "#555566",
  cores: [["#fff","branca"],["#000","preta"],["#e6e6fa","lavanda"],["#0268a8","azul"]]});

cria_bolsa({
  nome: "Bolsa Mayra", src: "BolsaMayra.jpeg", preco: "81,99", decoration: "#44444466", 
  cores: [["#000","preta"],["#309292","verde"],["#edc951","amarela"]]});

cria_bolsa({
  nome: "Carteira Jade M", src: "CarteiraJade.jpeg", preco: "R$39,99", decoration: "#555566",
 currentColor: 'VariasCores', desc: 'Tamanho M <br>Varias Cores'});

cria_bolsa({
  nome: "Carteira Jade G", src: "CarteiraJade.jpeg", preco: "R$46,99", decoration: "#555566",
 currentColor: 'VariasCores', desc: 'Tamanho G <br>Varias Cores'});

/*cria_bolsa({
  nome: "Bolsa Lolla", src: "Lolla.jpeg", preco: "89,99", decoration: "#00000066",
  cores: [["#000","preta"]]});*/

cria_bolsa({
  nome: "Bolsa Ana", src: "BolsaAna.jpeg", preco: "R$115,99", decoration: "#555566",
  cores: [["#fff","branca"],["#000","preta"],["#f5f5dc ","bege"]]});





function cria_bolsa(params) {
  let lista_cor = '';
  if (params.cores){
    for (let x in params.cores) {
    //<div class="nome_cor">`+params.cores[x][1]+`</div>
    lista_cor += `
      <div style="background-color: `+ params.cores[x][0] + `" class="listColor color`+ params.cores[x][0] + ` `+ params.cores[x][1] + ` ProdNoSelected"></div>
      `
    };
  }
  

  $('body').append(`<div id="Bolsa` + params.nome + `" class="`+(params.currentColor ? '' : 'changeColor')+` bolsaCard" currentcolor="`+ (params.currentColor ? "#fff "+params.currentColor : 'None') +`">
  <div class="product">
    <div class="imgDecoration" style="background-color:`+ params.decoration + `">
      <div class="bolsaImg"  style="background-image: url('./static/bolsas/`+ params.src + `');"></div>
    </div>
  </div>
    <div class="contents">
      <div class="insideContents">
      <div class="bolsaTitle">`+ params.nome + `</div>
      <div class="bolsaPrice">`+ params.preco + `</div>
      `+(params.desc ? `<div class='desc'>`+params.desc+`</div>` : '')+`
      `+(params.cores ? (`<div class="bolsaColor">
        `+ lista_cor + `
      </div>`) : '')+`

      <button class="bolsaAddCart" onclick="AddCart(event,'`+ params.nome + `','` + params.preco + `','` + params.src + `','` + params.decoration + `')">ADICIONAR AO CARRINHO</button>
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
  // console.log(parent.getAttribute('currentcolor').split(" "))
  alert("Produto Adicionado!")
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
  $(".changeColor").attr("currentColor","None")
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
