// List of checklist questions
const questions = [
  "Do you have an authenticator set up?",
  "Do you have a legal entity set up?",
  "Do you have a payment method set up?",
  "Are you connected to any customers?",
  "Is your payment method linked to your customer?",
  "Are there any invoices in draft status?",
  "Are you getting an error when trying to submit an invoice?",
  "Are there any invoices that are disputed or rejected?",
];

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', createChecklist);
window.addEventListener('load', createChecklist);

// Only create the checklist once
let checklistCreated = false;

// Main function to create and display the checklist
function createChecklist() {
  if (checklistCreated || !document.body) return;
  checklistCreated = true;
  
  // Create the checklist container
  const checklistContainer = document.createElement('div');
  checklistContainer.id = 'coupa-checklist';
  checklistContainer.className = 'retro';
  
  // Create header
  const header = document.createElement('div');
  header.className = 'checklist-header';
  header.innerHTML = `
    <div class="header-content" style="display: flex; align-items: center;">
      <span class="drag-grip"></span>
      <h2>Coupa Supplier Checklist</h2>
    </div>
    <div class="header-controls">
      <div class="theme-toggle">
        <label>
          <input type="checkbox" id="theme-toggle-checkbox">
          <span class="toggle-label">Modern UI</span>
        </label>
      </div>
      <div class="minimize-button">_</div>
    </div>
  `;
  
  // Create checklist content
  const checklistContent = document.createElement('div');
  checklistContent.className = 'checklist-content';
  
  // Only add the first question initially
  const firstQuestion = createQuestionElement(0);
  if (firstQuestion) {
    checklistContent.appendChild(firstQuestion);
  }
  
  // Add header and content to container
  checklistContainer.appendChild(header);
  checklistContainer.appendChild(checklistContent);
  
  // Add to page
  document.body.appendChild(checklistContainer);
  
  // Add event listeners
  addEventListeners(checklistContainer);


  // Add a single event delegation listener for No/Yes buttons
  checklistContainer.addEventListener('click', function(e) {
    // Check if a "No" button was clicked
    if (e.target && e.target.classList.contains('no-btn')) {
      const questionDiv = e.target.closest('.question');
      if (!questionDiv) return;
      const index = parseInt(questionDiv.getAttribute('data-index'), 10);

      // Authenticator (first question)
      if (index === 0) {
        const profileMenu = document.getElementById('my_account_top_nav');
        if (!profileMenu) return;
        profileMenu.classList.add('highlight-red');
        if (!document.getElementById('auth-instruction')) {
          const rect = profileMenu.getBoundingClientRect();
          const instruction = document.createElement('div');
          instruction.id = 'auth-instruction';
          instruction.style.position = 'absolute';
          instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
          instruction.style.top = (window.scrollY + rect.top) + 'px';
          instruction.style.width = '250px';
          instruction.style.background = 'white';
          instruction.style.border = '2px solid red';
          instruction.style.borderRadius = '6px';
          instruction.style.padding = '10px';
          instruction.style.color = 'red';
          instruction.style.fontWeight = 'bold';
          instruction.style.zIndex = 10001;
          instruction.style.boxShadow = '0 0 8px 2px red';
          instruction.innerText = 'Click here and select Account Settings to set up your authenticator.';
          document.body.appendChild(instruction);
        }
        profileMenu.addEventListener('click', function handler() {
          profileMenu.classList.remove('highlight-red');
          const instr = document.getElementById('auth-instruction');
          if (instr) instr.remove();
          profileMenu.removeEventListener('click', handler);
        });
      }

      // Legal Entity (second question)
      if (index === 1) {
        // Delay to allow for dynamic rendering
        setTimeout(function() {
          if (window.location.pathname === '/profile/business_profile') {
            // On Business Profile page, highlight Legal Entities
            const legalEntitiesLink = document.querySelector('a[data-id="legal_entities"]');
            if (legalEntitiesLink && !document.getElementById('le-instruction')) {
              // Highlight the link
              legalEntitiesLink.style.backgroundColor = 'yellow';
              legalEntitiesLink.style.border = '2px solid red';
              legalEntitiesLink.style.borderRadius = '6px';

              // Get position
              const rect = legalEntitiesLink.getBoundingClientRect();

              // Create popup
              const instruction = document.createElement('div');
              instruction.id = 'le-instruction';
              instruction.style.position = 'absolute';
              instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
              instruction.style.top = (window.scrollY + rect.top) + 'px';
              instruction.style.background = 'white';
              instruction.style.border = '2px solid red';
              instruction.style.borderRadius = '6px';
              instruction.style.padding = '10px';
              instruction.style.color = 'red';
              instruction.style.fontWeight = 'bold';
              instruction.style.zIndex = 10001;
              instruction.innerText = 'Click here to setup and manage your Legal Entities';
              document.body.appendChild(instruction);

              // Cleanup on click
              const cleanup = function() {
                legalEntitiesLink.style.backgroundColor = '';
                legalEntitiesLink.style.border = '';
                legalEntitiesLink.style.borderRadius = '';
                const instr = document.getElementById('le-instruction');
                if (instr) instr.remove();
                legalEntitiesLink.removeEventListener('click', cleanup);
              };
              legalEntitiesLink.addEventListener('click', cleanup);
            }
          } else {
            // Find the 'Business Profile' link by text
            const anchors = document.querySelectorAll('a');
            let businessProfileLink = null;
            anchors.forEach(a => {
              if (a.textContent.trim().toLowerCase() === 'business profile') {
                businessProfileLink = a;
              }
            });
            if (businessProfileLink && !document.getElementById('bp-instruction')) {
              // Highlight the link
              businessProfileLink.style.backgroundColor = 'yellow';
              businessProfileLink.style.border = '2px solid red';
              businessProfileLink.style.borderRadius = '6px';

              // Get position
              const rect = businessProfileLink.getBoundingClientRect();

              // Create popup
              const instruction = document.createElement('div');
              instruction.id = 'bp-instruction';
              instruction.style.position = 'absolute';
              instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
              instruction.style.top = (window.scrollY + rect.top) + 'px';
              instruction.style.background = 'white';
              instruction.style.border = '2px solid red';
              instruction.style.borderRadius = '6px';
              instruction.style.padding = '10px';
              instruction.style.color = 'red';
              instruction.style.fontWeight = 'bold';
              instruction.style.zIndex = 10001;
              instruction.innerText = 'Please click here and select "Legal entity" to set up a legal entity';
              document.body.appendChild(instruction);

              // Cleanup on click
              const cleanup = function() {
                businessProfileLink.style.backgroundColor = '';
                businessProfileLink.style.border = '';
                businessProfileLink.style.borderRadius = '';
                const instr = document.getElementById('bp-instruction');
                if (instr) instr.remove();
                businessProfileLink.removeEventListener('click', cleanup);
              };
              businessProfileLink.addEventListener('click', cleanup);
            }
          }
        }, 500);
      }

      // Payment Method (third question)
      if (index === 2) {
        setTimeout(function() {
          if (window.location.pathname === '/profile/business_profile') {
            // On Business Profile page, highlight Payment Methods
            const paymentMethodsLink = document.querySelector('a[data-id="payment_methods"]');
            if (paymentMethodsLink && !document.getElementById('pm-instruction')) {
              // Highlight the link
              paymentMethodsLink.style.backgroundColor = 'yellow';
              paymentMethodsLink.style.border = '2px solid red';
              paymentMethodsLink.style.borderRadius = '6px';

              // Get position
              const rect = paymentMethodsLink.getBoundingClientRect();

              // Create popup
              const instruction = document.createElement('div');
              instruction.id = 'pm-instruction';
              instruction.style.position = 'absolute';
              instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
              instruction.style.top = (window.scrollY + rect.top) + 'px';
              instruction.style.background = 'white';
              instruction.style.border = '2px solid red';
              instruction.style.borderRadius = '6px';
              instruction.style.padding = '10px';
              instruction.style.color = 'red';
              instruction.style.fontWeight = 'bold';
              instruction.style.zIndex = 10001;
              instruction.innerText = 'Click here to setup and manage your Payment Methods';
              document.body.appendChild(instruction);

              // Cleanup on click
              const cleanup = function() {
                paymentMethodsLink.style.backgroundColor = '';
                paymentMethodsLink.style.border = '';
                paymentMethodsLink.style.borderRadius = '';
                const instr = document.getElementById('pm-instruction');
                if (instr) instr.remove();
                paymentMethodsLink.removeEventListener('click', cleanup);
              };
              paymentMethodsLink.addEventListener('click', cleanup);
            }
          } else {
            // On any other page, highlight Business Profile
            const anchors = document.querySelectorAll('a');
            let businessProfileLink = null;
            anchors.forEach(a => {
              if (a.textContent.trim().toLowerCase() === 'business profile') {
                businessProfileLink = a;
              }
            });
            if (businessProfileLink && !document.getElementById('pm-instruction')) {
              // Highlight the link
              businessProfileLink.style.backgroundColor = 'yellow';
              businessProfileLink.style.border = '2px solid red';
              businessProfileLink.style.borderRadius = '6px';

              // Get position
              const rect = businessProfileLink.getBoundingClientRect();

              // Create popup
              const instruction = document.createElement('div');
              instruction.id = 'pm-instruction';
              instruction.style.position = 'absolute';
              instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
              instruction.style.top = (window.scrollY + rect.top) + 'px';
              instruction.style.background = 'white';
              instruction.style.border = '2px solid red';
              instruction.style.borderRadius = '6px';
              instruction.style.padding = '10px';
              instruction.style.color = 'red';
              instruction.style.fontWeight = 'bold';
              instruction.style.zIndex = 10001;
              instruction.innerText = 'Click here to set up Payment method';
              document.body.appendChild(instruction);

              // Cleanup on click
              const cleanup = function() {
                businessProfileLink.style.backgroundColor = '';
                businessProfileLink.style.border = '';
                businessProfileLink.style.borderRadius = '';
                const instr = document.getElementById('pm-instruction');
                if (instr) instr.remove();
                businessProfileLink.removeEventListener('click', cleanup);
              };
              businessProfileLink.addEventListener('click', cleanup);
            }
          }
        }, 500);
      }

      // Connection Requests (fourth question)
      if (index === 3) {
        setTimeout(function() {
          // Always check the path at the time of click
          if (window.location.pathname === '/employees/') {
            // On Employees page, highlight Connection Requests ONLY
            const anchors = document.querySelectorAll('a');
            let connectionRequestsLink = null;
            anchors.forEach(a => {
              if (a.textContent.trim().toLowerCase() === 'connection requests') {
                connectionRequestsLink = a;
              }
            });
            if (connectionRequestsLink && !document.getElementById('cr-instruction')) {
              // Highlight the link
              connectionRequestsLink.style.backgroundColor = 'yellow';
              connectionRequestsLink.style.border = '2px solid red';
              connectionRequestsLink.style.borderRadius = '6px';
              connectionRequestsLink.style.color = '';

              // Get position
              const rect = connectionRequestsLink.getBoundingClientRect();

              // Create popup
              const instruction = document.createElement('div');
              instruction.id = 'cr-instruction';
              instruction.style.position = 'absolute';
              instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
              instruction.style.top = (window.scrollY + rect.top) + 'px';
              instruction.style.background = 'white';
              instruction.style.border = '2px solid red';
              instruction.style.borderRadius = '6px';
              instruction.style.padding = '10px';
              instruction.style.color = 'red';
              instruction.style.fontWeight = 'bold';
              instruction.style.zIndex = 10001;
              instruction.innerText = 'Click here to manage your Connection Requests';
              document.body.appendChild(instruction);

              // Cleanup on click
              const cleanup = function() {
                connectionRequestsLink.style.backgroundColor = '';
                connectionRequestsLink.style.border = '';
                connectionRequestsLink.style.borderRadius = '';
                connectionRequestsLink.style.color = '';
                const instr = document.getElementById('cr-instruction');
                if (instr) instr.remove();
                connectionRequestsLink.removeEventListener('click', cleanup);
              };
              connectionRequestsLink.addEventListener('click', cleanup);
            }
          } else {
            // On any other page, highlight Setup
            const anchors = document.querySelectorAll('a');
            let setupLink = null;
            anchors.forEach(a => {
              if (a.textContent.trim().toLowerCase() === 'setup') {
                setupLink = a;
              }
            });
            if (setupLink && !document.getElementById('cr-instruction')) {
              // Highlight the link
              setupLink.style.backgroundColor = 'yellow';
              setupLink.style.border = '2px solid red';
              setupLink.style.borderRadius = '6px';
              setupLink.style.color = 'black';

              // Get position
              const rect = setupLink.getBoundingClientRect();

              // Create popup
              const instruction = document.createElement('div');
              instruction.id = 'cr-instruction';
              instruction.style.position = 'absolute';
              instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
              instruction.style.top = (window.scrollY + rect.top) + 'px';
              instruction.style.background = 'white';
              instruction.style.border = '2px solid red';
              instruction.style.borderRadius = '6px';
              instruction.style.padding = '10px';
              instruction.style.color = 'red';
              instruction.style.fontWeight = 'bold';
              instruction.style.zIndex = 10001;
              instruction.innerText = 'Click here to Request a connection';
              document.body.appendChild(instruction);

              // Cleanup on click
              const cleanup = function() {
                setupLink.style.backgroundColor = '';
                setupLink.style.border = '';
                setupLink.style.borderRadius = '';
                setupLink.style.color = '';
                const instr = document.getElementById('cr-instruction');
                if (instr) instr.remove();
                setupLink.removeEventListener('click', cleanup);
              };
              setupLink.addEventListener('click', cleanup);
            }
          }
        }, 500);
        // YES logic: remove highlight/popup for Setup and Connection Requests
        // (This is outside the setTimeout to ensure it always runs on click)
        if (e.target.classList.contains('yes-btn')) {
          const anchors = document.querySelectorAll('a');
          let setupLink = null;
          let connectionRequestsLink = null;
          anchors.forEach(a => {
            if (a.textContent.trim().toLowerCase() === 'setup') {
              setupLink = a;
            }
            if (a.textContent.trim().toLowerCase() === 'connection requests') {
              connectionRequestsLink = a;
            }
          });
          if (setupLink) {
            setupLink.style.backgroundColor = '';
            setupLink.style.border = '';
            setupLink.style.borderRadius = '';
            setupLink.style.color = '';
          }
          if (connectionRequestsLink) {
            connectionRequestsLink.style.backgroundColor = '';
            connectionRequestsLink.style.border = '';
            connectionRequestsLink.style.borderRadius = '';
            connectionRequestsLink.style.color = '';
          }
          const crInstr = document.getElementById('cr-instruction');
          if (crInstr) crInstr.remove();
        }
      }

      // Payment Method linked to Customer (fifth question)
      if (index === 4) {
        setTimeout(function() {
          const path = window.location.pathname;
          // If NOT on /profile, /profile/business_profile, or /coupa_pay/payment_methods, highlight Business Profile link
          if (
            path !== '/profile' &&
            path !== '/profile/business_profile' &&
            path !== '/coupa_pay/payment_methods'
          ) {
            const anchors = document.querySelectorAll('a');
            let businessProfileLink = null;
            anchors.forEach(a => {
              if (a.textContent.trim().toLowerCase() === 'business profile') {
                businessProfileLink = a;
              }
            });
            if (businessProfileLink && !document.getElementById('bp-instruction-q5')) {
              businessProfileLink.style.backgroundColor = 'yellow';
              businessProfileLink.style.border = '2px solid red';
              businessProfileLink.style.borderRadius = '6px';
              // Get position
              const rect = businessProfileLink.getBoundingClientRect();
              // Create popup
              const instruction = document.createElement('div');
              instruction.id = 'bp-instruction-q5';
              instruction.style.position = 'absolute';
              instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
              instruction.style.top = (window.scrollY + rect.top) + 'px';
              instruction.style.background = 'white';
              instruction.style.border = '2px solid red';
              instruction.style.borderRadius = '6px';
              instruction.style.padding = '10px';
              instruction.style.color = 'red';
              instruction.style.fontWeight = 'bold';
              instruction.style.zIndex = 10001;
              instruction.innerText = 'Click here to go to Payment Methods';
              document.body.appendChild(instruction);
              // Cleanup on click
              const cleanup = function() {
                businessProfileLink.style.backgroundColor = '';
                businessProfileLink.style.border = '';
                businessProfileLink.style.borderRadius = '';
                const instr = document.getElementById('bp-instruction-q5');
                if (instr) instr.remove();
                businessProfileLink.removeEventListener('click', cleanup);
              };
              businessProfileLink.addEventListener('click', cleanup);
            }
            return;
          }
          // If on /profile or /profile/business_profile, only highlight Payment Methods tab/link
          if (path === '/profile' || path === '/profile/business_profile') {
            const paymentMethodsLink = document.querySelector('a[data-id="payment_methods"]');
            if (paymentMethodsLink && !document.getElementById('pm-instruction-q5')) {
              paymentMethodsLink.style.backgroundColor = 'yellow';
              paymentMethodsLink.style.border = '2px solid red';
              paymentMethodsLink.style.borderRadius = '6px';
              // Get position
              const rect = paymentMethodsLink.getBoundingClientRect();
              // Create popup
              const instruction = document.createElement('div');
              instruction.id = 'pm-instruction-q5';
              instruction.style.position = 'absolute';
              instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
              instruction.style.top = (window.scrollY + rect.top) + 'px';
              instruction.style.background = 'white';
              instruction.style.border = '2px solid red';
              instruction.style.borderRadius = '6px';
              instruction.style.padding = '10px';
              instruction.style.color = 'red';
              instruction.style.fontWeight = 'bold';
              instruction.style.zIndex = 10001;
              instruction.innerText = 'Click here to view Payment Methods';
              document.body.appendChild(instruction);
              // Cleanup on click
              const cleanup = function() {
                paymentMethodsLink.style.backgroundColor = '';
                paymentMethodsLink.style.border = '';
                paymentMethodsLink.style.borderRadius = '';
                const instr = document.getElementById('pm-instruction-q5');
                if (instr) instr.remove();
                paymentMethodsLink.removeEventListener('click', cleanup);
              };
              paymentMethodsLink.addEventListener('click', cleanup);
            }
            return;
          }
          // If on /coupa_pay/payment_methods, only show pointer/arrow and popup for chain icon
          if (path === '/coupa_pay/payment_methods') {
            const shareBtn = document.querySelector('button[aria-label="Share Payment Method"]');
            if (shareBtn && !document.getElementById('link-arrow-q5')) {
              // Get position
              const rect = shareBtn.getBoundingClientRect();
              // Create arrow (pointing up)
              const arrow = document.createElement('div');
              arrow.id = 'link-arrow-q5';
              arrow.style.position = 'absolute';
              arrow.style.left = (window.scrollX + rect.left + rect.width / 2 - 10) + 'px';
              arrow.style.top = (window.scrollY + rect.bottom + 5) + 'px';
              arrow.style.width = '0';
              arrow.style.height = '0';
              arrow.style.borderLeft = '10px solid transparent';
              arrow.style.borderRight = '10px solid transparent';
              arrow.style.borderBottom = '20px solid red';
              arrow.style.borderTop = 'none';
              arrow.style.zIndex = 10002;
              document.body.appendChild(arrow);
              // Create popup
              const popup = document.createElement('div');
              popup.id = 'link-popup-q5';
              popup.style.position = 'absolute';
              popup.style.left = (window.scrollX + rect.left + rect.width / 2 - 100) + 'px';
              popup.style.top = (window.scrollY + rect.bottom + 30) + 'px';
              popup.style.background = 'white';
              popup.style.border = '2px solid red';
              popup.style.borderRadius = '6px';
              popup.style.padding = '10px';
              popup.style.color = 'red';
              popup.style.fontWeight = 'bold';
              popup.style.zIndex = 10003;
              popup.innerText = 'Click this icon to link your customer';
              document.body.appendChild(popup);
              // Cleanup on click
              const cleanup = function() {
                const arr = document.getElementById('link-arrow-q5');
                if (arr) arr.remove();
                const pop = document.getElementById('link-popup-q5');
                if (pop) pop.remove();
                shareBtn.removeEventListener('click', cleanup);
              };
              shareBtn.addEventListener('click', cleanup);
            }
          }
        }, 500);
      }

      // Invoices (sixth question)
      if (index === 5) {
        if (e.target && e.target.classList.contains('no-btn')) {
          removeInvoicesHighlightAndPopup();
        } else if (e.target && e.target.classList.contains('yes-btn')) {
          setTimeout(function() {
            addInvoicesHighlightAndPopup();
          }, 10); // Short timeout to allow DOM update
        }
      }

      // Error question (seventh question)
      if (index === 6) {
        if (e.target && e.target.classList.contains('no-btn')) {
          removeInvoicesHighlightAndPopup();
        } else if (e.target && e.target.classList.contains('yes-btn')) {
          setTimeout(function() {
            addInvoicesHighlightAndPopup();
          }, 10); // Short timeout to allow DOM update
        }
      }

      // Disputed/Rejected Invoices (eighth question)
      if (index === 7) {
        if (e.target && e.target.classList.contains('no-btn')) {
          removeInvoicesHighlightAndPopup();
        } else if (e.target && e.target.classList.contains('yes-btn')) {
          setTimeout(function() {
            addInvoicesHighlightAndPopup();
          }, 10); // Short timeout to allow DOM update
        }
      }
    }

    // Remove highlight/instruction if "Yes" is clicked
    if (e.target && e.target.classList.contains('yes-btn')) {
      const questionDiv = e.target.closest('.question');
      if (!questionDiv) return;
      const index = parseInt(questionDiv.getAttribute('data-index'), 10);

      if (index === 0) {
        const profileMenu = document.getElementById('my_account_top_nav');
        if (profileMenu) profileMenu.classList.remove('highlight-red');
        const instr = document.getElementById('auth-instruction');
        if (instr) instr.remove();
      }
      if (index === 1) {
        // Remove highlight/popup for Business Profile
        const anchors = document.querySelectorAll('a');
        let businessProfileLink = null;
        anchors.forEach(a => {
          if (a.textContent.trim().toLowerCase() === 'business profile') {
            businessProfileLink = a;
          }
        });
        if (businessProfileLink) {
          businessProfileLink.style.backgroundColor = '';
          businessProfileLink.style.border = '';
          businessProfileLink.style.borderRadius = '';
        }
        const bpInstr = document.getElementById('bp-instruction');
        if (bpInstr) bpInstr.remove();

        // Remove highlight/popup for Legal Entities
        const legalEntitiesLink = document.querySelector('a[data-id="legal_entities"]');
        if (legalEntitiesLink) {
          legalEntitiesLink.style.backgroundColor = '';
          legalEntitiesLink.style.border = '';
          legalEntitiesLink.style.borderRadius = '';
        }
        const leInstr = document.getElementById('le-instruction');
        if (leInstr) leInstr.remove();
      }
      if (index === 2) {
        // Remove highlight/popup for Payment Methods and Business Profile
        const paymentMethodsLink = document.querySelector('a[data-id="payment_methods"]');
        if (paymentMethodsLink) {
          paymentMethodsLink.style.backgroundColor = '';
          paymentMethodsLink.style.border = '';
          paymentMethodsLink.style.borderRadius = '';
        }
        const businessProfileAnchors = document.querySelectorAll('a');
        let businessProfileLink = null;
        businessProfileAnchors.forEach(a => {
          if (a.textContent.trim().toLowerCase() === 'business profile') {
            businessProfileLink = a;
          }
        });
        if (businessProfileLink) {
          businessProfileLink.style.backgroundColor = '';
          businessProfileLink.style.border = '';
          businessProfileLink.style.borderRadius = '';
        }
        const pmInstr = document.getElementById('pm-instruction');
        if (pmInstr) pmInstr.remove();
      }
      if (index === 3) {
        // Remove highlight/popup for Setup and Connection Requests
        const anchors = document.querySelectorAll('a');
        let setupLink = null;
        let connectionRequestsLink = null;
        anchors.forEach(a => {
          if (a.textContent.trim().toLowerCase() === 'setup') {
            setupLink = a;
          }
          if (a.textContent.trim().toLowerCase() === 'connection requests') {
            connectionRequestsLink = a;
          }
        });
        if (setupLink) {
          setupLink.style.backgroundColor = '';
          setupLink.style.border = '';
          setupLink.style.borderRadius = '';
          setupLink.style.color = '';
        }
        if (connectionRequestsLink) {
          connectionRequestsLink.style.backgroundColor = '';
          connectionRequestsLink.style.border = '';
          connectionRequestsLink.style.borderRadius = '';
          connectionRequestsLink.style.color = '';
        }
        const crInstr = document.getElementById('cr-instruction');
        if (crInstr) crInstr.remove();
      }
      if (index === 4) {
        // Remove pointer/arrow and popup for Q5
        const arr = document.getElementById('link-arrow-q5');
        if (arr) arr.remove();
        const pop = document.getElementById('link-popup-q5');
        if (pop) pop.remove();
        // Remove highlight/popup for Business Profile and Payment Methods
        const anchors = document.querySelectorAll('a');
        let businessProfileLink = null;
        anchors.forEach(a => {
          if (a.textContent.trim().toLowerCase() === 'business profile') {
            businessProfileLink = a;
          }
        });
        if (businessProfileLink) {
          businessProfileLink.style.backgroundColor = '';
          businessProfileLink.style.border = '';
          businessProfileLink.style.borderRadius = '';
        }
        const bpInstr = document.getElementById('bp-instruction-q5');
        if (bpInstr) bpInstr.remove();
        const paymentMethodsLink = document.querySelector('a[data-id="payment_methods"]');
        if (paymentMethodsLink) {
          paymentMethodsLink.style.backgroundColor = '';
          paymentMethodsLink.style.border = '';
          paymentMethodsLink.style.borderRadius = '';
        }
        const pmInstr = document.getElementById('pm-instruction-q5');
        if (pmInstr) pmInstr.remove();
      }
      if (index === 5 || index === 6 || index === 7) {
        // Show highlight/popup for Invoices when clicking Yes
        const anchors = document.querySelectorAll('a');
        let invoicesLink = null;
        anchors.forEach(a => {
          if (a.textContent.trim().toLowerCase() === 'invoices') {
            invoicesLink = a;
          }
        });
        if (invoicesLink && !document.getElementById('invoices-instruction')) {
          // Highlight the link
          invoicesLink.style.backgroundColor = 'yellow';
          invoicesLink.style.border = '2px solid red';
          invoicesLink.style.borderRadius = '6px';

          // Get position
          const rect = invoicesLink.getBoundingClientRect();

          // Create popup
          const instruction = document.createElement('div');
          instruction.id = 'invoices-instruction';
          instruction.style.position = 'absolute';
          instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
          instruction.style.top = (window.scrollY + rect.top) + 'px';
          instruction.style.background = 'white';
          instruction.style.border = '2px solid red';
          instruction.style.borderRadius = '6px';
          instruction.style.padding = '10px';
          instruction.style.color = 'red';
          instruction.style.fontWeight = 'bold';
          instruction.style.zIndex = 10001;
          instruction.innerText = 'Click here to view and manage your invoices';
          document.body.appendChild(instruction);

          // Cleanup on click
          const cleanup = function() {
            removeInvoicesHighlightAndPopup();
            invoicesLink.removeEventListener('click', cleanup);
          };
          invoicesLink.addEventListener('click', cleanup);
        }
      }
    }
  });
}

