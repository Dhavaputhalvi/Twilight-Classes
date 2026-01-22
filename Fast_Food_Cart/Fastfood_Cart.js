let i=0
        document.querySelectorAll(".add_to_cart").forEach(element => {
            element.addEventListener('click',function(){
                addCart(this)
            })
        });

        function placeorder(){
            if(i===0)
                alert("No Order placed!")
            else
                alert("Order placed successfully!")
        }
        
        function addCart(btn){
             i++
             document.getElementById("cartItemNumber").innerHTML=i

            let row=btn.closest(".outer-container")
            let image=row.querySelector("img").src
            let name=row.querySelector(".item-name").innerHTML
            let price=row.querySelector(".price").innerHTML

            document.getElementById("cart_items").innerHTML+=`
                <div class="child-elements" data-price="${price}">
                    <img src="${image}" alt="">
                    <div>
                        <p>${name}</p>
                        <p>Rs. <span class="item-total">${price}</span></p>
                        <input type="number" min="1"  value="1" oninput="increasePrice(this)"/>
                    </div>
                    <button onclick="deletes(this)" class="cross" style="background-color:white;color:black;">&#128465;</button>
                </div>
                <br>
            `
            updatetotal()
        }

        function deletes(btn){
            let row=btn.closest(".child-elements")
            row.remove()
            i--
            document.getElementById("cartItemNumber").innerHTML=i

            updatetotal()
        }

        function show() {
            document.getElementById("cart").classList.add("active");
        }

        function hide() {
            document.getElementById("cart").classList.remove("active");
        }


        function increasePrice(btn){
            let row=btn.closest(".child-elements")
            let price=Number(row.dataset.price)
            let qty=Number(btn.value)

            let priced=price*qty
            row.querySelector(".item-total").innerText=priced


            updatetotal()
        }
        
        document.querySelector(".total").addEventListener('click', updatetotal)

        function updatetotal(){
            let total=0

            document.querySelectorAll(".item-total").forEach(item => {
              total += Number(item.innerText);
            });
            document.querySelector(".total").innerText = total.toFixed(2)
        }