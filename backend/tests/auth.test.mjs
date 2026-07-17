import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import {
  after,
  before,
  test
} from "node:test";

const TEST_PORT = 3100;
const API_URL = `http://localhost:${TEST_PORT}`;

let backendProcess;

async function waitForBackend(
  attempts = 30,
  delay = 200
) {
  for (
    let attempt = 0;
    attempt < attempts;
    attempt += 1
  ) {
    try {
      const response = await fetch(
        `${API_URL}/health`
      );

      if (response.ok) {
        return;
      }
    } catch {
      // Le serveur est encore en cours de démarrage.
    }

    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  throw new Error(
    "Le backend de test n’a pas démarré."
  );
}

async function login(username, password) {
  return fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    }
  );
}

before(async () => {
  backendProcess = spawn(
    process.execPath,
    ["dist/server.js"],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PORT: String(TEST_PORT)
      },
      stdio: [
        "ignore",
        "pipe",
        "pipe"
      ]
    }
  );

  backendProcess.stdout?.on(
    "data",
    (data) => {
      process.stdout.write(
        `[backend test] ${data}`
      );
    }
  );

  backendProcess.stderr?.on(
    "data",
    (data) => {
      process.stderr.write(
        `[backend test] ${data}`
      );
    }
  );

  await waitForBackend();
});

after(() => {
  if (
    backendProcess &&
    !backendProcess.killed
  ) {
    backendProcess.kill();
  }
});

test(
  "la route health confirme SQLite",
  async () => {
    const response = await fetch(
      `${API_URL}/health`
    );

    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.success, true);
    assert.equal(data.status, "ok");
    assert.equal(
      data.database,
      "connected"
    );
  }
);

test(
  "la connexion administrateur réussit",
  async () => {
    const response = await login(
      "admin",
      "admin123"
    );

    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.success, true);
    assert.equal(
      data.user.username,
      "admin"
    );
    assert.equal(
      data.user.role,
      "admin"
    );
  }
);

test(
  "le mot de passe n’est jamais renvoyé",
  async () => {
    const response = await login(
      "admin",
      "admin123"
    );

    const data = await response.json();

    assert.equal(
      Object.hasOwn(
        data.user,
        "password"
      ),
      false
    );
  }
);

test(
  "un mauvais mot de passe est refusé",
  async () => {
    const response = await login(
      "admin",
      "incorrect"
    );

    const data = await response.json();

    assert.equal(response.status, 401);
    assert.equal(data.success, false);
    assert.equal(
      data.message,
      "Identifiants incorrects."
    );
  }
);

test(
  "un utilisateur inconnu est refusé",
  async () => {
    const response = await login(
      "inconnu",
      "motdepasse"
    );

    const data = await response.json();

    assert.equal(response.status, 401);
    assert.equal(data.success, false);
  }
);

test(
  "Zod refuse des données trop courtes",
  async () => {
    const response = await login(
      "ab",
      "123"
    );

    const data = await response.json();

    assert.equal(response.status, 400);
    assert.equal(data.success, false);
  }
);

test(
  "une route inexistante renvoie 404",
  async () => {
    const response = await fetch(
      `${API_URL}/route-inexistante`
    );

    const data = await response.json();

    assert.equal(response.status, 404);
    assert.equal(data.success, false);
    assert.equal(
      data.message,
      "Route introuvable"
    );
  }
);