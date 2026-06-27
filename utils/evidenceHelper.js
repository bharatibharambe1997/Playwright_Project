const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function captureEvidence(page,testInfo,stepName, testCaseId) {
const testName = typeof testInfo.title === 'string' ? testInfo.title.replace(/\s+/g, '_') : 'unknown_test';

//Remove invalid Windows path Windows path characters
const safetestname = testName.replace(/[:/\\*?"<>|]/g, '_');
const safeTestCaseId = String(testCaseId).replace(/[:/\\*?"<>|]/g, '_');
const folderName ='${safetestname}_${safeTestCaseId}';
const evidenceFolder = path.join(process.cwd(), 'automation-evidence', folderName);

// Create the evidence folder if it doesn't exist
if (!fs.existsSync(evidenceFolder)) {
    fs.mkdirSync(evidenceFolder, { recursive: true });

    //Safe timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(evidenceFolder, `${stepName}_${timestamp}.png`);

    //wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Capture browser screenshot(HEADLESS SAFE)
    await page.screenshot({ path: screenshotPath, fullPage: true });
    const overlayText = `<svg width="700" height="60">
    <rect x="0" y="0" width="700" height="60" fill="black" fill-opacity="0.5"/>
    <text x="10" y="35" font-size="20" fill="yellow">
    
    Test Case: ${testCaseId}
    </text>
    <text x="15" y="50" font-size="18" fill="yellow">

    Step: ${stepName} | Timestamp: ${timestamp}
    </text>
    </svg>`;

    await sharp(screenshotPath)
        .composite([{ input: Buffer.from(overlayText), top: 0, left: 500 }])
        .toFile(screenshotPath + "_temp");

        fs.renameSync(screenshotPath + "_temp", screenshotPath);

        await testInfo.attach(stepName, { path: screenshotPath, contentType: 'image/png' });
    }
}module.exports = { captureEvidence };