// Function to add all event listeners to the checklist
function addEventListeners(checklistContainer) {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle-checkbox');
  if (themeToggle) {
    themeToggle.addEventListener('change', function(e) {
      if (e.target.checked) {
        checklistContainer.className = 'modern';
      } else {
        checklistContainer.className = 'retro';
      }
    });
  }
  
  // Minimize functionality
  const minimizeButton = document.querySelector('.minimize-button');
  if (minimizeButton) {
    minimizeButton.addEventListener('click', function() {
      const content = document.querySelector('.checklist-content');
      if (content.style.display === 'none') {
        content.style.display = 'block';
        this.textContent = '_';
      } else {
        content.style.display = 'none';
        this.textContent = '+';
      }
    });
  }
  
  // Make the checklist draggable
  makeDraggable(checklistContainer);
}

// Function to create a question element
function createQuestionElement(index) {
  if (index >= questions.length) {
    return null;
  }
  
  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.setAttribute('data-index', index);
  
  questionDiv.innerHTML = `
    <p>${questions[index]}</p>
    <div class="buttons">
      <button class="yes-btn">Yes</button>
      <button class="no-btn">No</button>
    </div>
  `;
  
  // Add event listeners to buttons
  const yesBtn = questionDiv.querySelector('.yes-btn');
  const noBtn = questionDiv.querySelector('.no-btn');
  
  if (yesBtn) {
    yesBtn.addEventListener('click', function() {
      handleAnswer(index, 'yes');
    });
  }
  
  if (noBtn) {
    noBtn.addEventListener('click', function() {
      handleAnswer(index, 'no');
    });
  }
  
  return questionDiv;
}

