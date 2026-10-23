// Contact form backend. Swap the implementation here to change where submissions go.
export type ContactData = {
  name: string;
  email: string;
  projectType: string;
  message: string;
  website: string; // honeypot
};

export async function submitContact(data: ContactData): Promise<void> {
  const url = import.meta.env["VITE_CONTACT_WEBHOOK_URL"] as string | undefined;
  if (!url) throw new Error("Contact webhook URL is not configured");
  const { name, email, projectType, message, website } = data;
  // no-cors gives an opaque response: success unless fetch throws.
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ name, email, projectType, message, website }),
  });
}
