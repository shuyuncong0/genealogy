<template>
  <div class="tree-progress">
    <Tree
      ref="treeContainer"
      orientation="vertical"
      :initData="data"
      :translate="translate"
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
</template>

<script>
import Tree from "../../components/tree/Tree.vue";
// import Tree from "../components/Tree";
import "../../style/tree.scss";
export default {
  name: "horizontal",
  data() {
    return {
      data: [
        {
          name: "Henry",
          attributes: {
            title: "研发部leader",
            photo:
              "http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658"
          },
          children: [
            {
              name: "JACK",
              attributes: {
                title: "研发总监",
                photo:
                  "http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658"
              },
              children: [
                {
                  name: "Jane",
                  attributes: {
                    title: "web开发",
                    photo:
                      "http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658"
                  }
                },
                {
                  name: "Bill",
                  attributes: {
                    title: "ios开发",
                    photo:
                      "http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658"
                  }
                },
                {
                  name: "John",
                  attributes: {
                    title: "android开发",
                    photo:
                      "http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658"
                  }
                }
              ]
            },
            {
              name: "Amy",
              attributes: {
                title: "设计总监",
                photo:
                  "http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658"
              },
              children: [
                {
                  name: "Sunny",
                  attributes: {
                    title: "UI设计师",
                    photo:
                      "http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658"
                  }
                },
                {
                  name: "Emma",
                  attributes: {
                    title: "UI设计师",
                    photo:
                      "http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658"
                  }
                }
              ]
            },
            {
              name: "Julie",
              attributes: {
                title: "产品总监",
                photo:
                  "http://img.hb.aicdn.com/0e7c6aee0cc058724c8f40ce28794575d4b1e2a412ed8-E76e7h_fw658"
              },
              children: [
                {
                  name: "Michael",
                  attributes: {
                    title: "产品经理",
                    photo:
                      "http://img.hb.aicdn.com/0788a51b27ba8db84f61d95249725475d5396f20119ac-HVge7P_fw658"
                  }
                }
              ]
            }
          ]
        }
      ],
      translate: {
        x: 0,
        y: 0
      },
      separation: { siblings: 1.2, nonSiblings: 1.2 }
    };
  },
  components: {
    Tree
  },
  // components: {
  //   Tree
  // },
  methods: {
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
  },
  mounted() {
    this.setTreeCenter();
  }
};
</script>
