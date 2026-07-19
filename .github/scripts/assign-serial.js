const fs = require('fs');
const { execFileSync } = require('child_process');

const REGISTRY_PATH = 'EMU_serial_registry/registry.json';
const README_PATH = 'EMU_serial_registry/README.md';

async function main() {
  const issueNumber = process.env.ISSUE_NUMBER;
  const issueBody = process.env.ISSUE_BODY;
  const approvedBy = process.env.ISSUE_ACTOR;
  const token = process.env.GITHUB_TOKEN;
  const workerUrl = process.env.WORKER_NOTIFY_URL;
  const notifySecret = process.env.NOTIFY_SECRET;

  // Parse the JSON block from the issue body
  const jsonMatch = issueBody.match(/```json\n([\s\S]*?)\n```/);
  if (!jsonMatch) {
    console.error('Could not find JSON data block in issue body');
    process.exit(1);
  }

  const submission = JSON.parse(jsonMatch[1]);
  console.log('Parsed submission:', submission.discord_username);

  // Configure git identity once
  execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
  execFileSync('git', ['config', 'user.email', 'github-actions[bot]@users.noreply.github.com']);

  // Retry loop: another commit may land on main between our checkout and
  // our push (e.g. a racing approved-label run). On any failure we sync to
  // the latest main and recompute the serial — otherwise we'd risk issuing
  // a duplicate number.
  const MAX_ATTEMPTS = 5;
  let serial;
  let lastErr;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      // Sync to latest main, discarding any commit from a prior attempt
      execFileSync('git', ['fetch', 'origin', 'main']);
      execFileSync('git', ['reset', '--hard', 'origin/main']);

      // Read current registry (now reflects any commits that beat us)
      const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));

      // Determine next serial
      let maxNum = -1;
      for (const entry of registry) {
        const match = entry.serial.match(/#(\d+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNum) maxNum = num;
        }
      }
      const nextNum = maxNum + 1;
      serial = `#${String(nextNum).padStart(4, '0')}`;
      console.log(`Attempt ${attempt}: assigning serial ${serial}`);

      // Append new entry (email is stored privately in R2, not in the public registry)
      const newEntry = {
        serial,
        discord_username: submission.discord_username,
        discord_id: submission.discord_id,
        media_urls: submission.media_urls || (submission.photo_url ? [submission.photo_url] : []),
        notes: submission.notes || '',
        date: new Date().toISOString().split('T')[0],
        approved_by: approvedBy,
      };
      registry.push(newEntry);

      // Write updated registry and regenerate README
      fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');
      generateReadme(registry);

      // Commit and push
      execFileSync('git', ['add', REGISTRY_PATH, README_PATH]);
      execFileSync('git', ['commit', '-m', `Assign serial ${serial} to ${submission.discord_username}`]);
      execFileSync('git', ['push']);

      console.log(`Pushed serial ${serial} on attempt ${attempt}`);
      lastErr = null;
      break;
    } catch (err) {
      lastErr = err;
      console.warn(`Attempt ${attempt} failed: ${err.message}`);
      if (attempt < MAX_ATTEMPTS) {
        const delayMs = 500 * attempt;
        console.log(`Retrying in ${delayMs}ms...`);
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  if (lastErr) {
    throw new Error(`Push failed after ${MAX_ATTEMPTS} attempts: ${lastErr.message}`);
  }

  // Comment on the issue
  const comment = `## Serial Assigned: \`${serial}\`\n\nCongratulations **${submission.discord_username}**! Your EMU serial number is \`${serial}\`.\n\nYour entry has been added to the [Official EMU Serial Registry](https://github.com/DW-Tas/emu/tree/main/EMU_serial_registry).`;

  await ghApi(`/repos/DW-Tas/emu/issues/${issueNumber}/comments`, token, {
    method: 'POST',
    body: JSON.stringify({ body: comment }),
  });

  // Close the issue
  await ghApi(`/repos/DW-Tas/emu/issues/${issueNumber}`, token, {
    method: 'PATCH',
    body: JSON.stringify({ state: 'closed' }),
  });

  // Send email notification via Worker
  if (workerUrl && notifySecret && submission.discord_id) {
    try {
      const res = await fetch(workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${notifySecret}`,
        },
        body: JSON.stringify({
          discord_id: submission.discord_id,
          serial,
          discord_username: submission.discord_username,
        }),
      });
      if (!res.ok) {
        console.warn(`Email notification failed: ${res.status}`);
      } else {
        console.log('Email notification sent');
      }
    } catch (err) {
      console.warn('Email notification error:', err.message);
    }
  }

  console.log('Done!');
}

function generateReadme(registry) {
  const header = `# EMU – Expandable Multi-material Unit - Official Serial Registry

![EMU Serial Print by igiannakas](/EMU_serial_registry/assets/EMU_serial_print_igiannakas.jpeg)

`;

  const entries = registry
    .map((e) => `**Serial ${e.serial}:** ${e.discord_username}</br>`)
    .join('\n');

  const footer = `
</br>

### How to register:
Submit your build at [dwtas.net/EMUSerial](https://dwtas.net/EMUSerial). Sign in with Discord, upload a photo of your completed EMU Maker chip and unit, and a maintainer will review your submission.

Print [at least a two color version of the EMU Maker chip](https://github.com/DW-Tas/EMU/tree/main/EMU_serial_registry/serial_print_file). If your EMU lane can reach 4+ colors, try to use them all!
`;

  fs.writeFileSync(README_PATH, header + entries + footer);
}

async function ghApi(path, token, options = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'emu-serial-action',
      Accept: 'application/vnd.github+json',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${text}`);
  }
  return res;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