// Function to handle answers
function handleAnswer(index, answer) {
  const currentQuestion = document.querySelector(`.question[data-index="${index}"]`);
  if (!currentQuestion) return;
  
  // Update question class
  currentQuestion.classList.remove('answered-yes', 'answered-no');
  currentQuestion.classList.add(answer === 'yes' ? 'answered-yes' : 'answered-no');
  
  // Update the button styles to show selection
  const yesBtn = currentQuestion.querySelector('.yes-btn');
  const noBtn = currentQuestion.querySelector('.no-btn');
  
  if (yesBtn) yesBtn.classList.remove('selected');
  if (noBtn) noBtn.classList.remove('selected');
  
  if (answer === 'yes' && yesBtn) {
    yesBtn.classList.add('selected');
  } else if (answer === 'no' && noBtn) {
    noBtn.classList.add('selected');
  }
  
  // Show next question if it doesn't already exist
  const nextIndex = index + 1;
  if (nextIndex < questions.length) {
    // Remove any existing questions after the current one
    const allQuestions = document.querySelectorAll('.question');
    allQuestions.forEach(q => {
      const qIndex = parseInt(q.getAttribute('data-index'), 10);
      if (qIndex > index) {
        q.remove();
      }
    });
    
    // Create and add the next question
    const nextQuestion = createQuestionElement(nextIndex);
    const content = document.querySelector('.checklist-content');
    if (nextQuestion && content) {
      content.appendChild(nextQuestion);
    }
  } else {
    // All questions have been shown
    const existingCompletion = document.querySelector('.completion');
    if (!existingCompletion) {
      const completionMessage = document.createElement('div');
      completionMessage.className = 'completion';
      completionMessage.innerHTML = `
        <p>Checklist completed! You should now be better prepared to use the Coupa Supplier Portal.</p>
        <p>If you have any other questions please use the chat function below (Real humans not AI)</p>
        <button id="reset-checklist" style="
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #4CAF50;
          color: black;
          border: 2px solid #2E7D32;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        ">Reset Checklist</button>
      `;
      const content = document.querySelector('.checklist-content');
      if (content) {
        content.appendChild(completionMessage);
        
        // Add reset functionality
        const resetButton = completionMessage.querySelector('#reset-checklist');
        if (resetButton) {
          resetButton.addEventListener('click', function() {
            // Remove all questions
            const questions = document.querySelectorAll('.question');
            questions.forEach(q => q.remove());
            
            // Remove completion message
            completionMessage.remove();
            
            // Reset checklistCreated flag
            checklistCreated = false;
            
            // Create new checklist
            createChecklist();
          });
        }
      }
    }
  }
}

