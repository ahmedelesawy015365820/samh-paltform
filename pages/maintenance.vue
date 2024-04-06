<template>
  <div class="maintenance_page">
    <div class="content">
      <Logo
        :big="true"
        fixed_src="/images/Logo/logo_big.png"
        fixed_theme="light"
        class="mx-auto mb-10"
      />
      <h1>Coming Soon</h1>
      <h2 class="d-flex flex-column justify-center">
        <span class="days">{{
          time.s + " : " + time.m + " : " + time.h + " : " + time.d
        }}</span>
        <div class="d-block mt-5 d-flex justify-center flex-row-reverse ga-3">
          <span>{{ time.d }}</span>
          <span>Days Left</span>
        </div>
      </h2>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "maintenance",
});

const over = ref(false);
const time = ref({
  d: 0,
  h: 0,
  m: 0,
  s: 0,
});

const startCounter = (targetDate) => {
  const targetTime = new Date(targetDate).getTime();

  const intervalId = ref(null);

  const mainLogic = () => {
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      over.value = true;
      clearInterval(intervalId.value);
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    time.value = {
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  // IIfe
  (function () {
    mainLogic();
  })();
  intervalId.value = setInterval(mainLogic, 1000);
};

onMounted(() => {
  startCounter("2024-04-21");
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lemon&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lemon&display=swap");
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Skew {
  0% {
    transform: scale(0.9) skew(0deg);
  }
  100% {
    transform: scale(1) skew(10deg);
  }
}

body {
  padding: 0;
}

.maintenance_page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 8s ease infinite;

  .content {
    text-align: center;
    color: white;
    max-width: 98%;

    img {
      animation: Skew 3s ease infinite alternate;
    }

    h1 {
      font-family: "Lemon", serif;
      font-size: 60px;
    }

    h2 {
      font-size: 40px;
      font-family: "Dancing Script", cursive;
    }
  }

  @media (max-width: 700px) {
    img {
      height: 163px;
      display: block;
    }

    h1 {
      font-size: 29px;
    }
    h3 {
      font-size: 20px;
    }
  }
}
</style>
