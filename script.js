// o pé na areia a caipirinha, água de côco, a cervejinha

const produtos = [
    {
        id: 12,
        name: "Laranja",
        price: 4.00,
        ImageUrl: "./img/Laranja.png",
        category: "Fruta"
    },

    {
        id: 13,
        name: "Abacaxi",
        price: 7.00,
        ImageUrl: "./img/Abacaxi.png",
        category: "Fruta"
    },

    {
        id: 14,
        name: "Melancia",
        price: 15.00,
        ImageUrl: "./img/Melancia.png",
        category: "Fruta"
    },

    {
        id: 15,
        name: "Uva",
        price: 5.00,
        ImageUrl: "./img/Uva.png",
        category: "Fruta"
    },

    {
        id: 16,
        name: "Castanha",
        price: 10.00,
        ImageUrl: "./img/Castanha.png",
        category: "Alimento"
    },


    {
        id: 17,
        name: "Ovo",
        price: 12.00,
        ImageUrl: "./img/Ovo.png",
        category: "Alimento"
    },


    {
        id: 18,
        name: "Queijo",
        price: 14.00,
        ImageUrl: "./img/Queijo.png",
        category: "Alimento"
    },


    {
        id: 19,
        name: "Vinho",
        price: 29.00,
        ImageUrl: "./img/Vinho.png",
        category: "Bebida"
    },




]


const productContainer = document.querySelector(".product-container")
const openSideBarButton = document.getElementById("shopping-bag")
const closeSideBarButton = document.getElementById("closeButton")
const carrinhoContainer = document.getElementById("carrinho-container")


function carregarProduto() {
    produtos.forEach((produto) => {
        const productCard = document.createElement("div")
        productCard.classList.add("product-card")
        productCard.innerHTML =
            ` 
        <img src="${produto.ImageUrl}">
                <div class="product-info">
                    <div>
                        <div>
                            <span>${produto.category}</span>
                            <h3>${produto.name}</h3>
                            <span>R$ ${produto.price.toFixed(2)}</span>
                        </div>
                        <button onclick="addToCart(${produto.id})">
                            <img src="assets/icons/shopping-basket.svg">
                        </button>
                    </div>
                </div>
        `

        productContainer.appendChild(productCard)

    })
}


function addToCart(produtoId) {
    // Busca o produto na lista de produtos pelo id que é passado como parâmetro
    const produto = produtos.find((p) => p.id == produtoId)
    // Verifica o encontro
    if (produto) {
        //Pega o carrinho que foi salvo antes, caso não tenha nada ele seta uma lista vazia (nova)
        const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || []



        let productIndex = carrinho.findIndex((p) => p.id == produtoId)

        if (productIndex > -1) {
            carrinho[productIndex].quantity += 1
        } else {
            carrinho.push({
                name: produto.name,
                price: produto.price,
                ImageUrl: produto.ImageUrl,
                id: produto.id,
                category: produto.category,
                quantity: 1
            })

        }
        
        //Salva novamente o carrinho com o produto adicionado
        sessionStorage.setItem("carrinho", JSON.stringify(carrinho))
        alert(`${produto.name} foi adicionado ao carrinho`)

    }

    atualizarContador()

}



function atualizarContador() {
    const itemCount = document.querySelector(".product-count")
    const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || []
    const qtd = carrinho.length

    itemCount.textContent = qtd
    itemCount.style.display = qtd > 0 ? "flex" : "none"

    atualizarItensCarrinho()
}



function toggleSideBar() {
    const sidebar = document.getElementById('sidebar')
    sidebar.classList.toggle("open")
}


//Função para popular a sidebar com os itens do carrinho
function atualizarItensCarrinho() {
    const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || []

    carrinhoContainer.innerHTML = carrinho.map((item) => `

    <div class="product-card-mini">
                <div class="product-card-mini-container">
                    <img src=${item.ImageUrl} alt="">
                    <div class="product-info">
                        <h4>${item.name}</h4>
                        <p class="tag">${item.category}</p>
                        <div class="action-container">
                            <p>Qtd. ${item.quantity}</p>
                            <button id="remove-button" onclick="removeItem(${item.id})"><img src="assets/icons/trash.svg" alt="">Remover</button>
                        </div>
                        <h4>R$ ${(item.quantity * item.price).toFixed(2)}</h4>
                    </div>

                </div>
            </div>

    `)



    let total = 0
    for(let i = 0; i < carrinho.length; i++){
        total = total + (carrinho[i].price * carrinho[i].quantity)
    }


    const totalContainer = document.getElementById("total-carrinho")
    totalContainer.innerText = `R$ ${total.toFixed(2)}`

}



function removeItem(itemId) {
    let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || []

    carrinho = carrinho.filter((item) => item.id != itemId)
    sessionStorage.setItem("carrinho", JSON.stringify(carrinho))

    atualizarContador()

}




openSideBarButton.addEventListener("click", toggleSideBar)
closeSideBarButton.addEventListener("click", toggleSideBar)

//Função que é chamada quando a página carrega
window.onload = () => {
    carregarProduto()
    atualizarContador()
}