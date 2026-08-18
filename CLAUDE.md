# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository is a test/demo environment for the Omi SDK, not a development repository. It contains pre-built SDK files and demo/test pages to showcase SDK functionality.

## Structure

- **SDK Files**: `omisdk.es.js` (3.6MB) - ES module bundle, `index.d.ts` - TypeScript definitions
- **Test Pages**: 
  - `index.html` - Main demo page
  - `basic-usage.html` - Basic usage example
  - `blur/index.html` - MediaPipe blur background test
  - `guest/` - Empty directory (intended for guest SDK tests)
- **Plain Build**: `dist-plain/` contains a plain JavaScript build with index.js + index.d.ts + index.html

## Key Files

- `omisdk.es.js`: The main SDK bundle (ES module)
- `index.d.ts`: TypeScript type definitions
- `index.html`: Main demo page showing SDK integration
- `basic-usage.html`: Basic usage example
- `blur/index.html`: MediaPipe background blur test

## Development Notes

This is not a source code repository. There are no build scripts, npm scripts, or source files. The SDK is already built and ready to use. To modify the SDK, you would need the source repository, not this test environment.

## Testing

To test the SDK:
1. Open any of the HTML files in a browser
2. The SDK will be loaded and initialized automatically
3. Test different features as demonstrated in each page

## Usage

The SDK can be used by including the script tag:
```html
<script src="./omisdk.es.js"></script>
```

Or by importing the ES module:
```javascript
import { OmiSDK } from "./omisdk.es.js";
```