// Function to make the checklist draggable
function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, startX = 0, startY = 0, dragging = false;

  const header = element.querySelector('.checklist-header');
  if (header) {
    header.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    dragging = true;
    // Calculate the offset between mouse and element top-left
    startX = e.clientX;
    startY = e.clientY;
    const rect = element.getBoundingClientRect();
    offsetX = startX - rect.left;
    offsetY = startY - rect.top;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    // Visual feedback
    header.style.cursor = 'grabbing';
  }

  function elementDrag(e) {
    if (!dragging) return;
    e.preventDefault();
    // Move the element to follow the mouse, minus the initial offset
    element.style.left = (e.clientX - offsetX) + "px";
    element.style.top = (e.clientY - offsetY) + "px";
    element.style.right = "auto"; // Prevent right from interfering
  }

  function closeDragElement() {
    dragging = false;
    document.onmouseup = null;
    document.onmousemove = null;
    if (header) header.style.cursor = 'grab';
  }
}

// Helper to find the Invoices link by text
function getInvoicesLink() {
  const anchors = document.querySelectorAll('a');
  let invoicesLink = null;
  anchors.forEach(a => {
    if (a.textContent.trim().toLowerCase() === 'invoices') {
      invoicesLink = a;
    }
  });
  return invoicesLink;
}

