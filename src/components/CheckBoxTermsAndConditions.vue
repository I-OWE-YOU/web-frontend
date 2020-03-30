<template>
  <div class="d-flex justify-content-center p-3">
    <input
      id="termsAndConditions"
      class="mr-2"
      type="checkbox"
      @change="$emit('input', $event.target.checked)"
    />
    <label for="termsAndConditions">
      <span>
        ja, ik ga akkord met de
        <router-link to="/algemene-voorwaarden"
          >algemene voorwaarden</router-link
        >
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckBoxTermsAndConditions',
}
</script>
