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
          <el-checkbox
            v-model="drawerModel"
            label="1"
            @change="drawerModelChange"
          >
            抽屉模式
          </el-checkbox>
        </div>
      </el-header>
      <el-container>
        <el-aside width="380px" v-show="!drawerModel">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button
                class="filter-item"
                style=""
                type="primary"
                plain
                icon="el-icon-edit"
                @click="handleCreate"
              >
                新增
              </el-button>

              <el-button
                class="filter-item"
                style=""
                type="primary"
                plain
                icon="el-icon-delete"
                @click="handleDel"
              >
                删除
              </el-button>
            </div>
            <div class="text item">
              <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="left"
                label-width="70px"
              >
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
                  <el-select
                    v-model="temp.elderOrder"
                    class="filter-item"
                    placeholder="请选择长次"
                  >
                    <el-option
                      v-for="item in elderOrderOptions"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="妻子姓氏" prop="wifeLastname">
                  <el-input v-model="temp.wifeLastname" />
                </el-form-item>
              </el-form>
              <el-button
                type="primary"
                plain
                @click="dialogStatus === 'create' ? createData() : updateData()"
              >
                确认
              </el-button>
              <el-button @click="resetTemp">
                重置
              </el-button>
            </div>
          </el-card>
        </el-aside>

        <el-main
          style="height: 850px;width:4500px;overflow-x: scroll; border: 1px solid #eee"
        >
          <div class="tree-progress">
            <Tree
              ref="treeContainer"
              orientation="vertical"
              :initData="dataList"
              :translate="translate"
              :collapsible="expandAll"
              :separation="separation"
              pathFunc="straight"
            >
              <template slot-scope="scope">
                <div class="base-node member">
                  <div class="main">
                    <div class="elderOrder">
                      次子
                    </div>
                    <div class="lineage">二十三世</div>
                  </div>
                  <div class="content">
                    <div class="uname">
                      <div class="username">张三丰</div>
                      <div class="epithet">张无忌</div>
                    </div>
                    <div class="wifeLastname">韩氏</div>
                  </div>
                </div>
              </template>
            </Tree>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer
      title="title"
      :before-close="handleClose"
      :visible.sync="dialog"
      :with-header="false"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="temp">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button
                class="filter-item"
                style=""
                type="primary"
                plain
                icon="el-icon-edit"
                @click="handleCreate"
              >
                新增
              </el-button>

              <el-button
                class="filter-item"
                style=""
                type="primary"
                plain
                icon="el-icon-delete"
                @click="handleDel"
              >
                删除
              </el-button>
            </div>
            <div class="text item">
              <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="left"
                label-width="70px"
                style="width: 345px;"
              >
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
                  <el-select
                    v-model="temp.elderOrder"
                    class="filter-item"
                    placeholder="请选择长次"
                  >
                    <el-option
                      v-for="item in elderOrderOptions"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="妻子姓氏" prop="wifeLastname">
                  <el-input v-model="temp.wifeLastname" />
                </el-form-item>
              </el-form>
              <el-button
                type="primary"
                plain
                @click="dialogStatus === 'create' ? createData() : updateData()"
              >
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
import Tree from "../../components/tree/Tree.vue";
import "../../style/tree.scss";
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
      dataList: [],
      expandAll: true,
      simpModel: true,
      drawerModel: false,
      labelClassName: "bg-white",
      dialog: false,
      loading: false,
      formLabelWidth: "80px",
      translate: {
        x: 600,
        y: 60
      },
      separation: { siblings: 1.2, nonSiblings: 1.2 },
      dataTree: [
        {
          name: "Henry",
          attributes: {
            title: "研发部leader"
          },
          children: [
            {
              name: "JACK",
              attributes: {
                title: "研发总监"
              },
              children: [
                {
                  name: "Jane",
                  attributes: {
                    title: "web开发"
                  }
                },
                {
                  name: "Bill",
                  attributes: {
                    title: "ios开发"
                  }
                },
                {
                  name: "John",
                  attributes: {
                    title: "android开发"
                  }
                }
              ]
            },
            {
              name: "Amy",
              attributes: {
                title: "设计总监"
              },
              children: [
                {
                  name: "Sunny",
                  attributes: {
                    title: "UI设计师"
                  }
                },
                {
                  name: "Emma",
                  attributes: {
                    title: "UI设计师"
                  }
                }
              ]
            },
            {
              name: "Julie",
              attributes: {
                title: "产品总监"
              },
              children: [
                {
                  name: "Michael",
                  attributes: {
                    title: "产品经理"
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    Tree
  },
  created() {
    this.getFenealList();
    this.toggleExpand(this.data, this.expandAll);
  },
  methods: {
    getFenealList() {
      let _this = this;
      let params = { "": "" };

      _this.axios
        .post(_this.$store.state.apiUrl + "getFenealLists", params)
        .then(response => {
          let list = response.data.resData;
          _this.dataList = _this.arrDeepCopy(list);
          _this.parseTree(list, treeList => {
            _this.data = treeList[0];
            console.log(_this.data);
            this.toggleExpand(this.data, this.expandAll);
          });
        });
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
    },
    setTreeCenter() {
      const dimensions = this.$refs.treeContainer.$el.getBoundingClientRect();
      this.translate = {
        x: dimensions.width / 2,
        y: 100
      };
    },
    handleClick(scope) {
      console.log(scope);
    },
    pathFunc(linkData, start, end) {
      return "M" + end.x + "," + end.y + " " + start.x + "," + start.y;
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
