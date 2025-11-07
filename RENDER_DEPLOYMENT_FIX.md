# Render Deployment Fix

## Problem
The application was failing to start on Render with the error:
```
Error: Cannot find module '/app/dist/api/main.js'
```

## Root Cause
The NX build process was preserving the source directory structure, outputting files to `dist/api/src/main.js` instead of `dist/api/main.js`. The Dockerfile was trying to run `node dist/api/main.js`, which didn't exist.

## Solution Applied

### 1. Added rootDir to TypeScript Configuration
**File**: `apps/api/tsconfig.app.json`

Added `"rootDir": "src"` to the compiler options to help flatten the build output structure (though NX still preserves the src directory).

### 2. Created Root-Level Dockerfile
**File**: `Dockerfile` (new)

Created a Dockerfile at the project root for Render deployment, as Render was looking for a Dockerfile at the root level.

### 3. Updated CMD Path in Both Dockerfiles
**Files**: 
- `Dockerfile`
- `apps/api/Dockerfile`

Changed the start command from:
```dockerfile
CMD ["node", "dist/api/main.js"]
```

To:
```dockerfile
CMD ["node", "dist/api/src/main.js"]
```

This matches the actual build output structure created by NX.

## Build Output Structure
After building with `npx nx build api --prod`, the structure is:
```
dist/
└── api/
    ├── package.json
    ├── tsconfig.tsbuildinfo
    └── src/
        ├── main.js
        └── app/
            └── [other compiled files]
```

## Testing
Verified locally that:
1. ✅ Build completes successfully: `npx nx build api --prod`
2. ✅ Output file exists at: `dist/api/src/main.js`
3. ✅ Application starts: `node dist/api/src/main.js`

## Next Steps
1. Commit and push these changes
2. Trigger a new deployment on Render
3. The application should now start successfully

## Files Modified
- `apps/api/tsconfig.app.json` - Added rootDir configuration
- `Dockerfile` - Created new root-level Dockerfile with correct CMD path
- `apps/api/Dockerfile` - Updated CMD path to match build output

## Environment Variables Required
Ensure the following environment variables are configured in Render:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `PORT` - Application port (defaults to 3001)
- Any other application-specific environment variables

