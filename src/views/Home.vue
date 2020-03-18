<template>
  <div class="home">
    <TwoLadies />
    <NumberedInfo
      digit="1"
      color="light"
      title="Lorem"
      text="consectetur adipiscing elit"
      aligndigit="left"
    />
    <NumberedInfo
      digit="2"
      color="medium"
      title="Lorem"
      text="consectetur adipiscing elit"
      aligndigit="right"
    />
    <NumberedInfo
      digit="3"
      color="dark"
      title="Lorem"
      text="consectetur adipiscing elit"
      aligndigit="left"
    />
    <ButtonLink link="/voor-de-ondernemer" linktext="Ja, dit wil ik ook" />
    <ButtonLink link="iwillhelp" linktext="Ja, ik wil helpen" />
  </div>
</template>

<script>
import TwoLadies from "@/components/TwoLadies.vue";
import NumberedInfo from "@/components/NumberedInfo.vue";
import ButtonLink from "@/components/ButtonLink.vue";

export default {
  name: "Home",
  components: {
    TwoLadies,
    NumberedInfo,
    ButtonLink
  }
};
</script>
