<template>
  <div class="chatBoot">
    <div @click="inView = true" class="fixed_badge">
      <span><Icon name="cib:hipchat" /></span>
      <h5 class="ma-0">Chat With Us</h5>
    </div>

    <main :class="{ inView: inView }" class="main">
      <header class="header">
        <span><Icon size="50" name="cib:hipchat" /></span>
        <div class="text">
          <h5 class="ma-0">Chat With Us</h5>
          <span class="para">online</span>
        </div>
        <span @click="inView = false" class="close"
          ><Icon color="red" name="ci:chat-circle-close"
        /></span>
      </header>

      <div class="wrapper">
        <ChatBootView :messages="messages" class="flex-grow-1" />
        <ChatBootFooter @send_message="send_message" />
      </div>
    </main>
  </div>
</template>

<script setup>
const inView = ref(false);

const messages = ref([
  {
    id: 1,
    content: "مرحبًا، أنا مساعدك الذكي في خدمة العملاء لـ سمح العقارية.",
    type: "text",
    position: "other",
    sender: {
      image: "/Temp/slider_3.png",
    },
  },
]);

const send_message = (message) => {
  messages.value.push(message);
};
</script>

<style lang="scss" scoped>
.chatBoot {
  .fixed_badge {
    position: fixed;
    bottom: 10px;
    right: 15px; //RTL
    z-index: 9991;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: var(--main_bg);
    border-radius: 25px;
    box-shadow: 0px 0px 10px var(--shadow_dark);
    padding: 10px 20px;
    cursor: pointer;

    svg.icon {
      color: var(--primary);
    }

    h5 {
      font-weight: 400;
    }
  }

  main.main {
    position: fixed;
    bottom: 10px;
    right: 15px; //RTL
    z-index: 9992;
    width: 320px;
    height: 500px;
    background-color: var(--main_bg);
    transform: translateY(120%);
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 0px 10px var(--shadow_dark);
    border-radius: 15px;

    &.inView {
      transform: translateY(0%);
    }

    header.header {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid var(--border);
      height: 75px;
      padding-inline: 15px;

      svg.icon {
        color: var(--primary);
      }

      .text {
        line-height: 19px;

        span {
          font-size: 13px;
        }
      }

      .close {
        position: absolute;
        top: 5px;
        left: 5px;
        cursor: pointer;
      }
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      height: calc(100% - 75px);
    }
  }
}
</style>
