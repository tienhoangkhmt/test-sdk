# Omi SDK

A lightweight, customizable TypeScript SDK that can be embedded in any website. This SDK provides a simple API for integrating with your web applications and supports chat/call/video call for interactions.

## Features

- Easy embedding via script tag or import
- Multiple UI modes (bubble and headless)
- chat/call/video call with event handling
- Customizable themes
- Event-driven architecture
- Small footprint with minimal dependencies
- Support for modern and legacy browsers

## Installation

### Using npm

```bash
npm install @mptransformation/omisdk
```

### Using a script tag

```html
<script src="./js/omisdk.iife.js"></script>
```

## Usage

### Basic Usage

```html
<!-- Auto-initialization with data attributes -->
<script
  src="./js/omisdk.iife.js"
  data-auto-init="true"
  data-target-element-id="sdk-container"
  data-mode="bubble"
  data-debug="true"
></script>

<div id="sdk-container"></div>
```

### Programmatic Initialization

```javascript
// Import the SDK (ESM)
import { OmiSDK } from "@mptransformation/omisdk";

// Initialize the SDK
const sdk = new OmiSDK({
  targetElementId: "sdk-container",
  mode: "bubble", // 'bubble' or 'none'
  debug: true,
  theme: {
    primaryColor: "#4CAF50",
    secondaryColor: "#45a049",
    bubblePosition: "bottom-right",
  },
});

// Initialize the SDK
sdk.init();

// Listen for events
sdk.on("AppEvent", (event: AppEvent) => {
  console.log("appEvent received:", event);
});

sdk.on("CallEvent", (event: CallEvent) => {
  console.log("callEvent received:", event);
});

// Make a call
sdk.makeCall("1234567890").then((response) => {
  console.log("Call initiated:", response);
});

// Destroy the SDK when done
sdk.destroy();
```

## API Reference

### SDK Options

| Option            | Type    | Default             | Description                                     |
| ----------------- | ------- | ------------------- | ----------------------------------------------- |
| `targetElementId` | string  | "omi-sdk-container" | ID of the element where the SDK will be mounted |
| `mode`            | string  | "bubble"            | UI mode: "bubble" or "none"                     |
| `socketUrl`       | string  | null                | WebSocket server URL                            |
| `debug`           | boolean | false               | Enable debug logging                            |
| `theme`           | object  | {}                  | Custom theme options                            |

### Theme Options

| Option            | Type   | Description                                                                    |
| ----------------- | ------ | ------------------------------------------------------------------------------ |
| `primaryColor`    | string | Primary color for UI elements                                                  |
| `secondaryColor`  | string | Secondary color for UI elements                                                |
| `textColor`       | string | Text color                                                                     |
| `backgroundColor` | string | Background color                                                               |
| `fontFamily`      | string | Font family for text                                                           |
| `borderRadius`    | string | Border radius for UI elements                                                  |
| `bubblePosition`  | string | Position of the bubble: "top-left", "top-right", "bottom-left", "bottom-right" |

### Methods

| Method                                        | Description                              |
| --------------------------------------------- | ---------------------------------------- |
| `init(options?: SDKOptions)`                  | Initialize the SDK with options          |
| `destroy()`                                   | Clean up and remove the SDK from the DOM |
| `updateOptions(options: Partial<SDKOptions>)` | Update SDK options                       |
| `getVersion()`                                | Get the SDK version                      |
| `getOptions()`                                | Get the current SDK options              |
| `on(event: string, callback: Function)`       | Register an event listener               |
| `off(event: string, callback: Function)`      | Remove an event listener                 |
| `connectSocket()`                             | Connect to the WebSocket server          |
| `disconnectSocket()`                          | Disconnect from the WebSocket server     |
| `sendSocketEvent(name: string, data: any)`    | Send an event to the socket server       |
| `login(request: LoginRequest)`                | Login with username and password         |
| `loginSSO(request: LoginSSORequest)`          | Login with SSO token                     |
| `logout()`                                    | Logout the current user                  |
| `makeCall(destination: string, options?)`     | Make a call to a destination             |
| `hangup()`                                    | Hangup the current call                  |
| `answerCall(options?)`                        | Answer an incoming call                  |
| `rejectCall()`                                | Reject an incoming call                  |
| `hold()`                                      | Hold the current call                    |
| `unhold()`                                    | Resume the current call                  |
| `mute()`                                      | Mute the current call                    |
| `unmute()`                                    | Unmute the current call                  |
| `cameraOn()`                                  | Turn on the camera                       |
| `cameraOff()`                                 | Turn off the camera                      |
| `transfer(destination: string)`               | Transfer the current call                |
| `changeAgentStatus(status: string)`           | Change the agent status                  |
| `getAgentStatus()`                            | Get the agent status                     |
| `hideBubble()`                                | Hide the bubble                          |
| `showBubble()`                                | Show the bubble                          |

## UI Modes

### Bubble Mode

In bubble mode, the SDK displays a floating bubble in the corner of the screen that users can interact with. The bubble position can be customized using the theme options.

### None Mode (Headless)

In none mode, the SDK operates without any visible UI elements, allowing you to build your own UI on top of the SDK's functionality.

