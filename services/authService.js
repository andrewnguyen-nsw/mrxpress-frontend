export const sendLoginRequest = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending login request:", error);
  }
};

export const sendForgotPasswordRequest = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/resetPwdEmail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending login request:", error);
  }
}

export const sendLogoutRequest = async (token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending logout request:", error);
  }
  
}