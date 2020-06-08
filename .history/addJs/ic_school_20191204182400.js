var app = new Vue({
    el: "#app",
    data: {
		headerLogo:'',//页面顶部logo
		linkItems:[],//页面顶部导航信息
		bannerUrl:'',//页面上方banner图
		resBody:'',//主体内容信息
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
		//获取二级栏目信息
		var id=pub._LinkParm('target_id1');  //返回一个数组数据 获取栏目id
		console.log(id);
		if(id!=0&&id!=undefined){
			pub._InitAxios({    
				_url:pub._url,  //公共接口
				ur:pub._DetailApi.gaikuo,
				data:{column_id:`${id}`},
				cbk:(res)=>{
					console.log(res.data);
					this.resBody=res.data;
					this.title=res.data.column_name;
					window.document.getElementsByTagName("title")[0].innerText =this.title;
					// console.log(this.resBody)
				}
			}),

			// 获取通过栏目id获取栏目下文章内容信息
		// pub._InitAxios({
		// 	_url:pub._url,  //公共接口
		// 	ur:pub._DetailApi.wz,
		// 	data:{column_id:`${id}`},
		// 	cbk:(res)=>{
		// 		console.log(res.data);
		// 		if(res.data.style_id==7){
		// 		          location.replace(`./articale_list.html?column_id=${res.data.column_id}`);
		// 			          return;
		//         }
		// 		// console.log(res.data.children.length);	
		// 		var promiseAll=[];//存储发送请求的数组
		// 		// console.log(column_id)
		// 		var result=Array.from(res.data.children);
		// 		for(var i=0;i<result.length;i++){
		// 			//获取文章id
		// 			var article_id=result[i].article_id;
		// 			promiseAll.push(new Promise((resolve)=>{
		// 				pub._InitAxios({
		// 					_url:pub._url,  //公共接口
		// 					ur:pub._DetailApi.article,
		// 					data:{column_id,article_id},
		// 					cbk:(res)=>{
		// 						resolve(res.data);
		// 					}
		// 				});
		// 			}))
		// 		}
		// 		//promiseAll里面有俩个promise对象 全部执行完成 才可以往下走 打印出来
		// 		Promise.all(promiseAll).then((res)=>{
		// 			console.log(res);
		// 			for(var i=0;i<res.length;i++){
		// 				var obj=res[i];
		// 				if(res[i].style_id==8){
		// 					location.replace(`./school_honer.html?column_id=${res[i].column_id}`);
		// 					return;
		// 				}
		// 				if(res[i].style_id==3){
		// 					location.replace(`./science_mian_lab.html?column_id=${res[i].column_id}`);
		// 					return;
		// 				}
		// 				if(res[i].style_id==10){
		// 					location.replace(`./science_achievement.html?column_id=${res[i].column_id}`);
		// 					return;
		// 				}
		// 				if(res[i].style_id==4){
		// 					location.replace(`./major_content_2.html?column_id=${res[i].column_id}`);
		// 					return;
		// 				}
		// 				if(res[i].style_id==9){
		// 					location.replace(`./student_info_video.html?column_id=${res[i].column_id}`);
		// 					return;
		// 				}
		// 				if(res[i].style_id==5){
		// 					location.replace(`./NewsInfo.html?column_id=${res[i].column_id}&article_id=${res[i].article_id}`);
		// 					return;
		// 				}
		// 				if(obj.ueditor_text!=''){
		// 					obj.ueditor_text=Base64.decode(obj.ueditor_text)
		// 					this.articles.push(obj);
		// 				}				
		// 			}
		// 		})
		// 	}
		// });	

			// 获取顶部导航信息
			pub._InitAxios({
				_url:pub._url,  //公共接口
				ur:pub._DetailApi.getHeader,
				data:{terminal_id:"71"},
				cbk:(res)=>{
					// console.log(res.data);
					this.headerLogo=res.data.logo;//顶部logo赋值
					this.linkItems=res.data.main_navigation;//页面顶部导航赋值
					this.bannerUrl=res.data.pc_main_banner2.children[0];//页面上方的banner鱼片地址
					// console.log(this.bannerUrl);
				}
			})
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
		}else{
			location.replace("./preIndex.html");
		}
    },
    methods: {}
  });
  