## Background Blur (MediaPipe)

Blur / thay đổi nền trong cuộc gọi video, dùng MediaPipe Selfie Segmentation (`medium`) hoặc TaskVision (`high`).

### Bật tính năng

**Agent SDK (OmiSDK):**

```javascript
const sdk = new OmiSDK({
  // ...
  enableMediapipe: true,
  model: "medium", // "medium" (selfie_segmentation) | "high" (task_vision)
  backgroundImages: [{ id: 1, url: "https://example.com/bg.jpg" }],
});

await sdk.blurBackground(sessionId, imageId); // imageId: 0 = blur, khác 0 = ảnh nền
```

**Guest SDK (OmiGuestSDK):**

```javascript
const guest = new OmiGuestSDK({
  baseUrl: "...",
  apiKey: "...",
  appId: "...",
  mediaIds: { localVideoID: "local", remoteVideoID: "video1", remoteAudioID: "audio1" },
  enableMediapipe: true,      // bật MediaPipe
  model: "medium",            // "medium" | "high"
  backgroundImages: [{ id: 1, url: "https://example.com/bg.jpg" }],
});

await guest.blurBackground(true);  // bật blur
await guest.blurBackground(false); // tắt blur, khôi phục camera gốc
```

### Overlay Text

Vẽ text đè lên khung hình đang gửi (chỉ hiển thị khi blur đang bật):

```javascript
// Đổi text + vị trí
guest.setOverlayText(0, "Xin chào", { x: 100, y: 50 });

// Không truyền position → giữ nguyên vị trí cũ, chỉ đổi text (vd: đồng hồ chạy)
setInterval(() => {
  guest.setOverlayText(0, new Date().toLocaleTimeString("vi-VN"));
}, 1000);
```

Các hàm liên quan: `setOverlayText(index, text, position?)`, `updateOverlayText(text, index)`, `setDefaultOverlayText(items)`, `removeOverlayText(index)`, `clearOverlayText()`.

### Switch Camera khi đang blur

Blur được giữ nguyên khi đổi camera — stream camera mới được đưa vào input của MediaPipe (`switchSource`), canvas stream đang gửi không bị ngắt. Việc tắt blur (`blurBackground(false)`) sẽ khôi phục đúng camera hiện tại.

### Assets

Build SDK đã copy assets MediaPipe vào `dist/mediapipe/`. Host file này cùng SDK và trỏ `mediapipeBasePath` tới đó; nếu không có sẽ fallback về CDN jsdelivr.

## Examples

Check out the examples directory for more detailed usage examples:

- [Basic Usage](examples/basic-usage.html) - Shows basic SDK initialization and usage

To run the examples with the socket server:

```bash
# Build the SDK first
npm run build

# Run both the examples server and socket server
npm start
```

Then open http://localhost:3000/examples/socket-example.html in your browser.

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/MPG-MPTransformation/mptsdk.git
cd mptsdk

# Install dependencies
npm install

# Build the SDK
npm run build

# Serve examples
npm run serve-examples
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run demo` - Serve the demo page
- `npm start` - Run both the examples server and socket server

## License

MIT

## Using Types with ESLint in ReactJS Projects

This SDK provides TypeScript type definitions that can be used with ESLint in ReactJS projects. This helps with type checking and autocompletion when using the SDK in your React application.

### Installation

```bash
npm install @mptransformation/omisdk
```

### Basic Usage with TypeScript and ESLint

1. Import the types in your React component:

```tsx
import React, { useEffect } from "react";
import omisdk from "@mptransformation/omisdk";
import type { SDKOptions, SDKTheme } from "@mptransformation/omisdk";

const MyComponent: React.FC = () => {
  useEffect(() => {
    // Configure the SDK with proper typing
    const options: SDKOptions = {
      targetElementId: "sdk-container",
      mode: "bubble",
      theme: {
        primaryColor: "#007bff",
        textColor: "#333333",
      },
    };

    // Initialize the SDK
    omisdk.init(options);

    // Clean up on unmount
    return () => {
      omisdk.destroy();
    };
  }, []);

  return <div id="sdk-container">{/* SDK will be mounted here */}</div>;
};

export default MyComponent;
```

2. For ESLint configuration, add the following to your `.eslintrc.js` file:

```js
module.exports = {
  // ... your existing ESLint config
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // ... your existing rules
  },
};
```

3. If you need to access the global instance in a non-TypeScript file, you can use the global type:

```tsx
// The window.omisdk type is already defined in the SDK's type definitions
window.omisdk.init({
  targetElementId: "sdk-container",
  mode: "bubble",
});
```

### Advanced Type Usage

For more advanced type usage, you can import specific types:

```tsx
import type {
  SDKOptions,
  SDKTheme,
  SocketEvent,
  CallEventType,
  CallEvent,
} from "@mptransformation/omisdk";

// Use the types in your code
const handleCallEvent = (event: CallEvent) => {
  if (event.type === CallEventType.CALL_INCOMING) {
    console.log("Incoming call from:", event.senderId);
  }
};

// Subscribe to events with proper typing
omisdk.on("call", handleCallEvent);
```
