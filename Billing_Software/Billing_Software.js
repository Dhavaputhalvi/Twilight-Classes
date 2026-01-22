 let data=JSON.parse(localStorage.getItem('AddProduct')) || []

        function add_Product(){
            let product_name=document.getElementById("product-name").value.toLowerCase()
            let price=document.getElementById("price").value
            let availableQty=document.getElementById("available").value
            if(!product_name || !price || !availableQty)
                alert("Fill required details")
            else{
                document.getElementById("Input-Form").submit()

                const ProductAddition={
                    ProductName:product_name,
                    Price:price,
                    AvailableQuantity:availableQty
                }

                data.push(ProductAddition)
            
                localStorage.setItem("AddProduct",JSON.stringify(data))
                
            }
        }
       
        function search(){
            let searchProduct=document.getElementById("search-product").value.trim().toLowerCase()
            let tablebody=document.getElementById("found-product")
            tablebody.innerHTML=""
            
            if(searchProduct===""){
                return;
            }

            for(let i=0;i<data.length;i++){
                if(data[i].ProductName.trim().toLowerCase().includes(searchProduct)){
                    console.log(data[i].ProductName)
                    tablebody.innerHTML += `
                        <tr>
                            <td id="found_Product">${data[i].ProductName}</td>
                            <td>${data[i].Price}</td>
                            <td><input type="number" id="found_qty" value="${data[i].AvailableQuantity}" min="1" max="${data[i].AvailableQuantity}"></td>
                            <td><button onclick="add_to_bill('${data[i].ProductName}','${data[i].Price}',this)">Add</button></td>
                            <td><button onclick="del_from_bill('${data[i].ProductName}','${data[i].Price}','${data[i].AvailableQuantity}',this)">Del</button></td>
                        </tr>
                    `
                }
            }
        }

        
        let billamnt=document.getElementById("bill_details")
        let totalamt=0
        let GSTTotal=0
        let qty

        function add_to_bill(prod_Name,add_Price,btn){
            
            let row=btn.closest("tr")
            qty=row.querySelector("#found_qty").value;

            let amt=add_Price*qty;
            totalamt+=amt
            billamnt.innerHTML+=`
                        <tr>
                            <td id="Bill_product_name">${prod_Name}</td>
                            <td id="bill_qty">${qty}</td>
                            <td id="amt">${amt}</td>
                        </tr>
            `

            document.getElementById("subTotal").textContent=totalamt
            GSTTotal=((totalamt*18)/100)
            document.getElementById("GST").textContent=GSTTotal
            document.getElementById("total").textContent=(totalamt+GSTTotal).toFixed(2)


            data=data.filter(new_data => {
                if(new_data.ProductName===prod_Name && new_data.Price===add_Price){
                    new_data.AvailableQuantity-=qty

                    return new_data.AvailableQuantity>0
                
                }
                return true
            })
            localStorage.setItem("AddProduct",JSON.stringify(data))

            search()

        }

        function del_from_bill(name,price,availqty,btn){

            let row=document.getElementById("Bill_product_name").closest("tr")
            qty=row.querySelector("#bill_qty").textContent
            let amt2=row.querySelector("#amt").textContent;
            totalamt-=amt2

            document.getElementById("subTotal").textContent=totalamt
             GSTTotal=((totalamt*18)/100)
            document.getElementById("GST").textContent=GSTTotal
            document.getElementById("total").textContent=(totalamt+GSTTotal).toFixed(2)

            if(document.getElementById("Bill_product_name").textContent===name){
                document.getElementById("Bill_product_name").closest("tr").remove()
            }

            updatedqty=Number(availqty)+Number(qty)

            data=data.filter(new_data => {
            if(new_data.ProductName===name && new_data.Price===price){
                new_data.AvailableQuantity=updatedqty

                 return new_data.AvailableQuantity>0
                
              }
            })
            localStorage.setItem("AddProduct",JSON.stringify(data))

            search() 
        }