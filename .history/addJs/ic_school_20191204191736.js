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
		},
		lanmu:''
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
					if(res.data.style_id==7){
						          location.replace(`./articale_list.html?column_id=${res.data.column_id}`);
							          return;
				        }
					if(res.data.style_id==2){
						if(res.data.children.length>0){
							location.replace(`./third_column.html?column_id=${id}`);
						return;
						}else{
							location.replace(`./school_info.html?column_id=${id}`);
							return;
						}
					}
					if(res.data.style_id==8){
						location.replace(`./school_honer.html?column_id=${id}`);
						return;
					}
					if(res.data.style_id==3){
						location.replace(`./science_mian_lab.html?column_id=${id}`);
						return;
					}
					if(res.data.style_id==10){
						location.replace(`./science_achievement.html?column_id=${id}`);
						return;
					}
					if(res.data.style_id==4){
						location.replace(`./major_content_2.html?column_id=${id}`);
						return;
					}
					if(res.data.style_id==9){
						location.replace(`./student_info_video.html?column_id=${id}`);
						return;
					}
					if(res.data.children!=''){
						this.resBody=res.data;
						this.title=res.data.column_name;
						window.document.getElementsByTagName("title")[0].innerText =this.title;
					}else{
						this.lanmu='该栏目下数据为空!';
					}
					
					// console.log(this.resBody)
				}
			}),
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
  