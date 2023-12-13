<template>
    <div id="home-main">
        <header>
            <IBiBookmarkFill />
            <IBiGearFill />
        </header>
        <div id="home-content">

        </div>
    </div>
</template>
<script>
import { ref,defineComponent } from "vue";
import { getPosts } from '@/api';


export default defineComponent({
   name: "Home",
   setup() {
    chrome.bookmarks.getTree(function(bookmarkTree) {
        // 遍历整个书签树
        bookmarkTree.forEach(function(node) {
            processNode(node); // 处理每个节点
        });
    });

    function processNode(node) {
        if (node.children) {
            // 如果是一个文件夹节点，继续遍历其子节点
            node.children.forEach(function(childNode) {
                processNode(childNode);
            });
        } else {
            // 如果是一个书签节点，输出其标题和URL
            console.log("标题: " + node.title);
            console.log("URL: " + node.url);
        }
    }


    return {
    };
   }
});
</script>
<style scoped lang="less">
#home-main {
    @headerHeight: 50px;

    width: 100%;
    height: 100%;
    header {
        width: 100%;
        height: @headerHeight;
        background-color: #e38585;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @headerIconMargin: 20px;
        @headerIconColor: rgb(110, 110, 110);
        @headerIconFontSize:1.2rem;
        svg {
            color: @headerIconColor;
            font-size: @headerIconFontSize;
        }
        svg:nth-child(1) {
            margin-left: @headerIconMargin;
        }
        svg:nth-child(2) {
            margin-right: @headerIconMargin;
        }
    }
    #home-content {
        width: 100%;
        height: calc(100% - @headerHeight);
        background-color: #d0b7b7;
    }
}

</style>