// Helper to remove highlight and popup from Invoices
function removeInvoicesHighlightAndPopup() {
  const invoicesLink = getInvoicesLink();
  if (invoicesLink) {
    invoicesLink.style.backgroundColor = '';
    invoicesLink.style.border = '';
    invoicesLink.style.borderRadius = '';
  }
  const invoicesInstr = document.getElementById('invoices-instruction');
  if (invoicesInstr) invoicesInstr.remove();
}

// Helper to add highlight and popup to Invoices
function addInvoicesHighlightAndPopup() {
  removeInvoicesHighlightAndPopup(); // Always clear first
  const invoicesLink = getInvoicesLink();
  if (invoicesLink && !document.getElementById('invoices-instruction')) {
    invoicesLink.style.backgroundColor = 'yellow';
    invoicesLink.style.border = '2px solid red';
    invoicesLink.style.borderRadius = '6px';
    const rect = invoicesLink.getBoundingClientRect();
    const instruction = document.createElement('div');
    instruction.id = 'invoices-instruction';
    instruction.style.position = 'absolute';
    instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
    instruction.style.top = (window.scrollY + rect.top) + 'px';
    instruction.style.background = 'white';
    instruction.style.border = '2px solid red';
    instruction.style.borderRadius = '6px';
    instruction.style.padding = '10px';
    instruction.style.color = 'red';
    instruction.style.fontWeight = 'bold';
    instruction.style.zIndex = 10001;
    instruction.innerText = 'Click here to view and manage your invoices';
    document.body.appendChild(instruction);
    // Cleanup on click
    const cleanup = function() {
      removeInvoicesHighlightAndPopup();
      invoicesLink.removeEventListener('click', cleanup);
    };
    invoicesLink.addEventListener('click', cleanup);
  }
}

