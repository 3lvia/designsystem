<template>
  <h1 class="e-title-md">Popover</h1>
  <p class="e-text-md">Check that the screen reader works.</p>
  <elvia-popover :type="'list'" :verticalPosition="'bottom'">
    <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="More menu">
      <span class="e-btn__icon">
        <i class="e-icon e-icon--information_circle" aria-hidden="true"></i>
        <i class="e-icon e-icon e-icon--information_circle-filled-color" aria-hidden="true"></i>
      </span>
    </button>
    <div slot="content" class="ewc-popover__list">
      <div class="ewc-popover__list-group">
        <h1>Kundeforhold</h1>
        <button>
          <span>Be om tilgang</span>
        </button>
        <button>
          <span>Legg til bruker</span>
        </button>
      </div>
      <div class="ewc-popover__list-group">
        <h1>Innlogging</h1>
        <a>
          <span>Endre passord</span>
        </a>
        <a>
          <span>To-faktor autentisering</span>
        </a>
      </div>
    </div>
  </elvia-popover>
</template>
