<template>
  <div class="card-container">
    <div id="head" class="card card-head">
      <div class="image" :style="{ 'background-image': `url(${photo})` }"></div>
      <div class="content">
        <h1>{{ name }}</h1>
        <p>{{ id }}</p>
      </div>
    </div>
    <div id="link" class="icon-list">
      <div class="icon" v-for="(contact, i) in contacts" :key="i">
        <a :href="contact.link" target="_blank"><font-awesome-icon :icon="contact.icon" /></a>
      </div>
    </div>
    <div id="about" class="card">
      <h2>關於我</h2>
      <p>你好，我是亮軒，台中一中高一學生。</p>
      <p>喜歡資訊類科</p>
    </div>
    <div id="skill" class="card">
      <h2>技能樹</h2>
      <div class="rate" v-for="(item, i) in skill" :key="i">
        <p>{{ item.name }}</p>
        <div class="bar" :class="`rate-${item.rate}`"></div>
      </div>
    </div>
    <div id="experience" class="card">
      <h2>經驗</h2>
      <div v-for="(item, i) in experience" :key="i">
        <p class="tag">{{ item.date }}</p>
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: 'Bentley Huang',
        id: '@bentley0928',
        photo: 'https://i.imgur.com/rmPdYCC.jpg',
        contacts: [
          {
            link: 'https://github.com/Bentley0928',
            icon: ['fab', 'github']
          },
          {
            link: 'bentley881@gmail.com',
            icon: ['fas', 'envelope']
          },
          {
            link: 'tel:+886966436957',
            icon: ['fas', 'phone']
          },
          {
            link: 'https://www.facebook.com/bentley0928',
            icon: ['fab', 'facebook-f']
          },
          {
            link: 'https://t.me/Bentley0928',
            icon: ['fab', 'telegram-plane']
          }
        ],
        skill: [
          {
            name: 'C++',
            rate: 4
          },
          {
            name: 'Python',
            rate: 2
          },
          {
            name: 'Security',
            rate: 1
          }
        ],
        experience: [
          {
            title: 'SITCON 2017 Camp學員',
            date: '2017'
          },
          {
            title: '通過中一中2018資訊學科能力競賽初選',
            date: '現任'
          },
          {
            title: 'SITCON 2018 與會者',
            date: '2018/3/10'
          }
        ]
      }
    }
  }
</script>