// Remove static test code. Add popup for 'No' on second question (Legal Entity)
document.addEventListener('DOMContentLoaded', function() {
  // Delegate click event for checklist container
  document.body.addEventListener('click', function(e) {
    // Check if a 'No' button for the second question was clicked
    if (e.target && e.target.classList.contains('no-btn')) {
      const questionDiv = e.target.closest('.question');
      if (!questionDiv) return;
      const index = parseInt(questionDiv.getAttribute('data-index'), 10);
      if (index === 1) {
        // Find the 'Business Profile' link by text
        const anchors = document.querySelectorAll('a');
        let businessProfileLink = null;
        anchors.forEach(a => {
          if (a.textContent.trim().toLowerCase() === 'business profile') {
            businessProfileLink = a;
          }
        });
        if (businessProfileLink && !document.getElementById('bp-instruction')) {
          // Highlight the link
          businessProfileLink.style.backgroundColor = 'yellow';
          businessProfileLink.style.border = '2px solid red';
          businessProfileLink.style.borderRadius = '6px';

          // Get position
          const rect = businessProfileLink.getBoundingClientRect();

          // Create popup
          const instruction = document.createElement('div');
          instruction.id = 'bp-instruction';
          instruction.style.position = 'absolute';
          instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
          instruction.style.top = (window.scrollY + rect.top) + 'px';
          instruction.style.background = 'white';
          instruction.style.border = '2px solid red';
          instruction.style.borderRadius = '6px';
          instruction.style.padding = '10px';
          instruction.style.color = 'red';
          instruction.style.fontWeight = 'bold';
          instruction.style.zIndex = 10001;
          instruction.innerText = 'Please click here and select "Legal entity" to set up a legal entity';
          document.body.appendChild(instruction);

          // Cleanup on click
          const cleanup = function() {
            businessProfileLink.style.backgroundColor = '';
            businessProfileLink.style.border = '';
            businessProfileLink.style.borderRadius = '';
            const instr = document.getElementById('bp-instruction');
            if (instr) instr.remove();
            businessProfileLink.removeEventListener('click', cleanup);
          };
          businessProfileLink.addEventListener('click', cleanup);
        }
      }
    }
  });
});

