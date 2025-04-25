   // Constants
   const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;-+/!?@#$%&*() ";
   const ANIMATION_DURATION = 180; // ms 
   const FLIP_TIMING = "cubic-bezier(0.34, 1.56, 0.64, 1)"; // Bouncy, realistic curve
   
   // State
   const state = {
      //  text: "FLUID ANIMATION",
      //  twoRowMode: false,
      //  isAnimating: false
      textRow1: "FLUID ANIMATION",
      textRow2: "IMMERSIVE DESIGN",
      isAnimating: false
   };
   
   // DOM Elements
   const elements = {
       row1: document.getElementById('row1'),
       row2: document.getElementById('row2'),
       phraseBtns: document.querySelectorAll('.phrase-btn'),
       textInput: document.getElementById('textInput'),
       animateBtn: document.getElementById('animateBtn'),
      //  toggleRowBtn: document.getElementById('toggleRowBtn')
   };
   
   // Create a single flap element
   const createFlap = () => {
       const flap = document.createElement('div');
       flap.className = 'flap';
       
       const flapTop = document.createElement('div');
       flapTop.className = 'flap-top';
       flapTop.textContent = ' ';
       
       const flapBottom = document.createElement('div');
       flapBottom.className = 'flap-bottom';
       flapBottom.textContent = ' ';
       
       const flapFlip = document.createElement('div');
       flapFlip.className = 'flap-flip';
       flapFlip.textContent = ' ';
       
       flap.append(flapTop, flapBottom, flapFlip);
       
       return flap;
   };
   
   // Initialize a row with flaps
   const initializeRow = (row, count) => {
       row.innerHTML = '';
       for (let i = 0; i < count; i++) {
           row.appendChild(createFlap());
       }
   };
   
   // Get random character from charset
   const getRandomChar = () => 
       CHARSET[Math.floor(Math.random() * CHARSET.length)];
   
   // Format text into one or two rows
  //  const formatTextForRows = (text) => {
  //      if (!state.twoRowMode) return [text];
       
  //      const middleIndex = Math.floor(text.length / 2);
  //      const spaceIndex = text.indexOf(' ', middleIndex - 5);
       
  //      if (spaceIndex === -1 || spaceIndex > middleIndex + 5) {
  //          return [
  //              text.substring(0, middleIndex).trim(),
  //              text.substring(middleIndex).trim()
  //          ];
  //      }
       
  //      return [
  //          text.substring(0, spaceIndex).trim(),
  //          text.substring(spaceIndex).trim()
  //      ];
  //  };
  const getRowsText = () => {
    return [state.textRow1, state.textRow2];
};
   
       // Animate a single flap
   const animateFlap = (flap, targetChar, delay, onComplete) => {
       const flapTop = flap.querySelector('.flap-top');
       const flapBottom = flap.querySelector('.flap-bottom');
       const flapFlip = flap.querySelector('.flap-flip');
       
       // Current character
       const currentChar = flapTop.textContent;
       
       // Skip animation if character is already correct
       if (currentChar === targetChar) {
           if (onComplete) onComplete();
           return;
       }
       
       // Random number of shuffles - more shuffles for more realism
       const shuffles = 4 + Math.floor(Math.random() * 6);
       
       // Create a physical sound effect
       const playFlapSound = () => {
           // This would normally use real audio, but we'll simulate it with timing
           setTimeout(() => {
               // You would trigger a short click/flap sound here
           }, ANIMATION_DURATION * 0.6); // Play sound just after the halfway point
       };
       
       // Animate through random characters
       const animateShuffles = (index) => {
           if (index > shuffles) {
               if (onComplete) onComplete();
               return;
           }
           
           // Select next character, with preference for characters similar to target
           // near the end of the shuffle for more realistic transition
           let nextChar;
           if (index === shuffles) {
               nextChar = targetChar;
           } else if (index > shuffles - 2) {
               // For last few shuffles, try to pick characters closer to target 
               // (in same part of alphabet)
               const targetIndex = CHARSET.indexOf(targetChar);
               if (targetIndex >= 0) {
                   const range = 5;
                   const minIndex = Math.max(0, targetIndex - range);
                   const maxIndex = Math.min(CHARSET.length - 1, targetIndex + range);
                   nextChar = CHARSET[minIndex + Math.floor(Math.random() * (maxIndex - minIndex))];
               } else {
                   nextChar = getRandomChar();
               }
           } else {
               nextChar = getRandomChar();
           }
           
           // Calculate slightly variable timing for more realism
           const variableDuration = ANIMATION_DURATION * (0.9 + Math.random() * 0.2);
           
           setTimeout(() => {
               // Flip animation
               flapFlip.textContent = currentChar;
               flapFlip.style.animation = 'none';
               void flapFlip.offsetWidth; // Force reflow
               flapFlip.style.animation = `flip ${variableDuration}ms ${FLIP_TIMING} forwards`;
               
               // Update bottom flap immediately
               flapBottom.textContent = nextChar;
               
               // Simulate physical sound
               if (index % 2 === 0) {
                   playFlapSound();
               }
               
               // Update top flap after two thirds of the animation
               setTimeout(() => {
                   flapTop.textContent = nextChar;
                   
                   // Slight pause between flips for mechanical feel
                   setTimeout(() => {
                       animateShuffles(index + 1);
                   }, variableDuration * 0.1);
                   
               }, variableDuration * 0.75);
               
           }, index === 0 ? delay : 0);
       };
       
       // Start animation
       animateShuffles(0);
   };
   
   // Animate all flaps for a text
  //  const animateText = (forceAll = false) => {
  //      if (state.isAnimating) return;
  //      state.isAnimating = true;
       
  //      // Format text for rows
  //      const textRows = formatTextForRows(state.text);
       
  //      // Show/hide second row based on mode
  //      elements.row2.classList.toggle('hidden', !state.twoRowMode);
       
  //      // Track animations for completion
  //      let pendingAnimations = 0;
       
  //      // For each row
  //      textRows.forEach((text, rowIndex) => {
  //          const row = rowIndex === 0 ? elements.row1 : elements.row2;
  //          const flaps = row.querySelectorAll('.flap');
           
  //          // Center text in row
  //          const padding = Math.floor((flaps.length - text.length) / 2);
           
  //          // Animate each flap in the row
  //          flaps.forEach((flap, i) => {
  //              // Determine target character
  //              let targetChar = ' ';
  //              const textIndex = i - padding;
  //              if (textIndex >= 0 && textIndex < text.length) {
  //                  targetChar = text[textIndex];
  //              }
               
  //              // Skip if character already matches and not forcing all
  //              if (!forceAll && flap.querySelector('.flap-top').textContent === targetChar) {
  //                  return;
  //              }
               
  //              // Track this animation
  //              pendingAnimations++;
               
  //              // Calculate delay with center-out pattern
  //              const distFromCenter = Math.abs(i - Math.floor(flaps.length / 2));
  //              const delay = distFromCenter * 30; // 30ms per unit from center
               
  //              // Animate this flap
  //              animateFlap(flap, targetChar, delay, () => {
  //                  pendingAnimations--;
  //                  if (pendingAnimations === 0) {
  //                      state.isAnimating = false;
  //                  }
  //              });
  //          });
  //      });
       
  //      // If no animations were needed, reset state
  //      if (pendingAnimations === 0) {
  //          state.isAnimating = false;
  //      }
  //  };
  const animateText = (forceAll = false) => {
    if (state.isAnimating) return;
    state.isAnimating = true;
    
    // Get text for rows
    const textRows = [state.textRow1, state.textRow2];
    
    // Track animations for completion
    let pendingAnimations = 0;
    
    // For each row
    textRows.forEach((text, rowIndex) => {
        const row = rowIndex === 0 ? elements.row1 : elements.row2;
        const flaps = row.querySelectorAll('.flap');
        
        // Center text in row
        const padding = Math.floor((flaps.length - text.length) / 2);
        
        // Animate each flap in the row
        flaps.forEach((flap, i) => {
            // Determine target character
            let targetChar = ' ';
            const textIndex = i - padding;
            if (textIndex >= 0 && textIndex < text.length) {
                targetChar = text[textIndex];
            }
            
            // Skip if character already matches and not forcing all
            if (!forceAll && flap.querySelector('.flap-top').textContent === targetChar) {
                return;
            }
            
            // Track this animation
            pendingAnimations++;
            
            // Calculate delay with center-out pattern
            const distFromCenter = Math.abs(i - Math.floor(flaps.length / 2));
            const delay = distFromCenter * 30; // 30ms per unit from center
            
            // Animate this flap
            animateFlap(flap, targetChar, delay, () => {
                pendingAnimations--;
                if (pendingAnimations === 0) {
                    state.isAnimating = false;
                }
            });
        });
    });
    
    // If no animations were needed, reset state
    if (pendingAnimations === 0) {
        state.isAnimating = false;
    }
};

   // Update text and UI
  //  const updateText = (text) => {
  //      state.text = text.toUpperCase();
  // Update text for row 1
