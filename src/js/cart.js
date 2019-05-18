require(['require.config'],()=>{
    require(['template','header','footer'],(template,header)=>{
        class Cart{
            constructor(){
                this.carContainer= document.querySelector(".cart-container");
                console.log(this.carContainer);
                this.allcheck= this.carContainer.querySelector("#selectAll");
                this.moneyContainer=this.carContainer.querySelector("#moneyContainer")
                this.n=0 ;//单选选中的个数
                this.allMoney=0;  //总价开始等于0；
                this.init();
                this.calcMoney();
            }
            init(){
               let cart=localStorage.getItem('cart');
               if(cart){
                   //渲染列表
                   cart=JSON.parse(cart);
                   this.render(cart);
               }else{
                   //提示购物车为空
                   alert("购物车是空的")
               }
            }
            //渲染内容
            render(cart){
                $(".cart-shop").html(template('cart-template',{cart}));
                //找到渲染后里面的选框
                this.cartShop=this.carContainer.querySelector(".cart-shop")
                this.checks=Array.from(this.cartShop.querySelectorAll(".checks"));
                this.minus=this.cartShop.querySelector("#minus");
                this.bindEvents();
            }
            bindEvents(){
                this.carContainer.onclick=e=>{
                    //找到里面的事件源的整条父级元素
                    console.log(e.target.id)
                    let ulBox=e.target.parentNode.parentNode;
                    let cart=JSON.parse(localStorage.getItem('cart'));
                    let index=0;
                    //遍历这个cart，如果里面的text相等，找到缓存与商品TEXT相等的元素。并返回和记录当前相等的数据的下标
                    cart.some((item,i)=>{
                         index=i;
                        //  console.log(ulBox.querySelector(".shopName a").innerHTML,item.text)
                         return item.text === ulBox.querySelector(".shopName a").innerHTML;
                        })

                        //删除按钮
                        if(e.target.id ==="del"){
                            //    let shopName=ulBox.querySelector(".shopName").querySelector("a").innerHTML;
                            if(confirm("确定不要这条商品了吗了吗？")){
                                ulBox.remove();
                                this.checks=Array.from(this.cartShop.querySelectorAll(".checks"))
                                this.checks.forEach(check=>{
                                    if(check.checked) this.n++;
                                })
                                //找到缓存里的cart
                                //删除对应下标所在的那一条数据商品
                                cart.splice(index,1);
                                //重新把cart存进去
                                localStorage.setItem('cart',JSON.stringify(cart));
                                //重新渲染header里的num；
                                header.calcCartNum();
                            }

                            
                            this.allcheck.checked= this.n===this.checks.length;
                            this.calcMoney();
                        }


                        //减少按钮
                        if(e.target.id==="minus"){
                            // let numValue=e.target.nextElementSibling.innerHTML;
                            
                            if(cart[index].num <=1){
                                alert('yi')
                            }else{
                                cart[index].num--;
                            }
                            console.log(numValue)
                            
                            e.target.nextElementSibling.innerHTML = cart[index].num;
                            localStorage.setItem('cart',JSON.stringify(cart));
                            let subtotal=ulBox.querySelector("#subtotal")
                            header.calcCartNum();
                            
                            this.allcheck.checked= this.n===this.checks.length;
                            this.calcMoney();
                        }


                }
                this.allcheck.onchange=()=>{
                    this.checks.forEach(check=>{
                        check.checked=this.allcheck.checked;
                    })
                    this.n=this.allcheck.checked?this.checks.length:0;
                    this.calcMoney();
                }
                this.checks.forEach(check=>{
                    check.onchange=()=>{
                        this.n+=check.checked? 1:-1
                        this.allcheck.checked=this.n===this.checks.length;
                        this.calcMoney();
                    }
                })
            }
            
            calcMoney(){
                this.allMoney=0;
                this.allUl=Array.from(this.cartShop.children)
                this.allUl.forEach(ulBox=>{
                   if(ulBox.querySelector(".checks").checked){
                       this.allMoney+=Number(ulBox.querySelector(".subtotal").innerHTML);
                   }
                });
                this.moneyContainer.innerHTML=this.allMoney;
            }
        }
        new Cart();
    })
})