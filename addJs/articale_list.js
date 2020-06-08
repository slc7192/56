var app = new Vue({
  el: "#app",
  data: {
  headerLogo:'',//页面顶部logo
  linkItems:[],//页面顶部导航信息
  bannerUrl:'',//页面上方banner图
  resBody:'',  //页面主体信息
  articles:[],  //文章内容
  /*分页 */
  total:500,
  currentPage:1,
  pageSize:15,
  list:[],
  resFooter:{
    linkItems:'',       //底部导航信息
    address:'',         //地址信息
    copyright:'',       //版权所有
    enrollment_link:'',  //招生联系
    professional_consultation:'',  //专业咨询
    school_introduction:'',    //学校介绍
    logo2:'',   //底部院校logo
  },
  column_id:'',
  index:'',
  resPody:''
  },
  created() {
  var id=pub._LinkParm('target_id1');
  this.column_id=pub._LinkParm('column_id');
  column_id=pub._LinkParm('column_id');
  console.log(column_id);
  // 获取顶部导航信息
  
  pub._InitAxios({
    _url:pub._url,  //公共接口
    ur:pub._DetailApi.getHeader,
    data:{terminal_id:"71"},
    cbk:(res)=>{
      // console.log(res.data);//打印数据
      this.headerLogo=res.data.logo;//顶部logo赋值
      this.linkItems=res.data.main_navigation;//页面顶部导航赋值
      this.bannerUrl=res.data.pc_main_banner2.children[0];//页面上方的banner图片地址
    }
  })
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
            console.log(this.resPody);
          }
        });
      }
      this.resBody=res.data;
      this.title=res.data.column_name;
      window.document.getElementsByTagName("title")[0].innerText =this.title;
      // console.log(this.results);
    }
  });
  this.getData();
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
  },
  methods: {
    //通过栏目id获取栏目下文章内容信息
    getData(){
      pub._InitAxios({
        _url:pub._url,//公共接口
        ur:pub._DetailApi.getPart,
        data:{
          "column_id":this.column_id,
          "pageNum":this.currentPage,
          "pageSize":this.pageSize,  
      },
        cbk:(res)=>{
          for(var value of res.page.list){
            console.log(value);
          }
          this.list=res.page.list;
          // console.log(this.list)
          this.pageSize=res.page.pageSize;//一页几条数据
          // console.log(this.pageSize)
          this.currentPage=res.page.currPage;//当前第几页
          this.total=res.page.totalCount;//总数据
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage= val;
      // console.log(`当前页: ${val}`);
      this.getData();
    }
  }
});
