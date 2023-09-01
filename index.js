/*
 * Name: Anthony Balfour
 * Date: April 21, 2023
 * Section: CSE 154 AF
 *
 * This JS file handles the functionality of the image carousel on the seahawks page.
 * It responds to grabbing and scrolling the carousel, as well as clicking the
 * left and right brackets to scroll along the carousel. The user also has the option of adding
 * an image to the carousel.
 *
 * Used this tutorial as a source: https://www.youtube.com/watch?v=7HPsdVQhpRw&ab_channel=CodingNepal
 */

"use strict";

(function() {
  window.addEventListener("load", init);

  /** Initializes carousel functionality */
  function init() {
    carouselDrag(); // scrolling functionality
    carouselIconClick();
    addImage();
  }

  /**
   * Handles the functionality for dragging the carousel to scroll.
   * Grabbing the carousel allows the user to scroll to the left and right
   * till the end of the carousel of images.
   */
  function carouselDrag() {
    let carousel = document.getElementById("carousel");
    carousel.addEventListener("mousedown", startDrag);
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("mouseup", stopDrag);
    carousel.addEventListener("mouseleave", stopDrag);

    let isDragging = false;
    let startingPointerPosition;
    let startScrollPosition;

    /**
     * Handles the functionality for beginningg to drag the carousel. This is initialized
     * by pressing down the the mouse.
     * @param {Event} event - the current event, in this case mousedown
     */
    function startDrag(event) {
      isDragging = true;
      carousel.classList.add("grabbing");

      /*
       * setting the variable startingPointerPosition as the
       * current position of the pointer when starting to drag
       */

      startingPointerPosition = event.pageX;

      // scrolled amount from the left edge of the carousel element
      startScrollPosition = carousel.scrollLeft;
    }

    /**
     * Handles the functionality for dragging to scroll the carousel. This occurs as the user
     * is moving the mouse across the carousel
     * @param {Event} event - the current event, in this case mousemove
     */
    function dragging(event) {
      if (!isDragging) {
        return;
      }
      event.preventDefault();

      // current mouse position - starting point of grab
      let scrolledAmount = event.pageX - startingPointerPosition;

      // if scrolling to the right scrolledAmount is negative, so it adds to the startScrollPosition
      carousel.scrollLeft = startScrollPosition - scrolledAmount;
    }

    /**
     * Handles the functionality for stopping the dragging of the carousel. This occurs as the user
     * lets go of holding the mouse down, a "mouseup" event is attached to this function
     */
    function stopDrag() {
      carousel.classList.remove("grabbing");
      isDragging = false;
    }
  }

  /**
   * Handles the functionality for clicking the left and right icons next to the carousel.
   * The amount scrolled is the width of the images plus the gap between them. The icons
   * are always displayed even if the user is scrolled all the way to the left or right
   */
  function carouselIconClick() {
    let carousel = document.getElementById("carousel");
    const firstImg = document.querySelector("#carousel img");
    const arrowIcons = document.querySelectorAll("#carousel-wrapper span");
    const IMAGE_GAP = 20;
    let firstImgWidth = (firstImg.clientWidth + IMAGE_GAP);

    /**
     * Handles the functionality for scrolling to the right or left depending
     * on which icon was clicked respectively. Scrolls the length of the carousel image width
     * plus the gap between images
     */
    arrowIcons.forEach(icon => {
      icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
      });
    });
  }

  /**
   * Handles the functionality for adding an image to the carousel of images. The image
   * is added to the end of the carousel.
   */
  function addImage() {
    let extraImagePaths = ["pete-and-team.jpg", "geno.jpg"];
    let carousel = document.getElementById("carousel");
    let button = document.querySelector("button");
    let i = 0;

    /**
     * Adds an image to the end of the carousel of images. The two possible
     * images are one of Pete Carroll and the team, and a picture of Geno Smith excited
     */
    button.addEventListener("click", () => {
      let newImg = document.createElement("img");
      if (i < extraImagePaths.length) {
        newImg.src = "assets/" + extraImagePaths[i];
        newImg.classList.add("carousel-img");
        newImg.alt = extraImagePaths[i].startsWith("pete") ?
          "Pete Carroll and the team" : "Geno Smith excited";
      }
      i++;
      carousel.appendChild(newImg);
    });
  }
})();