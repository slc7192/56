
var app = new Vue({
  el: "#app",
  data: {
    headerLogo:'',//页面顶部logo
		linkItems:[],//页面顶部导航信息
		bannerUrl:'',//页面上方banner图
    resBody:'',  //主体内容
    resPody:'',   //父亲的信息
    article:'',
    news_List:'', //新闻列表
    article_id:'', //文章id
    resFooter:{
			linkItems:'',       //底部导航信息
			address:'',         //地址信息
			copyright:'',       //版权所有
			enrollment_link:'',  //招生联系
			professional_consultation:'',  //专业咨询
			school_introduction:'',    //学校介绍
			logo2:''   //底部院校logo
		}
  },
  created() {
      var column_id=pub._LinkParm('column_id');
      var article_id=pub._LinkParm('article_id');
      this.article_id=article_id;
      // console.log(column_id,article_id);
      if(column_id&&article_id){
          //获取文章信息
      pub._InitAxios({
        _url:pub._url,//公共接口
        ur:pub._DetailApi.article,  //获取文章的接口
        data:{
          "column_id":`${column_id}`,
          "article_id":`${article_id}`
      },
        cbk:(res)=>{
          this.article=res.data;
          this.title=res.data.article_name;
          window.document.getElementsByTagName("title")[0].innerText =this.title;
          // base64解析返回的文章详情
          this.article.ueditor_text=Base64.decode(this.article.ueditor_text);
          
          // console.log(this.article);
        }
      });
      // 获取顶部导航信息
			pub._InitAxios({
				_url:pub._url,  //公共接口
				ur:pub._DetailApi.getHeader,
				data:{terminal_id:"71"},
				cbk:(res)=>{
					// console.log(res.data);
					this.headerLogo=res.data.logo;//顶部logo赋值
					this.linkItems=res.data.main_navigation;//页面顶部导航赋值
					this.bannerUrl=res.data.pc_main_banner2.children[0];//页面上方的banner图片地址
					// console.log(this.bannerUrl);
				}
      });
      //获取内容栏目导航信息
      pub._InitAxios({
        _url:pub._url,  //公共接口
        ur:pub._DetailApi.gaikuo,
        data:{column_id},
        cbk:(res)=>{
          console.log(res.data);
          if(res.data.column_type=='column_3'){
            pub._InitAxios({
              _url:pub._url,  //公共接口
              ur:pub._DetailApi.gaikuo,
              data:{"column_id":res.data.column_pid},
              cbk:(res)=>{
                // console.log(res.data);
                this.resPody=res.data;
                // console.log(this.resPody);
              }
            });
          }
          this.resBody=res.data;
          console.log(resPody.column_name)
        }
      });
      //获取底部信息
			pub._InitAxios({
				_url:pub._url,  //公共接口
				ur:pub._DetailApi.getFooter,
				cbk:(res)=>{
					// console.log(res.data);
					this.resFooter.linkItems=res.data['9201911221011333'].children;
					this.resFooter.enrollment_link=res.data.enrollment_link;
					this.resFooter.address=res.data.address;
					this.resFooter.copyright=res.data.copyright;
					this.resFooter.professional_consultation=res.data.professional_consultation;
					this.resFooter.school_introduction=res.data.school_introduction;
					this.resFooter.logo2=res.data.logo2;
					// console.log(this.resFooter.enrollment_link);
				}
			})
      //获取栏目下的文章列表
      pub._InitAxios({
				_url:pub._url,  //公共接口
				ur:pub._DetailApi.wz,
				data:{column_id},
				cbk:(res)=>{
          console.log(res.data);
          this.resBody=res.data;
          // this.title=res.data.column_name;
          // window.document.getElementsByTagName("title")[0].innerText =this.title;
          // this.resBody.children=this.resBody.children.slice(0,8);
          // console.log(article_id);
          //处理数组中的数组 让右侧新闻列表形成一个圈循环
          for(var value in this.resBody.children){
            for(var key in this.resBody.children[value]){
              if(key=='article_id'){
                if(this.resBody.children[value][key]==article_id){
                  this.news_List=this.circle(this.resBody.children,value);
                  this.news_List=this.news_List.slice(0,8);
                }
              }
            }
          }
          // console.log(this.news_List);
				}
      });
      }else{
        window.location.replace("./preIndex.html");
      }
  },
  methods: {
      //完成一个数组中的数据形成一个圈
      circle(arr,index){  //传入数组   要变成起点的下标
        var newArr=[];
        for(var i=index;i<arr.length;i++){
          newArr.push(arr[i]);
        }
        for(var j=index-1;j>=0;j--){
          newArr.push(arr[j]);
        }
        return newArr;
      }
  }
});
