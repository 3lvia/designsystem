<template>
  <h1 class="e-title-md">Popover</h1>
  <p class="e-text-md">Check that the screen reader works.</p>
  <elvia-popover
    heading="Om innlogging"
    content="All customers must use BankID for their first sign in on Min side. BankID ensures a safe and easy sign in to view customer information and consumption data. When you have signed in, you can choose to enable sign in via e-mail. This allows you to choose your preferred default sign in method for Min side."
  >
    <div slot="trigger">
      <button class="e-btn e-btn--tertiary">
        <span class="e-btn__title">About signing in</span>
        <span class="e-btn__icon">
          <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
        </span>
      </button>
    </div>
  </elvia-popover>
</template>
