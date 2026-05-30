# Mohak – The Vibe | Firebase Studio

See Live: https://mohak-the-vibe.web.app/

This is the official repository for **Mohak – The Vibe**, a premium artificial jewelry boutique.

## Managing Your App

1.  **Development**: All edits are made within the Firebase Studio IDE. Changes are auto-saved to your development environment.
2.  **Syncing to GitHub**: 
    *   To push your changes to your connected GitHub repository, look for the **"Sync with GitHub"** button in the sidebar or header of the Firebase Studio interface. 
    *   This is the official way to commit your changes to your repo.
3.  **Deployment**:
    *   Click the **"Deploy"** button in the Firebase Studio UI to push your site live to Firebase Hosting.
4.  **Images**:
    *   Place all product images in `public/images/earring/`.
    *   Update image references in `src/lib/placeholder-images.json`.

## Troubleshooting

### Git Divergent Branches
If you see an error about "divergent branches" when syncing:
1. Open the Terminal in the IDE.
2. Run this command to pull and reconcile:
   ```bash
   git pull origin main --rebase
   ```
3. Once completed, try the **"Sync with GitHub"** button again.

### HMR Errors
If the site doesn't reflect your changes or you see HMR (Hot Module Replacement) errors:
*   Ensure all JSON files in `src/lib/` are valid.
*   Refresh the browser page.
*   Check the build logs for any syntax errors.

For support, contact the Mohak dev team.