window.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname === '/profile/business_profile') {
    const legalEntitiesLink = document.querySelector('a[data-id="legal_entities"]');
    if (legalEntitiesLink && !document.getElementById('le-instruction')) {
      // Highlight the link
      legalEntitiesLink.style.backgroundColor = 'yellow';
      legalEntitiesLink.style.border = '2px solid red';
      legalEntitiesLink.style.borderRadius = '6px';

      // Get position
      const rect = legalEntitiesLink.getBoundingClientRect();

      // Create popup
      const instruction = document.createElement('div');
      instruction.id = 'le-instruction';
      instruction.style.position = 'absolute';
      instruction.style.left = (window.scrollX + rect.right + 10) + 'px';
      instruction.style.top = (window.scrollY + rect.top) + 'px';
      instruction.style.background = 'white';
      instruction.style.border = '2px solid red';
      instruction.style.borderRadius = '6px';
      instruction.style.padding = '10px';
      instruction.style.color = 'red';
      instruction.style.fontWeight = 'bold';
      instruction.style.zIndex = 10001;
      instruction.innerText = 'Click here to manage your Legal Entities';
      document.body.appendChild(instruction);

      // Cleanup on click
      const cleanup = function() {
        legalEntitiesLink.style.backgroundColor = '';
        legalEntitiesLink.style.border = '';
        legalEntitiesLink.style.borderRadius = '';
        const instr = document.getElementById('le-instruction');
        if (instr) instr.remove();
        legalEntitiesLink.removeEventListener('click', cleanup);
      };
      legalEntitiesLink.addEventListener('click', cleanup);
    }
  }
});