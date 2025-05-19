# Coupa Supplier Checklist

A browser-based interactive checklist to help suppliers navigate and troubleshoot common issues in the Coupa Supplier Portal.

![Coupa Supplier Checklist Screenshot](https://via.placeholder.com/800x400?text=Coupa+Supplier+Checklist)

## Overview

This browser extension/script adds an interactive checklist to the Coupa Supplier Portal interface to guide suppliers through common setup processes and troubleshooting steps. The checklist walks users through critical setup stages and provides interactive help by highlighting relevant UI elements and displaying contextual instructions.

## Features

- **Interactive Checklist**: Walks users through 8 critical setup questions
- **Contextual Help**: Dynamically highlights relevant UI elements based on user responses
- **Visual Guidance**: Provides clear instructions with arrows and popups
- **Draggable Interface**: Users can position the checklist anywhere on the screen
- **Theme Toggle**: Switch between retro and modern UI styles
- **Minimizable**: Compact the checklist when not in use
- **Reset Functionality**: Start over with a fresh checklist

## Installation

### Option 1: Browser Extension (Coming Soon)
1. Download the extension from [Chrome Web Store/Firefox Add-ons]
2. Install and activate the extension
3. Navigate to the Coupa Supplier Portal - the checklist will appear automatically

### Option 2: User Script
1. Install a userscript manager like Tampermonkey or Greasemonkey
2. Create a new script and paste the contents of `content2.js`
3. Save the script and navigate to the Coupa Supplier Portal

### Option 3: Developer Console (Quick Test)
1. Navigate to the Coupa Supplier Portal
2. Open the browser developer console (F12 or right-click > Inspect)
3. Copy and paste the contents of `content2.js` into the console
4. Press Enter to execute

## Usage

The checklist guides users through the following critical setup areas:

1. **Authenticator Setup**: Verifies if the user has set up two-factor authentication
2. **Legal Entity**: Checks if proper legal entities are configured
3. **Payment Method**: Ensures payment methods are set up properly
4. **Customer Connections**: Verifies connections with customers
5. **Payment Method Linking**: Checks if payment methods are linked to customers
6. **Invoices in Draft**: Identifies invoices in draft status that need attention
7. **Invoice Submission Errors**: Helps troubleshoot invoice submission issues
8. **Disputed/Rejected Invoices**: Identifies problematic invoices that need resolution

For each question:
- Answer "Yes" if the item is already set up correctly
- Answer "No" to receive interactive guidance on how to resolve the issue

## How It Works

When a user clicks "No" on a checklist item:
1. The script identifies the relevant UI element in the Coupa portal
2. Highlights the element with a yellow background and red border
3. Displays a popup with specific instructions
4. Removes the highlight once the user clicks on the highlighted element

## Customization

The script can be modified to:
- Change the checklist questions in the `questions` array
- Adjust the styling by modifying the CSS properties
- Add additional guidance for other common issues

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- This tool was created to simplify the onboarding process for new Coupa suppliers
- Thanks to the Coupa community for feedback and suggestions
