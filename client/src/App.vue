<template>
  <div id="app" class="h-screen flex">
    <Sidebar />
    <Chat />
  </div>
</template>

<script>
import Chat from "@/components/Chat";
import Sidebar from '@/components/Sidebar'
export default {
  components: { Sidebar, Chat }
};
</script>
