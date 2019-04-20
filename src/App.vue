<template>
    <Layout id="app">
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
            <Menu :active-name="activeMenu" theme="dark" width="auto" :class="menuitemClasses" @on-select="select">
                <div class="big-title">Manager</div>
                <MenuItem name="home" >
                    <Icon type="ios-navigate"></Icon>
                    <span>Home</span>
                </MenuItem>
                <MenuItem name="user">
                    <Icon type="ios-search"></Icon>
                    <span>User</span>
                </MenuItem>
                <MenuItem name="book">
                    <Icon type="ios-settings"></Icon>
                    <span>Book</span>
                </MenuItem>
            </Menu>
            <div slot="trigger"></div>
        </Sider>
        <Layout>
            <Header class="layout-header-bar">
                <Breadcrumb>
                    <BreadcrumbItem v-for="(item, index) in $route.meta.bread" :key="index" :to="item.to" >{{ item.content }}</BreadcrumbItem>
                </Breadcrumb>
            </Header>
            <Content :style="{margin: '20px', background: '#fff', minHeight: '220px', marginTop: '85px'}">
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
</template>

<script>

export default {
    name: 'app',
    data () {
        return {
            isCollapsed: false,
            activeMenu: 'home',
        };
    },
    computed: {
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
    },
    methods: {
        select(item) {
            // console.log(item);
            this.$router.push({name: item});
        },
    },
    watch: {
        $route: function(newValue, oldValue) {
            console.log(newValue, oldValue);
            // console.log('this: ', this);
            this.activeMenu = newValue.name;
        },
    },
    created() {
        // watch&created => 保证面包屑&路径的 正确匹配
        this.activeMenu = this.$route.name;
    },
    components: {

    }
}
</script>

<style lang="less">
    html, body {
        height: 100%;
    }
    #app {
        height: 100%;
        .big-title {
            height: 64px;
            color: white;
            font-size: 36px;
            line-height: 64px;
            text-align: center;
        }
        .layout-header-bar{
            z-index: 100;
            width: 100%;
            position: fixed;
            background: #fff;
            box-shadow: 0 1px 1px rgba(0,0,0,.1);
        }
        .menu-item span{
            display: inline-block;
            overflow: hidden;
            width: 69px;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: bottom;
            transition: width .2s ease .2s;
        }
        .menu-item i{
            transform: translateX(0px);
            transition: font-size .2s ease, transform .2s ease;
            vertical-align: middle;
            font-size: 16px;
        }
        .collapsed-menu span{
            width: 0px;
            transition: width .2s ease;
        }
        .collapsed-menu i{
            transform: translateX(5px);
            transition: font-size .2s ease .2s, transform .2s ease .2s;
            vertical-align: middle;
            font-size: 22px;
        }
    }
</style>
