/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    WA.room.area.onEnter("clock").subscribe(() => {
      const today = new Date();

      // Get the current time for each time zone
      const portugalTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Lisbon",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(today);
      const angolaTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Luanda",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(today);
      const mozambiqueTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Maputo",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(today);
      const brazilTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Sao_Paulo",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(today);

      // Create the popup content with the times for each zone
      const popupContent = `
    Portugal: ${portugalTime}
    Angola: ${angolaTime}
    Moçambique: ${mozambiqueTime}
    Brasil: ${brazilTime}
  `;

      // Open the popup with the formatted time information
      currentPopup = WA.ui.openPopup("clockPopup", popupContent, []);
    });

    WA.room.area.onLeave("clock").subscribe(closePopup);

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

function closePopup() {
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}

export {};
