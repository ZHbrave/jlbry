//列表页
require(['require.config'],()=>{
    require(['url','template','header','footer'],(url,template)=>{
        class List{
            constructor(){
                this.getData();
            }



            //请求列表数据
            getData(){
                // console.log(1)
                $.ajax({
                    url:url.rapBaseUrl+"list/type",
                    type: 'get',
                    dataType: "json",
                    success: data=>{
                        console.log(data)
                        if(data.res_code===1)this.render(data.res_body.list);
                    }
                })
            }



            //把生成的数据加载到template里
            render(list){
                $("#ul-container").html(template('ul-template',{list}))
            }
        }
        new List();
    })
})