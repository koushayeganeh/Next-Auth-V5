export async function sendVerificationEmail(to, token) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/sendEmail`;
  console.log("Fetching URL:", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, token }),
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
