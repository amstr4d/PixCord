<template>
  <div class="h-screen flex">
    <Sidebar></Sidebar>
    <Messages></Messages>
  </div>
</template>

<script>
// @ is an alias to /src

import Sidebar from '@/components/Sidebar';
import Messages from '@/components/Messages';

export default {
  name: 'Chat',
  components: { Messages, Sidebar },
};
</script>