const updateTextRow1 = (text) => {
  state.textRow1 = text.toUpperCase();
  
  // Update input if it doesn't match
  if (elements.textInputRow1.value.toUpperCase() !== state.textRow1) {
      elements.textInputRow1.value = state.textRow1;
  }
};

// Update text for row 2
const updateTextRow2 = (text) => {
  state.textRow2 = text.toUpperCase();
  
  // Update input if it doesn't match
  if (elements.textInputRow2.value.toUpperCase() !== state.textRow2) {
      elements.textInputRow2.value = state.textRow2;
  }
};
       
       // Update active button
       elements.phraseBtns.forEach(btn => {
           btn.classList.toggle('active', btn.dataset.text === state.text);
       });
       
       // Update input if it doesn't match
       if (elements.textInput.value.toUpperCase() !== state.text) {
           elements.textInput.value = state.text;
       }
   };
   
   // Add hover effects to flaps
   const addFlapHoverEffects = () => {
       document.querySelectorAll('.flap').forEach(flap => {
           flap.addEventListener('mouseenter', () => {
               if (state.isAnimating) return;
               
               const flapTop = flap.querySelector('.flap-top');
               const flapBottom = flap.querySelector('.flap-bottom');
               const flapFlip = flap.querySelector('.flap-flip');
               
               // Get current character
               const currentChar = flapTop.textContent;
               
               // Animate to a random character
               const randomChar = getRandomChar();
               
               // Quick flip animation
               flapFlip.textContent = currentChar;
               flapFlip.style.animation = 'none';
               void flapFlip.offsetWidth;
               flapFlip.style.animation = `flip ${ANIMATION_DURATION * 1.5}ms ${FLIP_TIMING} forwards`;
               
               // Update bottom flap
               flapBottom.textContent = randomChar;
               
               // Update top flap after animation
               setTimeout(() => {
                   flapTop.textContent = randomChar;
               }, ANIMATION_DURATION * 0.75);
           });
       });
   };
   
   // Initialize the display
   const initialize = () => {
       // Set up rows
       initializeRow(elements.row1, 18);
       initializeRow(elements.row2, 18);
       
       // Add hover effects
       addFlapHoverEffects();
       
       // Set initial text
       updateText("FLUID ANIMATION");
       
       // Trigger initial animation
       setTimeout(() => animateText(true), 500);
   };
   
   // Event Listeners
   elements.phraseBtns.forEach(btn => {
       btn.addEventListener('click', () => {
           updateText(btn.dataset.text);
           animateText(true);
       });
   });
   
   elements.textInput.addEventListener('input', () => {
       updateText(elements.textInput.value);
   });
   
   elements.animateBtn.addEventListener('click', () => {
       animateText(true);
   });
   
   elements.toggleRowBtn.addEventListener('click', () => {
       state.twoRowMode = !state.twoRowMode;
       animateText(true);
   });
   
   // Initialize when DOM is fully loaded
   document.addEventListener('DOMContentLoaded', initialize);
   
   // Run initialize immediately if document is already loaded
   if (document.readyState === 'complete' || document.readyState === 'interactive') {
       initialize();
   }