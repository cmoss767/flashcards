# My Expo App - Publishing Guide

This guide outlines the steps to build and publish this Expo application to the Apple App Store using Expo Application Services (EAS).

## Prerequisites

1.  **Node.js and npm/yarn:** Ensure you have Node.js and npm (or yarn) installed on your machine.
2.  **Expo Account:** You need an Expo account. If you don't have one, sign up at [https://expo.dev/signup](https://expo.dev/signup).
3.  **Apple Developer Account:** You need an active Apple Developer Program membership.
4.  **EAS CLI:** Install the Expo Application Services command-line interface:
    ```bash
    npm install -g eas-cli
    ```

## Publishing Steps

1.  **Login to EAS:**
    Open your terminal in the project root and log in to your Expo account:
    ```bash
    eas login
    ```
    You may already be logged in.

2.  **Configure iOS Project (if not already done):**
    This step prepares your project for EAS Build specifically for iOS.
    ```bash
    eas build:configure -p ios
    ```

3.  **Start an iOS Production Build:**
    This command will build your app for production, ready for the App Store.
    ```bash
    eas build -p ios --profile production
    ```
    *   You will be prompted for your Apple ID (the email address for your Apple Developer account) and password.
    *   EAS may ask if you want to generate a new App Store Connect API Key. Say yes.
    *   This process can take some time as your app is built on EAS servers. You'll see a link to the build progress.

4.  **Submit the Build to App Store Connect:**
    Once the build is complete, you can submit it to App Store Connect.
    ```bash
    eas submit -p ios
    ```
    *   You will be prompted to select a build. Choose **"Select a build from EAS"** and pick the production build you just completed.
    *   EAS will upload the build to App Store Connect.

5.  **App Store Connect - Final Steps:**
    After the submission via EAS is successful:
    *   Apple will process your build (you'll receive an email).
    *   The build will appear in **TestFlight** on your [App Store Connect](https://appstoreconnect.apple.com/) account.
    *   Navigate to your app in App Store Connect.
    *   Fill in all required metadata:
        *   App Information (name, subtitle, bundle ID, category)
        *   Pricing and Availability
        *   App Privacy details
        *   Version Information (what's new in this version)
        *   Upload Screenshots and App Previews for various device sizes.
    *   Once all metadata is complete and your build has been processed, you can submit your app for review by Apple from the "App Review" section.

## Automation (Basic)

You can create a simple shell script (e.g., `publish-ios.sh`) to combine the build and submit steps:

```bash
#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Starting iOS production build..."
eas build -p ios --profile production

echo "Build complete. Starting submission to App Store Connect..."
eas submit -p ios

echo "Submission process initiated. Follow prompts and then check App Store Connect."
```
To make this script executable: `chmod +x publish-ios.sh`
To run it: `./publish-ios.sh`

**Note:** This script will still require manual interaction for Apple ID login, build selection, and other prompts from EAS CLI.

## Troubleshooting

*   **Apple ID Login Issues:** Ensure you are using the correct email address and password for your Apple Developer account. `9ZHSV66Q9F` or similar is *not* your Apple ID; it's likely an internal identifier.
*   **EAS Build Failures:** Check the build logs provided by EAS (link in the terminal output) for specific error messages.
*   **App Store Connect Issues:** Refer to the official [Apple Developer Documentation](https://developer.apple.com/documentation/) for guidance on App Store Connect. 