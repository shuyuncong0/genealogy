<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <div style="margin: 15px;">
          <el-checkbox v-model="expandAll" label="1" @change="expandChange">
            展开全部
          </el-checkbox>
          <el-checkbox v-model="simpModel" label="1" @change="simpModelChange">
            简约模式
          </el-checkbox>
          <el-checkbox v-model="drawerModel" label="1" @change="drawerModelChange">
            抽屉模式
          </el-checkbox>
          <span @click="setImage" class="dept_camera" title="截图">
            截图 <img src='./camera1.png' width='30' class='logo' style='cursor: pointer' />
          </span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="380px" v-show="!drawerModel">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button class="filter-item" style="" type="primary" plain icon="el-icon-edit" @click="handleCreate">
                新增
              </el-button>
              <el-button class="filter-item" style="" type="primary" plain icon="el-icon-delete" @click="handleDel">
                删除
              </el-button>
            </div>
            <div class="text item">
              <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
                <el-form-item label="操作" prop="dialogStatus">
                  <el-input v-model="dialogStatus" disabled />
                </el-form-item>
                <el-form-item label="父亲姓名" prop="pusername">
                  <el-input v-model="temp.pusername" disabled />
                </el-form-item>
                <el-form-item label="pid" prop="pid" v-show="false">
                  <el-input v-model="temp.pid" />
                </el-form-item>
                <el-form-item label="orgId" prop="orgId" v-show="false">
                  <el-input v-model="temp.orgId" />
                </el-form-item>
                <el-form-item label="userId" prop="userId" v-show="false">
                  <el-input v-model="temp.userId" />
                </el-form-item>
                <el-form-item label="姓名" prop="username">
                  <el-input v-model="temp.username" />
                </el-form-item>
                <el-form-item label="字号" prop="epithet">
                  <el-input v-model="temp.epithet" />
                </el-form-item>
                <el-form-item label="世系" prop="lineage">
                  <el-input v-model="temp.lineage" />
                </el-form-item>
                <el-form-item label="长次">
                  <el-select v-model="temp.elderOrder" class="filter-item" placeholder="请选择长次">
                    <el-option v-for="item in elderOrderOptions" :key="item.key" :label="item.value"
                      :value="item.key" />
                  </el-select>
                </el-form-item>
                <el-form-item label="妻子姓氏" prop="wifeLastname">
                  <el-input v-model="temp.wifeLastname" />
                </el-form-item>
              </el-form>
              <el-button type="primary" plain @click="dialogStatus === 'create' ? createData() : updateData()">
                确认
              </el-button>
              <el-button @click="resetTemp">
                重置
              </el-button>
            </div>
          </el-card>
        </el-aside>

        <el-main style=" border: 1px solid #eee" :style="{ height:treeHeight+'px'}">
          <div class="container">
            <div id="orgTree">
              <div class="text-center orgTree">
                <vue2-org-tree :data="data" :labelClassName="labelClassName" :horizontal="horizontal"
                  :collapsable="collapsable" :expandAll="expandAll" :render-content="renderContent"
                  :label-class-name="labelClassName" @on-expand="onExpand" @on-node-click="onNodeClick"></vue2-org-tree>
              </div>
            </div>
          </div>

        </el-main>
      </el-container>
    </el-container>
    <el-drawer title="title" :before-close="handleClose" :visible.sync="dialog" :with-header="false" direction="rtl"
      custom-class="demo-drawer" ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="temp">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button class="filter-item" style="" type="primary" plain icon="el-icon-edit" @click="handleCreate">
                新增
              </el-button>

              <el-button class="filter-item" style="" type="primary" plain icon="el-icon-delete" @click="handleDel">
                删除
              </el-button>
            </div>
            <div class="text item">
              <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
                style="width: 345px;">
                <el-form-item label="操作" prop="dialogStatus">
                  <el-input v-model="dialogStatus" disabled />
                </el-form-item>
                <el-form-item label="父亲姓名" prop="pusername">
                  <el-input v-model="temp.pusername" disabled />
                </el-form-item>
                <el-form-item label="pid" prop="pid" v-show="false">
                  <el-input v-model="temp.pid" />
                </el-form-item>
                <el-form-item label="orgId" prop="orgId" v-show="false">
                  <el-input v-model="temp.orgId" />
                </el-form-item>
                <el-form-item label="userId" prop="userId" v-show="false">
                  <el-input v-model="temp.userId" />
                </el-form-item>
                <el-form-item label="姓名" prop="username">
                  <el-input v-model="temp.username" />
                </el-form-item>
                <el-form-item label="字号" prop="epithet">
                  <el-input v-model="temp.epithet" />
                </el-form-item>
                <el-form-item label="世系" prop="lineage">
                  <el-input v-model="temp.lineage" />
                </el-form-item>
                <el-form-item label="长次">
                  <el-select v-model="temp.elderOrder" class="filter-item" placeholder="请选择长次">
                    <el-option v-for="item in elderOrderOptions" :key="item.key" :label="item.value"
                      :value="item.key" />
                  </el-select>
                </el-form-item>
                <el-form-item label="妻子姓氏" prop="wifeLastname">
                  <el-input v-model="temp.wifeLastname" />
                </el-form-item>
              </el-form>
              <el-button type="primary" plain @click="dialogStatus === 'create' ? createData() : updateData()">
                确认
              </el-button>
              <el-button @click="resetTemp">
                重置
              </el-button>
            </div>
          </el-card>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
