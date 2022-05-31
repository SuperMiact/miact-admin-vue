<template>
    <div id="userName" style="text-align:center;float: left;padding: 50px">
        <p>{{ message }}</p>
        <p>{{5+5}}</p>
        <p>{{ok?"yes":"no"}}</p>
        <p>{{ message.split('').reverse().join('') }}</p>
        <p v-if="result">查看</p>
        <a v-bind:href="url">链接</a>
        <ol>
          <li v-for="site in sites" :key="site.id">
              {{ site.name }}
          </li>
        </ol>
        <button v-on:click="count += 1">加1</button>
        <p>被点击 {{ count }} 次</p> -->
        <input v-model.trim="message" placeholder="请输入">
        <p>消息是： {{message}}</p>

        <p>{{message2}}</p>
        <textarea v-model="message2" placeholder="请输入"></textarea>

        <p style="font-size:25px;">计数器：{{ products.id }}</p>
        <button @click="products.id++" style="font-size:25px">点我</button> -->

        <!-- 激活的菜单样式为  active 类 -->
        <!-- 为了阻止链接在点击时跳转，我们使用了 "prevent" 修饰符 (preventDefault 的简称)。 -->
        <nav v-bind:class="active" v-on:click.prevent>
            <!-- 当菜单上的链接被点击时，我们调用了 makeActive 方法, 该方法在 Vue 实例中创建。 -->
            <a href="#" class="home" v-on:click="makeActive('home')">Home</a>
            <a href="#" class="projects" v-on:click="makeActive('projects')">Projects</a>
            <a href="#" class="services" v-on:click="makeActive('services')">Services</a>
            <a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>
        </nav>
        <!-- 以下 "active" 变量会根据当前选中的值来自动变换 -->
        <p>您选择了 <b>{{active}} 菜单</b></p>
    </div>
</template>
<script>
export default {
  name: 'TemplateStudy',
  data () {
    return {
      message: 'a b c',
      message2: 'cba\r\nhello',
      ok: true,
      result: true,
      url: 'www.miact.cn',
      sites: [
        {id: 1, name: 'aaa'},
        {id: 2, name: 'bbb'},
        {id: 3, name: 'ccc'}
      ],
      count: 0,
      products: {'id': 1, 'name': 'book', 'price': '20.00'},
      active: 'home'
    }
  },
  methods: {
    makeActive (item) {
      this.active = item
    }
  }
}
</script>
