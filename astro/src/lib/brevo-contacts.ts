export type BrevoContactAttributes = {
  COMPANY?: string;
  SERVICE?: string;
  SOURCE: string;
  WEBSITE?: string;
  BUDGET?: string;
  DEADLINE?: string;
  LANGUAGE: string;
  CONSENT_SOURCE: string;
  CONSENT_TIMESTAMP: string;
};

type BrevoList = {
  id: number;
  name: string;
};

type BrevoListsResponse = {
  lists?: BrevoList[];
};

export type BrevoContactConfig = {
  apiKey: string;
  websiteLeadsListId?: string;
};

async function brevoRequest<T>(
  apiKey: string,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(`https://api.brevo.com/v3${path}`, {
    ...init,
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo API returned ${response.status}: ${detail}`);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

async function resolveWebsiteLeadsListId(config: BrevoContactConfig) {
  const configuredId = Number(config.websiteLeadsListId);
  if (Number.isInteger(configuredId) && configuredId > 0) return configuredId;

  const result = await brevoRequest<BrevoListsResponse>(
    config.apiKey,
    "/contacts/lists?limit=50&offset=0&sort=desc",
  );
  const list = result.lists?.find(({ name }) => name === "Website Leads");
  if (!list) {
    throw new Error(
      "Brevo list “Website Leads” is missing. Run scripts/setup-brevo.mjs first.",
    );
  }
  return list.id;
}

export async function upsertWebsiteLead(
  config: BrevoContactConfig,
  contact: {
    email: string;
    attributes: BrevoContactAttributes;
  },
) {
  const listId = await resolveWebsiteLeadsListId(config);

  await brevoRequest(config.apiKey, "/contacts", {
    method: "POST",
    body: JSON.stringify({
      email: contact.email,
      attributes: contact.attributes,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  return { listId };
}