var panzoom = require("panzoom");
export default {
  data() {
    return {
      dialogStatus: "edit",
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      dataList: [],
      temp: {
        orgId: "",
        pusername: "",
        pid: "",
        userId: "",
        username: "",
        epithet: "",
        lineage: "",
        elderOrder: "",
        wifeLastname: "",
        childOrder: ""
      },
      elderOrderOptions: [
        { key: 1, value: "长子" },
        { key: 2, value: "次子" },
        { key: 3, value: "三子" },
        { key: 4, value: "四子" },
        { key: 5, value: "幼子" }
      ],
      dialogFormVisible: false,
      data: {},
      horizontal: false,
      collapsable: true,
      expandAll: true,
      simpModel: true,
      drawerModel: false,
      labelClassName: "bg-white",
      dialog: false,
      loading: false,
      formLabelWidth: "80px",
      treeHeight: 600
    };
  },
  created() {
    this.getFenealList();
    this.toggleExpand(this.data, this.expandAll);
  },
  mounted() {
    this.getTreeHeight();
    // 增加监听事件，窗口变化时得到高度。
    window.addEventListener("resize", this.getTreeHeight, false);

    setTimeout(x => {
      this.initZoom();
    }, 500);
  },
  methods: {
    getTreeHeight() {
      // 获取浏览器高度并计算得到表格所用高度。
      this.treeHeight = document.documentElement.clientHeight - 60;
    },
    getFenealList() {
      let _this = this;
      let forever = [
        {
          lineage: "一世",
          childOrder: "1",
          epithet: "张1一",
          pid: "",
          userId: "1",
          orgId: "1",
          elderOrder: "长子",
          username: "张一一",
          wifeLastname: "李氏"
        },
        {
          lineage: "二世",
          childOrder: "2",
          epithet: "李2一",
          pid: "1",
          userId: "2",
          orgId: "2",
          elderOrder: "次子",
          username: "李二6",
          wifeLastname: "张氏"
        },
        {
          lineage: "3",
          childOrder: "1",
          epithet: "3",
          pid: "2",
          userId: "afb74338beb340b8886d8438aec9e73b",
          orgId: "4accc246e1ed421884c5fe17bccf157b",
          elderOrder: "长子",
          username: "3",
          wifeLastname: "4"
        },
        {
          lineage: "三世",
          childOrder: "2",
          epithet: "张3二",
          pid: "2",
          userId: "4",
          orgId: "4",
          elderOrder: "次子",
          username: "李三二",
          wifeLastname: "韩氏"
        },
        {
          lineage: "三世",
          childOrder: "5",
          epithet: "张3一",
          pid: "2",
          userId: "5",
          orgId: "5",
          elderOrder: "幼子",
          username: "张三一",
          wifeLastname: "牛氏"
        },
        {
          lineage: "一世",
          childOrder: "1",
          epithet: "张1一",
          pid: "3",
          userId: "1",
          orgId: "6",
          elderOrder: "长子",
          username: "张一一",
          wifeLastname: "李氏"
        },
        {
          lineage: "二世",
          childOrder: "2",
          epithet: "李2一",
          pid: "4",
          userId: "2",
          orgId: "7",
          elderOrder: "次子",
          username: "李二6",
          wifeLastname: "张氏"
        },
        {
          lineage: "三世",
          childOrder: "2",
          epithet: "张3二",
          pid: "6",
          userId: "4",
          orgId: "9",
          elderOrder: "次子",
          username: "李三二",
          wifeLastname: "韩氏"
        },
        {
          lineage: "7",
          childOrder: "1",
          epithet: "7",
          pid: "846d38589c3c41bb8d327253cadd1e45",
          userId: "d8c827305bc843abb9df213d59483783",
          orgId: "1979f0c500d84d5a8a5fa9102502a539",
          elderOrder: "长子",
          username: "7",
          wifeLastname: "7"
        },
        {
          lineage: "1",
          childOrder: "1",
          epithet: "1",
          pid: "d150e4c7b59f41e182d182b1c74ab5c8",
          userId: "923351a02e7d426fb7ed480ea2ffeeec",
          orgId: "180753347a9c430f943958f3092b4317",
          elderOrder: "长子",
          username: "1",
          wifeLastname: "1"
        },
        {
          lineage: "7",
          childOrder: "1",
          epithet: "苏7",
          pid: "d150e4c7b59f41e182d182b1c74ab5c8",
          userId: "e9a32a91e106467ead77e39c7119acf5",
          orgId: "59ccfc567192452dad0e9572047d7afc",
          elderOrder: "长子",
          username: "苏7",
          wifeLastname: "7"
        },
        {
          lineage: "7",
          childOrder: "1",
          epithet: "su7",
          pid: "d150e4c7b59f41e182d182b1c74ab5c8",
          userId: "d58afc39720549f29ff5501edd5e5231",
          orgId: "5d7a8faef7304bffa20fd4b25bf072c4",
          elderOrder: "长子",
          username: "su7",
          wifeLastname: "7"
        },
        {
          lineage: "7",
          childOrder: "1",
          epithet: "苏7",
          pid: "d150e4c7b59f41e182d182b1c74ab5c8",
          userId: "bbc466e0f578427588f886dcfea4b81e",
          orgId: "90dec6f2e9b440efb6d68cfae4345551",
          elderOrder: "长子",
          username: "苏6",
          wifeLastname: "苏"
        }
      ];
      let list = forever;
      _this.dataList = _this.arrDeepCopy(list);
      _this.parseTree(list, treeList => {
        _this.data = treeList[0];
        console.log(_this.data);
        this.toggleExpand(this.data, this.expandAll);
      });

      //   _this.axios
      //     .post("/api/formeal/genealogy/getFenealLists", params)
      //     .then(response => {
      //       let list = response.data.resData;
      //       _this.dataList = _this.arrDeepCopy(list);
      //       _this.parseTree(list, treeList => {
      //         _this.data = treeList[0];
      //         console.log(_this.data);
      //         this.toggleExpand(this.data, this.expandAll);
      //       });
      //     });
    },
    handleDel() {
      let _this = this;
      let params = this.temp;

      if (!params.pid) {
        this.$message.error("请选择节点删除");
        return;
      }
      this.$confirm("确定删除该数据及其子节点", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          _this.axios
            .post(_this.$store.state.apiUrl + "deleteData", params)
            .then(response => {
              if (response.data.code == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                  center: true
                });
                this.getFenealList();
              } else {
                this.$message({
                  message: "删除失败",
                  type: "warning",
                  center: true
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCreate() {
      this.dialogStatus = "create";
      // let pusername = this.temp.pusername;
      let username = this.temp.username;
      let orgId = this.temp.orgId;
      let pid = this.temp.pid;
      let userId = this.temp.userId;
      if (!pid) {
        this.$message.error("请选择节点新增");
        return;
      }
      this.temp = {
        pusername: "",
        pid: "",
        username: "",
        epithet: "",
        lineage: "",
        elderOrder: "",
        wifeLastname: ""
      };
      this.temp.pusername = username;
      this.temp.orgId = orgId;
      this.temp.pid = pid;
      this.temp.userId = userId;
    },
    createData() {
      let _this = this;
      let params = this.temp;
      params.childOrder = _this.getDicts(params.elderOrder);
      _this.axios
        .post(_this.$store.state.apiUrl + "createData", params)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
              center: true
            });
            _this.getFenealList();
          } else {
            this.$message({
              message: "修改失败",
              type: "warning",
              center: true
            });
          }
          this.dialog = false;
        });
    },
    updateData() {
      let _this = this;
      let params = this.temp;
      params.childOrder = _this.getDicts(params.elderOrder);
      _this.axios
        .post(_this.$store.state.apiUrl + "updateData", params)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
              center: true
            });
            _this.getFenealList();
          } else {
            this.$message({
              message: "修改失败",
              type: "warning",
              center: true
            });
          }
          this.dialog = false;
        });
    },
    handleEdit() {
      this.dialogStatus = "edit";
    },
    resetTemp() {
      this.temp = {
        orgId: "",
        pusername: "",
        pid: "",
        userId: "",
        username: "",
        epithet: "",
        lineage: "",
        elderOrder: "",
        wifeLastname: ""
      };
    },
    // eslint-disable-next-line no-unused-vars
    expandChange(data) {
      this.toggleExpand(this.data, this.expandAll);
    },
    simpModelChange(status) {
      this.simpModel = status;
    },
    drawerModelChange(status) {
      this.drawerModel = status;
    },
    handleClose(done) {
      done();
      // this.$confirm("确定要提交表单吗？")
      //   // eslint-disable-next-line no-unused-vars
      //   .then(_ => {
      //     this.loading = true;
      //     this.timer = setTimeout(() => {
      //       done();
      //       // 动画关闭需要一定的时间
      //       setTimeout(() => {
      //         this.loading = false;
      //       }, 400);
      //     }, 2000);
      //   })
      //   // eslint-disable-next-line no-unused-vars
      //   .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    renderContent(h, data) {
      data.elderOrder = this.getValue(data.elderOrder);
      if (!this.simpModel) {
        return data.username;
      } else {
        // 展示
        return (
          <div style="height: 100px;width:135px">
            <div style="">
              <span style="border-right:1px solid #ccc;padding: 7px;">
                {data.elderOrder}
              </span>
              <span style="padding: 7px;">{data.lineage}</span>
            </div>
            <div style="border:1px solid #ccc;margin-top: 7px;">
              <div style="float: left;padding: 7px 3px;border-right:1px solid #ccc;width: 78px;">
                <div style="border-bottom:1px solid #ccc;padding: 7px 3px;">
                  {data.epithet}
                </div>
                <div style="padding: 7px 3px;">{data.username}</div>
              </div>
              <div style="float: right;width: 48px;">
                <span style="transform: translateY(120%);    float: left;margin: 9px 0px;">
                  {data.wifeLastname}
                </span>
              </div>
            </div>
          </div>
        );
      }
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    onNodeClick(e, data) {
      this.dialogStatus = "edit";
      if (this.drawerModel) {
        this.dialog = true;
      }

      let _this = this;
      _this.temp = data;

      _this.temp.pusername = _this.dataList.find(
        item => item.userId === data.pid
      )
        ? _this.dataList.find(item => item.userId === data.pid).username
        : "";
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }

        child.children && _this.collapse(child.children);
      });
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },
    parseTree(list, callback, targetList) {
      let _this = this;
      // 如果节点有断裂, 提前结束递归, 以防止无限递归发生
      let crack = false;
      if (targetList) {
        // 非根节点
        let ids = targetList.map(item => item.orgId);
        let index = 0;
        while (index < list.length) {
          _this.parseTree.stackIndexSize++;
          // eslint-disable-next-line no-unused-vars
          const { pid, orgId } = list[index];
          // 寻找匹配关系
          const indexof = ids.indexOf(pid);
          if (indexof !== -1) {
            crack = true;
            const listData = list.splice(index, 1)[0];
            const children = [];
            targetList[indexof].children.push({ ...listData, children });
          } else {
            index++;
          }
        }

        // 数据分批处理
        if (
          _this.parseTree.stackIndexSize <
          (_this.parseTree.maxStackSize || 50000)
        ) {
          targetList.forEach(({ children }) =>
            _this.parseTree(list, callback, children)
          );
        } else {
          requestAnimationFrame(() => {
            targetList.forEach(({ children }) =>
              _this.parseTree(list, callback, children)
            );
          });
        }
      } else {
        // 根节点
        // 根节点不需要匹配关系, 无pid即可
        // 根节点与非根节点区分, 以达到性能最优
        targetList = [];

        let index = 0;
        while (index < list.length) {
          // eslint-disable-next-line no-unused-vars
          const { pid, orgId } = list[index];
          if (!pid) {
            const listData = list.splice(index, 1)[0];
            const children = [];
            crack = true;
            targetList.push({ ...listData, children });
          } else {
            index++;
          }
        }

        _this.parseTree.stackIndexSize = 0;
        _this.parseTree.targetList = targetList;
        _this.parseTree.callback = callback;
        _this.parseTree(list, callback, targetList);
      }

      if (!list.length || crack) {
        _this.parseTree.callback &&
          _this.parseTree.callback(_this.parseTree.targetList);
        _this.parseTree.callback = null;
      }
    },
    arrDeepCopy(source) {
      var sourceCopy = [];
      for (var item in source)
        sourceCopy[item] =
          typeof source[item] === "object"
            ? this.arrDeepCopy(source[item])
            : source[item];

      return sourceCopy;
    },
    getDicts(val) {
      // let elderOrder = this.getDicts(data.elderOrder);
      for (var item of this.elderOrderOptions) {
        // item代表数组里面的元素
        if (item.value == val) {
          return item.key;
        }
      }
      return val;
    },
    getValue(key) {
      // let elderOrder = this.getDicts(data.elderOrder);
      for (var item of this.elderOrderOptions) {
        // item代表数组里面的元素
        if (item.key == key) {
          return item.value;
        }
      }
      return key;
    }, //   截取图片
    setImage() {
      this.initZoom();
      setTimeout(x => {
        this.capture();
      }, 500);
    },
    capture() {
      let that = this;
      var canvas2 = document.createElement("canvas");
      let _canvas = document.getElementsByClassName("org-tree-container");
      _canvas = _canvas[0];
      var w = parseInt(window.getComputedStyle(_canvas).width);
      var h = parseInt(window.getComputedStyle(_canvas).height);
      // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
      canvas2.width = w * 2.5;
      canvas2.height = h * 2.5;
      canvas2.style.width = w + "px";
      canvas2.style.height = h + "px";
      // 可以按照自己的需求，对context的参数修改,translate指的是偏移量
      var context = canvas2.getContext("2d");
      context.scale(2, 2);
      html2canvas(document.getElementById("orgTree"), {
        canvas: canvas2
      }).then(function(canvas) {
        that.saveAs(canvas.toDataURL("image/pdf"), "orgchart.png");
      });
    },
    saveAs(uri, filename) {
      var link = document.createElement("a");
      if (typeof link.download === "string") {
        link.href = uri;
        link.download = filename;
        // Firefox requires the link to be in the body
        document.body.appendChild(link);
        // simulate click
        link.click();
        // remove the link when done
        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
    },
    resetOrg(data) {
      // 如果子节点很多，根节点折叠时效果很差，
      if (data.deptlevel === "1") this.moveZoom();
    },
    // 拖动页面
    moveZoom(deptId) {
      var pos;
      if (deptId) {
        pos = this.departmentIsVisible(deptId).moveTo;
      } else {
        pos = { x: 0, y: 0 };
      }
      this.zoomInstance.moveTo(pos.x, pos.y);
    },
    // 初始化zoom
    initZoom(deptId) {
      var area = document.querySelector("#orgTree");
      //   if (this.zoomInstance) this.zoomInstance.dispose()
      this.zoomInstance = panzoom(area, {
        smoothScroll: false,
        maxZoom: 1,
        minZoom: 0.3
      });
      var pos;
      if (deptId) {
        pos = this.departmentIsVisible(deptId).moveTo;
      } else {
        pos = { x: 0, y: 0 };
      }
      this.zoomInstance.moveTo(pos.x, pos.y);
      let _this = this;
      // 移动或缩放结束
      this.zoomInstance.on("panend", function(e) {
        _this.isDrag = true;
        setTimeout(x => {
          _this.isDrag = false;
        }, 200);
      });
    },
    departmentIsVisible(deptId) {
      var el = document.getElementById("ID_" + deptId);
      var pr = document.getElementById("orgTree");
      var elb = el.getBoundingClientRect();
      var prb = pr.getBoundingClientRect();
      var windim = { w: window.innerWidth, h: window.innerHeight - 100 };
      var relpos = {
        y: prb.top - elb.top + 0.5 * windim.h,
        x: prb.left - elb.left + 0.5 * windim.w - 300
      };
      relpos.y = relpos.y > 0 ? 0 : relpos.y;

      var isVissible = !(
        elb.bottom < 0 ||
        elb.right < 300 ||
        elb.left > window.innerWidth ||
        elb.top > window.innerHeight
      );

      return { isVissible: isVissible, moveTo: relpos };
    }
  }
};
</script>

<style scoped>
.container {
  overflow: auto;
  overflow-x: hidden;
  overflow-y: hidden;
}
.line {
  text-align: center;
}
.orgTree {
  /* height: calc(100%); */
}
</style>
