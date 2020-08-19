<template>
  <div class="home">
    <Chat></Chat>
  </div>
</template>

<script>
// @ is an alias to /src

import Chat from '@/components/Chat'
export default {
  name: "Home",
  components: { Chat }
};
</script>
