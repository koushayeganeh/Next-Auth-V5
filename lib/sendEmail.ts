export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ message: string }> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/sendEmail`;
  console.log("Fetching URL:", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, subject, html }),
  });

  const text = await response.text(); // Get the raw response text

  try {
    const data = JSON.parse(text); // Attempt to parse it as JSON

    if (!response.ok) {
      console.error("Error response data:", data);
      throw new Error(data.error || "Error sending email");
    }

    return data;
  } catch (error) {
    console.error("Error parsing response:", text); // Log the raw response
    throw new Error("Error sending email");
  }
}

export async function sendVerificationEmail(
  to: string,
  token: string
): Promise<{ message: string }> {
  const subject = "Email Verification";
  const html = `<p>Please verify your email by clicking on the link below:</p>
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}">Click here to verify</a>`;

  return sendEmail(to, subject, html);
}

export async function sendPasswordResetEmail(
  to: string,
  token: string
): Promise<{ message: string }> {
  const subject = "Password Reset";
  const html = `<p>Please reset your password by clicking on the link below:</p>
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-password?token=${token}">Click here to reset your password</a>`;

  return sendEmail(to, subject, html);
}

export async function sendTwoFactorTokenEmail(
  to: string,
  token: string
): Promise<{ message: string }> {
  const subject = "2FA Code";
  const html = `<p>Your 2FA code: ${token}</p>`;

  return sendEmail(to, subject, html);
}
