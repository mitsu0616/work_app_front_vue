import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useWorkAppStore = defineStore("workApp", () => {
  const user_id = ref("");

  const setUserId = (input) => {
    user_id.value = input;
  };

  const delUserId = () => {
    user_id.value = "";
  };

  return { user_id, setUserId, delUserId };
});
